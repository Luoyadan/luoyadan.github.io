#!/usr/bin/env bash
set -euo pipefail
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
docker run --rm -v "$repo_root:/srv/jekyll/" -p "8080:8080" \
  -it luoyadan-site:local bundle exec jekyll serve --watch \
  --port=8080 --host=0.0.0.0 --verbose --livereload
