/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
class ChromeStorage {
    constructor(initialRules) {
        if (initialRules) {
            this.initializeStorage(initialRules);
        }
    }
    getRules(fn) {
        chrome.storage.local.get('settings', (storageObject) => {
            const rules = storageObject.settings.rules;
            fn(rules);
        });
    }
    updateRules(rules_sets) {
        if (rules_sets.length < 1) {
            rules_sets = [];
        }
        else if (rules_sets.every(rules => !rules.include && !rules.exclude)) {
            rules_sets = [];
        }
        chrome.storage.local.get('settings', storageObject => {
            const updatedStorageObject = {
                settings: {
                    rules: rules_sets,
                    whitelistedUrls: storageObject.settings
                        .whitelistedUrls
                }
            };
            chrome.storage.local.set(updatedStorageObject);
        });
    }
    getWhitelistedUrls(fn) {
        chrome.storage.local.get('settings', (chromeStorageObject) => {
            const urls = chromeStorageObject.settings.whitelistedUrls;
            fn(urls);
        });
    }
    addWhitelistedUrl(url) {
        const baseUrl = this.getBaseUrl(url);
        chrome.storage.local.get('settings', storageObject => {
            const whiteListedUrls = [
                ...storageObject.settings.whitelistedUrls,
                baseUrl
            ];
            const uniqueWhitelistedUrls = new Set(whiteListedUrls);
            const updatedStorageObject = {
                settings: {
                    rules: storageObject.settings.rules,
                    whitelistedUrls: [...uniqueWhitelistedUrls]
                }
            };
            chrome.storage.local.set(updatedStorageObject);
        });
    }
    updateTempUrl(tempUrl) {
        const baseUrl = this.getBaseUrl(tempUrl);
        chrome.storage.local.get('settings', storageObject => {
            const updatedStorageObject = {
                settings: {
                    rules: storageObject.settings.rules,
                    whitelistedUrls: storageObject.settings
                        .whitelistedUrls,
                    tempUrl: baseUrl
                }
            };
            chrome.storage.local.set(updatedStorageObject);
        });
    }
    getTempUrl(fn) {
        chrome.storage.local.get('settings', (chromeStorageObject) => {
            const url = chromeStorageObject.settings.tempUrl || undefined;
            if (url) {
                fn(url);
            }
        });
    }
    getBaseUrl(url) {
        const parsedUrl = new URL(url);
        return `${parsedUrl.protocol}//${parsedUrl.host}`;
    }
    initializeStorage(initialRules) {
        chrome.storage.local.get('settings', (settings) => {
            // If the object is missing required fields, we still save the initial object
            if (!this.isStorageObject(settings)) {
                this.initializeStorageObject(initialRules);
            }
        });
    }
    initializeStorageObject(initialRules) {
        const storageObject = {
            settings: {
                rules: initialRules,
                whitelistedUrls: []
            }
        };
        chrome.storage.local.set(storageObject);
    }
    isStorageObject(object) {
        return object.rules && object.threshold && object.whitelistedUrls;
    }
}
__webpack_unused_export__ = ChromeStorage;

})();

/******/ })()
;