#!/bin/bash

echo 'Downloading latest witnet node release...'

wget $(curl -s https://api.github.com/repos/witnet/witnet-rust/releases/latest | grep 'browser_' | cut -d\" -f4)

tar -zxvf witnet-*-x86_64-unknown-linux-gnu.tar.gz

echo 'Running witnet node'

./witnet -c ci/witnet.toml node server &

sleep 10s

echo 'Running witnet wallet'
./witnet -c ci/witnet.toml wallet server &

