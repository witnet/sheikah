#!/bin/bash

echo 'Initializing witnet'

bash ci/initializeWallet.sh $1

bash ci/waitUntilIsNodeSync.sh

echo 'Witnet is ready'