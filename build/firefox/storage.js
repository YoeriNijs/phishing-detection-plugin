/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
class FirefoxStorage {
    constructor(initialRules) {
        if (initialRules) {
            this.initializeStorage(initialRules);
        }
    }
    getRules(fn) {
        browser.storage.local
            .get('settings')
            .then((pluginStorageObject) => {
            const rules = pluginStorageObject.settings.rules;
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
        browser.storage.local.get('settings').then(storageObject => {
            const updatedStorageObject = {
                settings: {
                    rules: rules_sets,
                    whitelistedUrls: storageObject.settings
                        .whitelistedUrls
                }
            };
            return browser.storage.local.set(updatedStorageObject);
        });
    }
    getWhitelistedUrls(fn) {
        browser.storage.local
            .get('settings')
            .then((storageObject) => {
            const urls = storageObject.settings.whitelistedUrls;
            fn(urls);
        });
    }
    addWhitelistedUrl(url) {
        const baseUrl = this.getBaseUrl(url);
        browser.storage.local.get('settings').then(storageObject => {
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
            return browser.storage.local.set(updatedStorageObject);
        });
    }
    updateTempUrl(tempUrl) {
        const baseUrl = this.getBaseUrl(tempUrl);
        browser.storage.local.get('settings').then(storageObject => {
            const updatedStorageObject = {
                settings: {
                    rules: storageObject.settings.rules,
                    whitelistedUrls: storageObject.settings
                        .whitelistedUrls,
                    tempUrl: baseUrl
                }
            };
            return browser.storage.local.set(updatedStorageObject);
        });
    }
    getTempUrl(fn) {
        browser.storage.local
            .get('settings')
            .then((storageObject) => {
            const url = storageObject.settings.tempUrl || undefined;
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
        browser.storage.local.get('settings').then((settings) => {
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
        browser.storage.local.set(storageObject);
    }
    isStorageObject(object) {
        return object.rules && object.threshold && object.whitelistedUrls;
    }
}
__webpack_unused_export__ = FirefoxStorage;

})();

/******/ })()
;