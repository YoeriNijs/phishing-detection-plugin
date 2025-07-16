#!/bin/sh
echo "Create rules release"
rm -rf ./release/latest_rules.json
npm run build:rules
cp ./release-rules/latest_rules.json ./release