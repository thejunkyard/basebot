# crawler.py

This is a python script that crawls the Daily Mail website for headlines, you can set the initial and end date.

## Usage:

1. create a virtual environment
2. `pip install -r requirements.txt`
3. edit crawler.py line [#9](https://github.com/bertez/basebot/blob/master/crawler.py#L9) to set the date limit (default is six months so the headlines.json will be ~18Mb)
4. `python crawler.py` and wait

The script generates *headlines.json*. This file is already generated in this repo with headlines from the last six months.

# generator.js

This is a node module that uses the *headlines.json* data to generate random fake headlines.

## Usage:

```javascript

	var generator = require('./generator');

	//random headline
	generator.generate();

	//random headline, 140 characters max.
	generator.generate(140);

	//random headline, 140 characters max, starting with the word 'Fun'
	generator.generate(140, 'Fun');

```