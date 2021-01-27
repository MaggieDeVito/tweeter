/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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

renderTweets(data);
})
