#!/bin/bash

echo 'Initializing witnet'

bash ci/initializeWallet.sh

bash ci/waitUntilIsNodeSync.sh

echo 'Witnet is ready'