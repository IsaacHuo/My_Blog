---
title: "PolyBot / Polymarket Predictor: Local Prediction Market Research System"
date: 2026-06-30
author: Isaac Huo
description: "A local-first Polymarket research and paper-trading system for 15-minute BTC/ETH markets, news signals, virtual portfolios, and safety-first rollout."
editLink: true
outline: [2, 3]
---

# PolyBot / Polymarket Predictor: Local Prediction Market Research System

PolyBot is a local-first Polymarket research and paper-trading system I built for a personal Mac. The current phase is intentionally paper / shadow first: the local dashboard is used to observe markets, strategies, virtual orders, and portfolio behavior without enabling live trading.

## Product Scope

The project is built around a research-first workflow: study the market, simulate decisions, inspect evidence, and only then consider any live rollout. It is not a production auto-trading bot. It is a local research and risk sandbox for BTC/ETH 15-minute markets, news signals, and strategy behavior.

Live trading is disabled by default. Starting the daemon from the dashboard forces `SHADOW` mode, and real CLOB trading is gated behind a later migration checklist, sustained paper/shadow validation, mock tests, and compliance review.

## Implemented Features

The current daemon runs several loops:

- News collection and LLM-based market research.
- DeepSeek forecast generation for the `llm_news_edge` strategy.
- BTC/ETH 15-minute market scanning and candidate-market display.
- Paper broker execution, virtual orders, virtual positions, and settlement state.
- Heartbeat, kill-switch, and live-safety plumbing.

The main strategy today is `reverse_15m_grid`: it scans Gamma 15-minute events, filters BTC/ETH up/down markets, reads outcome-token orderbooks, and places, simulates, expires, and settles paper-only limit orders inside virtual portfolios.

## Technical Implementation

PolyBot is built in Python with a Typer CLI, a FastAPI + Jinja2/HTMX local dashboard, a SQLite WAL database, macOS Keychain credential boundaries, market-data clients, a strategy registry, a paper broker, and risk-state management.

The dashboard binds to `127.0.0.1:8080` by default and exposes Start/Stop controls, a strategy matrix, portfolio comparison, candidate markets, virtual orders, positions, NO_TRADE / NO_FILL diagnostics, and recent logs. Data and logs stay under the local `data/` directory so runs can be inspected afterward.

## What I Learned

This project helped me separate a trading idea into observable engineering layers: market data, signals, strategy decisions, orders, risk controls, logs, and operator UI. Instead of optimizing for immediate live execution, PolyBot emphasizes replayability, pausing, safe defaults, and long paper-trading evidence.

## Links

- **GitHub Repository**: [IsaacHuo/polymarket-predictor](https://github.com/IsaacHuo/polymarket-predictor)
