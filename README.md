<div align="center">
    <h1><img src="https://raw.githubusercontent.com/witnet/sheikah/master/.github/header.png" alt="Sheikah"/></a></h1>
    <a href="https://gitter.im/witnet/sheikah?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/witnet/sheikah.svg" alt="Join the chat at https://gitter.im/witnet/sheikah" /></a>
    <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly" /></a>
    <a href="https://travis-ci.org/witnet/sheikah"><img src="https://travis-ci.org/witnet/sheikah.svg?branch=master" alt="Build Status" /></a>
    <a href="https://houndci.com"><img src="https://img.shields.io/badge/code_quality-houndci-a873d1.svg" alt="Protected by HoundCI" /></a>
    <a href="https://github.com/witnet/sheikah/blob/master/LICENSE"><img src="https://img.shields.io/github/license/witnet/sheikah.svg" alt="GPLv3 Licensed" /></a>
    <a href="https://github.com/witnet/sheikah/graphs/contributors"><img src="https://img.shields.io/github/contributors/witnet/sheikah.svg" alt="GitHub contributors" /></a>
    <a href="https://github.com/witnet/sheikah/commits/master"><img src="https://img.shields.io/github/last-commit/witnet/sheikah.svg" alt="Github last commit" /></a>
    <br /><br />
    <p><strong>Sheikah</strong> is a <a href="https://witnet.io/">Witnet</a> compatible desktop wallet and smart contracts development environment.</p>
</div>


<h2 align="center">Installation</h2>

TODO

<h2 align="center">Development</h2>

This is a Web/Desktop application built with [Electron](https://electronjs.org/) and uses the [electron-react-typescript](https://github.com/iRath96/electron-react-typescript-boilerplate) template as its base with a few tweaks.

For developing we recommend you use [yarn](https://yarnpkg.com/en/) instead of npm.

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

* Verify files are correctly formatted with `yarn fmt-verify`
* See which format errors exist with `yarn fmt`
* Repair format errors with (**this operation modifies your files!**) `yarn fmt!`

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

To build the application run: `yarn build`, the build files are written to `dist` directory. To run the application using the generated build execute `yarn electron dist/main`

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
