import Logger from "./logger.js";
import {
  ACTOR_ENDPOINT_SETTING,
  ACTOR_INTERVAL_SETTING,
  MODULE_NAMESPACE,
  PAUSE_REQUESTS_SETTING
} from "./constants.js";

export default class Requester {
  constructor(){}

	static makePost(endpoint, data, identifier = 'Requester') {
    fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response)
    .then(() => {
      Logger.log(`${identifier} - Success on POST`);
    })
    .catch(() => {
      Logger.error(`${identifier} - Error on POST`);
    });
	}
  
  static createImgLink(img) {
    return `${window.location.origin}/${img}`;
  }

  start() {
    // Start Actor POSTs
    setInterval(() => {
      if(!game.settings.get(MODULE_NAMESPACE, PAUSE_REQUESTS_SETTING)) {
        Requester.makePost(
          game.settings.get(MODULE_NAMESPACE, ACTOR_ENDPOINT_SETTING),
          game.actors.map(a => ({
            id: a.id,
            name: a.name,
            img: Requester.createImgLink(a.img),
            race: a.system.details.race,
            level: a.system.details.level,
            alignment: a.system.details.alignment,
            hp: a.system.attributes.hp,
            classes: Object.values(a._classes).map(c => ({
              name: c.name,
              img: Requester.createImgLink(c.img),
              level: c.system.levels
            }))
          })),
          'Actor POSTs'
        );
      }
    }, game.settings.get(MODULE_NAMESPACE, ACTOR_INTERVAL_SETTING));
  }
}