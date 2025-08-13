# github-config

🤖️ Centralized hub for AntV's shared GitHub templates and workflows.

## Quick Start

Use the following command to **sync the AntV's shared config to your project**.

1. Install

```bash
npm install @antv/github-config-cli -g  # or use pnpm/yarn
```

2. Run in your project **root**

```bash
cd your-project-root

# 同步所有配置
sync-shared-config

# 仅同步 Issue 模板
sync-shared-config -i # or sync-shared-config --issue-templates

# 仅同步 GitHub Actions 工作流
sync-shared-config -w # or sync-shared-config --workflows
```

3. ✨ Now you can find the AntV's shared config in `your-project-root/.github` directory, including:

- [Label configurations](#labels)
- [GitHub Actions workflows](#github-actions-workflows)
- [Issue templates](#issue-templates)
- [Pull request template](#pull-request-template)

### Labels

Below are charts describing all of the common labels across the AntV repos.

> **Important**: Standard AntV labels are integrated with automated workflows. Modifying or removing these labels may break automation processes.

We divide them based on the typical flow of an issue's lifecycle: **Discovery**, **Triaging**, **In Progress**, **Resolution**.

#### 1. Discovery Stage (Labels that help in identifying the issue and gathering more context)

| Label | Color | Hex | Description |
| --- | --- | --- | --- |
| waiting for maintainer | ![](https://dummyimage.com/100x20/bcf5db&text=+) | `#bcf5db` | Triage or intervention needed from a maintainer. |
| waiting for author | ![](https://dummyimage.com/100x20/fef2c0&text=+) | `#fef2c0` | Further information is requested from the author. |
| need improvement | ![](https://dummyimage.com/100x20/fbca04&text=+) | `#fbca04` | Lack of information or incorrect format. |

#### 2. Triaging Stage (Labels that help in categorizing the issue)

| Label | Color | Hex | Description |
| --- | --- | --- | --- |
| bug 🐛 | ![](https://dummyimage.com/100x20/D93F0B&text=+) | `#ee0701` | Something isn't working. |
| documentation 📖 | ![](https://dummyimage.com/100x20/d4c5f9&text=+) | `#d4c5f9` | Improvements or additions to documentation. |
| feature 💡 | ![](https://dummyimage.com/100x20/a2eeef&text=+) | `#a2eeef` | A new feature request or an enhancement proposal. |
| question 💬 | ![](https://dummyimage.com/100x20/cc317c&text=+) | `#cc317c` | This issue is just a question. It will be converted into discussion automatically. |
| duplicate | ![](https://dummyimage.com/100x20/eeeeee&text=+) | `#eeeeee` | This issue or PR already exists and may be closed with a reference to the original. |

#### 3. In Progress Stage (Labels that indicate ongoing works)

| Label | Color | Hex | Description |
| --- | --- | --- | --- |
| good first issue | ![](https://dummyimage.com/100x20/7057ff&text=+) | `#7057ff` | Good for newcomers. |
| help wanted | ![](https://dummyimage.com/100x20/008672&text=+) | `#008672` | Anyone can help, whether you're a seasoned developer or new to the project. |

#### 4. Resolution Stage (Labels for the final stage of an issue when it is either resolved or closed)

| Label | Color | Hex | Description |
| --- | --- | --- | --- |
| resolved | ![](https://dummyimage.com/100x20/008672&text=+) | `#0E8A16` | This issue has been resolved and is now available in the latest release. |
| resolved pending release | ![](https://dummyimage.com/100x20/008672&text=+) | `#0E8A16` | This issue has been resolved and is pending release. |
| stale | ![](https://dummyimage.com/100x20/eeeeee&text=+) | `#eeeeee` | This issue has not had recent activity or appears to be solved. It will be automatically closed. |
| wontfix | ![](https://dummyimage.com/100x20/eeeeee&text=+) | `#eeeeee` | This issue will not be fixed or otherwise handled. It will be automatically closed. |
| notabug | ![](https://dummyimage.com/100x20/eeeeee&text=+) | `#eeeeee` | This issue reported is not a bug (e.g., misreported, not reproducible) and will be automatically closed. |

#### 5. OSCP (Labels for the open source contribution plan)

| Label | Color | Hex | Description |
| --- | --- | --- | --- |
| oscp | ![](https://dummyimage.com/100x20/5E1CFF&text=+) | `#5E1CFF` | This issue is related to the OSCP (Open Source Contribution Plan). |

## GitHub Actions workflows

The following workflows are related to the issue management.

### `mark-duplicate.yml`

This workflow will mark the issue as duplicate if it is a duplicate of another issue.

If you find a duplicate issue, you can quickly handle it by following these steps:

1. Post a comment under the issue in the following format:

```text
Duplicate of #12
```

Where #12 is the number of the original issue.

2. After posting this comment, the workflow will automatically:

- Add the "duplicate" label to the issue
- Remove the "waiting for maintainer" label (if it exists)
- Close the issue
- Create a reference link to the original issue in the comment

### `ensure-triage-label.yml`

This workflow ensures that new issues are added to the triage queue.

When an issue is opened, the workflow automatically:

- Check the current labels
- If no labels are present, add the "waiting for maintainer" label

### `no-response.yml`

Close issues where original author doesn't respond to a request for more information within 7 days.

When an issue is labeled with `waiting for author`, the workflow will automatically:

- Check if the original author has responded to the issue
- If the author has not responded **within 7 days**, close the issue
- If the author has responded, remove the `waiting for author` label and add the `waiting for maintainer` label

### `manage-labeled.yml`

This workflow manages labeled issues.

When an issue is labeled, the workflow will automatically:

1. Triage labels:

   - `bug 🐛`
   - `documentation 📖`
   - `feature 💡`
   - `question 💬`
   - `notabug`
   - `wontfix`
   - `stale`
   - `need improvement`
   - `waiting for author`

   If one of the triage labels is added, the workflow will automatically:

   - Remove `waiting for maintainer`(If exists)

2. If `need improvement` label is added, the workflow will automatically:

   - Add `waiting for author` label
   - Add a pre-canned comment with formatting guidelines

3. If `stale` label is added, the workflow will automatically:

   - Add a pre-canned comment about inactivity
   - Close the issue as not-planned

4. If `wontfix` label is added, the workflow will automatically:

   - Add a pre-canned comment explaining the decision
   - Close the issue as not-planned

5. If `notabug` label is added, the workflow will automatically:

   - Add a pre-canned comment explaining the decision
   - Close the issue as not-planned

6. If `oscp` label is added, the workflow will automatically:

   - Add a pre-canned comment about oscp information

### `resolved-pending-release.yml`

This workflow will resolve issues that have been resolved and are pending release.

When a release is published, the workflow will automatically:

- Find open issues that labeled with `resolved pending release`
- If there are,
  - Remove the `resolved pending release` label
  - Add the `resolved` label
  - Add a comment to the issue with a message about the release
  - Close the issue as completed

### `sync-issue-label.yml`

This workflow syncs the issue labels from the `antvis/github-config` repository to the current repository.

**Important: Manually Trigger the workflow**

## Issue templates

| Template                | Description                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| `1.bug_report.yml`      | Report a bug.                                                                             |
| `2.feature_request.yml` | Request a new feature.                                                                    |
| `3.docs_feedback.yml`   | Give feedback on the docs.                                                                |
| `config.yml`            | Setup for discussion group and contact links. **Make sure to update the URLs as needed.** |

> **Note:** This is a generic template. Please customize the content as necessary for your project. **Do not change the file names.**

## Pull request template
