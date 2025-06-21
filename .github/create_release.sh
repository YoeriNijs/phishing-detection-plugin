#!/bin/sh

rm -rf ./release/*.zip
rm -rf ./release/*.txt

zip -r firefox.zip ./build/firefox/
cp ./firefox.zip ./release/firefox.zip
sha256sum ./release/firefox.zip > "./release/firefox_$NEW_VERSION.sha256sum.txt"
echo "Created Firefox release version $NEW_VERSION"

zip -r chrome.zip ./build/chrome
cp ./chrome.zip ./release/chrome.zip
sha256sum ./release/chrome.zip > "./release/chrome_$NEW_VERSION.sha256sum.txt"
echo "Created Chrome release version $NEW_VERSION"


