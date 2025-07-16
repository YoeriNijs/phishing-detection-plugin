#!/bin/sh
echo "Create rules release"
rm -rf ./release/*.json
rm -rf ./release-rules/*.json

npm run build:rules
cp ./release-rules/latest_rules.json ./release
sha256sum "./release/latest_rules.json" > "./release/latest_rules.sha256sum.txt"
