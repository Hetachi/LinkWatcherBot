const token = require('./components/config/botToken')
const owner = require('./components/config/ownerID')

var Discord = require('discord.io');
var bot = new Discord.Client({
    token: token,
    autorun: true
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

var urlCheckRegEx = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm

bot.on('message', function(user, userID, channelID, message, event) {
    const messageID = event.d.id;

    const messageCheckedForALink = urlCheckRegEx.exec(message);
    console.log(messageCheckedForALink)
    if(messageCheckedForALink && userID === owner) {
      bot.sendMessage({
        to: owner,
        message: "<@" + userID + "> has sent a message containing a link:\n" + messageCheckedForALink[0] + '\n\n------------- Channel name -------------\n'+ bot.channels[channelID].name + "\n\n------------- Full message ------------- \n" + message
      })
    }
})
