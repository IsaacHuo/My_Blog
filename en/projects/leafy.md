---
title: "Leafy in BJFU: Native iOS Client for BJFU Academic Services"
date: 2026-05-15
author: Isaac Huo
description: "A native iOS campus client for Beijing Forestry University's Zhengfang academic system, centered on timetables, academic data, community features, and student tools."
editLink: true
outline: [2, 3]
---

# Leafy in BJFU: Native iOS Client for BJFU Academic Services

Leafy in BJFU is a native iOS campus client I built for students at Beijing Forestry University. Instead of mirroring the web academic system, it reorganizes the most frequently used campus workflows for mobile: the timetable is the first screen, while grades, exams, classroom availability, calendars, community features, and course evaluation live one or two taps away.

![Leafy in BJFU app icon](/project-images/leafy.png)

## Product Scope

The goal of Leafy in BJFU is to make campus information faster and more stable to access. School login, timetables, grades, exam schedules, teaching plans, graduation requirements, and empty classroom queries connect directly to the university's Zhengfang academic system. Community profiles, posts, comments, likes, notifications, announcements, feedback, evaluations, and shared timetable snapshots are handled by Supabase.

That boundary keeps the identity model clear: the student ID remains the primary identity, while Supabase handles non-academic services and user-generated data.

## Implemented Features

The app is organized around three root tabs:

- **Timetable**: weekly view, week switching, course detail sheets, today's summary, single-day timetable sharing, and weather information.
- **Discover**: grades, exams, teaching plans, empty classrooms, calendar, community, notifications, and course evaluation.
- **Profile**: community profile, personal content, favorites, shared timetables, theme settings, feedback, and logout.

The academic-service side supports student ID/password/captcha login, explicit cookie session management, timetable/grade/exam/teaching-plan scraping and parsing, and SwiftData caching. The timetable flow also keeps a WKWebView fallback to handle Zhengfang redirects and page-structure changes.

The community side is built on Supabase, with anonymous sessions bound to student IDs, profile persistence, text/image posts, comments, likes, notifications, announcements, feedback, teacher lists, star ratings, and one-way shared timetable authorization.

## Technical Implementation

Leafy in BJFU is built with SwiftUI and targets iOS 17. Local persistence uses SwiftData. School network requests use URLSession and HTTPCookieStorage, while HTML parsing is handled by SwiftSoup. Non-academic services are backed by Supabase Auth, Database, Storage, and Edge Functions.

The project also includes a React + Vite + TypeScript admin console for community metrics, posts, comments, users, feedback, announcements, teachers, and rating management. High-privilege operations go through Supabase Edge Functions instead of exposing management privileges directly to the frontend.

## What I Learned

Leafy in BJFU forced me to handle the messy parts of real campus systems: captcha login, cookie sessions, changing HTML structures, mobile caching, readable parse-failure states, community data permissions, and admin boundaries. It also moved me from implementing isolated features toward owning a fuller product path: data source, client experience, backend permissions, operations console, and TestFlight readiness.

## Links

- **GitHub Repository**: [IsaacHuo/leafy](https://github.com/IsaacHuo/leafy)
