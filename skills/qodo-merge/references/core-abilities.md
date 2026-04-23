# Qodo-Merge_Docs - Core-Abilities

**Pages:** 7

---

## Self-reflection - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/core-abilities/self_reflection/

**Contents:**
- Self-reflection
- Introduction - Efficient Review with Hierarchical Presentation¶
- Self-reflection and Re-ranking¶
- Example Results¶
- Appendix - Relevant Configuration Options¶

Supported Git Platforms: GitHub, GitLab, Bitbucket

PR-Agent implements a self-reflection process where the AI model reflects, scores, and re-ranks its own suggestions, eliminating irrelevant or incorrect ones. This approach improves the quality and relevance of suggestions, saving users time and enhancing their experience. Configuration options allow users to set a score threshold for further filtering out suggestions.

Given that not all generated code suggestions will be relevant, it is crucial to enable users to review them in a fast and efficient way, allowing quick identification and filtering of non-applicable ones.

To achieve this goal, PR-Agent offers a dedicated hierarchical structure when presenting suggestions to users:

This hierarchical structure is designed to facilitate rapid review of each suggestion, with users spending an average of ~5-10 seconds per item.

The AI model is initially tasked with generating suggestions, and outputting them in order of importance. However, in practice we observe that models often struggle to simultaneously generate high-quality code suggestions and rank them well in a single pass. Furthermore, the initial set of generated suggestions sometimes contains easily identifiable errors.

To address these issues, we implemented a "self-reflection" process that refines suggestion ranking and eliminates irrelevant or incorrect proposals. This process consists of the following steps:

Note that presenting all generated suggestions simultaneously provides the model with a comprehensive context, enabling it to make more informed decisions compared to evaluating each suggestion individually.

To conclude, the self-reflection process enables PR-Agent to prioritize suggestions based on their importance, eliminate inaccurate or irrelevant proposals, and optionally exclude suggestions that fall below a specified threshold of significance. This results in a more refined and valuable set of suggestions for the user, saving time and improving the overall experience.

**Examples:**

Example 1 (json):
```json
[pr_code_suggestions]
suggestions_score_threshold = 0 # Filter out suggestions with a score below this threshold (0-10)
```

---

## Compression strategy - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/core-abilities/compression_strategy/

**Contents:**
- Compression strategy
- Overview¶
    - Repo language prioritization strategy¶
  - Small PR¶
  - Large PR¶
    - Motivation¶
    - Compression strategy¶
    - Adaptive and token-aware file patch fitting¶
    - Example¶

Supported Git Platforms: GitHub, GitLab, Bitbucket

There are two scenarios:

For both scenarios, we first use the following strategy

We prioritize the languages of the repo based on the following criteria:

In this case, we can fit the entire PR in a single prompt:

Pull Requests can be very long and contain a lot of information with varying degree of relevance to the pr-agent. We want to be able to pack as much information as possible in a single LMM prompt, while keeping the information relevant to the pr-agent.

We prioritize additions over deletions:

We use tiktoken to tokenize the patches after the modifications described above, and we use the following strategy to fit the patches into the prompt:

---

## Dynamic context - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/core-abilities/dynamic_context/

**Contents:**
- Dynamic context
- Introduction¶
- Challenges of expanding the context window¶
- Asymmetric and dynamic context¶
- Appendix - relevant configuration options¶

Supported Git Platforms: GitHub, GitLab, Bitbucket

PR-Agent uses an asymmetric and dynamic context strategy to improve AI analysis of code changes in pull requests. It provides more context before changes than after, and dynamically adjusts the context based on code structure (e.g., enclosing functions or classes). This approach balances providing sufficient context for accurate analysis, while avoiding needle-in-the-haystack information overload that could degrade AI performance or exceed token limits.

Pull request code changes are retrieved in a unified diff format, showing three lines of context before and after each modified section, with additions marked by '+' and deletions by '-'.

This unified diff format can be challenging for AI models to interpret accurately, as it provides limited context for understanding the full scope of code changes. The presentation of code using '+', '-', and ' ' symbols to indicate additions, deletions, and unchanged lines respectively also differs from the standard code formatting typically used to train AI models.

While expanding the context window is technically feasible, it presents a more fundamental trade-off:

Excessive context may overwhelm the model with extraneous information, creating a "needle in a haystack" scenario where focusing on the relevant details (the code that actually changed) becomes challenging. LLM quality is known to degrade when the context gets larger. Pull requests often encompass multiple changes across many files, potentially spanning hundreds of lines of modified code. This complexity presents a genuine risk of overwhelming the model with excessive context.

Increased context expands the token count, increasing processing time and cost, and may prevent the model from processing the entire pull request in a single pass.

To address these challenges, PR-Agent employs an asymmetric and dynamic context strategy, providing the model with more focused and relevant context information for each code change.

We start by recognizing that the context preceding a code change is typically more crucial for understanding the modification than the context following it. Consequently, PR-Agent implements an asymmetric context policy, decoupling the context window into two distinct segments: one for the code before the change and another for the code after.

By independently adjusting each context window, PR-Agent can supply the model with a more tailored and pertinent context for individual code changes.

We also employ a "dynamic" context strategy. We start by recognizing that the optimal context for a code change often corresponds to its enclosing code component (e.g., function, class), rather than a fixed number of lines. Consequently, we dynamically adjust the context window based on the code's structure, ensuring the model receives the most pertinent information for each modification.

To prevent overwhelming the model with excessive context, we impose a limit on the number of lines searched when identifying the enclosing component. This balance allows for comprehensive understanding while maintaining efficiency and limiting context token usage.

**Examples:**

Example 1 (lua):
```lua
@@ -12,5 +12,5 @@ def func1():
 code line that already existed in the file...
 code line that already existed in the file...
 code line that already existed in the file....
-code line that was removed in the PR
+new code line added in the PR
 code line that already existed in the file...
 code line that already existed in the file...
 code line that already existed in the file...

@@ -26,2 +26,4 @@ def func2():
...
```

Example 2 (sass):
```sass
[config]
patch_extension_skip_types =[".md",".txt"]  # Skip files with these extensions when trying to extend the context
allow_dynamic_context=true                  # Allow dynamic context extension
max_extra_lines_before_dynamic_context = 8  # will try to include up to X extra lines before the hunk in the patch, until we reach an enclosing function or class
patch_extra_lines_before = 3                # Number of extra lines (+3 default ones) to include before each hunk in the patch
patch_extra_lines_after = 1                 # Number of extra lines (+3 default ones) to include after each hunk in the patch
```

---

## Interactivity - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/core-abilities/interactivity/

**Contents:**
- Interactivity¶
- Overview¶
- Key Interactive Features¶
  - 1. Interactive /improve Tool¶
  - 2. Interactive /help Tool¶

Supported Git Platforms: GitHub, GitLab

PR-Agent transforms static code reviews into interactive experiences by enabling direct actions from pull request (PR) comments. Developers can immediately trigger actions and apply changes with simple checkbox clicks.

This focused workflow maintains context while dramatically reducing the time between PR creation and final merge. The approach eliminates manual steps, provides clear visual indicators, and creates immediate feedback loops all within the same interface.

The /improve command delivers a comprehensive interactive experience:

Apply this suggestion: Clicking this checkbox instantly converts a suggestion into a committable code change. When committed to the PR, changes made to code that was flagged for improvement will be marked with a check mark, allowing developers to easily track and review implemented recommendations.

More: Triggers additional suggestions generation while keeping each suggestion focused and relevant as the original set

Update: Triggers a re-analysis of the code, providing updated suggestions based on the latest changes

Author self-review: Interactive acknowledgment that developers have opened and reviewed collapsed suggestions

The /help command not only lists available tools and their descriptions but also enables immediate tool invocation through interactive checkboxes. When a user checks a tool's checkbox, PR-Agent instantly triggers that tool without requiring additional commands. This transforms the standard help menu into an interactive launch pad for all PR-Agent capabilities, eliminating context switching by keeping developers within their PR workflow.

---

## Local and global metadata - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/core-abilities/metadata/

**Contents:**
- Local and global metadata injection with multi-stage analysis¶

Supported Git Platforms: GitHub, GitLab, Bitbucket

1. PR-Agent initially retrieves for each PR the following data:

Tip: Organization-level metadata

In addition to the inputs above, PR-Agent can incorporate supplementary preferences provided by the user, like extra_instructions and organization best practices. This information can be used to enhance the PR analysis.

2. By default, the first command that PR-Agent executes is describe, which generates three types of outputs:

These AI-generated outputs are now considered as part of the PR metadata, and can be used in subsequent commands like review and improve. This effectively enables multi-stage chain-of-thought analysis, without doing any additional API calls which will cost time and money.

For example, when generating code suggestions for different files, PR-Agent can inject the AI-generated "Changes walkthrough" file summary in the prompt:

3. The entire PR files that were retrieved are also used to expand and enhance the PR context (see Dynamic Context).

4. All the metadata described above represents several level of cumulative analysis - ranging from hunk level, to file level, to PR level, to organization level. This comprehensive approach enables PR-Agent AI models to generate more precise and contextually relevant suggestions and feedback.

**Examples:**

Example 1 (lua):
```lua
## File: 'src/file1.py'
### AI-generated file summary:
- edited function `func1` that does X
- Removed function `func2` that was not used
- ....

@@ ... @@ def func1():
__new hunk__
11  unchanged code line0
12  unchanged code line1
13 +new code line2 added
14  unchanged code line3
__old hunk__
 unchanged code line0
 unchanged code line1
-old code line2 removed
 unchanged code line3

@@ ... @@ def func2():
__new hunk__
...
__old hunk__
...
```

---

## Fetching ticket context - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/core-abilities/fetching_ticket_context/

**Contents:**
- Fetching Ticket Context for PRs¶
- Overview¶
- Affected Tools¶
  - Describe tool¶
  - Review tool¶
    - Configuration options¶
- GitHub/Gitlab Issues Integration¶
- Jira Integration¶
  - Jira Cloud¶
    - Email/Token Authentication¶

Supported Git Platforms: GitHub, GitLab, Bitbucket

Branch-name issue linking: GitHub only (for now)

Extracting issue links from the branch name (and the optional branch_issue_regex setting) is currently implemented for GitHub only. Support for GitLab, Bitbucket, and other platforms is planned for a later release. The GitHub flow was the most relevant to implement first; other providers will follow.

PR-Agent streamlines code review workflows by seamlessly connecting with multiple ticket management systems. This integration enriches the review process by automatically surfacing relevant ticket information and context alongside code changes.

Ticket systems supported:

Ticket Recognition Requirements:

PR-Agent will recognize the ticket and use the ticket content (title, description, labels) to provide additional context for the code changes. By understanding the reasoning and intent behind modifications, the LLM can offer more insightful and relevant code analysis.

Similarly to the describe tool, the review tool will use the ticket content to provide additional context for the code changes.

In addition, this feature will evaluate how well a Pull Request (PR) adheres to its original purpose/intent as defined by the associated ticket or issue mentioned in the PR description. Each ticket will be assigned a label (Compliance/Alignment level), Indicates the degree to which the PR fulfills its original purpose:

A PR Code Verified label indicates the PR code meets ticket requirements, but requires additional manual testing beyond the code scope. For example - validating UI display across different environments (Mac, Windows, mobile, etc.).

PR-Agent will automatically recognize GitHub/Gitlab issues mentioned in the PR description and fetch the issue content. Examples of valid GitHub/Gitlab issue references:

Branch names can also be used to link issues, for example: - 123-fix-bug (where 123 is the issue number)

This branch-name detection applies only when the git provider is GitHub. Support for other platforms is planned for later.

Since PR-Agent is integrated with GitHub, it doesn't require any additional configuration to fetch GitHub issues.

We support both Jira Cloud and Jira Server/Data Center.

You can create an API token from your Atlassian account:

Log in to https://id.atlassian.com/manage-profile/security/api-tokens.

Click Create API token.

From the dialog that appears, enter a name for your new token and click Create.

Click Copy to clipboard.

You can use your Jira username and password to authenticate with Jira Data Center/Server.

In your Configuration file/Environment variables/Secrets file, add the following lines:

(Note that indeed the 'jira_api_email' field is used for the username, and the 'jira_api_token' field is used for the user password.)

If you are facing issues retrieving tickets in PR-Agent with Basic auth, you can validate the flow using a Python script. This following steps will help you check if the basic auth is working correctly, and if you can access the Jira ticket details:

run pip install jira==3.8.0

run the following Python script (after replacing the placeholders with your actual values):

If you are facing issues retrieving tickets in PR-Agent with PAT token, you can validate the flow using a Python script. This following steps will help you check if the token is working correctly, and if you can access the Jira ticket details:

run pip install jira==3.8.0

run the following Python script (after replacing the placeholders with your actual values):

PR-Agent supports connecting to multiple JIRA servers using different authentication methods.

Configure multiple servers using Email/Token authentication:

Example Configuration:

Configure multiple servers using Personal Access Token authentication:

Example Configuration:

Mixed Authentication (Email/Token + PAT):

To integrate with Jira, you can link your PR to a ticket using either of these methods:

Method 1: Description Reference:

Include a ticket reference in your PR description, using either the complete URL format https://<JIRA_ORG>.atlassian.net/browse/ISSUE-123 or the shortened ticket ID ISSUE-123 (without prefix or suffix for the shortened ID).

Method 2: Branch Name Detection:

Name your branch with the ticket ID as a prefix (e.g., ISSUE-123-feature-description or ISSUE-123/feature-description).

For shortened ticket IDs or branch detection (method 2 for JIRA cloud), you must configure the Jira base URL in your configuration file under the [jira] section:

**Examples:**

Example 1 (sass):
```sass
By default, the `review` tool will automatically validate if the PR complies with the referenced ticket.
If you want to disable this feedback, add the following line to your configuration file:

```toml
[pr_reviewer]
require_ticket_analysis_review=false
```
```

Example 2 (sass):
```sass
If you set:
```toml
[pr_reviewer]
check_pr_additional_content=true
```
(default: `false`)

the `review` tool will also validate that the PR code doesn't contain any additional content that is not related to the ticket. If it does, the PR will be labeled at best as `PR Code Verified`, and the `review` tool will provide a comment with the additional unrelated content found in the PR code.
```

Example 3 (json):
```json
[jira]
jira_api_token = "YOUR_API_TOKEN"
jira_api_email = "YOUR_EMAIL"
```

Example 4 (unknown):
```unknown
jira_api_email = "your_username"
jira_api_token = "your_password"
```

---

## Core Abilities - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/core-abilities/

**Contents:**
- Core Abilities¶
- Blogs¶
  - Code Generation and LLMs¶
  - Development Processes¶
  - Cost Optimization¶

PR-Agent utilizes a variety of core abilities to provide a comprehensive and efficient code review experience. These abilities include:

Here are some additional technical blogs from Qodo, that delve deeper into the core capabilities and features of Large Language Models (LLMs) when applied to coding tasks. These resources provide more comprehensive insights into leveraging LLMs for software development.

---
