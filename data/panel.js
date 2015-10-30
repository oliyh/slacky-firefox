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
      var img = document.getElementById('meme');
      img.crossOrigin = 'Anonymous';
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      self.port.emit('copyToClipboard', dataURL);
      canvas = null;

   });


   self.port.on('panelOpened', function(t) {
      target = t;
      $('#meme').attr('src', 'loading.gif');
      $('#error').text('').hide();
      $('#meme-input').val('').focus();
   });

   self.port.on('memeGenerated', function(memeUrl) {
      $('#meme').attr('src', memeUrl).show();
      $('#meme-url').val(memeUrl);
      $('#meme-controls').show();
   });

   self.port.on('badMemeRequest', function(helpText) {
      $('#meme').hide();
      $('#error')
         .html(helpText.replace(/\n/g, '<br/>'))
         .show();
   });

   self.port.on('memeGenerationFailed', function(error) {
      $('#meme').hide();
      $('#error')
         .html(error.replace(/\n/g, '<br/>'))
         .show();
   });


}

init();
