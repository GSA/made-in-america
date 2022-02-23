# Welcome!

We're so glad you're thinking about contributing to a [open source project of the U.S. government](https://code.gov/)! If you're unsure about anything, just ask -- or submit the issue or pull request anyway. The worst that can happen is you'll be politely asked to change something. We love all friendly contributions.

We encourage you to read this project's CONTRIBUTING policy (you are here), its [LICENSE](LICENSE.md), and its [README](README.md).

## Policies

We want to ensure a welcoming environment for all of our projects. Our staff follow the [TTS Code of Conduct](https://18f.gsa.gov/code-of-conduct/) and all contributors should do the same.

We adhere to the [18F Open Source Policy](https://github.com/18f/open-source-policy). If you have any questions, just [shoot us an email](mailto:18f@gsa.gov).

## Public domain

This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0 dedication. By submitting a pull request or issue, you are agreeing to comply with this waiver of copyright interest.

## Guides

Follow the [18F Front End Coding Style Guide](https://pages.18f.gov/frontend/) and [Accessibility Guide](https://pages.18f.gov/accessibility/checklist/)

## Branch Management

### Branches

> We deploy and branch off `main`
>
> We group release work together on `develop`

### Workflow

Your Workflow should look like this,

```
^
|
|-----.
|     |_____.
|     |     |
|     |     |
|     |     |
|     |     |
|--------feature/
|     |
|--develop
|
main
```

### Naming

The following branch naming conventions can be pre-pended to your branch name

- `feature/`
- `bug/`
- `content/`
- `hotfix/`
- `test/`
- `docs/`

Additionally, branch names should follow the following convention

`<brief-ticket-description>-<ticket-number>`

an example of a properly formatted branch name looks like this,

`feature/appends-icon-TKT-633`

### Code Review

We run precommit hooks with husky to handle prettier and lint errors.

To prepare for code review, please follow the following checks.

- branch has detailed description of work/updates
- title format follows: `[Ticket Number] : Brief statement describing what this pull request solves`.
- passed all integrated testing
- pipeline has completed successfully
- federalist preview has been generated
- code review/design review requested as appropriate
- branch/preview link updated in ticket
