# Qodo-Merge_Docs - Other

**Pages:** 2

---

## Overview - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/

**Contents:**
- Overview¶
- Docs Smart Search¶
- Features¶
- Example Results¶
    - /describe¶
    - /review¶
    - /improve¶
- How it Works¶

PR-Agent is an open-source, AI-powered code review agent and a community-maintained legacy project of Qodo. It is distinct from Qodo's primary AI code review offering, which provides a feature-rich, context-aware experience. Qodo now offers a free tier that integrates seamlessly with GitHub, GitLab, Bitbucket, and Azure DevOps for high-quality automated reviews.

See the Installation Guide for instructions on installing and running the tool on different git platforms.

See the Usage Guide for instructions on running commands via different interfaces, including CLI, online usage, or by automatically triggering them when a new PR is opened.

See the Tools Guide for a detailed description of the different tools.

To search the documentation site using natural language:

1) Comment /help "your question" in a pull request where PR-Agent is installed

2) The bot will respond with an answer that includes relevant documentation links.

PR-Agent offers comprehensive pull request functionalities integrated with various git providers:

The following diagram illustrates PR-Agent tools and their flow:

Check out the PR Compression strategy page for more details on how we convert a code diff to a manageable LLM prompt

---

## Frequently Asked Questions - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/faq/

**Contents:**
- FAQ¶
    - Answer:1¶
    - Answer:2¶
    - Answer:3¶
    - Answer:4¶
    - Answer:6¶
    - Answer:7¶
    - Answer:3¶

PR-Agent is designed to assist, not replace, human reviewers.

Reviewing PRs is a tedious and time-consuming task often seen as a "chore". In addition, the longer the PR – the shorter the relative feedback, since long PRs can overwhelm reviewers, both in terms of technical difficulty, and the actual review time. PR-Agent aims to address these pain points, and to assist and empower both the PR author and reviewer.

However, PR-Agent has built-in safeguards to ensure the developer remains in the driver's seat. For example:

Read more about this issue in our blog

AI errors are rare, but possible. A main value from reviewing the code suggestions lies in their high probability of catching mistakes or bugs made by the PR author. We believe it's worth spending 30-60 seconds reviewing suggestions, even if some aren't relevant, as this practice can enhance code quality and prevent bugs in production.

The hierarchical structure of the suggestions is designed to help the user quickly understand them, and to decide which ones are relevant and which are not:

In addition, we recommend to use the extra_instructions field to guide the model to suggestions that are more relevant to the specific needs of the project.

See here for more information on how to use the extra_instructions and best_practices configuration options, to guide the model to more tailored suggestions.

No. PR-Agent strict privacy policy ensures that your code is not stored or used for training purposes.

For a detailed overview of our data privacy policy, please refer to this link

Yes. While PR-Agent won't automatically review draft PRs, you can still get feedback by manually requesting it through online commenting.

For active PRs, you can customize the automatic feedback settings here to match your team's workflow.

Yes, you can customize review effort estimates using the extra_instructions configuration option (see documentation).

Note: The effort levels (1-5) are primarily meant for comparative purposes, helping teams prioritize reviewing smaller PRs first. The actual review duration may vary, as the focus is on providing consistent relative effort estimates.

The default configuration of PR-Agent is designed to balance helpful feedback with noise reduction. It reduces noise through several approaches:

From our experience, especially in large teams or organizations, complaints about "noise" sometimes stem from the following issues:

Therefore, at a global configuration level, we recommend using the default configuration, which is designed to reduce noise while providing valuable feedback.

However, if you still find the feedback too noisy, you can adjust the configuration. Since each user and team has different needs, it's definitely possible - and even recommended - to adjust configurations for specific repos as needed. Ways to adjust the configuration for noise reduction include for example:

Note that some users may prefer the opposite - more thorough and detailed feedback. PR-Agent is designed to be flexible and customizable, allowing you to tailor the feedback to your team's specific needs and preferences. Examples of ways to increase feedback include:

---
