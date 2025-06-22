# Phishing Detection Plugin for Chrome and Firefox

_A modular phishing detection plugin for Chrome and Firefox_

![Plugin logo](https://raw.githubusercontent.com/YoeriNijs/phishing-detection-plugin/main/src/browsers/_shared/icons/shield.png)

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
- [ ] Update this readme
- [ ] U moet de broncode van uw extensie indienen:

```
Uw broncode moet het volgende bevatten:

    Stap-voor-stap-buildinstructies om een exacte kopie van de add-on-code te maken, in een README-bestand in uw broncode of in de beoordelaarsopmerkingen op de volgende pagina.
    Een buildscript dat alle benodigde technische stappen uitvoert.
    Eisen voor het besturingssysteem en de buildomgeving.
    De vereiste versie en installatie-instructies van alle programma’s die in het buildproces worden gebruikt (zoals node en npm).
```

## Future backlog

- [ ] Mark site as phishing site
- [ ] Implement Naive Bayes Classifier to manually classify phishing panels locally
- [ ] Dropdown for selecting rules sets
- [ ] Keep latest community urls in localstorage for a while

## Acknowledgement

- Icons: [Flaticon](https://www.flaticon.com/free-icon/shield_6767556)
  and [Freepik](https://www.freepik.com/icon/blocked_6762337)
