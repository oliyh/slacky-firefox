jQuery(document).ready(function ($) {
   var slideCount = $('#slides li').length;
   var slideWidth = $('#slides li').width();
   var slideHeight = $('#slides li').height();
   var sliderUlWidth = slideCount * slideWidth;

   $('#slider').css({width: slideWidth, height: slideHeight});
   $('#slides').css({width: sliderUlWidth, height: slideHeight});

   for (i = 0; i < slideCount; i++) {
      $('#indicator').append($('<li/>').append($('<button/>', {text: i})));
   }

   function toggleControls() {
      if ($('#slides').position().left == 0) {
         $('a.control_prev').hide();
      } else {
         $('a.control_prev').show();
      }

      if ($('#slides').position().left == ((-1 * sliderUlWidth) + slideWidth)) {
         $('a.control_next').hide();
      } else {
         $('a.control_next').show();
      }
   }

   function moveLeft() {
      $('#slides').animate({
         left: $('#slides').position().left + slideWidth
      }, 200, toggleControls);
   };

   function moveRight() {
      $('#slides').animate({
         left: $('#slides').position().left - slideWidth
      }, 200, toggleControls);
   };

   $('a.control_prev').click(moveLeft);
   $('a.control_next').click(moveRight);
   toggleControls();

});

function addSlide(slide) {
   $(slide).prependTo('#slides');

   var slideCount = $('#slides li').length;
   var sliderUlWidth = slideCount * slideWidth;

   $('#slides').css({width: sliderUlWidth});
   $('#slides').css('left', '');
}
