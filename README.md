# Post Data - Send Data Anywhere

A module for Foundry VTT that allows send [`Actors`](https://foundryvtt.com/api/v10/classes/client.Actor.html) data to an endpoint in a regular interval

## Compatibility

**PDSDA** is current compatible with:

- Foundry v10.286 and above
- System [Dungeons & Dragons 5th Edition (dnd5e)](https://github.com/foundryvtt/dnd5e) - Version 2.1.2 and above

## Installation

### Using Foundry "Configuration and Setup" UI

1. Go to `Configuration and Setup` menu on your FoundryVTT and click on `Add-on Modules`
2. Click the `Install Module` button on the bottom of the screen
3. Search by the package name `Post Data - Send Data Anywhere`
4. Click on the `Install` button

![image](https://user-images.githubusercontent.com/6909132/217390554-1f6df5ad-dbdf-4f4d-b837-9612c0f16dbc.png))

### Using manifest URL

You can install it using the following manifest URL
```
https://raw.githubusercontent.com/ingogbe/fvtt-pdsda/v1.2.0/module.json
```

1. Go to `Configuration and Setup` menu on your FoundryVTT and click on `Add-on Modules`
2. Click the `Install Module` button on the bottom of the screen
3. The `Install Module` window will popout, enter the manifest URL, provided above, on the `Manifest URL` field
4. Click on the `Install` button

![image](https://user-images.githubusercontent.com/6909132/217390689-b9090cdb-7bf0-4b31-b03d-3f81054635f9.png)

### Manually

If you wish to manually install the module, you must clone or extract it into the `Data/modules/fvtt-pdsda` folder. You may do this by cloning the repository or downloading a zip archive from the Releases Page.

## Features:

- Make a request to an endpoint, of the selected [Actors](https://foundryvtt.com/api/v10/classes/client.Actor.html) data (see `Post Data format` section), in a specified time interval in milliseconds
- Ability to pause all requests, if needed
- Ability to log (or not) "POSTs" success and errors on browser console (feature for debug purposes)

## Configuration 

![image](https://user-images.githubusercontent.com/6909132/217391348-dbb917e6-f18e-4b9c-a0e6-4aa5b1c95ab8.png)
![image](https://user-images.githubusercontent.com/6909132/217391433-295afdb9-f3ac-40f5-844a-24a66b82e488.png)

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

## Incoming features

- [`Actors`](https://foundryvtt.com/api/v10/classes/client.Actor.html)
  - Add the possibility to chose which data you want to send from [`Actor`](https://foundryvtt.com/api/v10/classes/client.Actor.html)
- Add supports for other things, like `ChatMessage`, `CombatEncounters`, etc
