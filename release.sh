#!/bin/bash

set -e

npm run build

rm -rf target
mkdir -p target/data/webapps/usr-bili-danmu
cp -r build/* target/data/webapps/usr-bili-danmu

cd target
tar zcvf usr-bili-danmu.tgz ./data/webapps/usr-bili-danmu

sh ~/script/aliyun/207-scp-aliyun.sh usr-bili-danmu.tgz