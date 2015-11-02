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
      console.log('trying to copy image data');
      self.port.emit('copyImageData', $('#meme-url').val());
/*
      var img = new Image,
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      src = "http://i.memecaptain.com/gend_images/J1rjYA.jpg"; // insert image url here

      img.crossOrigin = "Anonymous";

      img.onload = function() {
         canvas.width = img.width;
         canvas.height = img.height;
         ctx.drawImage( img, 0, 0 );
         localStorage.setItem( "savedImageData", canvas.toDataURL("image/png") );
      }
      img.src = src;
      // make sure the load event fires for cached images too
      if ( img.complete || img.complete === undefined ) {
         img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
         img.src = src;
      }

      /**
      var img = document.getElementById('meme');
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL('image/png');
      self.port.emit('copyToClipboard', dataURL);
      canvas = null;
      */
   });


   self.port.on('panelOpened', function(t) {
      target = t;
      $('#meme').attr('src', 'http://i.memecaptain.com/gend_images/J1rjYA.jpg').show();
      $('#error').text('').hide();
      $('#meme-controls').show();
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
