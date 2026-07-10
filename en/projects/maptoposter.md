---
title: "MapToPoster: City Map Poster Generator"
date: 2025-01-20
author: Isaac Huo
description: "A customizable city map poster generator built with OpenStreetMap data."
editLink: true
outline: [2, 3]
---

# MapToPoster: City Map Poster Generator

MapToPoster is an open-source map visualization tool. It turns a city or address into a customizable poster using OpenStreetMap road-network data.

The project focuses on visual structure rather than navigation. Roads, water, and green space are retained while labels and interactive map elements are removed, producing static artwork suitable for display, print, or further editing.

![MapToPoster output](/project-images/maptoposter.png)

## Core capabilities

- City search and country, region, and city selection.
- More than 17 color presets.
- Adjustable 4–30 km radius, common aspect ratios, and map layers.
- High-resolution PNG and editable SVG export.
- Local administrative data to supplement search for Chinese cities.

## Technical implementation

The project is built in Python. `OSMnx` retrieves and processes OpenStreetMap road networks, Nominatim and local data resolve locations, and `Matplotlib` handles layer rendering, style control, and export.

The pipeline is: location resolution → geographic data retrieval → road classification and layer preparation → theme rendering → PNG / SVG export.

## Run locally

```bash
git clone https://github.com/IsaacHuo/maptoposter.git
cd maptoposter
uv sync
uv run python app.py
```

Open `http://localhost:7860` after launch.

## Links

- [GitHub repository](https://github.com/IsaacHuo/maptoposter)
- [Live demo](https://huggingface.co/spaces/isaachwf/MapToPoster)

This project continues the work of [originalankur/maptoposter](https://github.com/originalankur/maptoposter).
