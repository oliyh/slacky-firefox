memePattern = new RegExp('\/meme$', 'i');

function attachDomEventListeners() {
   $('textarea, input').keyup(function(event) {
      var userText = $(event.target).val();
      var textJustTyped = userText.substring(0, doGetCaretPosition(event.target));
      if (memePattern.test(textJustTyped)) {
         self.port.emit('memeDetected', $(event.target).attr('id'));
      }
   });

   $('div[contenteditable]').keyup(function(event) {
      console.log('key pressed');
      var userText = event.target.textContent;
      if (memePattern.test(userText)) {
         self.port.emit('memeDetected', $(event.target).attr('id'));
      }
   });
}

function attachSlackyEventListeners() {
   self.port.on('memeGenerated', function(target, memeUrl) {
      var target = $('#' + target);
      if (target.attr('contenteditable')) {
         console.log('inserting image');
         // the text node containing the /meme command
         // feasible to break it apart and replace it?
         // target.contents().filter(function() {
         //    return this.nodeType === 3 && memePattern.test($(this).text());
         // }).first();
         target.append($('<img/>', {src: memeUrl}));
      } else {
         target.val(target.val().replace(memePattern, memeUrl));
      }
   });
}

function init() {
   console.log("Hello world, slacky is here!");
   attachDomEventListeners();
   attachSlackyEventListeners();
}

init();
