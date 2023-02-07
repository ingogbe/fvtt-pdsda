import Logger from "../logger.js";
import ActorSelectorSettings from "./actorSelector.js";
import { 
  MODULE_NAMESPACE,
  PAUSE_REQUESTS_SETTING,
  ENABLE_POST_LOGS_SETTING,
  ACTOR_ENDPOINT_SETTING,
  ACTOR_INTERVAL_SETTING
} from '../constants.js';

export default class UserSettings {
	static init(requester) {
    Logger.log("Registering User Settings");
    /*
     * game.settings.registerMenu Documentation
     * https://foundryvtt.com/api/classes/client.ClientSettings.html#register
     */
    game.settings.register(MODULE_NAMESPACE, PAUSE_REQUESTS_SETTING, {
      name: game.i18n.localize("PDSDA.Settings.PauseRequests.name"),
      hint: game.i18n.localize("PDSDA.Settings.PauseRequests.hint"),
      scope: "world", 
      config: true,  
      default: false,
			type: Boolean,
      requiresReload: false,
      restricted: true,
      onChange: () => { 
        requester.restart();
      }
    });

    game.settings.register(MODULE_NAMESPACE, ENABLE_POST_LOGS_SETTING, {
      name: game.i18n.localize("PDSDA.Settings.EnablePostLogs.name"),
      hint: game.i18n.localize("PDSDA.Settings.EnablePostLogs.hint"),
      scope: "world", 
      config: true,  
      default: false,
			type: Boolean,
      requiresReload: false,
      restricted: true,
      onChange: () => { 
        requester.restart();
      }
    });

    game.settings.register(MODULE_NAMESPACE, ACTOR_ENDPOINT_SETTING, {
      name: game.i18n.localize("PDSDA.Settings.ActorEndpoint.name"),
      hint: game.i18n.localize("PDSDA.Settings.ActorEndpoint.hint"),
      scope: "world", 
      config: true,  
      type: String,
      requiresReload: false,
      default: "http://localhost:3000",
      restricted: true,
      onChange: () => { 
        requester.restart();
      }
    });

    game.settings.register(MODULE_NAMESPACE, ACTOR_INTERVAL_SETTING, {
      name: game.i18n.localize("PDSDA.Settings.ActorInterval.name"),
      hint: game.i18n.localize("PDSDA.Settings.ActorInterval.hint"),
      scope: "world", 
      config: true,  
      type: Number,
      requiresReload: false,
      default: 1500,
      restricted: true,
      onChange: () => { 
        requester.restart();
      }
    });

    ActorSelectorSettings.init(requester);
	}

}