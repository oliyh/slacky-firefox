var self = require('sdk/self');
var ui = require("sdk/ui");
var panels = require("sdk/panel");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

// slacky UI

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: openSlacky
});

var slackyPanel = panels.Panel({
   contentURL: self.data.url("slacky-panel.html"),
   contentScriptFile: [self.data.url("jquery.js"),
                       self.data.url("panel.js")]
});

slackyPanel.port.on('memeRequest', function(request) {
   console.log('generating meme from request ' + request);
   // talk to slacky, generate meme
   // how can i reattach to the worker when it completes?
   // worker.port.emit('memeGenerated', 'http://memes.com/cat.gif', target);
});

function openSlacky() {
   slackyPanel.show({
      position: button
   });
   slackyPanel.port.emit('panelOpened');
}

// subscribe event listeners on text fields in the dom
// when a new tab is opened

tabs.on('ready', function () {
   var tab = tabs[0];
   var worker = tab.attach({
      contentScriptFile: [self.data.url("jquery.js"),
                          self.data.url("window.js")]

   });

   worker.port.on('memeDetected', function(target) {
      console.log('opening meme dialogue');
      openSlacky();
   });

});

// slacky operations

// for dev only
console.log('Slacky initialising');
tabs.activeTab.url = self.data.url("demo.html");
openSlacky();
