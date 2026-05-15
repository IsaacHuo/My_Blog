---
title: "Agent-Firewall: Safety Shell for OpenClaw Agents"
date: 2026-05-15
author: Isaac Huo
description: "A local safety layer around an OpenClaw runtime, adding input scanning, tool gates, human approvals, and trace/audit evidence before AI Agent capabilities execute."
editLink: true
outline: [2, 3]
---

# Agent-Firewall: Safety Shell for OpenClaw Agents

Agent-Firewall is an AI Agent safety layer I built around a local OpenClaw runtime. It sits between message ingress adapters and OpenClaw/MCP/Internal tools, adding input scanning, runtime tool gates, human approvals, output filtering, and audit traces before capabilities are allowed to run.

![Agent-Firewall attack playground](/project-images/agent-firewall.png)

## Core Boundary

The core product is not the Telegram bot itself. Telegram is the currently implemented and verified message ingress adapter for real chat traffic. The actual safety boundary is the Agent-Firewall layer that controls the Agent execution path.

The protected path is:

```text
Message ingress adapter
  -> apps/agent protected runtime
  -> apps/proxy-service /v1/scan
  -> Agent runtime gates
  -> OpenClaw skill / MCP provider
  -> post-tool gate
  -> trace + audit log
  -> reply channel
```

If an input is blocked or a sensitive tool requires confirmation, the request pauses and creates an intervention. An operator can approve it from the local Approvals / Audit console; after approval, the runtime continues with `approved_intervention_id`.

## Verified Runtime Flow

The local setup has been exercised through an allowlisted Telegram bot with the following protected tool path:

```text
Telegram Bridge -> /agent/chat -> /v1/scan -> pre-tool gate
  -> OpenClaw provider -> post-tool gate -> Trace / Audit -> Telegram reply
```

Verified states include:

- A normal `openclaw_summarize` request passes scan, pre-tool gate, OpenClaw provider execution, post-tool gate, and returns to Telegram.
- A high-sensitivity tool creates a `tool_confirmation` intervention, pauses execution, and continues after approval.
- Tool output is scanned after execution; PII or secret-like content is redacted before the final reply and trace preview.
- Suspicious input creates an `input_block` intervention. Rejected blocks are not replayed and do not execute tools.

## Console and Services

The project is organized around three main services:

- `apps/proxy-service`: Agent Control Plane, `/v1/scan`, interventions, runtime specs, trace metadata, and audit logs.
- `apps/agent`: protected runtime, tool planning, pre-tool/post-tool gates, and OpenClaw provider calls.
- `apps/frontend`: local operator console with Attack Playground, Approvals / Audit, Bot Agents, Skills & Hooks, Trace / Audit, and Runtime Settings.

The default local persistence layer is SQLite at `~/.openclaw/agent-firewall.sqlite`. The default path does not require Docker, Redis, or Langfuse.

## Why It Matters

This project focuses on the control problem that appears when AI Agents start touching real tools: who authorizes tool calls, which tools require human confirmation, how input and output are scanned, and whether a run can be audited afterward. Compared with a plain model wrapper, Agent-Firewall acts more like an observable, pausable, replayable runtime safety control plane.

## Links

- **GitHub Repository**: [huoweifang2/agent-firewall](https://github.com/huoweifang2/agent-firewall)

