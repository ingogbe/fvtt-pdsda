import Logger from "./logger.js";
import {
  ACTOR_ENDPOINT_SETTING,
  ACTOR_INTERVAL_SETTING,
  ENABLE_POST_LOGS_SETTING,
  MODULE_NAMESPACE,
  PAUSE_REQUESTS_SETTING
} from "./constants.js";

export default class Requester {
  constructor(){}

	static makePost(identifier = 'Requester', endpoint, data) {
    const isPostLogsEnabled = game.settings.get(MODULE_NAMESPACE, ENABLE_POST_LOGS_SETTING);

    fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response)
    .then((response) => {
      if(isPostLogsEnabled) {
        Logger.log(`${identifier} - Success on POST`);
        Logger.log(response);
      }
    })
    .catch(err => {
      if(isPostLogsEnabled) {
        Logger.error(`${identifier} - Error on POST`);
        Logger.error(err);
      }
    });
	}
  
  static createImgLink(img) {
    if (img.match(new RegExp(/https?:\/\//gi))) {
      return img;
    } else {
      return `${origin}${img.startsWith('/') ? '' : '/'}${img}`;
    }
  }

  startActorPosts() {
    const actorPostInterval = game.settings.get(MODULE_NAMESPACE, ACTOR_INTERVAL_SETTING);
    const isRequestsPaused = game.settings.get(MODULE_NAMESPACE, PAUSE_REQUESTS_SETTING);
    const actorEndpoint = game.settings.get(MODULE_NAMESPACE, ACTOR_ENDPOINT_SETTING);

    // Start Actor POSTs
    setInterval(() => {
      if(!isRequestsPaused) {
        game.actors.map(a => {
          Requester.makePost(`Actor ${a.id} POST`, actorEndpoint, {
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
          }
        )});
      }
    }, actorPostInterval);
  }

  start() {
    this.startActorPosts();
  }
}