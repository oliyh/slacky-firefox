function toggleControls() {
   console.log($('#slides').position());
   if ($('#slides').position().left == 0) {
      $('a.control_prev').hide();
   } else {
      $('a.control_prev').show();
   }

   var slideCount = $('#slides li').length;
   var slideWidth = $('#slides li').width();
   var sliderUlWidth = slideCount * slideWidth;

   if ($('#slides').position().left == ((-1 * sliderUlWidth) + slideWidth)) {
      $('a.control_next').hide();
   } else {
      $('a.control_next').show();
   }
}

jQuery(document).ready(function ($) {
   var slideCount = $('#slides li').length;
   var slideWidth = $('#slides li').width();
   var slideHeight = $('#slides li').height();
   var sliderUlWidth = slideCount * slideWidth;

   $('#slider').css({width: slideWidth, height: slideHeight});
   $('#slides').css({width: sliderUlWidth, height: slideHeight});

   for (i = 0; i < slideCount; i++) {
      $('#indicator').append($('<li/>'));
   }

   function onMoveLeft() {
      $('#indicator li.active').removeClass('active').prev('li').addClass('active');
      toggleControls();
   }

   function onMoveRight () {
      $('#indicator li.active').removeClass('active').next('li').addClass('active');
      toggleControls();
   }

   function moveLeft() {
      $('#slides').animate({
         left: $('#slides').position().left + slideWidth
      }, 200, onMoveLeft);
   };

   function moveRight() {
      $('#slides').animate({
         left: $('#slides').position().left - slideWidth
      }, 200, onMoveRight);
   };

   $('#indicator li:first-child').addClass('active');
   $('a.control_prev').click(moveLeft);
   $('a.control_next').click(moveRight);
   toggleControls();
});

function addSlide(slide) {
   $(slide).prependTo('#slides');
   $('#indicator').prepend($('<li/>'));

   var slideCount = $('#slides li').length;
   var slideWidth = $('#slides li').width();
   var sliderUlWidth = slideCount * slideWidth;

   $('#slides').css({width: sliderUlWidth});
   $('#slides').css('left', '');
   $('#indicator li').removeClass('active');
   $('#indicator li:first-child').addClass('active');
   toggleControls();
}

function replaceSlide(index, slide) {
   $($('#slides li')[index]).replaceWith($(slide));
   $('#slides').css('left', '');
   $('#indicator li').removeClass('active');
   $('#indicator li:first-child').addClass('active');
   toggleControls();
}
