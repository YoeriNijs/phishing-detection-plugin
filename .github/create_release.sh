#!/bin/sh

rm -rf ./release/*.crx
rm -rf ./release/*.zip
rm -rf ./release/*.txt

cd ./build/firefox
crx pack ../firefox -p ../../plugin.pem -o "../../release/firefox_plugin_$NEW_VERSION.crx"
sha256sum "../../release/firefox_plugin_$NEW_VERSION.crx" > "../../release/firefox_plugin_$NEW_VERSION.sha256sum.txt"
echo "Created Firefox crx file"

zip -r firefox.zip .
cp ./firefox.zip "../../release/firefox_source_$NEW_VERSION.zip"
sha256sum "../../release/firefox_source_$NEW_VERSION.zip" > "../../release/firefox_source_$NEW_VERSION.sha256sum.txt"
echo "Created Firefox release version $NEW_VERSION"

cd ../chrome
crx pack ../chrome -p ../../plugin.pem -o "../../release/chrome_plugin_$NEW_VERSION.crx"
sha256sum "../../release/chrome_plugin_$NEW_VERSION.crx" > "../../release/chrome_plugin_$NEW_VERSION.sha256sum.txt"
echo "Created Chrome crx file"

zip -r chrome.zip .
cp ./chrome.zip "../../release/chrome_source_$NEW_VERSION.zip"
sha256sum "../../release/chrome_source_$NEW_VERSION.zip" > "../../release/chrome_source_$NEW_VERSION.sha256sum.txt"
echo "Created Chrome release version $NEW_VERSION"