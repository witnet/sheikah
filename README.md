<div align="center">
    <h1><img src="https://raw.githubusercontent.com/witnet/sheikah/master/.github/header.png" alt="Sheikah"/></a></h1>
    <a href="https://travis-ci.com/witnet/sheikah"><img src="https://travis-ci.com/witnet/sheikah.svg?branch=master" alt="Build Status" /></a>
    <a href="https://github.com/witnet/sheikah/blob/master/LICENSE"><img src="https://img.shields.io/github/license/witnet/sheikah.svg" alt="GPLv3 Licensed" /></a>
    <a href="https://github.com/witnet/sheikah/graphs/contributors"><img src="https://img.shields.io/github/contributors/witnet/sheikah.svg" alt="GitHub contributors" /></a>
    <a href="https://github.com/witnet/sheikah/commits/dev"><img src="https://img.shields.io/github/last-commit/witnet/sheikah.svg" alt="Github last commit" /></a>
    <a href="https://witnet.crowdin.com/sheikah-witnet-wallet"><img src="https://badges.crowdin.net/e/b5251f26e4f4f95a5e772859afa9e492/localized.svg" alt="Crowdin localization" /></a>
    <br /><br />
    <p><strong>Sheikah</strong> is a <a href="https://witnet.io/">Witnet</a> compatible desktop wallet and data requests development environment.</p>
</div>

## Installation

### Dependencies

At this time, you have to install the following dependencies to run sheikah:

- `openssl`

### From Github Releases

Go to [releases](https://github.com/witnet/sheikah/releases) section and download the binary suitable for your system.

## Sheikah Development

This is a Web/Desktop application built with [Electron](https://electronjs.org/). When developing Sheikah, we support **Node CURRENT and LTS+**. It might work with another version but we do not guarantee it will do in the future.

### Running Sheikah

```bash
# clone the repository
git clone git@github.com:witnet/sheikah.git

# cd into the cloned repository
cd sheikah

# install application dependencies
pnpm install

# launch development application
pnpm dev
```

### Formatter

- Verify files are correctly formatted with `pnpm lint:check`
- Repair lint errors with (**this operation modifies your files!**) `pnpm lint`

### Test

We use [Jest](https://facebook.github.io/jest/) for testing.

```bash
# run unit tests
pnpm test
```

### Build

#### Production

To build the application run: `pnpm build`, the build files are written to `dist_electron` directory.

### Contributing

You can read the [contributing guide](https://github.com/witnet/sheikah/blob/master/.github/CONTRIBUTING.md)

#### Github Actions (continuous integration)

When opening a pull request a job in [Github Actions](https://github.com/features/actions) will be fired off to check the changes. To avoid wasting time waiting for Github Actions output we provide the command `pnpm ci` that will perform almost the same checks but it'll run in your computer.

#### Troubleshooting

- Use `pnpm clean` to remove the contents of the build directory (`dist_electron`)
- Use `pnpm clean-deps` to remove all installed dependencies
- Use `pnpm reinstall` to remove all installed dependencies and install them again

If the application doesn't boot correctly and no error is reported in the terminal, try running `pnpm reinstall` and try again.

## Release

Releases are created using [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder). A new draft release will be publish naming a commit and a tag as v*.*.\*
