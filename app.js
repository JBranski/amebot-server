const tmi = require('tmi.js');
const express = require( 'express' );
const cors = require('cors')
const app = express();
const router = require('./routers/router');

const corsOptions = {
	origin: 'https://ame-chat-bot.vercel.app',
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use( '/api/', router );

app.use(router)

module.exports = app;

// Define configuration options
const configs = {
  options: {
    debug: true,
  },
  identity: {
    username: "amethysthelpbot",
    password: "rg09m2ieg3znmronkgzqqvwigoz5bw"
  },
  channels: [
    "with_faith",
  ]
};

// Create a client with our options
const client = new tmi.client(configs);



// Custom variables
const blocked_words = ['bababoii', 'trip', 'cats'];



// Setup event handlers
client.on('chat', onChatHandler);
client.on('connected', onConnectedHandler);
client.on('message', (channel, userstate, message, self) => {
	// do NOT let the bot talk to itself
  if (self) return;
  if (message.toLowerCase() === '!hello') {
    client.say(channel, `@${userstate.username}, hello!`);
  }
  checkChat(channel, userstate, message);
});

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onChatHandler(target, context, msg, self) {
  if (self) { return; } 

  // checks for additional whitespace
  const commandName = msg.trim();



  // Commands!
	if ( commandName === '!dice' ) {
		const num = rollDice();
		client.say(target, `You rolled a ${num}`);
	}
	if ( commandName === '!hello' ) {
		client.say(target, `Hello chat! Ame bot wishes you well`);
	}
	if ( commandName === '!best' ) {
		client.say(target, `You da best`);
	}
	if ( commandName === '!steam' ) {
		client.say(target, `Sorry, I only add close friends on Steam`);
	}
	if ( commandName === '!game' ) {
		client.say(target, `We are currently watching some poor gameplay by Faith`);
	}
	if( commandName === '!color' ) {
		client.say('with_faith', `My name is the color ${context.color}!`);
	}

}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

//check twitch chat, delete message which isnt suitable and respond to it
function checkChat(channel, username, message) {
  let shouldSendMessage = false;
  //check message
  message = message.toLowerCase();
  shouldSendMessage = blocked_words.some(blockedWord => message.includes(blockedWord.toLowerCase()));
  //tell user
 // client.say(channel, `@${username.username} oopsie message deleted`);
  //delete message
  if (shouldSendMessage) {
    client.deletemessage(channel, username.id)
      .then((data) => {
        //nothing
      }).catch((err) => {
        //nothing
      });
      client.say(channel, `@${username.username} oopsie, looks like you shouldn't have said that!`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  //client.say('Lonermoan', `connected to ${addr} and ${port}`);
  client.say('with_faith', 'Hello chat! Amebot is here :)');
}