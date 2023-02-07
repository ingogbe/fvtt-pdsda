import UserSettings from "./app/settings/index.js";
import Logger from "./app/logger.js";
import Requester from "./app/requester.js";

const requester = new Requester();

Hooks.on("init", function() {
  Logger.log("Initializating");

  // Init user settings menu
  UserSettings.init(requester);
});

Hooks.on("ready", function() {
  if(game.user.isGM){
    requester.start();
  }

  Logger.log("Ready to roll");
});