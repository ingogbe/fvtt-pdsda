import Logger from "./logger.js";
import {
  ACTOR_ENDPOINT_SETTING,
  ACTOR_INTERVAL_SETTING,
  ACTOR_SELECTOR_CHECKED_ACTOR_LIST,
  ENABLE_POST_LOGS_SETTING,
  MODULE_NAMESPACE,
  PAUSE_REQUESTS_SETTING
} from "./constants.js";

export default class Requester {
  actorInterval;
  isRequestsPaused;
  isPostLogsEnabled;

  constructor(){}

	static makePost({
    identifier = 'Requester',
    endpoint,
    data,
    options = { log: false }
  }) {
    fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response)
    .then((response) => {
      if(options.log) {
        Logger.log(`${identifier} - Success on POST`);
        Logger.log(response);
      }
    })
    .catch(err => {
      if(options.log) {
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

  stopActorPosts() {
    if (this.actorInterval) {
      clearInterval(this.actorInterval);
      this.actorInterval = null;
    }

    return this;
  }

  startActorPosts() {
    const actorPostInterval = game.settings.get(MODULE_NAMESPACE, ACTOR_INTERVAL_SETTING);
    const actorEndpoint = game.settings.get(MODULE_NAMESPACE, ACTOR_ENDPOINT_SETTING);
    const checkedActors = game.settings.get(MODULE_NAMESPACE, ACTOR_SELECTOR_CHECKED_ACTOR_LIST);

    if (!this.actorInterval) {
      // Start Actor POSTs
      this.actorInterval = setInterval(() => {
        if(!this.isRequestsPaused) {
          checkedActors.forEach(actorId => {
            const a = game.actors.get(actorId);

            Requester.makePost({
              identifier: `Actor ${a.id} POST`,
              endpoint: actorEndpoint,
              data: {
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
              },
              options: {
                log: this.isPostLogsEnabled
              }
            })
          });
        }
      }, actorPostInterval);
    }

    return this;
  }

  restartActorPosts() {
    this.stopActorPosts().startActorPosts();
    return this;
  }

  checkSharedSettings() {
    Logger.log("Getting current settings");
    this.isRequestsPaused = game.settings.get(MODULE_NAMESPACE, PAUSE_REQUESTS_SETTING);
    this.isPostLogsEnabled = game.settings.get(MODULE_NAMESPACE, ENABLE_POST_LOGS_SETTING);

    return this;
  }

  start() {
    Logger.log("Starting Requester");
    this
      .checkSharedSettings()
      .startActorPosts();
  }

  restart() {
    Logger.log("Restarting Requester");
    this
      .checkSharedSettings()
      .restartActorPosts();
  }
}