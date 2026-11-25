#!/bin/sh
echo "Create rules release"
rm -rf ./release/*.json
rm -rf ./release-rules/*.json

npm run build:rules
cp ./release-rules/*.json ./release
sha256sum "./release/latest_rules.json" > "./release/latest_rules.sha256sum.txt"
sha256sum "./release/latest_rules_debug.json" > "./release/latest_rules_debug.sha256sum.txt"
