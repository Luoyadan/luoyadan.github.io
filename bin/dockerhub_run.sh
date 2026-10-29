#!/usr/bin/env bash
set -euo pipefail
# Keep the old entry point, but build our locked dependencies locally.
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
bash "$repo_root/bin/docker_build_image.sh"
exec bash "$repo_root/bin/docker_run.sh"
