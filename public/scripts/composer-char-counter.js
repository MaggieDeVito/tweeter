$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    const $input = $(this);
    const form = $input.closest('form');
    const counter = form.find('.counter');
    const charsLeft = (140 - $input.val().length);

    counter.html(charsLeft);

    if (charsLeft < 0) {
      counter.addClass("addColour");
    } else {
      counter.removeClass("addColour");
      $(".error-length").slideUp();
      $(".error-empty").slideUp();
    }
  });
});