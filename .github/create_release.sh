#!/bin/sh

rm -rf ./release/*.zip
rm -rf ./release/*.txt

cd ./build
zip -r firefox.zip ./firefox/
cp ./firefox.zip ../release/firefox.zip
sha256sum ../release/firefox.zip > "../release/firefox_$NEW_VERSION.sha256sum.txt"
echo "Created Firefox release version $NEW_VERSION"

zip -r chrome.zip ./chrome
cp ./chrome.zip ../release/chrome.zip
sha256sum ../release/chrome.zip > "../release/chrome_$NEW_VERSION.sha256sum.txt"
echo "Created Chrome release version $NEW_VERSION"