target = null;

function addToCarousel(memeUrl) {
   addSlide($('<li/>').append($('<img>', {src: memeUrl})));
}

function replaceFirstInCarousel(memeUrl) {
   replaceSlide(0, $('<li/>').append($('<img>', {src: memeUrl})));
}

function init() {
   $('#meme-input')
      .val('')
      .keyup(function(event) {
         if (event.which == 13) {
            console.log('meme pattern completed');
            $('#error').text('').hide();
            addToCarousel('loading.gif');
            $('#memeHistory').show();
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
      if ($('#slides li').length > 0) {
         $('#memeHistory').show();
      } else {
         $('#memeHistory').hide();
      }
      $('#error').text('').hide();
      $('#meme-input').val('').focus();
   });

   self.port.on('memeGenerated', function(memeUrl) {
      $('#memeHistory').show();
      $('#meme-url').val(memeUrl);
      replaceFirstInCarousel(memeUrl);
   });

   self.port.on('badMemeRequest', function(helpText) {
      $('#memeHistory').hide();
      $('#error')
         .html(helpText.replace(/\n/g, '<br/>'))
         .show();
   });

   self.port.on('memeGenerationFailed', function(error) {
      $('#memeHistory').hide();
      $('#error')
         .html(error.replace(/\n/g, '<br/>'))
         .show();
   });

   self.port.on('memeHistory', function(memeHistory) {
      console.log('Populating history with ' + memeHistory + ' entries');
	    $('#slides').empty();
      $('#indicator').empty();
	    $(memeHistory).each(function (i, result) {
         addToCarousel(result.url);
	    });
      if (memeHistory.length > 0) {
         $('#memeHistory').show();
      }
   });
}

init();
