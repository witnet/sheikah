
#!/bin/bash
until [ $( echo '{"jsonrpc":"2.0","id":1,"method":"syncStatus"} ' | ./witnet -c witnet.toml node raw | grep '"synchronized":true' ) ]
do
  echo 'Waiting until node is sync...'
  sleep 5s
done

echo 'Witnet node is sync'