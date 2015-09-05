target = null;

function init() {
   $('#meme-input')
      .val('')
      .keyup(function(event) {
         if (event.which == 13) {
            console.log('meme pattern completed');
            self.port.emit('memeRequest', target, $(this).val());
         }
      });

   self.port.on('panelOpened', function(t) {
      target = t;
      $('#meme-input').val('').focus();
   });
}

init();