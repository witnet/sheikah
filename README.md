# sheikah

[![Join the chat at https://gitter.im/witnet/sheikah](https://badges.gitter.im/witnet/sheikah.svg)](https://gitter.im/witnet/sheikah?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A [Witnet](https://witnet.io/) compatible desktop wallet and smart contracts development environment.

## Installation

TODO

## Development

This is a Web/Desktop application built with [Electron](https://electronjs.org/) and uses the [electron-react-typescript](https://github.com/iRath96/electron-react-typescript-boilerplate) template as its base with a few tweaks.

For developing we recommend you use [yarn](https://yarnpkg.com/en/) instead of npm.

### Quickstart

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

### Formatter

* Verify files are correctly formatted with `yarn fmt-verify`
* See which format errors exist with `yarn fmt`
* Repair format errors with (**this operation modifies your files!**) `yarn fmt!`

### Test

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

### Build

To build the application run: `yarn build`, the build files are written to `dist` directory. To run the application using the generated build execute `yarn electron dist/main`

### Package

To package the application into an executable for your platform (Windows, MacOS, GNU/Linux) run:

#### Production build

``` bash
yarn package
```

#### Development build

``` bash
yarn package-dev
```
