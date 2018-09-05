<div align="center">
    <h1><img src="https://raw.githubusercontent.com/witnet/sheikah/master/.github/header.png" alt="Sheikah"/></a></h1>
    <a href="https://gitter.im/witnet/sheikah?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/witnet/sheikah.svg" alt="Join the chat at https://gitter.im/witnet/sheikah" /></a>
    <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly" /></a>
    <a href="https://travis-ci.com/witnet/sheikah"><img src="https://travis-ci.com/witnet/sheikah.svg?branch=master" alt="Build Status" /></a>
    <a href="https://houndci.com"><img src="https://img.shields.io/badge/code_quality-houndci-a873d1.svg" alt="Protected by HoundCI" /></a>
    <a href="https://github.com/witnet/sheikah/blob/master/LICENSE"><img src="https://img.shields.io/github/license/witnet/sheikah.svg" alt="GPLv3 Licensed" /></a>
    <a href="https://github.com/witnet/sheikah/graphs/contributors"><img src="https://img.shields.io/github/contributors/witnet/sheikah.svg" alt="GitHub contributors" /></a>
    <a href="https://github.com/witnet/sheikah/commits/master"><img src="https://img.shields.io/github/last-commit/witnet/sheikah.svg" alt="Github last commit" /></a>
    <br /><br />
    <p><strong>Sheikah</strong> is a <a href="https://witnet.io/">Witnet</a> compatible desktop wallet, data requests and smart contracts development environment.</p>
</div>

## Current status
**Sheikah is still a *Technology Preview***. If you run it, you will find:

<h2 align="center">Installation</h2>
- **Features that work**: wallets creation, seed phrase export, addresses generation and addresses listing.
- **Features that are partially implemented**: transactions listing, data requests listing and smart contracts listing.
- **Features that are mocked for demo purposes**: data requests editor, smart contracts editor, Sheikah Marketplace.
- **Features that are still missing**: data requests deployment, smart contracts deployment and selection of full node to use as backend.

<h3 align="center">From Github Releases</h3>
All of these features will be made available along the first Witnet testnet during 2019 Q1.

Go to [releases](https://github.com/witnet/sheikah/releases) section and download the binary suitable for your system.

<h3 align="center">From Source</h3>

To install from source follow this instructions in a terminal:

``` bash
git clone https://github.com/witnet/sheikah.git
cd sheikah
yarn
yarn package
```

Then, copy the appropriate binary written in `release` directory. Just click the file to open Sheikah.

<h2 align="center">Logs</h2>

We are using [Electron Log](https://github.com/megahertz/electron-log/) library and we log to both, console and the file in the following location:

* **on Linux**: `~/.config/Sheikah/log.log`
* **on MacOS**: `~/Library/Logs/Sheikah/log.log`
* **on Windows**: `%USERPROFILE%\AppData\Roaming\Sheikah\log.log`

<h3 align="center">Development</h3>

When running in **development** the log level is set to *debug*, *debug*, *info*, *warn*, and *error* messages will be logger.

<h3 align="center">Production</h3>

When running in **production** the log level is set to *warn*, only *warn* and *error* messages will be logged.

<h2 align="center">Sheikah Development</h2>

This is a Web/Desktop application built with [Electron](https://electronjs.org/) and uses the [electron-react-typescript](https://github.com/iRath96/electron-react-typescript-boilerplate) template as its base.

For developing we recommend you use [yarn](https://yarnpkg.com/en/) instead of npm.

When developing Sheikah, we support **Node versions: 8, 9 and 10**. It might work with another version but we do not guarantee it will do in the future.

<h3 align="center">Quickstart</h3>

``` bash
# clone the repository
git clone git@github.com:witnet/sheikah.git

# cd into the cloned repository
cd sheikah

# install application dependencies
yarn

# launch development application
yarn start # or yarn dev
```

<h3 align="center">Formatter</h3>

* Verify files are correctly formatted with `yarn fmt`
* Repair format errors with (**this operation modifies your files!**) `yarn fmt!`

<h3 align="center">Lint</h3>

* Run linters with `yarn lint`. This will run all linters
* Run TypeScript lint with `yarn ts-lint`
* Run styles lint with `yarn stylelint`

<h3 align="center">Test</h3>

We use [Jest](https://facebook.github.io/jest/) for testing. All test commands are a thin wrapper around jest so with any of them you can use [Jest's CLI options](https://facebook.github.io/jest/docs/en/cli.html)

``` bash
# run unit/integration tests
yarn test

# run end-to-end tests
yarn test-e2e

# run all tests
yarn test-all
```

To run specific tests you can use jest directly:

``` bash
# run test specified with a pattern or filename
yarn jest my-test #or
yarn jest path/to/my-test.js

# run tests related to changed files based on hg/git (uncommitted files)
yarn jest -o

# run tests related to path/to/fileA.js and path/to/fileB.js
yarn jest --findRelatedTests path/to/fileA.js path/to/fileB.js

# run tests that match this spec name (match against the name in describe or test, basically).
yarn jest -t name-of-spec

# run tests in watch mode
yarn jest --watch #runs jest -o by default
yarn jest --watchAll #runs all tests
```

<h3 align="center">Build</h3>

<h4 align="center">Production</h4>

To build the application run: `yarn build`, the build files are written to `dist` directory. To run the application using the generated build execute `yarn electron dist/main`

`yarn build` is composed by two sub-tasks:

* `yarn build-renderer`: Build the frontend/ui (React) application that will run in Electron's renderer process
* `yarn build-main`: Build the backend (Node) application that will run in Electron's main process

<h4 align="center">Development</h4>

To build the application run: `yarn build-dev`, the build files are written to `dist` directory. To run the application using the generated build execute `yarn electron dist/main`. Note that in development mode, the application needs a running development server that serves the static assets, this means that you need to run `yarn hot-server` in another terminal in order to view the application with all the assets.

<h3 align="center">Type Checking</h3>

We have separated the transpilation and the type-checking phase for development in order to reduce the time the application needs to boot in development mode. Building/running the application for development with `yarn build-dev`/`yarn start` won't do any type-checking, the same happens when running the tests with `yarn test`.

To type-check the project you should run:

``` bash
yarn typecheck
# or
# yarn typecheck --watch
```

To type-check the project and the tests you should run:

``` bash
yarn typecheck-test
# or
# yarn typecheck-test --watch
```

<h3 align="center">Package</h3>

To package the application into an executable for your platform (Windows, MacOS, GNU/Linux) run any of the following commands. The packaged application will be written to `release` folder.

<h4 align="center">Production build</h4>

``` bash
yarn package
```

<h4 align="center">Development build</h4>

``` bash
yarn package-dev
```

<h3 align="center">Contributing</h3>

<h4 align="center">Commit Messages</h4>

Use the command `yarn commit` when committing changes to follow the same conventions we used for writing commit messages.

<h4 align="center">Travis</h4>

When opening a pull request a job in [Travis](https://travis-ci.com/) will be fired off to check the changes. To avoid wasting time waiting for Travis output we provide the command `yarn travis` that will perform almost the same checks but it'll run in your computer. The command `yarn travisp` does the same but parallelizes some tasks so it'll run faster.

<h3 align="center">Troubleshooting</h3>

* Remember to look at the log file
* Use `yarn clean` to remove the contents of the build and release directories (`dist` and `release`)
* Use `yarn clean-deps` to remove all installed dependencies
* Use `yarn reinstall` to remove all installed dependencies and install them again

If the application doesn't boot correctly and no error is reported in the terminal, try running `yarn reinstall` and try again.
