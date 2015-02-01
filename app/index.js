var React = require("react");
var MainView = require("./mainview");
var AppState = require("./appstate");

function updateApp(){
  console.log("Update app...");
  React.render(
    <MainView />,
    document.body
  );
}

window.startApp = function(){
  AppState.addChangeListener(updateApp);
  updateApp();
}

