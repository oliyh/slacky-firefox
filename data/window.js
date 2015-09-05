memePattern = new RegExp('\/meme', 'i');

function attachDomEventListeners() {
   $('textarea, input').keyup(function(event) {
      var userText = $(event.target).val();
      if (memePattern.test(userText)) {
         self.port.emit('memeDetected', $(event.target).attr('id'));
      }
   });
}

function attachSlackyEventListeners() {
   self.port.on('memeGenerated', function(target, memeUrl) {
      var target = $('#' + target);
      target.val(target.val().replace(memePattern, memeUrl));
   });
}

function init() {
   console.log("Hello world, slacky is here!");
   attachDomEventListeners();
   attachSlackyEventListeners();
}

init();
