import Logger from "../logger.js";
import { 
  MODULE_NAMESPACE,
  ACTOR_SELECTOR_SETTING,
  ACTOR_SELECTOR_CHECKED_ACTOR_LIST
} from '../constants.js';

export default class ActorSelectorSettings extends FormApplication {
  constructor(object = {}, options) {
    super(object, options);

    this.actors = this.getCurrentActorsList();
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      template: "modules/fvtt-pdsda/templates/actorSelector.html",
      height: 500,
      title: game.i18n.localize("PDSDA.ActorSelector.Window.title"),
      width: 600,
      submitOnClose: true
    }
  }

  getData(options) {
    const data = super.getData(options);
    data.actors = this.actors;

    return data;
  }

  getCurrentActorsList() {
    let actors = [];
    const checkedActors = game.settings.get(MODULE_NAMESPACE, ACTOR_SELECTOR_CHECKED_ACTOR_LIST);

    game.actors.forEach(
      (actor) => {
        actors.push({
          name: actor.name,
          id: actor.id,
          img: actor.img,
          checked: checkedActors.includes(actor.id),
        });
      }
    );

    return actors;
  }

  async _updateObject(event, formData) {
    const newCheckedActorsList = Object.values(formData).reduce((acc, i) => {
      if (i) acc.push(i);
      return acc;
    }, []);

    game.settings.set(MODULE_NAMESPACE, ACTOR_SELECTOR_CHECKED_ACTOR_LIST, newCheckedActorsList);
	}

	static init(requester) {
    Logger.log("Registering Actor Selector Settings");

    // actor list settings
    game.settings.register(MODULE_NAMESPACE, ACTOR_SELECTOR_CHECKED_ACTOR_LIST, {
      scope: "client",
      type: Array,
      default: [],
      onChange: () => { 
        requester.restart();
      }
    });

    /*
     * game.settings.registerMenu Documentation
     * https://foundryvtt.com/api/classes/client.ClientSettings.html#registerMenu
     */
    game.settings.registerMenu(MODULE_NAMESPACE, ACTOR_SELECTOR_SETTING, {
      name: game.i18n.localize("PDSDA.ActorSelector.SettingsMenu.name"),   // The text label used in the left side
      label: game.i18n.localize("PDSDA.ActorSelector.SettingsMenu.label"), // The text label used in the button
      hint: game.i18n.localize("PDSDA.ActorSelector.SettingsMenu.hint"),   // The hint text showed below the menu option
      icon: "fa fa-users",                                                 // A Font Awesome icon used in the submenu button
      type: ActorSelectorSettings,                                         // A FormApplication subclass which should be created
      restricted: true                                                     // Restrict this submenu to gamemaster only?
    });
	}

}