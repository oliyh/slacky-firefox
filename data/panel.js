target = null;

function init() {
   $('#meme-input')
      .val('')
      .keyup(function(event) {
         if (event.which == 13) {
            console.log('meme pattern completed');
            $('#error').text('').hide();
            $('#meme').attr('src', 'loading.gif').show();
            self.port.emit('memeRequest', target, $(this).val());
         }
      });

   $('#copy-meme-url').click(function (e) {
      self.port.emit('copyToClipboard', $('#meme-url').val());
   });

   $('#copy-meme-data').click(function (e) {
      self.port.emit('copyImageData', $('#meme-url').val())
   });

   self.port.on('panelOpened', function(t) {
      target = t;
      $('#meme').attr('src', 'loading.gif').hide();
      $('#error').text('').hide();
      $('#meme-controls').hide();
      $('#meme-input').val('').focus();
   });

   self.port.on('memeGenerated', function(memeUrl) {
      $('#meme').attr('src', memeUrl).show();
      $('#meme-url').val(memeUrl);
      $('#meme-controls').show();
   });

   self.port.on('badMemeRequest', function(helpText) {
      $('#meme').hide();
      $('#meme-controls').hide();
      $('#error')
         .html(helpText.replace(/\n/g, '<br/>'))
         .show();
   });

   self.port.on('memeGenerationFailed', function(error) {
      $('#meme').hide();
      $('#meme-controls').hide();
      $('#error')
         .html(error.replace(/\n/g, '<br/>'))
         .show();
   });
}

init();
