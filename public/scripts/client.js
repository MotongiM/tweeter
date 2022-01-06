const createTweetElement = function(tweet) {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
    
    
  
  const htmlTweet  = `
      <article class="tweet">
      <header>
        <div class="userAvatar">
          <img src='${tweet.user.avatars}'>
          <p id="firstName">${tweet.user.name}</p>
        </div>
        <div class="userHandle" >
          <p>${tweet.user.handle}</p>
        </div>
      </header>
      <body>
        <p class="tweetContent">${escape(tweet.content.text)}</p>
      </body>
      <footer>
        <div class="contentFooter">
          <p>${moment(tweet.created_at).fromNow()}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </footer>
      </article>
      `;
  return htmlTweet;
};

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
      
    //create the html element for tweet
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
  
};

$(document).ready(function()  {
  $('#error').hide();
    
    
  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET'
    })
      .done((tweet) => {
        renderTweets(tweet);
    
      })
      .fail((err) => console.log(`fail to get`, err));
  };

  $('#tweet-form').on('submit', function(event)  {
    event.preventDefault();

    $('#error').slideUp("slow");

    let formLength = $('#tweet-text').val().length;

    if (formLength > 140) {
      $("#error").slideDown("slow");
      $("#error").html("Your tweet is too long!");
      return;

    }

    if (formLength === 0) {
      $("#error").slideDown("slow");
      $("#error").html("Please type something!");
      return;
    }

    
    let textForm = $(this).serialize();

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: textForm
    })
      .done(() => loadTweets())
      .fail(() => console.log('Error!'))
      .always(() => console.log('Request completed'));

    $('#tweet-text').val('');
    $('.counter').val(140);
  });
  loadTweets();
});

