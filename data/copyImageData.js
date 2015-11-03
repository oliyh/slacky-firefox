/* function copyImageData(url) {
   console.log('copying ' + url);
   var img = new Image(),
   canvas = document.createElement('CANVAS'),
   ctx = canvas.getContext("2d");

   //img.crossOrigin = "Anonymous";

   img.onload = function() {
      console.log('image load fired');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage( img, 0, 0 );
      console.log('about to copy data');
      console.log('copied image data: ' + canvas.toDataURL('image/png'));
      self.port.emit('copyToClipboard', canvas.toDataURL('image/png'));

   }

   document.body.appendChild(img);

   img.src = url;
   // make sure the load event fires for cached images too
   if ( img.complete || img.complete === undefined ) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = 'https://cors-anywhere.herokuapp.com/' + url;
   }
   console.log('triggered img load');
}
*/


function copyMemeData(iframeEvent) {
   console.log('iframe load triggered');
   //   var iframe = iframeLoadEvent.target
   var canvas = iframe.target.contentDocument.createElement("canvas");
   var ctx = canvas.getContext("2d");
   var img = new Image();
   //var img = iframe.contentDocument.getElementsByTagName('img')[0];

   //img.crossOrigin = "Anonymous";

   img.onload = function() {
      console.log('image load fired');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage( img, 0, 0 );
      var dataURL = canvas.toDataURL('image/png');
      self.port.emit('copyToClipboard', dataURL);
   }
   img.src = src;
   // make sure the load event fires for cached images too
   if ( img.complete || img.complete === undefined ) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
   }
}

function copyImageData(url) {
   var iframe = document.createElement("iframe");
   iframe.addEventListener('load', copyMemeData, false);
   document.body.appendChild(iframe);
   iframe.src = url;
}
