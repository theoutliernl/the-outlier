#!/bin/bash
set -e
cd /workspace/outlier-site
git checkout main && git pull --ff-only origin main
git checkout -b feat/lottie-accent
