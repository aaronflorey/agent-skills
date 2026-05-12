#!/usr/bin/env bash
set -euo pipefail

if ! command -v curl >/dev/null 2>&1; then
  echo "error: curl is required" >&2
  exit 1
fi

if [ "$#" -lt 1 ]; then
  echo "usage: $0 \"task description\" [limit] [threshold]" >&2
  exit 1
fi

task="$1"
limit="${2:-10}"
threshold="${3:-0.3}"
base_url="https://skillshub.wtf/api/v1/skills/resolve"

if command -v jq >/dev/null 2>&1; then
  curl -fsS -G "$base_url" \
    --data-urlencode "task=$task" \
    --data-urlencode "limit=$limit" \
    --data-urlencode "threshold=$threshold" \
    | jq '{task: $task, limit: $limit, threshold: $threshold, total, matched, ambiguity, noMatchReason, noMatchDetail, data: [.data[] | {name, slug, ownerName, repoName, confidence, fetchUrl, githubUrl}]}' \
      --arg task "$task" \
      --argjson limit "$limit" \
      --argjson threshold "$threshold"
else
  curl -fsS -G "$base_url" \
    --data-urlencode "task=$task" \
    --data-urlencode "limit=$limit" \
    --data-urlencode "threshold=$threshold"
fi