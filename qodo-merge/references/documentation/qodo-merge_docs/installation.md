# Qodo-Merge_Docs - Installation

**Pages:** 7

---

## Github - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/installation/github/

**Contents:**
- Github
- Run as a GitHub Action¶
  - Configuration Examples¶
    - Quick Start Examples¶
      - Basic Setup (OpenAI Default)¶
      - Gemini Setup¶
    - Claude Setup¶
    - Basic Configuration with Tool Controls¶
    - Switching Models¶
      - Using Gemini (Google AI Studio)¶

In this page we will cover how to install and run PR-Agent as a GitHub Action or GitHub App, and how to configure it for your needs.

You can use our pre-built Github Action Docker image to run PR-Agent as a Github Action.

1) Add the following file to your repository under .github/workflows/pr_agent.yml:

2) Add the following secret to your repository under Settings > Secrets and variables > Actions > New repository secret > Add secret:

The GITHUB_TOKEN secret is automatically created by GitHub.

3) Merge this change to your main branch. When you open your next PR, you should see a comment from github-actions bot with a review of your PR, and instructions on how to use the rest of the tools.

4) You may configure PR-Agent by adding environment variables under the env section corresponding to any configurable property in the configuration file. Some examples:

See detailed usage instructions in the USAGE GUIDE

This section provides detailed, step-by-step examples for configuring PR-Agent with different models and advanced options in GitHub Actions.

Copy this minimal workflow to get started with the default OpenAI models:

Ready-to-use workflow for Gemini models:

Ready-to-use workflow for Claude models:

Start with this enhanced workflow that includes tool configuration:

To use Gemini models instead of the default OpenAI models:

Note: When using non-OpenAI models like Gemini, you don't need to set OPENAI_KEY - only the model-specific API key is required.

To use Claude models:

Note: When using non-OpenAI models like Claude, you don't need to set OPENAI_KEY - only the model-specific API key is required.

To use Azure OpenAI services:

To use local models via Ollama:

Note: For local models, you'll need to use a self-hosted runner with Ollama installed, as GitHub Actions hosted runners cannot access localhost services.

Add specific instructions for the review process:

Configure for specific programming languages:

Run only specific tools automatically:

Instead of setting all options via environment variables, you can use a .pr_agent.toml file in your repository root:

If you get model not found errors:

Check model name format: Ensure you're using the correct model identifier format (e.g., gemini/gemini-1.5-flash, not just gemini-1.5-flash)

Verify API keys: Make sure your API keys are correctly set as repository secrets

Check model availability: Some models may not be available in all regions or may require specific access

Remember these key points about environment variables:

If you encounter rate limiting:

Error: "Model not found" - Solution: Check the model name format and ensure it matches the exact identifier. See the Changing a model in PR-Agent guide for supported models and their correct identifiers.

Error: "API key not found" - Solution: Verify that your API key is correctly set as a repository secret and the environment variable name matches exactly - Note: For non-OpenAI models (Gemini, Claude, etc.), you only need the model-specific API key, not OPENAI_KEY

Error: "Rate limit exceeded" - Solution: Add fallback models or increase the config.ai_timeout value

Error: "Permission denied" - Solution: Ensure your workflow has the correct permissions set:

Error: "Invalid JSON format"

For better performance with large repositories:

For more detailed configuration options, see:

if you want to pin your action to a specific release (v0.23 for example) for stability reasons, use:

For enhanced security, you can also specify the Docker image by its digest:

To use the action with a GitHub enterprise server, add an environment variable GITHUB.BASE_URL with the API URL of your GitHub server.

For example, if your GitHub server is at https://github.mycompany.com, add the following to your workflow file:

Allowing you to automate the review process on your private or public repositories.

1) Create a GitHub App from the Github Developer Portal.

2) Generate a random secret for your app, and save it for later. For example, you can use:

3) Acquire the following pieces of information from your app's settings page:

4) Clone this repository:

5) Copy the secrets template file and fill in the following:

Set deployment_type to 'app' in configuration.toml

The .secrets.toml file is not copied to the Docker image by default, and is only used for local development. If you want to use the .secrets.toml file in your Docker image, you can add remove it from the .dockerignore file. In most production environments, you would inject the secrets file as environment variables or as mounted volumes. For example, in order to inject a secrets file as a volume in a Kubernetes environment you can update your pod spec to include the following, assuming you have a secret named pr-agent-settings with a key named .secrets.toml:

Another option is to set the secrets as environment variables in your deployment environment, for example OPENAI.KEY and GITHUB.USER_TOKEN.

6) Build a Docker image for the app and optionally push it to a Docker repository. We'll use Dockerhub as an example:

Host the app using a server, serverless function, or container environment. Alternatively, for development and debugging, you may use tools like smee.io to forward webhooks to your local machine. You can check Deploy as a Lambda Function

Go back to your app's settings, and set the following:

Webhook URL: The URL of your app's server or the URL of the smee.io channel.

Webhook secret: The secret you generated earlier.

Install the app by navigating to the "Install App" tab and selecting your desired repositories.

Note: When running PR-Agent from GitHub app, the default configuration file (configuration.toml) will be loaded. However, you can override the default tool parameters by uploading a local configuration file .pr_agent.toml For more information please check out the USAGE GUIDE

Note that since AWS Lambda env vars cannot have "." in the name, you can replace each "." in an env variable with "__". For example: GITHUB.WEBHOOK_SECRET --> GITHUB__WEBHOOK_SECRET

Build a docker image that can be used as a lambda function

shell docker buildx build --platform=linux/amd64 . -t codiumai/pr-agent:github_lambda --target github_lambda -f docker/Dockerfile.lambda (Note: --target github_lambda is optional as it's the default target)

Create a lambda function that uses the uploaded image. Set the lambda timeout to be at least 3m.

For production Lambda deployments, use AWS Secrets Manager instead of environment variables:

Not all features have been added to CodeCommit yet. As of right now, CodeCommit has been implemented to run the PR-Agent CLI on the command line, using AWS credentials stored in environment variables. (More features will be added in the future.) The following is a set of instructions to have PR-Agent do a review of your CodeCommit pull request from the command line:

Example IAM permissions to that user to allow access to CodeCommit:

Example setting the Access Key and Secret using environment variables

After you set up AWS CodeCommit using the instructions above, here is an example CLI run that tells pr-agent to review a given pull request. (Replace your specific PYTHONPATH and PR URL in the example)

**Examples:**

Example 1 (yaml):
```yaml
on:
  pull_request:
    types: [opened, reopened, ready_for_review]
  issue_comment:
jobs:
  pr_agent_job:
    if: ${{ github.event.sender.type != 'Bot' }}
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
      contents: write
    name: Run pr agent on every pull request, respond to user comments
    steps:
      - name: PR Agent action step
        id: pragent
        uses: qodo-ai/pr-agent@main
        env:
          OPENAI_KEY: ${{ secrets.OPENAI_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Example 2 (jsx):
```jsx
Name = OPENAI_KEY
Secret = <your key>
```

Example 3 (lua):
```lua
env:
        # ... previous environment values
        OPENAI.ORG: "<Your organization name under your OpenAI account>"
        PR_REVIEWER.REQUIRE_TESTS_REVIEW: "false" # Disable tests review
        PR_CODE_SUGGESTIONS.NUM_CODE_SUGGESTIONS: 6 # Increase number of code suggestions
```

Example 4 (yaml):
```yaml
name: PR Agent
on:
  pull_request:
    types: [opened, reopened, ready_for_review]
  issue_comment:
jobs:
  pr_agent_job:
    if: ${{ github.event.sender.type != 'Bot' }}
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
      contents: write
    steps:
      - name: PR Agent action step
        uses: qodo-ai/pr-agent@main
        env:
          OPENAI_KEY: ${{ secrets.OPENAI_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Bitbucket - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/installation/bitbucket/

**Contents:**
- Bitbucket
- Run as a Bitbucket Pipeline¶
- Bitbucket Server and Data Center¶
  - Run it as CLI¶
  - Run it as service¶

You can use the Bitbucket Pipeline system to run PR-Agent on every pull request open or update.

Add the following secure variables to your repository under Repository settings > Pipelines > Repository variables.

CONFIG__GIT_PROVIDER: bitbucket

You can get a Bitbucket token for your repository by following Repository Settings -> Security -> Access Tokens. For basic auth, you can generate a base64 encoded token from your username:password combination.

Note that comments on a PR are not supported in Bitbucket Pipeline.

Login into your on-prem instance of Bitbucket with your service account username and password. Navigate to Manage account, HTTP Access tokens, Create Token. Generate the token and add it to .secret.toml under bitbucket_server section

Don't forget to also set the URL of your Bitbucket Server instance (either in .secret.toml or in configuration.toml):

Modify configuration.toml:

and pass the Pull request URL:

To run PR-Agent as webhook, build the docker image:

Navigate to Projects or Repositories, Settings, Webhooks, Create Webhook. Fill in the name and URL. For Authentication, select 'None'. Select the 'Pull Request Opened' checkbox to receive that event as a webhook.

The URL should end with /webhook, for example: https://domain.com/webhook

**Examples:**

Example 1 (sass):
```sass
pipelines:
    pull-requests:
      '**':
        - step:
            name: PR Agent Review
            image: codiumai/pr-agent:latest
            script:
              - pr-agent --pr_url=https://bitbucket.org/$BITBUCKET_WORKSPACE/$BITBUCKET_REPO_SLUG/pull-requests/$BITBUCKET_PR_ID review
```

Example 2 (jsx):
```jsx
[bitbucket_server]
bearer_token = "<your key>"
```

Example 3 (jsx):
```jsx
[bitbucket_server]
url = "<full URL to your Bitbucket instance, e.g.: https://git.bitbucket.com>"
```

Example 4 (unknown):
```unknown
git_provider="bitbucket_server"
```

---

## Locally - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/installation/locally/

**Contents:**
- Locally
- Using Docker image¶
  - Utilizing environment variables¶
  - I get an error when running the Docker image. What should I do?¶
- Using pip package¶
- Run from source¶

To run PR-Agent locally, you first need to acquire two keys:

A list of the relevant tools can be found in the tools guide.

To invoke a tool (for example review), you can run PR-Agent directly from the Docker image. Here's how:

If you are using GitHub enterprise server, you need to specify the custom url as variable. For example, if your GitHub server is at https://github.mycompany.com, add the following to the command:

If you have a dedicated GitLab instance, you need to specify the custom url as variable:

If you have a dedicated Gitea instance, you need to specify the custom url as variable:

For other git providers, update CONFIG.GIT_PROVIDER accordingly and check the pr_agent/settings/.secrets_template.toml file for environment variables expected names and values.

It is also possible to provide or override the configuration by setting the corresponding environment variables. You can define the corresponding environment variables by following this convention: <TABLE>__<KEY>=<VALUE> or <TABLE>.<KEY>=<VALUE>. The <TABLE> refers to a table/section in a configuration file and <KEY>=<VALUE> refers to the key/value pair of a setting in the configuration file.

For example, suppose you want to run pr_agent that connects to a self-hosted GitLab instance similar to an example above. You can define the environment variables in a plain text file named .env with the following content:

Then, you can run pr_agent using Docker with the following command:

If you encounter an error when running the Docker image, it is almost always due to a misconfiguration of api keys or tokens.

Note that litellm, which is used by pr-agent, sometimes returns non-informative error messages such as APIError: OpenAIException - Connection error. Carefully check the api keys and tokens you provided and make sure they are correct. Adjustments may be needed depending on your llm provider.

For example, for Azure OpenAI, additional keys are needed. Same goes for other providers, make sure to check the documentation

Then run the relevant tool with the script below. Make sure to fill in the required parameters (user_token, openai_key, pr_url, command):

Note: If you get an error related to Rust in the dependency installation then make sure Rust is installed and in your PATH, instructions: https://rustup.rs

[Optional] Add the pr_agent folder to your PYTHONPATH

**Examples:**

Example 1 (typescript):
```typescript
docker run --rm -it -e OPENAI.KEY=<your_openai_key> -e GITHUB.USER_TOKEN=<your_github_token> codiumai/pr-agent:latest --pr_url <pr_url> review
```

Example 2 (sass):
```sass
-e GITHUB.BASE_URL=https://github.mycompany.com/api/v3
```

Example 3 (sass):
```sass
docker run --rm -it -e OPENAI.KEY=<your key> -e CONFIG.GIT_PROVIDER=gitlab -e GITLAB.PERSONAL_ACCESS_TOKEN=<your token> codiumai/pr-agent:latest --pr_url <pr_url> review
```

Example 4 (jsx):
```jsx
-e GITLAB.URL=<your gitlab instance url>
```

---

## Gitea - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/installation/gitea/

**Contents:**
- Gitea
- Run a Gitea webhook server¶

In Gitea create a new user and give it "Reporter" role for the intended group or project.

For the user from step 1. generate a personal_access_token with api access.

Generate a random secret for your app, and save it for later (webhook_secret). For example, you can use:

Prepare variables and secrets. Skip this step if you plan on setting these as environment variables when running the agent:

Build a Docker image for the app and optionally push it to a Docker repository. We'll use Dockerhub as an example:

Create a webhook in your Gitea project. Set the URL to http[s]://<PR_AGENT_HOSTNAME>/api/v1/gitea_webhooks, the secret token to the generated secret from step 3, and enable the triggers push, comments and merge request events.

Test your installation by opening a merge request or commenting on a merge request using one of PR Agent's commands.

**Examples:**

Example 1 (swift):
```swift
WEBHOOK_SECRET=$(python -c "import secrets; print(secrets.token_hex(10))")
```

Example 2 (unknown):
```unknown
git clone https://github.com/qodo-ai/pr-agent.git
```

Example 3 (unknown):
```unknown
docker build -f /docker/Dockerfile -t pr-agent:gitea_app --target gitea_app .
docker push codiumai/pr-agent:gitea_webhook  # Push to your Docker repository
```

Example 4 (sass):
```sass
CONFIG__GIT_PROVIDER=gitea
GITEA__PERSONAL_ACCESS_TOKEN=<personal_access_token>
GITEA__WEBHOOK_SECRET=<webhook_secret>
GITEA__URL=https://gitea.com # Or self host
OPENAI__KEY=<your_openai_api_key>
GITEA__SKIP_SSL_VERIFICATION=false # or true
GITEA__SSL_CA_CERT=/path/to/cacert.pem
```

---

## PR-Agent - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/installation/pr_agent/

**Contents:**
- PR-Agent Installation Guide¶
- 🖥️ Local Installation¶
- 🐙 GitHub Integration¶
- 🦊 GitLab Integration¶
- 🟦 BitBucket Integration¶
- 🔷 Azure DevOps Integration¶

PR-Agent can be deployed in various environments and platforms. Choose the installation method that best suits your needs:

Learn how to run PR-Agent locally using:

View Local Installation Guide →

Set up PR-Agent with GitHub as:

View GitHub Integration Guide →

Deploy PR-Agent on GitLab as:

View GitLab Integration Guide →

Implement PR-Agent in BitBucket as:

View BitBucket Integration Guide →

Configure PR-Agent with Azure DevOps as:

View Azure DevOps Integration Guide →

---

## Azure - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/installation/azure/

**Contents:**
- Azure
- Azure DevOps Pipeline¶
  - Azure Repos Git PR triggers and Build Validation¶
- Azure DevOps from CLI¶
- Azure DevOps Webhook¶

You can use a pre-built Action Docker image to run PR-Agent as an Azure DevOps pipeline. Add the following file to your repository under azure-pipelines.yml:

This script will run PR-Agent on every new merge request, with the improve, review, and describe commands. Note that you need to export the azure_devops__pat and OPENAI_KEY variables in the Azure DevOps pipeline settings (Pipelines -> Library -> + Variable group):

Make sure to give pipeline permissions to the pr_agent variable group.

Note that Azure Pipelines lacks support for triggering workflows from PR comments. If you find a viable solution, please contribute it to our issue tracker

Azure Repos Git does not use YAML pr: triggers for pipelines. Instead, configure Build Validation on the target branch to run the PR Agent pipeline for pull requests:

This distinction applies specifically to Azure Repos Git. Other providers like GitHub and Bitbucket Cloud can use YAML-based PR triggers.

To use Azure DevOps provider use the following settings in configuration.toml:

Azure DevOps provider supports PAT token or DefaultAzureCredential authentication. PAT is faster to create, but has built-in expiration date, and will use the user identity for API calls. Using DefaultAzureCredential you can use managed identity or Service principle, which are more secure and will create separate ADO user identity (via AAD) to the agent.

If PAT was chosen, you can assign the value in .secrets.toml. If DefaultAzureCredential was chosen, you can assigned the additional env vars like AZURE_CLIENT_SECRET directly, or use managed identity/az cli (for local development) without any additional configuration. in any case, 'org' value must be assigned in .secrets.toml:

To trigger from an Azure webhook, you need to manually add a webhook. Use the "Pull request created" type to trigger a review, or "Pull request commented on" to trigger any supported comment with / comment on the relevant PR. Note that for the "Pull request commented on" trigger, only API v2.0 is supported.

For webhook security, create a sporadic username/password pair and configure the webhook username and password on both the server and Azure DevOps webhook. These will be sent as basic Auth data by the webhook with each request:

Ensure that the webhook endpoint is only accessible over HTTPS to mitigate the risk of credential interception when using basic authentication.

**Examples:**

Example 1 (yaml):
```yaml
# Opt out of CI triggers
trigger: none

# Configure PR trigger
# pr:
#   branches:
#     include:
#     - '*'
#   autoCancel: true
#   drafts: false

# NOTE for Azure Repos Git:
# Azure Repos does not honor YAML pr: triggers. Configure Build Validation
# via Branch Policies instead (see note below). You can safely omit pr:.

stages:
- stage: pr_agent
  displayName: 'PR Agent Stage'
  jobs:
  - job: pr_agent_job
    displayName: 'PR Agent Job'
    pool:
      vmImage: 'ubuntu-latest'
    container:
      image: codiumai/pr-agent:latest
      options: --entrypoint ""
    variables:
      - group: pr_agent
    steps:
    - script: |
        echo "Running PR Agent action step"

        # Construct PR_URL
        PR_URL="${SYSTEM_COLLECTIONURI}${SYSTEM_TEAMPROJECT}/_git/${BUILD_REPOSITORY_NAME}/pullrequest/${SYSTEM_PULLREQUEST_PULLREQUESTID}"
        echo "PR_URL=$PR_URL"

        # Extract organization URL from System.CollectionUri
        ORG_URL=$(echo "$(System.CollectionUri)" | sed 's/\/$//') # Remove trailing slash if present
        echo "Organization URL: $ORG_URL"

        export azure_devops__org="$ORG_URL"
        export config__git_provider="azure"

        pr-agent --pr_url="$PR_URL" describe
        pr-agent --pr_url="$PR_URL" review
        pr-agent --pr_url="$PR_URL" improve
      env:
        azure_devops__pat: $(azure_devops_pat)
        openai__key: $(OPENAI_KEY)
      displayName: 'Run PR-Agent'
```

Example 2 (json):
```json
[config]
git_provider="azure"
```

Example 3 (julia):
```julia
[azure_devops]
org = "https://dev.azure.com/YOUR_ORGANIZATION/"
# pat = "YOUR_PAT_TOKEN" needed only if using PAT for authentication
```

Example 4 (jsx):
```jsx
[azure_devops_server]
webhook_username = "<basic auth user>"
webhook_password = "<basic auth password>"
```

---

## Gitlab - PR-Agent

**URL:** https://qodo-merge-docs.qodo.ai/installation/gitlab/

**Contents:**
- Gitlab
- Run as a GitLab Pipeline¶
- Run a GitLab webhook server¶
- Deploy as a Lambda Function¶
  - Using AWS Secrets Manager¶

You can use a pre-built Action Docker image to run PR-Agent as a GitLab pipeline. This is a simple way to get started with PR-Agent without setting up your own server.

(1) Add the following file to your repository under .gitlab-ci.yml:

This script will run PR-Agent on every new merge request. You can modify the rules section to run PR-Agent on different events. You can also modify the script section to run different PR-Agent commands, or with different parameters by exporting different environment variables.

(2) Add the following masked variables to your GitLab repository (CI/CD -> Variables):

GITLAB_PERSONAL_ACCESS_TOKEN: Your GitLab personal access token.

OPENAI_KEY: Your OpenAI key.

Note that if your base branches are not protected, don't set the variables as protected, since the pipeline will not have access to them.

Note: The $CI_SERVER_FQDN variable is available starting from GitLab version 16.10. If you're using an earlier version, this variable will not be available. However, you can combine $CI_SERVER_HOST and $CI_SERVER_PORT to achieve the same result. Please ensure you're using a compatible version or adjust your configuration.

Note: The gitlab__SSL_VERIFY environment variable can be used to specify the path to a custom CA certificate bundle for SSL verification. GitLab exposes the $CI_SERVER_TLS_CA_FILE variable, which points to the custom CA certificate file configured in your GitLab instance. Alternatively, SSL verification can be disabled entirely by setting gitlab__SSL_VERIFY=false, although this is not recommended.

In GitLab create a new user and give it "Reporter" role for the intended group or project.

For the user from step 1, generate a personal_access_token with api access.

Generate a random secret for your app, and save it for later (shared_secret). For example, you can use:

Prepare variables and secrets. Skip this step if you plan on setting these as environment variables when running the agent:

In the configuration file/variables:

In the secrets file/variables:

Build a Docker image for the app and optionally push it to a Docker repository. We'll use Dockerhub as an example:

Create a webhook in your GitLab project. Set the URL to http[s]://<PR_AGENT_HOSTNAME>/webhook, the secret token to the generated secret from step 3, and enable the triggers push, comments and merge request events.

Test your installation by opening a merge request or commenting on a merge request using one of PR Agent's commands.

Note that since AWS Lambda env vars cannot have "." in the name, you can replace each "." in an env variable with "__". For example: GITLAB.PERSONAL_ACCESS_TOKEN --> GITLAB__PERSONAL_ACCESS_TOKEN

Build a docker image that can be used as a lambda function

shell docker buildx build --platform=linux/amd64 . -t codiumai/pr-agent:gitlab_lambda --target gitlab_lambda -f docker/Dockerfile.lambda

Create a lambda function that uses the uploaded image. Set the lambda timeout to be at least 3m.

For production Lambda deployments, use AWS Secrets Manager instead of environment variables:

Important: When using Secrets Manager, GitLab's webhook secret must be the Secrets Manager secret name.

**Examples:**

Example 1 (sass):
```sass
stages:
  - pr_agent

pr_agent_job:
  stage: pr_agent
  image:
    name: codiumai/pr-agent:latest
    entrypoint: [""]
  script:
    - cd /app
    - echo "Running PR Agent action step"
    - export MR_URL="$CI_MERGE_REQUEST_PROJECT_URL/merge_requests/$CI_MERGE_REQUEST_IID"
    - echo "MR_URL=$MR_URL"
    - export gitlab__url=$CI_SERVER_PROTOCOL://$CI_SERVER_FQDN
    - export gitlab__PERSONAL_ACCESS_TOKEN=$GITLAB_PERSONAL_ACCESS_TOKEN
    - export config__git_provider="gitlab"
    - export openai__key=$OPENAI_KEY
    - python -m pr_agent.cli --pr_url="$MR_URL" describe
    - python -m pr_agent.cli --pr_url="$MR_URL" review
    - python -m pr_agent.cli --pr_url="$MR_URL" improve
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
```

Example 2 (swift):
```swift
SHARED_SECRET=$(python -c "import secrets; print(secrets.token_hex(10))")
```

Example 3 (unknown):
```unknown
git clone https://github.com/qodo-ai/pr-agent.git
```

Example 4 (unknown):
```unknown
docker build . -t gitlab_pr_agent --target gitlab_webhook -f docker/Dockerfile
docker push codiumai/pr-agent:gitlab_webhook  # Push to your Docker repository
```

---
