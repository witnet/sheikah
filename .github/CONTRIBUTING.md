# Contributing to Sheikah

:tada: Thank you for being interested in contributing to Sheikah! :tada:

The following is a set of guidelines and helpful pointers for contributing to Sheikah.
The keyword here is guidelines, not rules. As such, use your best judgement and feel free to propose changes to even this document.

## Code of conduct

Everyone participating in this project is governed by the [Witnet Code of Conduct][code].
By participating, you are expected to uphold this code as well.

## I just have a question

Please don't file an issue with questions.
It's easier for you and for us if you go directly to [our Gitter chatroom][gitter], since it will keep our repositories clean and you will get a faster response.

## How can I contribute?

### Reporting bugs

This section guides you through submitting a bug report. This helps contributors and maintainers understand your report, reproduce the behavior, and in turn squash the bug.

Before submitting a bug report, please make sure that you've searched through the issues and that there isn't already an issue describing the same issue you are having.

### How do I submit a good bug report?

Bugs are tracked as [GitHub issues][issues].

Explain the problem and include additional details to help maintainers reproduce the problem:

* Use a clear and descriptive title for the issue to identify the problem.
* Describe the exact steps which reproduce the problem in as many details as possible.
* Provide specific examples to demonstrate the steps. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use Markdown code blocks.
* Describe the behavior you observed after following the steps and point out what exactly is the problem with that behavior.
* Explain which behavior you expected to see instead and why.
* Post a screenshot or a dump of the developer console
* If the problem wasn't triggered by a specific action, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* Did the problem start happening recently (e.g. after updating to a new version) or was this always a problem?
* If the problem started happening recently, can you reproduce the problem in an older version of Sheikah? What's the most recent version in which the problem doesn't happen?
* Can you reliably reproduce the issue? If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* Which version of Node are you using? You can get the exact version by running node -v in your terminal.
* What's your operating system and version?

## Suggesting enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.
Following these guidelines helps maintainers and the community understand your suggestion.

Before creating enhancement suggestions, please double check that there is not already an existing feature suggestion for your feature, as you might find out that you don't need to create one.
When you are creating an enhancement suggestion, please include as many details as possible.

### How Do I Submit A Good Enhancement Suggestion?

Enhancement suggestions are tracked as GitHub issues. Create an issue on that repository and provide the following information:

* Use a clear and descriptive title for the issue to identify the suggestion.
* Provide a step-by-step description of the suggested enhancement in as many details as possible.
* Provide specific examples to demonstrate the steps. Include copy/pasteable snippets which you use in those examples, as Markdown code blocks.
* Describe the current behavior and explain which behavior you expected to see instead and why.
* Explain why this enhancement would be useful to most users and isn't something that can or should be implemented as a community package.

## Pull Requests

* Do not include issue numbers in the PR title
* Follow [our TypeScript styleguide][styleguide]
* Avoid platform-dependent code
* Place imports in the following order:
*    External Node modules, referred by package name (such as `os` or `path`)
*    Local Modules, using relative paths

## Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these good first issue issues:

* [Good first issue][first-issue] - issues which should only require a few lines of code, and a test or two.

## Styleguides

### Commits

* Use the infinitive mood:
*    "Add feature", not "Added feature"
*    "Move cursor to..." not "Moves cursor to..."
* Try to make the first line of your commit message be around 50 characters long
* Trim all lines in your commit message to 72 characters
* Do not include issue numbers in the first line of your commit message
* Reference issues and pull requests liberally after the first line
* [Verify your commits][signing-commits] before creating a pull request
* Standardize your commits:
    - use `yarn commit` to write the commit message with the interactive guide
    - clean up the problem/warnings from check before pushing your commits

    A good rule of thumb is that your commit message follows these rules if you can prefix it with "This commit will ..." and it makes sense.

    For example, "This commit will add a feature" vs "This commit will added a feature".

### TypeScript

All TypeScript must adhere to [our TypeScript styleguide][styleguide].

## Copyright
These guidelines are based on the [AragonJS contributing guidelines][aragonjs], published under the [Creative Commons Zero v1.0 Universal License][CC0].

[gitter]: https://gitter.im/witnet/sheikah
[issues]: https://github.com/witnet/sheikah/issues
[code]: https://github.com/witnet/sheikah/blob/master/.github/CODE_OF_CONDUCT.md
[signing-commits]: https://help.github.com/articles/signing-commits-with-gpg/
[styleguide]: https://github.com/witnet/sheikah/blob/master/docs/STYLEGUIDE.md
[first-issue]: https://github.com/witnet/sheikah/labels/good%20first%20issue
[aragonjs]: https://wiki.aragon.one/submodules/aragon.js/CONTRIBUTING/
[CC0]: https://github.com/aragon/aragon-wiki/blob/master/LICENSE
