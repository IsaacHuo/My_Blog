---
title: The DB Permission Outage on Cloudflare
date: 2025-11-18
author: Isaac Huo
description: Cloudflare Global Outage Analysis - Complete Review of Permission Change to System Collapse
---

# The DB Permission Outage on Cloudflare

## Introduction

The scale and complexity of the modern internet has far exceeded the capacity of traditional systems, and each large-scale incident serves as a mirror, forcing infrastructure companies to re-examine their architecture and tools. Cloudflare's global failure not only exposed problems but also represented a watershed moment, prompting the entire industry to reconsider "how systems should be observed under extreme pressure, how they should be understood, and how to maintain clarity at the edge of losing control."

During this process of rebuilding observability and analytical capabilities, an unexpected protagonist emerged—a company with nearly legendary status born from Russian engineering culture: ClickHouse. Its technical philosophy, growth trajectory, and performance in disaster-scale scenarios intertwined with Cloudflare's evolution, forming a unique technical narrative.

The content that follows—from Cloudflare's retrospective analysis, to ClickHouse's extreme performance capabilities, to the system transformation after their encounter—will constitute a complete story about modern internet resilience, engineering obsession, and the convergence of technological destinies.

## Incident Overview

On November 18, 2025, Cloudflare experienced its most severe global service outage in nearly six years. This failure was not caused by a network attack or hardware failure, but by a database permission change—more precisely, a change in ClickHouse database query behavior that triggered a chain reaction, ultimately leading to widespread 5xx errors across Cloudflare.

According to W3Techs, as of January 2025, approximately 19.3% of websites on the internet use Cloudflare's security services. In this incident, approximately 30% of internet websites experienced downtime.

![Cloudflare Incident Report](/blog-images/cloudflare/cloudflare-1.png)

Below are screenshots of the Cloudflare error page, various website error pages, and Cloudflare's incident logs following the outage.

![Website Crash Page 1](/blog-images/cloudflare/cloudflare-2.png)

![Website Crash Page 2](/blog-images/cloudflare/cloudflare-3.png)

![Website Crash Page 3](/blog-images/cloudflare/cloudflare-4.png)

![Website Crash Page 4](/blog-images/cloudflare/cloudflare-5.png)

## Incident Timeline

Beginning at 11:20 UTC on November 18, 2025, Cloudflare's global network began experiencing severe anomalies, with core traffic experiencing widespread interruption across all regions. Users attempting to access any website relying on Cloudflare would only see error pages indicating network failure. This incident did not originate from attacks, DDoS, or malicious traffic, but rather from what appeared to be a routine database permission change that triggered a cascade of failures, ultimately leading to core proxy software collapse.

## Root Cause Analysis

### The Origin

The problem initially occurred in the "feature file" used by Cloudflare's Bot Management system.

This feature file is generated every five minutes by the underlying ClickHouse database cluster to update machine learning model input features, enabling the system to identify new attack patterns in real-time. Due to an explicit adjustment of database user permissions, ClickHouse's metadata queries began returning more columns than before, causing queries generating the feature file to produce duplicate data. What was originally dozens of features unexpectedly expanded to more than double, and the feature file's size doubled accordingly.

### Cascading Failures

The feature file was subsequently pushed to all of Cloudflare's edge nodes worldwide. The core proxies responsible for traffic processing (Frontline/FL and FL2) triggered internal size limits when reading the file. These modules pre-allocate the memory needed for features and enforce a maximum feature count limit, but this time the file exceeded that limit, causing the core proxy threads to crash directly.

Request processing could not continue at the proxy layer, manifesting externally as widespread 5xx status codes. Compounding the issue, the ClickHouse cluster was undergoing incremental upgrades with each shard potentially in a different state. Consequently, every five minutes the cluster might generate a correct file once and an incorrect file once, causing edge nodes to oscillate between correct and error states. This volatility initially led the team to suspect a massive coordinated attack. Only when all nodes began consistently generating incorrect files did the system enter a fully persistent failure state.

### Deeper Technical Issues

The root cause stemmed from changes in ClickHouse query behavior. Cloudflare uses distributed tables (Distributed engine) to aggregate data from basic tables on various shards (such as the r0 database). Previously, when querying system tables like system.columns, users could only see default database metadata. After the update, user permissions for basic tables in r0 were explicitly granted, causing system table queries to return two identical sets of columns. The feature file generation query lacked database name filtering, so the original column set was duplicated. For high-performance columnar databases like ClickHouse, system.* queries are frequently used for dynamic configuration generation, and Cloudflare's bot management module relied on these queries to build model features. Therefore, the doubling of metadata directly triggered the feature file expansion.

After the feature file was loaded onto edge nodes, the pre-allocated feature memory limit (approximately 200 features) was exceeded. The Rust code in the proxy module crashed on the unwrap() error handling path, causing thread panics that triggered 5xx errors globally. Although the older FL proxy didn't directly crash, it received corrupted feature files, setting all traffic bot scores to zero, causing widespread false positives for customers using bot-based controls. The newer FL2 proxy entered a direct crash state, displaying obvious error pages.

Cloudflare's status page, originally hosted externally, happened to become inaccessible during this period, briefly leading the internal team to suspect a coordinated attack. As investigation deepened, the team confirmed the problem originated from feature file expansion. At 14:30 UTC, Cloudflare manually halted incorrect file generation, requeued the previous correct file for distribution, and forcibly restarted global core proxies. Over the following hours, systems gradually recovered, with CPU resources heavily consumed by debugging and error tracking, increasing latency but achieving full recovery by 17:06 UTC.

The outage also indirectly affected Workers KV, Access, Turnstile, and control panel login functions depending on KV. Some systems reduced impact through core proxy bypass hot patches at 13:04 UTC, but still experienced login congestion and retry queue accumulation.

Afterwards, Cloudflare clearly stated this was a system-level incident caused by the combination of database permission changes, ClickHouse metadata behavior changes, and lack of feature file isolation defenses. Although ClickHouse is renowned for high performance as an analytical database, its system.* metadata queries directly reflect permission model changes in distributed environments. Cloudflare's generation logic incorrectly assumed stable query result sizes. After user permission explicitization, distributed metadata exposed underlying table architecture, doubling feature counts and triggering upper-layer module memory protection mechanisms.

From an engineering perspective, this incident is highly typical: lower-layer database behavior changes usually won't directly cause business outages, but when systems depend on metadata structure to construct core configuration files, risks multiply. ClickHouse's distributed queries and system table behavior must be understood in conjunction with permission models—otherwise, cluster shard inconsistencies during upgrades would produce intermittent errors. If upper-layer modules don't enforce equally strict isolation between "internally generated configuration files" and "user inputs," impact amplification occurs under abnormal conditions.

Cloudflare ultimately committed to strengthening configuration file ingestion security, enabling global circuit breakers for features, limiting error reporting resource consumption, and comprehensively reviewing core proxy error patterns. Cloudflare considers this the most severe incident since 2019, reminding all engineering teams relying on high-performance distributed databases that any system depending on metadata, auto-generating configuration, and frequent network-wide synchronization must implement defensive designs against "unexpected scale expansion"—even if the cause is merely a routine permission change.

## Deep Reflection: The Rise of ClickHouse

As the world's largest CDN provider, committing such a rudimentary database permission change mistake was genuinely shocking. Didn't the company have code flow management? Strict permission change request procedures? At this point, Cloudflare's CEO's incident retrospective in the official blog didn't address deeper causes.

However, stepping back from this incident, I found myself particularly interested in ClickHouse, the database company behind the scenes. After some research, I discovered that within Cloudflare's overall data architecture, for core demands of real-time performance, scalability, and distributed reliability, ClickHouse serves as an increasingly important analytical engine.

### ClickHouse's Characteristics

ClickHouse isn't a traditional "general-purpose database" but rather built around columnar storage, vectorized execution, and CPU cache-focused extreme optimization. This means it can complete scanning, filtering, and aggregation of massive logs, events, and metric-class data at millisecond granularity without duplicating multiple indexes or relying on complex secondary structures.

### Why Cloudflare Chose ClickHouse

ClickHouse suits Cloudflare's scenario because it was born for log and metric data.

Cloudflare's edge network generates staggering volumes of raw request information, WAF decisions, CDN cache hit patterns, and reverse proxy layer behavior data. Traditional row-oriented databases are nearly unusable under this throughput. ClickHouse's columnar layout places identical field data in tight physical proximity, achieving extremely high compression and scan efficiency. Combined with ClickHouse's partitioning strategy, logs can be naturally split by time windows, facilitating TTL automatic cleanup and reducing query scope, further lowering IO and CPU burden.

### Vectorized Execution and Real-Time Performance

At the execution layer, ClickHouse's vectorized pipeline allows queries to complete most computations in CPU L1 and L2 caches, which is why it maintains sub-second latency when analyzing TB to PB-scale logs.

When Cloudflare processes scenarios like "Edge request rates from a specific region abnormally increased in the past 10 minutes" requiring real-time decisions, it achieves near-instantaneous scanning, avoiding latency-related risks.

### Distributed Capabilities

Distributed capabilities are another critical reason ClickHouse receives heavy reliance in Cloudflare's ecosystem. Cloudflare's network is global, highly concurrent, and real-time, with each data center generating massive data—consolidating everything at one processing center is impossible. Therefore, ClickHouse's distributed and replicated table mechanisms allow horizontal scaling while maintaining high availability and tolerating node failures within clusters. The Replica mechanism combined with quorum features ensures that even with partial node unavailability, logs guarantee successful writes and data consistency.

### Position in Cloudflare's Ecosystem

Compared to Cloudflare's existing KV, Durable Objects, R2, and D1/D2 storage systems, ClickHouse leans toward "strong analytical component"—neither directly serving users nor functioning as a transactional database, but rather as the platform's internal observability infrastructure.

It appropriately handles tasks including:

- Real-time traffic analysis
- Long-term trend observation
- WAF rule hit statistics
- Security event correlation
- Multi-dimensional aggregation queries
- Large-scale group analysis

These tasks aren't suitable for KV or D1 because KV is a millisecond-scale read/write system for small objects, while D1 optimizes for SQL transactional loads—neither excels at high-throughput log analysis. ClickHouse's columnar engine perfectly fills this capability gap.

### Synergy with Cloudflare's Ecosystem

ClickHouse emphasizes sequential writes and batch compression, enabling natural integration with Cloudflare's own log streaming systems (streaming workers, Logpush, Kafka-like queues). Edge data flows into ClickHouse through batch streaming, undergoing background merging via MergeTree family engines, maintaining compact storage long-term while read performance continuously improves.

This "write cost frontloaded, read extremely fast" approach aligns perfectly with Cloudflare's service philosophy: delegate challenges to infrastructure, reserve real-time experience for users.

### Future AI Synergy

Looking further ahead, ClickHouse and Cloudflare's AI inference platform possess synergy potential. Since it excels at generating high-dimensional statistics, long-term series aggregation, and anomaly profiles, such structured analytical results can directly serve as AI model inputs, helping automatically adjust security policies, identify traffic patterns, generate behavior deviation audits, and train detection models. Should Cloudflare further develop behavior-level security systems, ClickHouse's high-dimensional feature extraction capabilities based on columnar data will become crucial for driving AI engines.

## Summary: ClickHouse's Role at Cloudflare

ClickHouse functions as an analytical log/metric engine designed for high-concurrency, high-throughput, globally distributed environments within Cloudflare's architecture, leveraging columnar storage, vectorized execution, partitioning strategies, and distributed replication mechanisms to enable the platform to maintain stable, fast, and reliable analytical capabilities under extreme traffic scales, providing solid foundation for real-time decision-making, security protection, and operational analysis across the global edge network.

## ClickHouse and Cloudflare's Mutual Growth

### Transformation Behind the Incident

After the incident, Cloudflare began re-examining its observability and data analytical systems. Interestingly, this transformation process resonated subtly with ClickHouse company's legendary development trajectory.

Cloudflare previously attempted relying on mainstream components like Kafka and Elasticsearch to handle hundreds of billions of edge logs daily. But the incident exposed a core problem: system visibility must be real-time, predictable, and maintain rapid response even under extreme conditions—something traditional systems struggle to satisfy.

When the engineering team internally questioned whether a more extreme analytical engine existed, capable of millisecond-level aggregation at PB-scale data volumes, that moment ClickHouse was rediscovered.

### ClickHouse's Legend

ClickHouse was inherently designed for "extreme concurrency and massive logs"—disaster-scale pressures. When Cloudflare conducted incident retrospectives, they discovered ClickHouse's architectural philosophy perfectly aligned with their needs.

Edge network behavioral data requires rapid ingestion, real-time compression, and immediate queryability—no tolerance for extended index rebuilding or overly complex sharding logic. ClickHouse's columnar storage, compression partitioning, and vectorized execution constitute a stable foundation remaining resilient even during incidents.

### Bidirectional Empowerment

During this period, ClickHouse company itself was undergoing transition from Yandex independence and global expansion stages. For this recently independent company building its commercial system, Cloudflare represented not just technical validation but also cultural alignment.

ClickHouse consistently emphasizes "validating performance in real-world extreme scenarios," and Cloudflare's incident and subsequent system rebuilding provided an ideal stage. If ClickHouse could handle thousands of global PoPs and tens of thousands of machines generating real-time event streams, it would essentially complete an epic-scale pressure test before the entire industry.

### Mutual Achievement

Cloudflare's adoption also influenced ClickHouse's product roadmap. To support Cloudflare's "global distributed writes + millisecond-level aggregation" model, the ClickHouse team began strengthening distributed replication consistency, improving MergeTree merge strategies, and optimizing ingestion pipeline latency. Many today's well-known high-performance features emerged under this enormous production pressure.

In other words, Cloudflare's incident not only modernized their own architecture but also accelerated ClickHouse's technical evolution, transforming it from an "enthusiast-grade database" into a genuine "internet infrastructure core component."

## Epilogue: A Story of Mutual Growth

Cloudflare and ClickHouse formed an almost "mutual growth" relationship. On one side stands an edge network giant that underwent global-scale incident and transformed toward extreme observability systems; on the other side, a novel database company emerging from Yandex and rapidly ascending through extreme engineering culture. After the incident, these two converged and jointly constructed a real-time analytical system capable of withstanding super-scale traffic.

Cloudflare's incident-derived resilience, coupled with ClickHouse's technical obsession and courage, unexpectedly became two sides of the same technical narrative, complementing each other and collectively constituting the industry's today remarkably fast global log analytical capabilities.

## Final Thoughts

After experiencing incidents, rebuilding systems, and re-understanding observability, Cloudflare and ClickHouse's story ultimately converges on a humble yet crucial conclusion: what truly sustains the internet isn't perfect systems, but rather engineers willing to dig deep into foundations, rewrite critical paths, and rebuild complex worlds after collapse.

Technology is never decoration but rather infrastructure company's lifeline; systems capable of withstanding global-scale impacts typically emerge from countless failures and iterations, refined bit by bit.

Looking back at today's outage incidents, we see modern internet's collective maturation under extreme uncertainty: How do we collect, transmit, and process data? The internet constantly evolves, and as long as foundational infrastructure continues receiving serious, steadfast rewriting, it can keep moving forward. These invisible engineering efforts represent the reason the entire networked world remains sustained.

---

## References

- [Cloudflare Official Incident Report](https://blog.cloudflare.com/18-november-2025-outage/)
- [ClickHouse - Wikipedia](https://en.wikipedia.org/wiki/ClickHouse)
- [Cloudflare - Wikipedia](https://en.wikipedia.org/wiki/Cloudflare)
