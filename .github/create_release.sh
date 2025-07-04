#!/bin/sh

rm -rf ./release/*.crx
rm -rf ./release/*.zip
rm -rf ./release/*.txt

echo "Create Firefox development release"
cd ./build/firefox
zip -r firefox.zip .
cp ./firefox.zip "../../release/firefox_source_$NEW_VERSION.zip"
sha256sum "../../release/firefox_source_$NEW_VERSION.zip" > "../../release/firefox_source_$NEW_VERSION.sha256sum.txt"

echo "Create Chrome crx testing release"
cd ../chrome
crx pack ../chrome -p ../../plugin.pem -o "../../release/chrome_plugin_$NEW_VERSION.crx"
sha256sum "../../release/chrome_plugin_$NEW_VERSION.crx" > "../../release/chrome_plugin_$NEW_VERSION.sha256sum.txt"

echo "Create Chrome development release"
zip -r chrome.zip .
cp ./chrome.zip "../../release/chrome_source_$NEW_VERSION.zip"
sha256sum "../../release/chrome_source_$NEW_VERSION.zip" > "../../release/chrome_source_$NEW_VERSION.sha256sum.txt"
