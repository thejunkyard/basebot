/* global exports */

var titles = require('./data/headlines.json');

// generate stats
var terminals = [];
var startwords = [];
var wordstats = {};

for (var i = 0; i < titles.length; i++) {
    var words = titles[i].split(/\s+/);
    var words_length = words.length - 1;

    terminals.push(words[words_length]);
    startwords.push(words[0]);

    for (var j = 0; j < words_length; j++) {
        if (wordstats.hasOwnProperty(words[j])) {
            wordstats[words[j]].push(words[j+1]);
        } else {
            wordstats[words[j]] = [words[j+1]];
        }
    }
}

// helpers
var choice = function (array) {
    return array[Math.floor(array.length * Math.random())];
};

var num = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// the generator
var make_headline = function (max_length, initial) {
    var min_words = num(5, 20);
    var word;

    max_length = max_length || 140;

    if(initial && typeof initial === 'string' && startwords.indexOf(initial) > 0) {
        word = initial;
    } else {
        word = choice(startwords);
    }

    var title = [word];

    while (wordstats[word]) {
        var next_words = wordstats[word];
        word = choice(next_words);
        title.push(word);

        if (title.length > min_words && terminals.indexOf(word) > 0) {
            break;
        }
    }

    var headline = title.join(' ');

    if (headline.length > max_length) {
        return make_headline(max_length, initial);
    }

    return headline;
};

exports.generate = make_headline;