# github-config

🔧 Centralized hub for AntV's shared GitHub templates and workflows.

## Quick Start

1. Install

```bash
npm install @antv/github-config-cli -g  # or use pnpm/yarn
```

2. Run in your project root

```bash
sync-shared-config
```

This will sync the following configurations from `antvis/github-config`:

- [Label configurations](#labels)
- [GitHub Actions workflows](#github-actions-workflows)
- [Issue templates](#issue-templates)
- [Pull request template](#pull-request-template)

✅ **Recommended**:

- Add tech stack specific workflows
- Extend labels with stack-specific categories, e.g. `extension:behavior`
- Modify issue template for specific scenarios

⚠️ **Not Recommended**:

- Modifying existing workflow file names or core logic
- Changing standardized AntV label names or removing them
- Altering the structure of shared templates

> **Important**: Standard AntV labels are integrated with automated workflows. Modifying or removing these labels may break automation processes.

### Labels

Below are charts describing all of the common labels across the AntV repos. We divide them based on the typical flow of an issue's lifecycle: **Discovery**, **Triaging**, **In Progress**, **Resolution**.

#### 1. Discovery Stage (Labels that help in identifying the issue and gathering more context)

| Label                  | Color                                            | Hex       | Description                                       |
| ---------------------- | ------------------------------------------------ | --------- | ------------------------------------------------- |
| waiting for maintainer | ![](https://dummyimage.com/100x20/bcf5db&text=+) | `#bcf5db` | Triage or intervention needed from a maintainer.  |
| waiting for author     | ![](https://dummyimage.com/100x20/fef2c0&text=+) | `#fef2c0` | Further information is requested from the author. |
| need improvement       | ![](https://dummyimage.com/100x20/fbca04&text=+) | `#fbca04` | Lack of information or incorrect format.          |

#### 2. Triaging Stage (Labels that help in categorizing the issue)

| Label            | Color                                            | Hex       | Description                                                                                              |
| ---------------- | ------------------------------------------------ | --------- | -------------------------------------------------------------------------------------------------------- |
| bug 🐛           | ![](https://dummyimage.com/100x20/D93F0B&text=+) | `#ee0701` | Something isn't working.                                                                                 |
| documentation 📖 | ![](https://dummyimage.com/100x20/d4c5f9&text=+) | `#d4c5f9` | Improvements or additions to documentation.                                                              |
| feature 💡       | ![](https://dummyimage.com/100x20/a2eeef&text=+) | `#a2eeef` | A new feature request or an enhancement proposal.                                                        |
| question 💬      | ![](https://dummyimage.com/100x20/cc317c&text=+) | `#cc317c` | This issue is just a question. It will be converted into discussion automatically.                       |
| duplicate        | ![](https://dummyimage.com/100x20/eeeeee&text=+) | `#eeeeee` | This issue or PR already exists and may be closed with a reference to the original.                      |
| notabug          | ![](https://dummyimage.com/100x20/eeeeee&text=+) | `#eeeeee` | This issue reported is not a bug (e.g., misreported, not reproducible) and will be automatically closed. |

#### 3. In Progress Stage (Labels that indicate ongoing works)

| Label            | Color                                            | Hex       | Description                                                                 |
| ---------------- | ------------------------------------------------ | --------- | --------------------------------------------------------------------------- |
| good first issue | ![](https://dummyimage.com/100x20/7057ff&text=+) | `#7057ff` | Good for newcomers.                                                         |
| help wanted      | ![](https://dummyimage.com/100x20/008672&text=+) | `#008672` | Anyone can help, whether you're a seasoned developer or new to the project. |

#### 4. Resolution Stage (Labels for the final stage of an issue when it is either resolved or closed)

| Label   | Color                                            | Hex       | Description                                                                                      |
| ------- | ------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------ |
| stale   | ![](https://dummyimage.com/100x20/eeeeee&text=+) | `#eeeeee` | This issue has not had recent activity or appears to be solved. It will be automatically closed. |
| wontfix | ![](https://dummyimage.com/100x20/eeeeee&text=+) | `#eeeeee` | This issue will not be fixed or otherwise handled. It will be automatically closed.              |

## GitHub Actions workflows

## Issue templates

## Pull request template
