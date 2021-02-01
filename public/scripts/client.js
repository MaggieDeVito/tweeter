/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const renderTweets = function (tweets) {
    const $container = $(".tweets-container").empty();
    for (let tweet of tweets) {
      $container.prepend(createTweetElement(tweet)); //prepending new tweet to the tweet container
    }
  };

  const createTweetElement = function (tweet) {

    const escape = function (str) {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const time = new Date(tweet.created_at);
    const currentTime = Date.now();
    const dayDif = Math.floor((currentTime - time) / 1000 / 60 / 60 / 24); // making the time into days from Unix time

    const tweetElement = ` 
  <header class="tweet-header">
    <div class="user-info">
      <img src="${tweet.user.avatars}">
      <p>${tweet.user.name}</p>
    </div>
    <div class="user-mention">
      <p>${tweet.user.handle}</p>
    </div>
  </header>
    <p>${escape(tweet.content.text)}</p>
  <footer class="tweet-footer">
    <h6>${dayDif} days ago</h6>
    <p class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </p>
  </footer>
`; // the outline for all tweet containers

    const $tweet = $(`<article>`);
    $tweet.addClass("article");
    const tweetArticle = $tweet.append(tweetElement);
    return tweetArticle; // appending the outline to the article class
  };

  $(".tweet-form").submit(function (event) {
    event.preventDefault(); // stops the browser from refreshing (its default)
    const formData = $(this).serialize();
    const value = $("#tweet-text").val();

    if (value.length > 140) {
      $(".error-length").slideDown(); // error for too many characters
      return;
    }

    if (value.length === 0) { // error for no characters
      $(".error-empty").slideDown();
      return;
    }

    $.ajax({
      url: "/tweets",
      type: "post",
      data: formData
    }).then(() => {
      $(".counter").html('140'); // resetting counter to 140
      $("#tweet-text").val(''); // clearing the tweetbox 
      return loadTweets(); // reloading the tweets without actually refreshing the browser
    });
  });

  const loadTweets = function () {
    $.ajax({
      type: "get",
      url: "/tweets",
      dataType: "json"
    }).then(function (results) {
      renderTweets(results); 
    });
  };

  loadTweets();

});


