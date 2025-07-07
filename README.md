# Phishing Detection Plugin for Chrome and Firefox

_A modular phishing detection plugin for Chrome and Firefox_

![Plugin logo](https://raw.githubusercontent.com/YoeriNijs/phishing-detection-plugin/main/src/browsers/_shared/icons/shield.png)

## Installation

If applicable, install this plugin by using the Chrome Web Store or the Firefox Extension Store.

## Manual installation (for testing purposes only)

- For Chrome, get the latest automated crx build from
  the [releases](https://github.com/YoeriNijs/phishing-detection-plugin/tree/main/release). Next, drag the crx file to
  the extension page to install the plugin.
- For Firefox, get the latest zip file from
  the [releases](https://github.com/YoeriNijs/phishing-detection-plugin/tree/main/release). Enable extension developer
  mode, unzip the file, and select the manifest.json to install it.

## How to build

### Requirements

- Make sure you've installed [Node](https://nodejs.org/en) v22 or higher

### Steps

- Clone this repository
- Run `npm install` (make sure you've [Node](https://nodejs.org/en) or higher installed)
- Run `npm run build:chrome` for Chrome or `npm run build:firefox` for Firefox
- Build output is saved in the `/release` directory.

## V1 backlog

- [x] Combine Webpack configs
- [ ] Add additional tests for Chrome and Firefox
- [x] Reimplement Firefox plugin based on new Chrome code
- [x] Window for whitelisting domains
- [x] Logic for whitelisting domains
- [x] Remove http(s) from domain that needs to be checked
- [x] Link repository, add favicon contributor
- [x] Add real world rules
- [x] Add engine tests based on real world phishing urls
- [x] Clean up duplicate Chrome and Firefox code (programming against interface)
- [x] Fix community urls implementation
- [x] Clean up project structure
- [x] Finalize i18n
- [x] Implement release pipeline
- [x] Update this readme

## Future backlog

- [ ] Mark site as phishing site
- [ ] Implement Naive Bayes Classifier to manually classify phishing panels locally
- [ ] Dropdown for selecting rules sets
- [ ] Keep latest community urls in localstorage for a while

## Acknowledgement

- Icons: [Timplaru Emil](https://www.vecteezy.com/members/emiltimplaru)
