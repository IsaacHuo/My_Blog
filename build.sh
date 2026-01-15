#!/bin/bash
# Cloudflare Pages build script

# Cloudflare Pages automatically installs dependencies before running this script
# So we don't need to manually verify or reinstall them.

# Build the project
npm run build

