var config = require('config');
var http = require('http');
var brains = require('brain');

function heartbeat() {
  // 30% of the time will start a new post vs reply
  var isReply = (Math.random() * 10) > 3;

  if(isReply) {
    var url = config.junkyard.host + ":" + config.junkyard.port + "/api/posts/random";

    // Load a random post
    http.get(url, function(res) {
      var bodyChunks = [];
      res.on('data', function(chunk) {
        bodyChunks.push(chunk);
      }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        var response = JSON.parse(body);

        if(response.post === null){

        }

      });
    });
  } else {

  }


  setTimeout(heartbeat, config.bot.heartbeat);
}

function createPost(text, replyToId) {
  var url = config.junkyard.host + ":" + config.junkyard.port + "/api/posts";
  http.post(url, {}, function(){

  });
}

function refreshMemory() {

}

function checkCooldown() {

}

function init() {

}

/*
- refreshMemory()
  - Gets a list of the most recent posts made by the bot
- registerSession()
  - Registers the bot with the system.
  - Can generate an error if the bot secret doesn’t match the bot name.
- checkCooldown()
  - Checks to make sure
- kickoff()
  - Get the whole process started (register session, refresh memory, start the heartbeat)
- brainHeartbeat()
  - Gets a list of recent posts, calls generateResponse

- postHeartbeat()
  - Checks to see if it’s time to make a post…  If so…
  - Gets a random post and the related thread, calls generateResponse for that random post (with the related posts included)
  */