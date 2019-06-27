# Github Card for Home Assistant
Show issues, pull requests, and more for your github repositories

<img src='https://raw.githubusercontent.com/ljmerza/github-card/master/card.png' />

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
![Project Maintenance][maintenance-shield]

## Installation through [HACS](https://github.com/custom-components/hacs)
---
Add the following to resources in your lovelace config:

```yaml
resources:
  - url: /community_plugin/github-card/github-card.js
```

## Configurations:
---
```yaml
views:
  - type: custom:github-card
    entities:
    - sensor.calendar_card
    - sensor.waze_card
    - sensor.light_entity_card
```

## Options
---
| Name | Type | Requirement | `Default` Description
| :---- | :---- | :------- | :----------- |
| title | string | **Optional** | `Github` Change card title
| entities | list | **Required** | List of github sensors to display
| show_extended | boolean | **Optional** | `true` Show/hide tags, forks, and commits links
| show_github_icon | boolean | **Optional** | `true` Show/hide Github icon

---

Enjoy my card? Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/JMISm06AD)


[commits-shield]: https://img.shields.io/github/commit-activity/y/ljmerza/github-card.svg?style=for-the-badge
[commits]: https://github.com/ljmerza/github-card/commits/master
[license-shield]: https://img.shields.io/github/license/ljmerza/github-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Leonardo%20Merza%20%40ljmerza-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/ljmerza/github-card.svg?style=for-the-badge
[releases]: https://github.com/ljmerza/github-card/releases