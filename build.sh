#!/bin/bash
# Cloudflare Pages build script

# Install dependencies
npm install --legacy-peer-deps

# Build the project
npm run build
