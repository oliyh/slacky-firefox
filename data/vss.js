jQuery(document).ready(function ($) {
   var slideCount = $('#slider ul li').length;
   var slideWidth = $('#slider ul li').width();
   var slideHeight = $('#slider ul li').height();
   var sliderUlWidth = slideCount * slideWidth;

   $('#slider').css({ width: slideWidth, height: slideHeight });
   $('#slider ul').css({ width: sliderUlWidth});

   function toggleControls() {
      if ($('#slider ul').position().left == 0) {
         $('a.control_prev').hide();
      } else {
         $('a.control_prev').show();
      }

      if ($('#slider ul').position().left == ((-1 * sliderUlWidth) + slideWidth)) {
         $('a.control_next').hide();
      } else {
         $('a.control_next').show();
      }
   }

   function moveLeft() {
      $('#slider ul').animate({
         left: $('#slider ul').position().left + slideWidth
      }, 200, toggleControls);
   };

   function moveRight() {
      $('#slider ul').animate({
         left: $('#slider ul').position().left - slideWidth
      }, 200, toggleControls);
   };

   $('a.control_prev').click(moveLeft);
   $('a.control_next').click(moveRight);
   toggleControls();

});

function addSlide(slide) {
   $(slide).prependTo('#slider ul');

   var slideCount = $('#slider ul li').length;
   var sliderUlWidth = slideCount * slideWidth;

   $('#slider ul').css({width: sliderUlWidth});
   $('#slider ul').css('left', '');
}
