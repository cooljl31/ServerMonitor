#!/bin/bash
# Note: if you update this file and deploy, this script will be invoke on the server.

D=$(date +"%m_%d_%Y")
LOG=./logs/restart_$D.log
echo === $D === > $LOG
pm2 stop all >> $LOG
pm2 start ./server.js >> $LOG
pm2 save
echo Restart after commit $HG_NODE >> $LOG
