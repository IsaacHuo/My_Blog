#!/bin/bash
# Cloudflare Pages build script

# Remove node_modules and package-lock.json to fix rollup optional dependency issue
rm -rf node_modules package-lock.json

# Install dependencies
npm install

# Build the project
npm run build
