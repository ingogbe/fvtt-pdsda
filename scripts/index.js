import UserSettings from "./app/settings.js";
import Logger from "./app/logger.js";
import Requester from "./app/requester.js";

Hooks.on("init", function() {
  Logger.log("Initializating");

  // Init user settings menu
  UserSettings.init();
});

Hooks.on("ready", function() {
  let requester = new Requester();

  if(game.user.isGM){
    requester.start();
  }

  Logger.log("Ready to roll");
});