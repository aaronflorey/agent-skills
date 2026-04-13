# Qodo-Merge_Docs - Tools

**Pages:** 11

---

## Add Docs - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/add_docs/

**Contents:**
- Add Docs
- Overview¶
- Example usage¶
  - Language-specific documentation styles¶
- Configuration options¶
  - Example configuration¶
  - Command line options¶
- How it works¶

The add_docs tool scans the PR code changes and suggests documentation for any code components that are missing documentation, such as functions, classes, and methods.

It can be invoked manually by commenting on any PR:

Invoke the tool manually by commenting /add_docs on any PR:

The tool will generate documentation suggestions as inline code suggestions:

The tool automatically detects the programming language and generates documentation in the appropriate format:

Under the section [pr_add_docs], the following options are available:

To customize the documentation style, add the following to your configuration file:

You can pass configuration options directly in the command:

**Examples:**

Example 1 (lua):
```lua
[pr_add_docs]
docs_style = "Google Style with Args, Returns, Attributes...etc"
extra_instructions = "Focus on documenting public methods and include usage examples"
```

Example 2 (unknown):
```unknown
/add_docs --pr_add_docs.docs_style="Numpy Style"
```

---

## Describe - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/describe/

**Contents:**
- Describe
- Overview¶
- Example usage¶
  - Manual triggering¶
  - Automatic triggering¶
- Preserving the original user description¶
- Sequence Diagram Support¶
- Configuration options¶
- Markers template¶
- Custom labels¶

The describe tool scans the PR code changes, and generates a description for the PR - title, type, summary, walkthrough and labels.

The tool can be triggered automatically every time a new PR is opened, or it can be invoked manually by commenting on any PR:

Invoke the tool manually by commenting /describe on any PR:

After ~30 seconds, the tool will generate a description for the PR:

If you want to edit configurations, add the relevant ones to the command:

To run the describe automatically when a PR is opened, define in a configuration file:

By default, PR-Agent tries to preserve your original PR description by placing it above the generated content. This requires including your description during the initial PR creation.

"PR-Agent removed the original description from the PR. Why"?

From our experience, there are two possible reasons:

If you edit the description while the automated tool is running, a race condition may occur, potentially causing your original description to be lost. Hence, create a description before launching the PR.

When updating PR descriptions, the /describe tool considers everything above the "PR Type" field as user content and will preserve it. Everything below this marker is treated as previously auto-generated content and will be replaced.

The /describe tool includes a Mermaid sequence diagram showing component/function interactions.

This option is enabled by default via the pr_description.enable_pr_diagram param.

To enable markers, set pr_description.use_description_markers=true. Markers enable to easily integrate user's content and auto-generated content, with a template-like mechanism.

For example, if the PR original description was:

The marker pr_agent:type will be replaced with the PR type, pr_agent:summary will be replaced with the PR summary, pr_agent:walkthrough will be replaced with the PR walkthrough, and pr_agent:diagram will be replaced with the sequence diagram (if enabled).

Configuration params:

The default labels of the describe tool are quite generic, since they are meant to be used in any repo: [Bug fix, Tests, Enhancement, Documentation, Other].

You can define custom labels that are relevant for your repo and use cases. Custom labels can be defined in a configuration file, or directly in the repo's labels page.

Make sure to provide proper title, and a detailed and well-phrased description for each label, so the tool will know when to suggest it. Each label description should be a conditional statement, that indicates if to add the label to the PR or not, according to the PR content.

If the custom label is no longer relevant, it will be automatically removed from the PR by running the generate_labels tool or the describe tool.

Example for a custom labels configuration setup in a configuration file:

You can also control the custom labels that will be suggested by the describe tool from the repo's labels page:

Now add/edit the custom labels. they should be formatted as follows:

Examples for custom labels:

The description should be comprehensive and detailed, indicating when to add the desired label. For example:

the tool will replace every marker of the form pr_agent:marker_name in the PR description with the relevant content, where marker_name is one of the following: *type: the PR type. * summary: the PR summary. * walkthrough: the PR walkthrough.

**Examples:**

Example 1 (lua):
```lua
/describe --pr_description.some_config1=... --pr_description.some_config2=...
```

Example 2 (lua):
```lua
[github_app]
pr_commands = [
    "/describe",
    ...
]

[pr_description]
publish_labels = true
...
```

Example 3 (lua):
```lua
User content...

## PR Type:
pr_agent:type

## PR Description:
pr_agent:summary

## PR Walkthrough:
pr_agent:walkthrough

## PR Diagram:
pr_agent:diagram
```

Example 4 (lua):
```lua
[config]
enable_custom_labels=true


[custom_labels."sql_changes"]
description = "Use when a PR contains changes to SQL queries"

[custom_labels."test"]
description = "use when a PR primarily contains new tests"

...
```

---

## Ask - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/ask/

**Contents:**
- Ask
- Overview¶
- Example usage¶
- Ask lines¶
- Ask on images¶

The ask tool answers questions about the PR, based on the PR code changes. Make sure to be specific and clear in your questions. It can be invoked manually by commenting on any PR:

You can run /ask on specific lines of code in the PR from the PR's diff view. The tool will answer questions based on the code changes in the selected lines.

Note that the tool does not have "memory" of previous questions, and answers each question independently.

You can also ask questions about images that appear in the comment, where the entire PR code will be used as context. The basic syntax is:

where https://real_link_to_image is the direct link to the image.

Note that GitHub has a built-in mechanism of pasting images in comments. However, pasted image does not provide a direct link. To get a direct link to an image, we recommend using the following scheme:

1. First, post a comment that contains only the image:

2. Quote reply to that comment:

3. In the screen opened, type the question below the image:

4. Post the comment, and receive the answer:

See a full video tutorial here

**Examples:**

Example 1 (lua):
```lua
/ask "..."

[Image](https://real_link_to_image)
```

---

## Tools - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/

**Contents:**
- Tools¶

Here is a list of PR-Agent tools, each with a dedicated page that explains how to use it:

---

## Generate Labels - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/generate_labels/

**Contents:**
- Generate Labels
- Overview¶
- Example usage¶
- Configuration options¶
  - Enabling custom labels¶
  - Defining custom labels¶
  - How labels are applied¶
- Comparison with /describe labels¶
- Tips¶

The generate_labels tool scans the PR code changes and generates custom labels for the PR based on the content and context of the changes.

It can be invoked manually by commenting on any PR:

Invoke the tool manually by commenting /generate_labels on any PR:

The tool will analyze the PR and add appropriate labels:

The generate_labels tool uses configurations from the [pr_description] section for custom labels.

To use custom labels, you need to enable them in the configuration:

You can define your own custom labels in the [custom_labels] section. See the custom_labels.toml file for examples.

Example configuration:

The /describe tool also generates labels as part of its output. The key differences are:

**Examples:**

Example 1 (unknown):
```unknown
/generate_labels
```

Example 2 (json):
```json
[config]
enable_custom_labels = true
```

Example 3 (json):
```json
[custom_labels."Bug fix"]
description = "A fix for a bug in the codebase"

[custom_labels."Feature"]
description = "A new feature or enhancement"

[custom_labels."Documentation"]
description = "Documentation changes only"

[custom_labels."Tests"]
description = "Adding or modifying tests"

[custom_labels."Refactoring"]
description = "Code refactoring without functional changes"
```

---

## Help - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/help/

**Contents:**
- Help
- Overview¶
- Example usage¶

The help tool provides a list of all the available tools and their descriptions. For PR-Agent users, it also enables to trigger each tool by checking the relevant box.

It can be invoked manually by commenting on any PR:

Invoke the help tool by commenting on a PR with:

Response will include a list of available tools:

---

## Help Docs - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/help_docs/

**Contents:**
- Help Docs
- Overview¶
- Example usage¶
- Run automatically when a new issue is opened¶
- Configuration options¶

The help_docs tool can answer a free-text question based on a git documentation folder.

It can be invoked manually by commenting on any PR or Issue:

Or configured to be triggered automatically when a new issue is opened.

The tool assumes by default that the documentation is located in the root of the repository, at /docs folder. However, this can be customized by setting the docs_path configuration option:

See more configuration options in the Configuration options section.

Asking a question about another repository

You can configure PR-Agent to run help_docs automatically on any newly created issue. This can be useful, for example, for providing immediate feedback to users who open issues with questions on open-source projects with extensive documentation.

1) Follow the steps depicted under Run as a Github Action to create a new workflow, such as:.github/workflows/help_docs.yml:

2) Edit your yaml file to the following:

3) Following completion of the remaining steps (such as adding secrets and relevant configurations, such as repo_url and docs_path) merge this change to your main branch. When a new issue is opened, you should see a comment from github-actions bot with an auto response, assuming the question is related to the documentation of the repository.

Under the section pr_help_docs, the configuration file contains options to customize the 'help docs' tool:

**Examples:**

Example 1 (lua):
```lua
/help_docs "..."
```

Example 2 (elixir):
```elixir
[pr_help_docs]
repo_url = ""                 # The repository to use as context
docs_path = "docs"            # The documentation folder
repo_default_branch = "main"  # The branch to use in case repo_url overwritten
```

Example 3 (yaml):
```yaml
name: Run pr agent on every opened issue, respond to user comments on an issue

#When the action is triggered
on:
  issues:
    types: [opened] #New issue

# Read env. variables
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  GITHUB_API_URL: ${{ github.api_url }}
  GIT_REPO_URL: ${{ github.event.repository.clone_url }}
  ISSUE_URL: ${{ github.event.issue.html_url || github.event.comment.html_url }}
  ISSUE_BODY: ${{ github.event.issue.body || github.event.comment.body }}
  OPENAI_KEY: ${{ secrets.OPENAI_KEY }}

# The actual set of actions
jobs:
  issue_agent:
    runs-on: ubuntu-latest
    if: ${{ github.event.sender.type != 'Bot' }} #Do not respond to bots

    # Set required permissions
    permissions:
      contents: read    # For reading repository contents
      issues: write     # For commenting on issues

    steps:
      - name: Run PR Agent on Issues
        if: ${{ env.ISSUE_URL != '' }}
        uses: docker://codiumai/pr-agent:latest
        with:
          entrypoint: /bin/bash #Replace invoking cli.py directly with a shell
          args: |
            -c "cd /app && \
            echo 'Running Issue Agent action step on ISSUE_URL=$ISSUE_URL' && \
            export config__git_provider='github' && \
                        export github__user_token=$GITHUB_TOKEN && \
            export github__base_url=$GITHUB_API_URL && \
            export openai__key=$OPENAI_KEY && \
            python -m pr_agent.cli --issue_url=$ISSUE_URL --pr_help_docs.repo_url="..." --pr_help_docs.docs_path="..." --pr_help_docs.openai_key=$OPENAI_KEY && \
            help_docs "$ISSUE_BODY"
```

---

## Review - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/review/

**Contents:**
- Review
- Overview¶
- Example usage¶
  - Manual triggering¶
  - Automatic triggering¶
- Configuration options¶
- Usage Tips¶
  - General guidelines¶
  - Automation¶
  - Auto-generated PR labels by the Review Tool¶

The review tool scans the PR code changes, and generates feedback about the PR, aiming to aid the reviewing process. The tool can be triggered automatically every time a new PR is opened, or can be invoked manually by commenting on any PR:

Note that the main purpose of the review tool is to provide the PR reviewer with useful feedback and insights. The PR author, in contrast, may prefer to save time and focus on the output of the improve tool, which provides actionable code suggestions.

(Read more about the different personas in the PR process and how PR-Agent aims to assist them in our blog)

Invoke the tool manually by commenting /review on any PR:

After ~30 seconds, the tool will generate a review for the PR:

If you want to edit configurations, add the relevant ones to the command:

To run the review automatically when a PR is opened, define in a configuration file:

You can enable\disable the review tool to add specific labels to the PR:

The review tool provides a collection of configurable feedbacks about a PR. It is recommended to review the Configuration options section, and choose the relevant options for your use case.

Some of the features that are disabled by default are quite useful, and should be considered for enabling. For example: require_score_review, and more.

On the other hand, if you find one of the enabled features to be irrelevant for your use case, disable it. No default configuration can fit all use cases.

When you first install PR-Agent app, the default mode for the review tool is:

The review can tool automatically add labels to your Pull Requests:

You can configure a CI/CD Action to prevent merging PRs with specific labels. For example, implement a dedicated GitHub Action.

This approach helps ensure PRs with potential security issues or ticket compliance problems will not be merged without further review.

Since AI may make mistakes or lack complete context, use this feature judiciously. For flexibility, users with appropriate permissions can remove generated labels when necessary. When a label is removed, this action will be automatically documented in the PR discussion, clearly indicating it was a deliberate override by an authorized user to allow the merge.

Extra instructions are important. The review tool can be configured with extra instructions, which can be used to guide the model to a feedback tailored to the needs of your project.

Be specific, clear, and concise in the instructions. With extra instructions, you are the prompter. Specify the relevant sub-tool, and the relevant aspects of the PR that you want to emphasize.

Examples of extra instructions:

**Examples:**

Example 1 (lua):
```lua
/review --pr_reviewer.some_config1=... --pr_reviewer.some_config2=...
```

Example 2 (lua):
```lua
[github_app]
pr_commands = [
    "/review",
    ...
]

[pr_reviewer]
extra_instructions = "..."
...
```

Example 3 (lua):
```lua
pr_commands = ["/review", ...]
```

Example 4 (lua):
```lua
[pr_reviewer]
extra_instructions="""\
In the code feedback section, emphasize the following:
- Does the code logic cover relevant edge cases?
- Is the code logic clear and easy to understand?
- Is the code logic efficient?
...
"""
```

---

## Improve - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/improve/

**Contents:**
- Improve
- Overview¶
- How it looks¶
- Example usage¶
  - Manual triggering¶
  - Automatic triggering¶
  - Table vs Committable code comments¶
- Extra instructions and best practices¶
  - Extra instructions¶
  - Best practices¶

The improve tool scans the PR code changes, and automatically generates meaningful suggestions for improving the PR code. The tool can be triggered automatically every time a new PR is opened, or it can be invoked manually by commenting on any PR:

Invoke the tool manually by commenting /improve on any PR. The code suggestions by default are presented as a single comment:

To edit configurations related to the improve tool, use the following template:

For example, you can choose to present all the suggestions as committable code comments, by running the following command:

To run the improve automatically when a PR is opened, define in a configuration file:

PR-Agent supports two modes for presenting code suggestions:

2) Inline Committable code comments mode.

The table format offers several key advantages:

Table mode is the default of PR-Agent, and is recommended approach for most users due to these benefits.

Teams with specific preferences can enable committable code comments mode in their local configuration, or use dual publishing mode.

Note - due to platform limitations, Bitbucket cloud and server supports only committable code comments mode.

The improve tool can be further customized by providing additional instructions and best practices to the AI model.

You can use the extra_instructions configuration option to give the AI model additional instructions for the improve tool. Be specific, clear, and concise in the instructions. With extra instructions, you are the prompter.

Examples for possible instructions:

Use triple quotes to write multi-line instructions. Use bullet points or numbers to make the instructions more readable.

Platforms supported: GitHub, GitLab, Bitbucket

PR-Agent supports both simple and hierarchical best practices configurations to provide guidance to the AI model for generating relevant code suggestions.

The following guidelines apply to all best practices files:

Pattern 1: Add proper error handling with try-except blocks around external function calls.

Pattern 2: Add defensive null/empty checks before accessing object properties or performing operations on potentially null variables to prevent runtime errors.

For basic usage, create a best_practices.md file in your repository's root directory containing a list of best practices, coding standards, and guidelines specific to your repository.

The AI model will use this best_practices.md file as a reference, and in case the PR code violates any of the guidelines, it will create additional suggestions, with a dedicated label: Organization best practice.

The extra instructions configuration is more related to the improve tool prompt. It can be used, for example, to avoid specific suggestions ("Don't suggest to add try-except block", "Ignore changes in toml files", ...) or to emphasize specific aspects or formats ("Answer in Japanese", "Give only short suggestions", ...)

In contrast, the best_practices.md file is a general guideline for the way code should be written in the repo.

Using a combination of both can help the AI model to provide relevant and tailored suggestions.

Each generated suggestion consists of three key elements:

We advise users to apply critical analysis and judgment when implementing the proposed suggestions. In addition to mistakes (which may happen, but are rare), sometimes the presented code modification may serve more as an illustrative example than a directly applicable solution. In such cases, we recommend prioritizing the suggestion's detailed description, using the diff snippet primarily as a supporting reference.

Our recommended approach for presenting code suggestions is through a table (--pr_code_suggestions.commitable_code_suggestions=false). This method significantly reduces the PR footprint and allows for quick and easy digestion of multiple suggestions.

We also offer a complementary dual publishing mode. When enabled, suggestions exceeding a certain score threshold are not only displayed in the table, but also presented as committable PR comments. This mode helps highlight suggestions deemed more critical.

To activate dual publishing mode, use the following setting:

Where x represents the minimum score threshold (>=) for suggestions to be presented as committable PR comments in addition to the table. Default is -1 (disabled).

Platforms supported: GitHub, GitLab

If you set in a configuration file:

The improve tool will add a checkbox below the suggestions, prompting user to acknowledge that they have reviewed the suggestions. You can set the content of the checkbox text via:

Tip - Reducing visual footprint after self-review

The configuration parameter pr_code_suggestions.fold_suggestions_on_self_review (default is True) can be used to automatically fold the suggestions after the user clicks the self-review checkbox.

This reduces the visual footprint of the suggestions, and also indicates to the PR reviewer that the suggestions have been reviewed by the PR author, and don't require further attention.

Tip - Demanding self-review from the PR author

If you keep the number of required reviewers for a PR to 1 and enable this configuration, this effectively means that the PR author can approve the PR by actively clicking the self-review checkbox.

To prevent unauthorized approvals, this configuration defaults to false, and cannot be altered through online comments; enabling requires a direct update to the configuration file and a commit to the repository. This ensures that utilizing the feature demands a deliberate documented decision by the repository owner.

PR-Agent uses a dynamic strategy to generate code suggestions based on the size of the pull request (PR). Here's how it works:

This approach has two main benefits:

Note: Chunking is primarily relevant for large PRs. For most PRs (up to 600 lines of code), PR-Agent will be able to process the entire code in a single call.

**Examples:**

Example 1 (lua):
```lua
/improve --pr_code_suggestions.some_config1=... --pr_code_suggestions.some_config2=...
```

Example 2 (sass):
```sass
/improve --pr_code_suggestions.commitable_code_suggestions=true
```

Example 3 (lua):
```lua
[github_app]
pr_commands = [
    "/improve",
    ...
]

[pr_code_suggestions]
num_code_suggestions_per_chunk = ...
...
```

Example 4 (lua):
```lua
[pr_code_suggestions]
extra_instructions="""\
(1) Answer in Japanese
(2) Don't suggest to add try-except block
(3) Ignore changes in toml files
...
"""
```

---

## Update Changelog - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/update_changelog/

**Contents:**
- Update Changelog
- Overview¶
- Example usage¶
- Configuration options¶

The update_changelog tool automatically updates the CHANGELOG.md file with the PR changes. It can be invoked manually by commenting on any PR:

Under the section pr_update_changelog, the configuration file contains options to customize the 'update changelog' tool:

**Examples:**

Example 1 (unknown):
```unknown
/update_changelog
```

---

## Similar Issues - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/tools/similar_issues/

**Contents:**
- Similar Issues
- Overview¶
- Example usage¶
  - Selecting a Vector Database¶
    - Available Options¶
    - Pinecone Configuration¶
    - Qdrant Configuration¶
- How to use¶

The similar issue tool retrieves the most similar issues to the current issue. It can be invoked manually by commenting on any PR:

Note that to perform retrieval, the similar_issue tool indexes all the repo previous issues (once).

Configure your preferred database by changing the pr_similar_issue parameter in configuration.toml file.

Choose from the following Vector Databases:

To use Pinecone with the similar issue tool, add these credentials to .secrets.toml (or set as environment variables):

These parameters can be obtained by registering to Pinecone.

To use Qdrant with the similar issue tool, add these credentials to .secrets.toml (or set as environment variables):

Then select Qdrant in configuration.toml:

You can get a free managed Qdrant instance from Qdrant Cloud.

To invoke the 'similar issue' tool from CLI, run: python3 cli.py --issue_url=... similar_issue

To invoke the 'similar' issue tool via online usage, comment on a PR: /similar_issue

You can also enable the 'similar issue' tool to run automatically when a new issue is opened, by adding it to the pr_commands list in the github_app section

**Examples:**

Example 1 (unknown):
```unknown
/similar_issue
```

Example 2 (lua):
```lua
[pinecone]
api_key = "..."
environment = "..."
```

Example 3 (lua):
```lua
[qdrant]
url = "https://YOUR-QDRANT-URL" # e.g., https://xxxxxxxx-xxxxxxxx.eu-central-1-0.aws.cloud.qdrant.io
api_key = "..."
```

Example 4 (json):
```json
[pr_similar_issue]
vectordb = "qdrant"
```

---
