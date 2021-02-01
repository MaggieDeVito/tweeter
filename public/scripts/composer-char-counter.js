$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    const $input = $(this);
    const form = $input.closest('form');
    const counter = form.find('.counter');
    const charsLeft = (140 - $input.val().length);

    counter.html(charsLeft);

    if (charsLeft < 0) {
      counter.addClass("addColour"); // adding color red when characters left is less than 0
    } else {
      counter.removeClass("addColour"); // removing color red when characters are between 140-0, along with hiding the error messages.
      $(".error-length").slideUp();
      $(".error-empty").slideUp();
    }
  });
});