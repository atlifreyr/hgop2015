#!/bin/bash
docker push atlifreyr/tictactoe
ssh 192.168.4.20 "docker kill tttapp; docker rm tttapp; docker pull atlifreyr/tictactoe; docker run -p 9000:8080 --name tttapp -d -e "NODE_ENV=production" atlifreyr/tictactoe"
