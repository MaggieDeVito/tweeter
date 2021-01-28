/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const renderTweets = function(tweets) {
  const $container = $(".tweets-container")
  for(let tweet of tweets) {
    $container.append(createTweetElement(tweet));
  }
}

const createTweetElement = function(tweet) {
  
  let tweetElement = `
  <header class="tweet-header">
    <div class="user-info">
      <img src="${tweet.user.avatars}">
      <p>${tweet.user.name}</p>
    </div>
    <div class="user-mention">
      <p>${tweet.user.handle}</p>
    </div>
  </header>
    <p>${tweet.content.text}</p>
  <footer class="tweet-footer">
    <h6>${tweet.created_at}</h6>
    <p>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </p>
  </footer>
`

  const $tweet = $(`<article>`);
  $tweet.addClass("article");
  const tweetArticle = $tweet.append(tweetElement);
  return tweetArticle;
}

$(".tweet-form").submit(function(event){
  event.preventDefault();
  const formData = $(this).serialize();
  
  // if(formData.length > 140) {
  //   return alert("Your tweet is too long!")
  // }

  // if(!forData) {
  //   return alert("Your tweet is empty!")
  // }

  $.ajax({url: "/tweets", type: "post", data: formData})
})

const loadTweets = function() {
  $.ajax ({
    type: "get",
    url: "/tweets",
    dataType: "json",
    success: function(data) {
      renderTweets(data);
    }
  })
}

loadTweets();

})


