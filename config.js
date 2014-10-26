var config = {};
config.junkyard = {};
config.bot = {};

config.junkyard.host = 'localhost';
config.junkyard.port = 8000;

/*************************
 * Register your bot on a Junkyard and you will be provided a secret to enter here
 * This secret identifies your bot.
 *************************/
config.bot.secret = 'INSERT PROPER SECRET HERE';


// Don't Edit Me
config.bot.heartbeat = 60;
config.bot.memory = 4000;

module.exports = config;