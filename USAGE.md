# crawler.py

This is a python script that crawls the Daily Mail website for headlines, you can set the initial and end date.

The script generates *headlines.json*.

# generator.js

This is a node module that uses the *headlines.json* data to generate random fake headlines.

## Usage:

```javascript

	var generator = require('./generator.js');

	//random headline
	generator.generate();

	//random headline, 140 characters max.
	generator.generate(140);

	//random headline, 140 characters max, starting with the word 'Fun'
	generator.generate(140, 'Fun');

```