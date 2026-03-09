# Amber By Example

## Backup Rotator

A script that creates timestamped backups with rotation (deletes old backups).

```ab
#!/usr/bin/env amber

import { dir_create, dir_exists, file_exists } from "std/fs"
import { split } from "std/text"
import { date_now, date_format_posix, date_sub } from "std/date"

fun create_backup(source: Text, backup_dir: Text): Null? {
    if not file_exists(source) {
        echo "Source '{source}' does not exist"
        fail 1
    }

    if not dir_exists(backup_dir) {
        dir_create(backup_dir)?
    }

    let now = date_now()
    let timestamp = date_format_posix(now, "%Y%m%d_%H%M%S")?
    let parts = split(source, "/")
    let filename = parts[len(parts) - 1]
    let backup_path = "{backup_dir}/{filename}.{timestamp}.bak"

    sudo $ cp -r "{source}" "{backup_path}" $?

    echo "Backup created: {backup_path}"
}

fun cleanup_old_backups(backup_dir: Text, days: Int): Null? {
    let cutoff = date_sub(date_now(), days, "days")?
    trust $ find "{backup_dir}" -name "*.bak" -mtime +{days} -delete $
    echo "Cleaned backups older than {days} days"
}

main (args) {
    if len(args) < 2 {
        echo "Usage: backup.ab <source> <backup_dir> [retention_days]"
        fail 1
    }

    let source = args[0]
    let backup_dir = args[1]
    let days = 30

    if len(args) >= 3 {
        // Use default retention if not specified
        days = args[2] as Int
    }

    create_backup(source, backup_dir)?
    cleanup_old_backups(backup_dir, days)?
}
```

## Bot Detector

Detects and blocks malicious bot IPs from access logs.

```ab
#!/usr/bin/env amber

import { split, text_contains } from "std/text"

fun get_suspicious_ips(log_path: Text, threshold: Int): [Text]? {
    if not file_exists(log_path) {
        fail 1
    }

    let result = $ cat {log_path} \
        | grep -i "bot\|crawler\|spider" \
        | awk '\{print $1\}' \
        | sort \
        | uniq -c \
        | sort -rn $?

    let suspicious = [Text]
    for line in lines(result) {
        let parts = split(trim(line), " ")
        if len(parts) >= 2 {
            let count = parts[0] as Int
            if count > threshold {
                suspicious += [parts[1]]
            }
        }
    }

    return suspicious
}

main (args) {
    let log_path = "/var/log/nginx/access.log"
    let threshold = 100

    let ips = get_suspicious_ips(log_path, threshold) failed {
        echo "Failed to analyze logs"
        fail 1
    }

    echo "Found {len(ips)} suspicious IPs"
    for ip in ips {
        echo "Blocking: {ip}"
        silent $ iptables -A INPUT -s {ip} -j DROP $?
    }
}
```

## ShellCheck Tester

Validates compiled Amber scripts with ShellCheck.

```ab
#!/usr/bin/env amber

import { file_read, file_write, file_append, file_glob } from "std/fs"

main (args) {
    let files = file_glob("*.ab") failed {
        echo "No .ab files found"
        fail 1
    }

    let report = "ShellCheck Report\n"
    let failures = 0

    for file in files {
        echo "Checking {file}..."

        // Compile to temp bash
        let bash_file = "{file}.sh"
        $ amber build {file} {bash_file} $ failed {
            report += "FAIL: {file} — compilation error\n"
            failures += 1
            continue
        }

        // Run shellcheck
        $ shellcheck {bash_file} $ exited(code) {
            if code != 0 {
                report += "WARN: {file} — shellcheck issues\n"
            } else {
                report += "PASS: {file}\n"
            }
        }

        // Cleanup
        trust $ rm -f {bash_file} $
    }

    file_write("report.txt", report)?
    echo report

    if failures > 0 {
        fail 1
    }
}
```

## Ubuntu Updater

System update script with logging and WiFi detection.

```ab
#!/usr/bin/env amber

import { date_now, date_format_posix } from "std/date"
import { file_append } from "std/fs"
import { env_var_set } from "std/env"

fun log(message: Text): Null? {
    let now = date_now()
    let timestamp = date_format_posix(now, "%F %T")?
    let entry = "[{timestamp}] {message}\n"
    echo entry
    file_append("/var/log/auto-update.log", entry)?
}

fun is_on_wifi(): Bool {
    let result = trust $ nmcli -t -f TYPE con show --active $
    return text_contains(result, "wifi")
}

main {
    if is_on_wifi() {
        log("Skipping update — on WiFi")?
        fail 0
    }

    log("Starting system update")?

    // Prevent interactive prompts
    env_var_set("DEBIAN_FRONTEND", "noninteractive")?

    sudo $ apt-get update -y $ failed {
        log("apt-get update failed")?
        fail 1
    }

    sudo $ apt-get upgrade -y $ failed {
        log("apt-get upgrade failed")?
        fail 1
    }

    log("Update completed successfully")?
}
```

## LSP Installer

Installs LSP tools from GitHub releases.

```ab
#!/usr/bin/env amber

import { file_download } from "std/http"
import { file_extract, file_chmod, symlink_create } from "std/fs"
import { is_root, is_command } from "std/env"

fun install_from_github(repo: Text, binary: Text): Null? {
    if not is_root() {
        echo "Must run as root"
        fail 1
    }

    // Get latest release URL
    let api_url = "https://api.github.com/repos/{repo}/releases/latest"
    let download_url = $ curl -s {api_url} | jq -r '.assets[] | select(.name | contains("linux")) | .browser_download_url' $?

    let tmp = "/tmp/{binary}"
    file_download(download_url, "{tmp}.tar.gz")?
    file_extract("{tmp}.tar.gz", "/tmp")?
    file_chmod(tmp, "755")?

    $ mv {tmp} /usr/local/bin/{binary} $?
    echo "Installed {binary}"
}

main {
    let tools = [
        "rust-lang/rust-analyzer",
        "astral-sh/ruff"
    ]
    let binaries = [
        "rust-analyzer",
        "ruff"
    ]

    for i, repo in tools {
        let binary = binaries[i]
        if is_command(binary) {
            echo "{binary} already installed, skipping"
            continue
        }
        install_from_github(repo, binary) failed {
            echo "Failed to install {binary}"
        }
    }
}
```
