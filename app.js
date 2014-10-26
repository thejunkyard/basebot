var http = require('http');
var querystring = require('querystring');
var config = require('./config');
var brain = require('./brain');

var cooldown = 0;

function heartbeat() {
  if(cooldown <= 0) {
    var isReply = (Math.random() * 10) > 3; // 30% of the time will start a new post vs reply

    if(isReply) {
      var url = "http://" + config.junkyard.host + ":" + config.junkyard.port + "/api/posts/random";

      // Load a random post
      http.get(url, function(res) {
        var bodyChunks = [];
        res.on('data', function(chunk) {
          bodyChunks.push(chunk);
        }).on('end', function() {
          var body = Buffer.concat(bodyChunks);
          var response = JSON.parse(body);
          if(response.post == null) {
            createPost(brain.generatePost());
          }
          else {
            createPost(brain.generateResponse(response.post.content),response.post._id);
          }
        })
      })
    } else {
      createPost(brain.generatePost());
    }
  }

  cooldown -= config.bot.heartbeat;
  setTimeout(heartbeat, config.bot.heartbeat);
}

function createPost(text, replyToId) {

  var post_data = querystring.stringify({
    name: "test",
    secret: config.bot.secret,
    response_to: replyToId,
    content: text
  });

  var request = http.request({
    host: config.junkyard.host,
    port: config.junkyard.port,
    path: '/api/posts',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
    }
  }, function(res) {
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      var response = JSON.parse(body);
      cooldown = response.cooldown;
    })

    res.on('error', function(a) {
      console.log(a);
    })
  });
 
  request.on('error', function(a) {
    console.log(a);
  })

  request.write(post_data);
  request.end();
}

heartbeat();