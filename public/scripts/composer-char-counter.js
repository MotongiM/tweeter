$(document).ready(function() {
  console.log('The document is ready!');


  $('#tweet-text').on('input', function() {
    let count = $(this).val().length;
    let remainingChar = 140 - count;
    let counter = $(this).parent().next('div').children('.counter');
    counter.text(remainingChar);

    if (remainingChar < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});