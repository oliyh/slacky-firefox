target = null;

function addToCarousel(memeUrl) {
   addSlide($('<li/>').append($('<img>', {src: memeUrl})));
}

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
      if ($('#memeHistory li').length > 0) {
         $('#slider').show();
         $('#meme-controls').show();
      } else {
         $('#slider').hide();
         $('#meme-controls').hide();
      }
      $('#error').text('').hide();
      $('#meme-input').val('').focus();
   });

   self.port.on('memeGenerated', function(memeUrl) {
      $('#slider').show();
      $('#meme-url').val(memeUrl);
      $('#meme-controls').show();
      addToCarousel(memeUrl);
   });

   self.port.on('badMemeRequest', function(helpText) {
      $('#meme-controls').hide();
      $('#error')
         .html(helpText.replace(/\n/g, '<br/>'))
         .show();
   });

   self.port.on('memeGenerationFailed', function(error) {
      $('#meme-controls').hide();
      $('#error')
         .html(error.replace(/\n/g, '<br/>'))
         .show();
   });

   self.port.on('memeHistory', function(memeHistory) {
      console.log('Populating history with ' + memeHistory + ' entries');
	    $('#memeHistory').empty();
	    $(memeHistory).each(function (i, result) {
         console.log(result);
         addToCarousel(result.url);
	    });
      if (memeHistory.length > 0) {
         $('#slider').show();
      }
   });

}

init();
