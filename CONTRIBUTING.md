# Contribution Guide

This project is owned by Carleton University's rocketry design team (CUInSpace). It is free, open source and maintained
by members of CUInSpace.

**This project is currently only accepting contributions from CUInSpace members!**

## Rules

- Be kind
- Respect maintainers and contributors
- Provide constructive feedback free of insults

## Contributions

All types of contributions are welcome, regardless of size or impact. You may contribute:

- [Bug reports/fixes](#bug-reports-fixes)
- [Feature requests/features](#feature-requests-feature-additions)
- [Documentation updates](#documentation-contributions)
- [Typo fixes](#documentation-contributions)
- [Pull request reviews, or reviews of merged code](#code-reviews)
- [Suggestions of any kind](#suggestions)

To submit pull requests, please fork the repository and make your changes on a branch of your fork with a descriptive
name. If your pull request closes an issue, please mention the issue in the description (i.e. `closes issue #123`).

If you have permissions to create branches in the repository, you can alternatively create a pull request by creating a
new branch in the main repository and opening a pull request that way.

### Bug Reports/Fixes

Before opening an issue for a bug, please check the existing (open and closed) issues in case a report has already been
made.

**Existing Reports**

If a bug report already exists, please use GitHub reactions to boost its visibility. You may also add additional
information in the thread comments if you have something that can help and it wasn't already mentioned.

**New Reports**

If there is no existing report for the bug you are experiencing, please open an issue and add the following information:

- A description of the issue you are experiencing
- Steps to reproduce the bug
- Screenshots, video, error logs and any other helpful supporting information
- Your operating system and any other software versions that you think could have an impact on this issue

**Fixing Bugs**

If you would like to work on fixing a bug (one that has already been reported or that you have reported using the steps
outline above), you may assign yourself to the issue and create a fork/alternate branch to begin working on the issue.
If another contributor has already started development, reach out to them for permission to collaborate. Ensure that you
follow the [conventions](#conventions).

### Feature Requests & Feature Additions

Before opening a feature request, please check the existing (open and closed) issues in case it has already been
requested.

**Existing Requests**

If the feature request already exists, please use GitHub reactions to help promote it. If the feature request is there,
but you have something additional to add on to the description, please use the thread comments to add your additional
information.

**New Requests**

If the feature you'd like hasn't yet been requested, please open a GitHub issue to describe it. You should include:

- Full description of the feature you'd like added
- Reasoning or context on why the feature should be added

For both existing and new feature requests, it's recommended that you wait to have your request looked at by a
maintainer before opening a pull request and beginning work, in case any modifications are made to your original
proposal.

**Adding the Feature**

If you would like to take up a feature, assign yourself to the issue and open a feature branch on your fork of the
repository. If another contributor has already started development, reach out to them for permission to collaborate.
Ensure that you follow the [conventions](#conventions).

Make sure that your pull request changes also include the addition of new tests which cover the feature you've added (if
applicable.)

### Documentation Contributions

**Typos**

For typos, please open a pull request mentioning a typo fix in the title. It does not need a full description, just a
mention that it is a typo fix. It should be merged right away.

**DO NOT** create typo fix PRs to change locale spelling. CUInSpace is a Canadian team, and will not accept changes for
things like `colour -> color`. These are not typos.

**Code Documentation**

For code documentation, please follow the current format of the plugin docs. You should include the following in your
pull request description:

- What the documentation was lacking/unclear on
- A summary of what you added

### Code Reviews

Speak your mind, provide any feedback you think may be helpful in improving the code. **DO NOT** belittle or otherwise
insult the pull request author or leave condescending reviews. Negative feedback is appreciated and encouraged for
improvement, but disrespect will not be tolerated.

### Suggestions

If your suggestion does not fall under any of the previous categories (documentation change, feature request or bug),
you can check the issues (opened and closed) to see if it has already been suggested.

**Existing**

If it has, boost it with a GitHub reaction and leave any supporting information that hasn't been covered in the issue
comments.

**New Suggestions**

If your suggestion hasn't been made yet, please open a GitHub issue and add the following to your description:

- As much context as you think is necessary for your suggestion
- Motivation for the suggestion

Please treat suggestions like code reviews. Your suggestion can include negative feedback about the project, but it
should be respectful.

## Conventions

### Commit Messages

Your commit messages should be descriptive. Commit messages like "fixed bug" are not descriptive. You can mention issues
in your commit messages if your commit resolves an issue. For instance, to close an example memory leak bug (issue
number 123), the commit message might be:

```
Closes #123: Added free() call to clean up telemetry process so that there is no longer a memory leak.
```

Make sure that your changes are logically bundled into commits. Do not include a separate commit for formatting changes.
If you make a typo and go back to fix it, don't include a separate commit of "fixing typo". Instead, try to squash it
into a previous commit with the relevant changes using `git rebase`.

### Issues

Label your issue appropriately (bug, enhancement, documentation, etc). Please add as much information as you believe is
necessary in the description.

If you decide to work on an issue (by adding code, documentation or anything else via a pull request), please assign
yourself to the issue.

### Pull Requests

Make sure your pull request branch has a descriptive title. Your pull request title should also be descriptive (and will
usually be a little longer than your branch title).

When you open a pull request for your contribution, please include the following in the description:

- Reason for change/any appropriate context.
- Issue that is being closed (if applicable), in a format like `closes #123`.

Be sure to request reviews from other contributors and the repository maintainers. Assign yourself to the pull request
to receive updates. Be prepared in case revisions are requested!

If your pull request is a work in progress, you can mark it as a draft until it's ready.

**Code**

- Adhere to the existing code format when possible.
- Avoid pushing any files that are not necessary (i.e. metafiles, config files).
- If linting or formatting is enforced for the repository, run the checks locally and fix errors before opening a PR
- If test suites are included for the repository, run them before opening a PR to ensure full passes
