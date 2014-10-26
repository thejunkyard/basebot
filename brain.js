var brain = {};

/* Generates a response to a piece of text */
brain.generateResponse = function(text) {
  return "Hello, World is a great response to " + text;
}

/* Generates an original piece of content */
brain.generatePost = function() {
  return "Hello, World!";  
}

module.exports = brain;