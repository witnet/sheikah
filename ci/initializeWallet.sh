#!/bin/bash

echo 'Downloading latest witnet node release...'

# Retry curl until success
while URL=$(curl -s https://api.github.com/repos/witnet/witnet-rust/releases/latest | grep 'browser_' | cut -d\" -f4); [ "$URL" = "" ]; do
    echo 'Github is down, retrying in 10s'
    sleep 10s
done

# Retry wget until success
# https://stackoverflow.com/a/30986740
while true; do
    wget -T 15 -c $URL && break
done

tar -zxvf witnet-*-x86_64-unknown-linux-gnu.tar.gz

echo 'Running witnet node'

./witnet -c ci/witnet.toml node server &

sleep 10s

echo 'Running witnet wallet'
./witnet -c ci/witnet.toml wallet server &

