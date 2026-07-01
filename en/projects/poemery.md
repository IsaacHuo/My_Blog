---
title: "Poemery: Offline Poetry Reader for iOS"
date: 2026-06-28
author: Isaac Huo
description: "A native iOS poetry reader built with SwiftUI, a local poetry library, and an Apple Music-inspired information architecture for offline reading."
editLink: true
outline: [2, 3]
---

# Poemery: Offline Poetry Reader for iOS

Poemery is a native iOS app I built for reading classical Chinese poetry. It turns Tang poems, Song ci, Yuan qu, and early Chinese classics into a local library that can be browsed, searched, collected, and resumed without relying on a server.

## Product Scope

The goal of Poemery is to provide a lightweight, offline, reading-first poetry app. It does not require accounts, subscriptions, or cloud sync. The core corpus ships inside the app bundle, while favorites and recent reading history stay on the device.

The interface borrows the information architecture of Apple Music: home recommendations, curated collections, a library, a dedicated search entry, and a current-reading accessory. The content model is poetry-native rather than music-native, with poems, poem collections, authors, and a local reading profile.

## Content and Data

The current corpus is imported from the open-source `chinese-poetry/chinese-poetry` dataset and pinned to a fixed upstream commit for reproducibility. The app bundles around 12000 poetry items, 26 collections, and 13 browse categories, covering Tang poems, Song ci, Yuan qu, The Analects, The Book of Songs, and other classical sources.

The import script cleans titles, authors, and text lines, generates stable poem IDs, attaches tags and source links, creates local artwork styles, and validates IDs, collection references, and category coverage before the app ships.

## Technical Implementation

Poemery is built with SwiftUI and supports iOS 17 and later. On iOS 26 it uses native Liquid Glass, bottom accessories, and system search-tab behavior where available. Older systems fall back to `TabView`, `safeAreaInset`, and material surfaces.

The data layer is driven by a bundled JSON seed loaded into `PoemLibraryStore`, which provides poem lookup, collections, author aggregation, and full-text search. Favorites and recent reading are stored in `UserDefaults` as poem IDs and resolved back into the local library at display time.

## What I Learned

This project helped me treat a content app as a full product system: import pipeline, offline content modeling, search, reading state, system navigation, and visual adaptation across iOS versions. The main challenge was not only showing text, but making classical content readable, searchable, and easy to resume in a modern iOS experience.

## Links

- **GitHub Repository**: [IsaacHuo/poem](https://github.com/IsaacHuo/poem)
