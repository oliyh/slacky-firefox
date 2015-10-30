var self = require('sdk/self');
var ui = require("sdk/ui");
var panels = require("sdk/panel");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var ss = require("sdk/simple-storage");
var uuid = require("sdk/util/uuid");
var prefs = require('sdk/simple-prefs').prefs;
var clipboard = require("sdk/clipboard");
var xhr = require("sdk/net/xhr");
var base64 = require("sdk/base64");
// slacky UI

var button = buttons.ActionButton({
  id: "slacky",
  label: "Slacky",
  icon: {
    "16": "./slacky-16.png",
    "32": "./slacky-32.png",
    "64": "./slacky-64.png"
  },
  onClick: openSlacky
});

var slackyPanel = panels.Panel({
   contentURL: self.data.url("slacky-panel.html"),
   contentScriptFile: [self.data.url("jquery.js"),
                       self.data.url("panel.js")],
   width: 360,
   height: 308
});

slackyPanel.requests = {};

slackyPanel.port.on('memeRequest', function(target, memePattern) {
   console.log('generating meme from request ' + memePattern);
   // can focus be returned to the target or will the panel disappear?

   var slackyRequest = Request({
      url: "https://slacky-server.herokuapp.com/api/browser-plugin/meme",
      content: {text: memePattern,
                token: ss.storage.clientId},
      onComplete: function (response) {
         switch(response.status) {

            case 200:
            var memeUrl = response.text;
            slackyPanel.port.emit('memeGenerated', memeUrl);

            // pass the url back to the target which requested it, if any
            var request = slackyPanel.requests[target];
            if (request != undefined) {
               request.worker.port.emit('memeGenerated', target, memeUrl);
            }
            break;

            case 400:
            var helpText = response.text;
            slackyPanel.port.emit('badMemeRequest', helpText);
            break;

            default:
            var error = response.text;
            slackyPanel.port.emit('memeGenerationFailed', error);
            break;
         }
      }
   }).post();
});

slackyPanel.port.on('copyToClipboard', function(data) {
   console.log('copying to clipboard: ' + data);
   clipboard.set(data);
});

slackyPanel.port.on('copyImageData', function(url) {
   // hard won knowledge from http://stackoverflow.com/questions/20035615/using-raw-image-data-from-ajax-request-for-data-uri
   var xmlHTTP = xhr.XMLHttpRequest();
   xmlHTTP.open('GET', url, true);
   xmlHTTP.responseType = 'arraybuffer';
   xmlHTTP.onload = function(e) {
      var arr = new Uint8Array(this.response);
      var raw = String.fromCharCode.apply(null,arr);
      var b64 = base64.encode(raw);
      var dataURL="data:image/png;base64," + b64;
      console.log('copying png img html to clipboard');
      clipboard.set('<img src="' + dataURL + '"/>', 'html');
   };
   xmlHTTP.send();
});


function openSlacky(target) {
   slackyPanel.show({
      position: button
   });
   slackyPanel.port.emit('panelOpened', target);
}

// subscribe event listeners on text fields in the dom
// when a new tab is opened

tabs.on('ready', function (tab) {
   var worker = tab.attach({
      contentScriptFile: [self.data.url("jquery.js"),
                          self.data.url("utils.js"),
                          self.data.url("window.js")]

   });

   worker.port.on('memeDetected', function(target) {
      var excluded = false;
      var excludedDomains = prefs.excludedDomains.split(',');
      for (i in excludedDomains) {
         if (tabs.activeTab.url.contains(excludedDomains[i])) {
            excluded = true;
            break;
         }
      }

      if (!excluded) {
         console.log('opening meme dialogue');
         slackyPanel.requests[target] = {target: target,
                                         worker: worker};
         openSlacky(target);
      } else {
         console.log('domain is excluded');
      }
   });
});

// for dev only
console.log('Slacky initialising');
//tabs.activeTab.url = self.data.url("slacky-panel.html");
//openSlacky();

if (prefs.clientId == undefined) {
   prefs.clientId = '' + uuid.uuid();
}
console.log('clientId ' + prefs.clientId);
