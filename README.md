<div align="center">
    <h1><img src="https://raw.githubusercontent.com/witnet/sheikah/master/.github/header.png" alt="Sheikah"/></a></h1>
    <a href="https://travis-ci.com/witnet/sheikah"><img src="https://travis-ci.com/witnet/sheikah.svg?branch=master" alt="Build Status" /></a>
    <a href="https://github.com/witnet/sheikah/blob/master/LICENSE"><img src="https://img.shields.io/github/license/witnet/sheikah.svg" alt="GPLv3 Licensed" /></a>
    <a href="https://github.com/witnet/sheikah/graphs/contributors"><img src="https://img.shields.io/github/contributors/witnet/sheikah.svg" alt="GitHub contributors" /></a>
    <a href="https://github.com/witnet/sheikah/commits/dev"><img src="https://img.shields.io/github/last-commit/witnet/sheikah.svg" alt="Github last commit" /></a>
    <br /><br />
    <p><strong>Sheikah</strong> is a <a href="https://witnet.io/">Witnet</a> compatible desktop wallet and data requests development environment.</p>
</div>

## Current status
**Sheikah is still a *Technology Preview***. If you run it, you will find:

- **Features that work**: wallets creation, seed phrase export, addresses generation and addresses listing.
- **Features that are partially implemented**: transactions listing, data requests listing, data requests editor.
- **Features that are still missing**: Sheikah Marketplace, data requests deployment and selection of full node to use as backend.

All of these features will be made available along the first Witnet testnet during 2020 Q2.


## Sheikah Development

This is a Web/Desktop application built with [Electron](https://electronjs.org/). When developing Sheikah, we support **Node CURRENT and LTS+**. It might work with another version but we do not guarantee it will do in the future.

### Installing witnet-rust binary

As Sheikah is still in development, you need to run manually the `witnet-node` and the `witnet-wallet` to make it work. The fastest way to achieve that is by running the 'witnet-rust' binary. There is a detailed explanation in this [post](https://medium.com/witnet/how-to-run-a-full-node-on-the-witnet-testnet-911986b8add3).

Once this has been achieved, you can run a `witnet-node` and a `witnet-wallet`.

#### witnet-node

```bash
./witnet node server
```

#### witnet-wallet

```bash
./witnet --trace wallet server
```

### Running Sheikah

``` bash
# clone the repository
git clone git@github.com:witnet/sheikah.git

# cd into the cloned repository
cd sheikah

# install application dependencies
yarn

# launch development application
yarn electron:serve
```

### Formatter

* Verify files are correctly formatted with `yarn lint`
* Repair lint errors with (**this operation modifies your files!**) `yarn lint!`

### Test

We use [Jest](https://facebook.github.io/jest/) for testing.

``` bash
# run unit/e2e tests
yarn test

# run e2e tests
yarn test:e2e

# run unit tests
yarn test:unit
```

### Build

#### Production

To build the application run: `yarn electron:build`, the build files are written to `dist_electron` directory.

### Contributing

You can read the [contributing guide](https://github.com/witnet/sheikah/blob/master/.github/CONTRIBUTING.md)

#### Travis (continuous integration)

When opening a pull request a job in [Travis](https://travis-ci.com/) will be fired off to check the changes. To avoid wasting time waiting for Travis output we provide the command `yarn ci` that will perform almost the same checks but it'll run in your computer.

#### Troubleshooting

* Use `yarn clean` to remove the contents of the build directory (`dist_electron`)
* Use `yarn clean-deps` to remove all installed dependencies
* Use `yarn reinstall` to remove all installed dependencies and install them again

If the application doesn't boot correctly and no error is reported in the terminal, try running `yarn reinstall` and try again.

## Installation

### From Github Releases
⚠️ Due to this project is under development it doesn't have any release yet and has to be run as specified in [Sheikah Development](#Sheikah-development) ⚠️

~~Go to [releases](https://github.com/witnet/sheikah/releases) section and download the binary suitable for your system.~~