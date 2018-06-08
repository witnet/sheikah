# sheikah

[![Join the chat at https://gitter.im/witnet/sheikah](https://badges.gitter.im/witnet/sheikah.svg)](https://gitter.im/witnet/sheikah?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/witnet/sheikah.svg?branch=master)](https://travis-ci.org/witnet/sheikah)
[![Codacy Badge](https://camo.githubusercontent.com/c38f3e3c5750cbf4aeb4ca06be6a3df02277995d/68747470733a2f2f6170692e636f646163792e636f6d2f70726f6a6563742f62616467652f47726164652f3433333239343435393066383436346639623337323966366137393563653065)](https://www.codacy.com/app/adansdpc/sheikah?utm_source=github.com&utm_medium=referral&utm_content=witnet/sheikah&utm_campaign=Badge_Grade)

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

To package the application into an executable for your platform (Windows, MacOS, GNU/Linux) run any of the following commands. The packaged application will be written to `release` folder.

#### Production build

``` bash
yarn package

# other variants are
yarn package-linux
yarn package-win
yarn package-all # equivalent to yarn package
```

#### Development build

``` bash
yarn package-dev

# other variants are
yarn package-linux-dev
yarn package-win-dev
yarn package-all-dev # equivalent to yarn package-dev
```
