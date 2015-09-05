function init() {
   $('#meme-input')
      .val('')
      .keyup(function(event) {
         if (event.which == 13) {
            self.port.emit('memeRequest', $(this).val());
         }
      });

   self.port.on('panelOpened', function() {
      $('#meme-input').val('').focus();
   });
}

init();
