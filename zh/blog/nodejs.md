---
title: 什么是 Node.js？从原理到应用
date: 2026-01-29
author: 霍玮放
description: nodejs, runtime, performance
---


# 什么是 Node.js？从原理到应用

Node.js 是一个基于 **Chrome V8 engine** 的 JavaScript 运行时环境。它让 JavaScript 能够脱离浏览器，在服务器端运行。但这仅仅是官方定义，Node.js 真正强大的地方在于它的**架构设计**。

## 1. 核心特性

### 异步非阻塞 I/O (Asynchronous Non-blocking I/O)
在传统的服务器（如早期的 PHP 或 Java）中，每个请求通常会占用一个线程。如果代码需要读取文件或查询数据库，线程会“阻塞”在那里等待结果，这回导致高并发时内存和 CPU 资源的巨大浪费。

Node.js 采用了不同的策略：当遇到 I/O 操作时，它不会等待，而是直接发起请求然后继续执行后面的代码。当 I/O 操作完成后，通过**回调函数**（Callback）通知主线程处理结果。

### 事件驱动 (Event-driven)
Node.js 的核心是**事件循环 (Event Loop)**。这就像一个无限循环的调度器，不停地检查有没有待处理的事件（比如网络请求到达、文件读取完毕）。

### 单线程 (Single Threaded)
Node.js 主线程是单线程的。这意味着它不需要像多线程语言那样处理复杂的线程同步和锁的问题，减少了上下文切换的开销。
*   **优点**：适合 I/O 密集型应用（Web 服务器、实时聊天、API 中间层）。
*   **缺点**：不适合 CPU 密集型任务（视频编码、复杂数学计算），因为繁重的计算会阻塞主线程，导致无法响应其他请求。

## 2. 架构组成

1.  **V8 引擎**：Google 开发的高性能 JS 引擎，负责解析和执行 JavaScript 代码。
2.  **libuv**：一个跨平台的异步 I/O 库。它是 Node.js 实现事件循环和非阻塞 I/O 的核心，底层在 Windows 上使用 IOCP，在 Linux 上使用 epoll。
3.  **Built-in Modules**：内置模块，如 `http`, `fs`, `path`, `net` 等，提供了构建服务器所需的基础设施。

## 3. Node.js 能做什么？

*   **RESTful API / GraphQL 服务器**：构建高性能的后端服务。
*   **实时应用**：如聊天室（Socket.io）、即时协作工具。
*   **BFF (Backend For Frontend)**：作为前端和微服务之间的聚合层。
*   **命令行工具 (CLI)**：前端工程化工具（Webpack, Vite, Babel）几乎全也是基于 Node.js 的。
*   **Electron 桌面应用**：VS Code, Slack 等应用底层都集成了 Node.js。

## 总结

Node.js 不是一门新语言，也不是一个框架，它是让 JavaScript 拥有了服务端能力的运行环境。它的出现打破了前后端的界限，推动了“大前端”时代的到来。

## 参考资料

- [Node.js 官方文档](https://nodejs.org/docs/latest/api/)

