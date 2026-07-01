---
title: "MyLeafy: General-Purpose Campus iOS App"
date: 2026-07-01
author: Isaac Huo
description: "A general-purpose campus iOS app whose first supported campus is Beijing Forestry University, centered on timetables, academic data, community features, course evaluation, and student tools."
editLink: true
outline: [2, 3]
---

# MyLeafy: General-Purpose Campus iOS App

MyLeafy is a general-purpose campus iOS app I built for student-facing academic and campus workflows. The internal code name, target, and some type names still use `Leafy`, but the public product name has been updated to MyLeafy. The first supported campus is Beijing Forestry University, where the academic connector talks directly to the university's Zhengfang academic system.

<div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: flex-start;">
  <img src="/project-images/myleafy/calendar.jpg" alt="MyLeafy timetable showcase" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/grade.jpg" alt="MyLeafy grades showcase" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/xuefen.jpg" alt="MyLeafy credit tracking showcase" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/zongsu.jpg" alt="MyLeafy comprehensive evaluation showcase" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/sharecal.jpg" alt="MyLeafy shared timetable showcase" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/community.jpg" alt="MyLeafy community showcase" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
  <img src="/project-images/myleafy/color.jpg" alt="MyLeafy theme color showcase" width="220" loading="lazy" style="max-width: 100%; border-radius: 16px;">
</div>

## Product Scope

The goal of MyLeafy is to reorganize high-frequency campus information into a better mobile experience. The timetable is the main entry point, with grades, exams, teaching plans, empty classrooms, calendars, community features, notifications, feedback, and course evaluation available from there.

The system boundary is intentionally clear: the student ID and the school's academic system remain the source of academic identity and academic data, while Supabase handles non-academic services such as profiles, posts, comments, likes, notifications, announcements, feedback, teacher ratings, and shared timetable snapshots.

## Implemented Features

The app is organized around three root tabs:

- **Timetable**: weekly view, week switching, course detail sheets, today's summary, single-day timetable sharing, and weather information.
- **Discover**: grades, exams, teaching plans, empty classrooms, calendar, community, notifications, and course evaluation.
- **Profile**: community profile, personal content, favorites, shared timetables, theme settings, feedback, and logout.

The academic-service side supports student ID/password/captcha login, explicit cookie session management, timetable/grade/exam/teaching-plan scraping and parsing, and SwiftData caching. The timetable flow also keeps a WKWebView fallback to handle academic-system redirects and page-structure changes.

The community side is built on Supabase, with anonymous sessions bound to student IDs, profile persistence, text/image posts, comments, likes, notifications, announcements, feedback, teacher lists, star ratings, and one-way shared timetable authorization.

## Technical Implementation

MyLeafy is built with SwiftUI and targets iOS 17. Local persistence uses SwiftData. School network requests use URLSession and HTTPCookieStorage, while HTML parsing is handled by SwiftSoup. Non-academic services are backed by Supabase Auth, Database, Storage, and Edge Functions.

The project also includes a React + Vite + TypeScript admin console for community metrics, posts, comments, users, feedback, announcements, teachers, and rating management. High-privilege operations go through Supabase Edge Functions instead of exposing management privileges directly to the frontend.

## What I Learned

MyLeafy forced me to handle the messy parts of real campus systems: captcha login, cookie sessions, changing HTML structures, mobile caching, readable parse-failure states, community data permissions, and admin boundaries. It also moved me from implementing isolated features toward owning a fuller product path: data source, client experience, backend permissions, operations console, and TestFlight readiness.

## Links

- **GitHub Repository**: [IsaacHuo/leafy](https://github.com/IsaacHuo/leafy)
