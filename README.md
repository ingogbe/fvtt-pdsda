# Post Data - Send Data Anywhere

A module for Foundry VTT that allows send [`Actors`](https://foundryvtt.com/api/v10/classes/client.Actor.html) data to an endpoint in a regular interval

# System Compatibility
**PDSDA** is current compatible with the following systems.

- Dungeons & Dragons 5th Edition (dnd5e)

# Installation

You can install it using the following manifest URL
```
https://github.com/ingogbe/fvtt-pdsda/releases/download/v1.0.0/module.json
```

1. Go to `Configuration and Setup` menu on your FoundryVTT and click on `Add-on Modules`
2. Click the `Install Module` button on the bottom of the screen
3. The `Install Module` window will popout, enter the manifest URL, provided above, on the `Manifest URL` field
4. Click on the `Install` button

## Post Data format

The data that **PDSDA** sends has only a few basic informations about the [`Actor`](https://foundryvtt.com/api/v10/classes/client.Actor.html), this is necessary to make a small payload for the POSTs and prevents the `PayloadTooLargeError` error

```json
{
    "id": "mlaoF1kzT1zxdvxq",
    "name": "Riswynn (Dwarf Rogue)",
    "img": "http://localhost:30000/systems/dnd5e/tokens/heroes/RogueHalfling.webp",
    "race": "Hill Dwarf",
    "level": 1,
    "alignment": "True neutral",
    "hp": {
        "value": 11,
        "max": 11,
        "temp": null,
        "tempmax": null,
        "bonuses": {
            "level": "",
            "overall": ""
        }
    },
    "classes": [
        {
            "name": "Rogue",
            "img": "http://localhost:30000/icons/skills/melee/strike-sword-stabbed-brown.webp",
            "level": 1
        }
    ]
}
```

## TODO List

- [`Actors`](https://foundryvtt.com/api/v10/classes/client.Actor.html)
  - Add configuration to select the `Actors` you want to send data.
    - Currently the module send data from all Actors, that inscrease considerably the number of requests.
  - Add the possibility to chose which data you want to send from [`Actor`](https://foundryvtt.com/api/v10/classes/client.Actor.html)
- Add supports for other things, like `ChatMessage`, `CombatEncounters`, etc