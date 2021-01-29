/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const renderTweets = function (tweets) {
    const $container = $(".tweets-container").empty();
    for (let tweet of tweets) {
      $container.prepend(createTweetElement(tweet));
    }
  }

  const createTweetElement = function (tweet) {

    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    const time = new Date(tweet.created_at)
    const currentTime = Date.now()
    const dayDif = Math.floor((currentTime - time) / 1000 / 60 / 60 / 24)

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
    <p>${escape(tweet.content.text)}</p>
  <footer class="tweet-footer">
    <h6>${dayDif} days ago</h6>
    <p class="icons">
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

  $(".tweet-form").submit(function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const value = $("#tweet-text").val();

    if (value.length > 140) {
      $(".error-message").slideDown();
      return;
    }

    if (value.length === 0) {
      $(".other-error-message").slideDown();
      return;
    }

    $.ajax({
      url: "/tweets",
      type: "post",
      data: formData
    })
      .then(() => {
        $(".counter").html('140');
        return loadTweets(),
          $("#tweet-text").val('')
      })
  })

  const loadTweets = function () {
    $.ajax({
      type: "get",
      url: "/tweets",
      dataType: "json"
    }).then(function (results) {
      renderTweets(results)
    })


  }

  loadTweets();

})


