#!/usr/bin/env bash

set -euo pipefail

SCRIPT_NAME="$(basename "$0")"

usage() {
  cat <<'EOF'
Usage:
  scripts/skillseeker-ultimate.sh [options] <source> [-- extra skill-seekers create args]

Purpose:
  Generate a thorough skill with Skill Seekers via uvx, then run a direct
  OpenCode or Codex cleanup pass pinned to GPT-5.4 for a thorough but still
  token-efficient result. Stage the generated skill under ./output, then
  prune generated junk and move the finished skill into the repo root.

Defaults:
  source:       required
  agent:        auto-detect (prefers opencode, then codex)
  model:        gpt-5.4
  output root:  ./output (staging)
  preset:       comprehensive
  enhancement:  disabled during create; cleanup happens in agent pass

Options:
  --agent AGENT          Cleanup agent: opencode, codex, or auto
  --model MODEL          Cleanup model (default: gpt-5.4)
  --name NAME            Skill/output name override
  --output-root DIR      Staging output directory (default: ./output)
  --doc-version VERSION  Optional Skill Seekers doc version tag
  --max-pages N          Max pages for web scraping sources
  --workers N            Parallel workers for web scraping (default: 6)
  --rate-limit SECONDS   Web scrape rate limit (default: 0.2)
  --chunk-tokens N       RAG chunk size (default: 700)
  --chunk-overlap N      RAG chunk overlap (default: 80)
  --browser              Enable browser rendering for web sources
  --skip-cleanup         Only run Skill Seekers generation
  --skip-quality         Skip post-run quality report
  --help, -h             Show this help text

Examples:
  scripts/skillseeker-ultimate.sh ./skill-seeker-docs --agent opencode
  scripts/skillseeker-ultimate.sh https://docs.example.com --browser --max-pages 400
  scripts/skillseeker-ultimate.sh ./skill-seeker-docs -- --skip-how-to-guides
EOF
}

die() {
  printf 'Error: %s\n' "$*" >&2
  exit 1
}

note() {
  printf '\n[%s] %s\n' "$SCRIPT_NAME" "$*" >&2
}

print_cmd() {
  printf '+ ' >&2
  printf '%q ' "$@" >&2
  printf '\n' >&2
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

slugify() {
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's#https?://##; s#[^a-z0-9]+#-#g; s#(^-+|-+$)##g; s#-+#-#g'
}

derive_name() {
  local input="$1"
  local base=""

  case "$input" in
    http://*|https://*)
      base="${input#*://}"
      base="${base%%\?*}"
      base="${base%%\#*}"
      ;;
    */*)
      base="${input%/}"
      base="${base##*/}"
      ;;
    *)
      base="$input"
      ;;
  esac

  base="${base%.*}"
  slugify "$base"
}

detect_agent() {
  if command -v opencode >/dev/null 2>&1; then
    printf 'opencode'
    return 0
  fi

  if command -v codex >/dev/null 2>&1; then
    printf 'codex'
    return 0
  fi

  return 1
}

resolve_output_dir() {
  local requested_dir="$1"
  local skill_name="$2"
  local candidate=""

  for candidate in "$requested_dir" "./output/$skill_name" "output/$skill_name"; do
    if [[ -f "$candidate/SKILL.md" ]]; then
      printf '%s' "$candidate"
      return 0
    fi
  done

  return 1
}

prune_generated_artifacts() {
  local skill_dir="$1"

  rm -f "$skill_dir/quality_report.json" "$skill_dir/code_analysis.json"
  find "$skill_dir" -type f \( -name '.DS_Store' -o -name 'Thumbs.db' \) -delete
  find "$skill_dir" -depth -type d -empty -delete
}

move_finished_skill() {
  local staged_dir="$1"
  local final_dir="$2"
  local staged_parent="${staged_dir%/*}"
  local final_parent="${final_dir%/*}"

  if [[ "$staged_dir" == "$final_dir" ]]; then
    return 0
  fi

  [[ ! -e "$final_dir" ]] || die "Final skill directory already exists: $final_dir"

  mkdir -p "$final_parent"
  mv "$staged_dir" "$final_dir"

  if [[ -d "$staged_parent" ]]; then
    find "$staged_parent" -depth -type d -empty -delete
  fi
}

frontmatter_value() {
  local skill_file="$1"
  local key="$2"

  awk -v key="$key" '
    NR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter && $0 == "---" { exit }
    in_frontmatter && index($0, key ":") == 1 {
      print substr($0, length(key) + 3)
      exit
    }
  ' "$skill_file"
}

default_source_metadata() {
  local input="$1"

  if [[ "$input" =~ ^https?:// ]]; then
    printf '%s' "$input"
  else
    printf 'local'
  fi
}

ensure_required_frontmatter() {
  local skill_file="$1"
  local skill_name="$2"
  local source_input="$3"
  local tmp_dir body_file extra_file description version source_value license_value

  tmp_dir="$(mktemp -d)"
  body_file="$tmp_dir/body.md"
  extra_file="$tmp_dir/frontmatter-extra.txt"

  awk '
    NR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter && $0 == "---" { in_frontmatter = 0; next }
    !in_frontmatter { print }
  ' "$skill_file" > "$body_file"

  awk '
    NR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter && $0 == "---" { exit }
    in_frontmatter && $0 !~ /^(name|description|version|source|license):/ { print }
  ' "$skill_file" > "$extra_file"

  description="$(frontmatter_value "$skill_file" description)"
  version="$(frontmatter_value "$skill_file" version)"
  source_value="$(frontmatter_value "$skill_file" source)"
  license_value="$(frontmatter_value "$skill_file" license)"

  [[ -n "$description" ]] || description="Use this skill when working with $skill_name."
  [[ -n "$version" ]] || version="1.0.0"
  [[ -n "$source_value" ]] || source_value="$(default_source_metadata "$source_input")"
  [[ -n "$license_value" ]] || license_value="MIT"

  {
    printf '%s\n' '---'
    printf 'name: %s\n' "$skill_name"
    printf 'description: %s\n' "$description"
    printf 'version: %s\n' "$version"
    printf 'source: %s\n' "$source_value"
    printf 'license: %s\n' "$license_value"
    if [[ -s "$extra_file" ]]; then
      cat "$extra_file"
    fi
    printf '%s\n' '---'
    cat "$body_file"
  } > "$skill_file"

  rm -rf "$tmp_dir"
}

write_cleanup_prompt() {
  local prompt_file="$1"
  local skill_dir="$2"
  local skill_name="$3"
  local source_metadata="$4"

  cat >"$prompt_file" <<EOF
Clean up the generated Skill Seekers output in this directory.

Working directory: $skill_dir
Skill name: $skill_name
Frontmatter source value: $source_metadata

Goals:
1. Make SKILL.md high-signal, trigger-oriented, and concise without stripping away useful coverage.
2. Preserve thorough retrieval coverage in references/*.md for the major topics the extracted docs support.
3. Preserve correctness using only facts already present in this directory.
4. Remove duplication, filler, vague wording, and repeated examples.
5. Move excess detail into references/*.md when that improves retrieval.
6. Keep or create compact coverage docs such as getting-started, core-patterns, api-reference, testing-debugging, integrations-plugins, and upgrades when the extracted docs support those topics.
7. Keep as many useful reference files as the extracted docs justify; only merge files that are truly redundant.
8. Ensure SKILL.md frontmatter includes name, description, version, source, and license.

Required constraints:
- Edit only files inside this directory.
- Do not use network access.
- Do not run git.
- Do not invent commands, flags, APIs, versions, or capabilities not supported by the extracted docs.
- Preserve correct frontmatter if present, but add any missing required keys.
- Keep trigger language explicit, especially "Use this skill when...".
- Prefer bullets, short sections, and short code examples with clear payoff.
- If SKILL.md is long, shorten it and point to references instead of duplicating detail.
- Do not collapse distinct topics just to minimize file count if separate files improve retrieval.
- Keep a compact getting-started guide and a compact API or core-patterns reference when the extracted docs support them.
- Keep plugin, integration, testing, debugging, migration, or upgrade references when the extracted docs support them.
- Set frontmatter values as follows unless the generated files already contain a more accurate value:
  - name: $skill_name
  - version: 1.0.0
  - source: $source_metadata
  - license: MIT

Definition of done:
- SKILL.md is concise and easy for an agent to retrieve.
- Important user intents are obvious.
- Redundant prose is removed.
- SKILL.md frontmatter includes name, description, version, source, and license.
- Reference docs hold the deeper detail.
- Coverage includes getting-started plus API/core-patterns, and also testing, integrations/plugins, and upgrades when supported by the extracted docs.
- The result is better organized than the generated draft without becoming needlessly verbose.
EOF
}

SOURCE=""
AGENT="auto"
MODEL="gpt-5.4"
NAME=""
OUTPUT_ROOT="./output"
DOC_VERSION=""
MAX_PAGES=""
WORKERS="6"
RATE_LIMIT="0.2"
CHUNK_TOKENS="700"
CHUNK_OVERLAP="80"
BROWSER=0
SKIP_CLEANUP=0
SKIP_QUALITY=0
EXTRA_CREATE_ARGS=()
POSITIONAL_SOURCE_SET=0

while (($#)); do
  case "$1" in
    --agent)
      [[ $# -ge 2 ]] || die "--agent requires a value"
      AGENT="$2"
      shift 2
      ;;
    --model)
      [[ $# -ge 2 ]] || die "--model requires a value"
      MODEL="$2"
      shift 2
      ;;
    --name)
      [[ $# -ge 2 ]] || die "--name requires a value"
      NAME="$2"
      shift 2
      ;;
    --output-root)
      [[ $# -ge 2 ]] || die "--output-root requires a value"
      OUTPUT_ROOT="$2"
      shift 2
      ;;
    --doc-version)
      [[ $# -ge 2 ]] || die "--doc-version requires a value"
      DOC_VERSION="$2"
      shift 2
      ;;
    --max-pages)
      [[ $# -ge 2 ]] || die "--max-pages requires a value"
      MAX_PAGES="$2"
      shift 2
      ;;
    --workers)
      [[ $# -ge 2 ]] || die "--workers requires a value"
      WORKERS="$2"
      shift 2
      ;;
    --rate-limit)
      [[ $# -ge 2 ]] || die "--rate-limit requires a value"
      RATE_LIMIT="$2"
      shift 2
      ;;
    --chunk-tokens)
      [[ $# -ge 2 ]] || die "--chunk-tokens requires a value"
      CHUNK_TOKENS="$2"
      shift 2
      ;;
    --chunk-overlap)
      [[ $# -ge 2 ]] || die "--chunk-overlap requires a value"
      CHUNK_OVERLAP="$2"
      shift 2
      ;;
    --browser)
      BROWSER=1
      shift
      ;;
    --skip-cleanup)
      SKIP_CLEANUP=1
      shift
      ;;
    --skip-quality)
      SKIP_QUALITY=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      EXTRA_CREATE_ARGS+=("$@")
      break
      ;;
    -*)
      die "Unknown option: $1"
      ;;
    *)
      if [[ "$POSITIONAL_SOURCE_SET" -eq 0 ]]; then
        SOURCE="$1"
        POSITIONAL_SOURCE_SET=1
        shift
      else
        EXTRA_CREATE_ARGS+=("$1")
        shift
      fi
      ;;
  esac
done

require_cmd uvx

[[ -n "$SOURCE" ]] || die "Missing source. Pass a local path or docs URL."

if [[ -z "$NAME" ]]; then
  NAME="$(derive_name "$SOURCE")"
fi

[[ -n "$NAME" ]] || die "Could not derive a skill name; pass --name explicitly"

SOURCE_METADATA="$(default_source_metadata "$SOURCE")"

FINAL_DIR="./$NAME"
[[ ! -e "$FINAL_DIR" ]] || die "Final skill directory already exists: $FINAL_DIR"

mkdir -p "$OUTPUT_ROOT"
OUTPUT_DIR="${OUTPUT_ROOT%/}/$NAME"

CREATE_CMD=(
  uvx --from skill-seekers skill-seekers create "$SOURCE"
  --name "$NAME"
  --output "$OUTPUT_DIR"
  --preset comprehensive
  --enhance-level 0
  --chunk-for-rag
  --chunk-tokens "$CHUNK_TOKENS"
  --chunk-overlap-tokens "$CHUNK_OVERLAP"
)

if [[ -n "$DOC_VERSION" ]]; then
  CREATE_CMD+=(--doc-version "$DOC_VERSION")
fi

if [[ "$SOURCE" =~ ^https?:// ]]; then
  CREATE_CMD+=(--async --workers "$WORKERS" --rate-limit "$RATE_LIMIT")
  if [[ -n "$MAX_PAGES" ]]; then
    CREATE_CMD+=(--max-pages "$MAX_PAGES")
  fi
  if [[ "$BROWSER" -eq 1 ]]; then
    CREATE_CMD+=(--browser)
  fi
fi

if ((${#EXTRA_CREATE_ARGS[@]})); then
  CREATE_CMD+=("${EXTRA_CREATE_ARGS[@]}")
fi

note "Generating skill into $OUTPUT_DIR"
print_cmd "${CREATE_CMD[@]}"
"${CREATE_CMD[@]}"

ACTUAL_OUTPUT_DIR="$(resolve_output_dir "$OUTPUT_DIR" "$NAME")" \
  || die "Skill Seekers finished but output directory was not found: $OUTPUT_DIR"

if [[ "$ACTUAL_OUTPUT_DIR" != "$OUTPUT_DIR" ]]; then
  note "Skill Seekers wrote to $ACTUAL_OUTPUT_DIR instead of requested $OUTPUT_DIR"
  OUTPUT_DIR="$ACTUAL_OUTPUT_DIR"
fi

SKILL_FILE="$OUTPUT_DIR/SKILL.md"
if [[ ! -f "$SKILL_FILE" ]]; then
  die "Expected generated SKILL.md at $SKILL_FILE"
fi

BEFORE_LINES="$(wc -l < "$SKILL_FILE" | tr -d ' ')"
BEFORE_BYTES="$(wc -c < "$SKILL_FILE" | tr -d ' ')"

if [[ "$SKIP_CLEANUP" -eq 0 ]]; then
  if [[ "$AGENT" == "auto" ]]; then
    AGENT="$(detect_agent)" || die "No cleanup agent found. Install opencode or codex, or use --skip-cleanup"
  fi

  case "$AGENT" in
    opencode|codex) ;;
    *) die "Unsupported agent: $AGENT (expected: auto, opencode, codex)" ;;
  esac

  require_cmd "$AGENT"

  TMP_DIR="$(mktemp -d)"
  trap 'rm -rf "$TMP_DIR"' EXIT
  PROMPT_FILE="$TMP_DIR/cleanup-prompt.txt"
  write_cleanup_prompt "$PROMPT_FILE" "$OUTPUT_DIR" "$NAME" "$SOURCE_METADATA"

  note "Running cleanup pass with $AGENT on model $MODEL"

  if [[ "$AGENT" == "opencode" ]]; then
    OPENCODE_MODEL="$MODEL"
    if [[ "$OPENCODE_MODEL" != */* ]]; then
      OPENCODE_MODEL="openai/$OPENCODE_MODEL"
    fi

    CLEANUP_CMD=(
      opencode run
      --dir "$OUTPUT_DIR"
      --model "$OPENCODE_MODEL"
      --dangerously-skip-permissions
      --file "$PROMPT_FILE"
      --
      "Use the attached file as the task instructions. Edit only files in the current directory and stop when the skill is concise, correct, repo-ready, and thorough enough to preserve coverage."
    )
    print_cmd "${CLEANUP_CMD[@]}"
    "${CLEANUP_CMD[@]}"
  else
    CLEANUP_CMD=(
      codex exec
      --cd "$OUTPUT_DIR"
      --model "$MODEL"
      --full-auto
      --skip-git-repo-check
      --color never
    )
    print_cmd "${CLEANUP_CMD[@]}" "<" "$PROMPT_FILE"
    "${CLEANUP_CMD[@]}" < "$PROMPT_FILE"
  fi
fi

ensure_required_frontmatter "$SKILL_FILE" "$NAME" "$SOURCE"

AFTER_LINES="$(wc -l < "$SKILL_FILE" | tr -d ' ')"
AFTER_BYTES="$(wc -c < "$SKILL_FILE" | tr -d ' ')"

note "SKILL.md lines: $BEFORE_LINES -> $AFTER_LINES"
note "SKILL.md bytes: $BEFORE_BYTES -> $AFTER_BYTES"

if [[ "$SKIP_QUALITY" -eq 0 ]]; then
  QUALITY_CMD=(uvx --from skill-seekers skill-seekers quality "$OUTPUT_DIR" --report)
  note "Running Skill Seekers quality report"
  print_cmd "${QUALITY_CMD[@]}"
  "${QUALITY_CMD[@]}"
fi

note "Pruning generated artifacts"
prune_generated_artifacts "$OUTPUT_DIR"

note "Moving finished skill into repo: $FINAL_DIR"
move_finished_skill "$OUTPUT_DIR" "$FINAL_DIR"

note "Done. Generated skill: $FINAL_DIR"
