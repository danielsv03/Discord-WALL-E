const Discord = require('discord.js');
const client = new Discord.Client();
const YTDL = require("ytdl-core")


var prefix = '!'
var servers = {};

function play(connection, message) {
  var server = servers[message.guild.id];


  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));


  server.queue.shift();

  server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();

  });




}





client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame("Type "+prefix+"about ");
});

client.on('message', message => {
  if (message.content === '!ping') {
    message.reply('pong');
  }
});



client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  //console.log(args);
  //console.log(client.users.find("username", 'MuZZ').createdAt)

  if(!command.startsWith(prefix)) return;

  if(command === `${prefix}userinfo`) {
    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        //.setAuthor(message.author.username)
        .setColor("#9B59B6")
        .setTitle("Users Info")
        .setDescription("This is the user's info!")
        .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("Created At", message.author.createdAt);
      message.channel.send(embed);
    }
    if (args[0]) {
      let requs = (client.users.find("username", args[0]));
      let embed = new Discord.RichEmbed()
        //.setAuthor(message.author.username)
        .setColor("#9B59B6")
        .setTitle("Users Info")
        .setDescription("This is the user's info!")
        .addField("Full Username", `${requs.username}#${requs.discriminator}`)
        .addField("ID", requs.id)
        .addField("Created At", requs.createdAt);
      message.channel.send(embed);
    }

  }

  if(command === prefix+'dm') {

    message.author.send("test")

  }

    if (command === prefix+"play") {
      var server = servers[message.guild.id];
      if (!args[0]) {
        message.channel.send("Please Provide a link.")
        return;

      }
      if (!message.member.voiceChannel) {
        message.channel.send("Must be in a Voice Channel.")
        return;
      }


      if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
      }



      var server = servers[message.guild.id]
      if(!server.queue[0]) {
        message.reply(":white_check_mark: Succefully Started playing song. :white_check_mark: ")
        console.log(server.queue)

      }
      if(server.queue[0]) {
        message.reply(":white_check_mark: Succefully added song to playlist. :white_check_mark: ")
        console.log(server.queue)

      }

      server.queue.push(args[0]);

      if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        //console.log(message.guild.member(client.user).voiceChannel)



        play(connection, message);


      });




    }


    if (command === prefix+"skip") {
      message.reply("Skipped Song")
      var server = servers[message.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      return;


    }

    if (command === prefix+"purge") {
      console.log(message.author.username + "  Requested:   " + message.content);
      let messagecount = args[0];
      if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.reply("Hold up!, You need to be Administrator too use this!")
        return;

      }
      console.log(message.author.roles)
      if (messagecount <= 1) {
        message.reply("hold up!, It need to be more than "+args[0])

      } else {
        //console.log(messagecount)
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
        //message.delete()
      }
    }

    if (command === prefix+"curbo") {
      console.log("WOo A curbo was requested");
      fol = Math.floor((Math.random() * 1) + 1);

      if (fol == 2) {
        numm = Math.floor((Math.random() * 3) + 1);
        filee = "curbos/mov/"+numm+".MOV"

      };

      if (fol == 1) {

        numm = Math.floor((Math.random() * 108) + 1);
        filee = "curbos/"+numm+".jpg"
        console.log("id = "+numm)
        console.log("full = "+filee)
      }

      message.channel.send("A Curbo in the Wild", {
        file: filee
      });

    }

    if (command === prefix+"stop") {
      message.reply("Stopped Song")
      var server = servers[message.guild.id];

      if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect()
      return;



          }



    if (command === prefix+"psay") {
      message.delete()
      message.channel.send(args[0])
    }

    if (command === prefix+"disconnect") {

    }



    if(command === `${prefix}newprefix`) {
      console.log(args[0])
      prefix = args[0]
      message.reply("Succesfully changed prefix.")
      client.user.setGame("Type "+prefix+"about ");
    }


    if (message.content === prefix+'about') {
      message.reply("I'm a bot by DanielSv03. I'm currently in development and is hoping on becoming something usefull :) Ps. Do "+prefix+"help")
      if (!message.author.bot) {
        console.log(message.author.username + "  Requested:  " + message.content);

      }
    }


    if (message.content === prefix+'help') {
      message.author.send(" _____________________________")
      message.author.send("Here is a list of Commands.")
      //message.author.send(" ")
      message.author.send(" * !purge number")
      message.author.send(" * !newprefix new-prefix")
      message.author.send(" * !about")
      message.author.send(" * ping")
      message.author.send(" __And Some muzic Stuff__")
      //message.author.send(" ")
      message.author.send(" * !play Youtube-link")
      message.author.send(" * !skip")
      message.author.send(" * !stop")
      message.author.send(" ____________________________")
    }
})


client.login('Mzg3MzI3MjM5NjcyNDMwNTk0.DQc7kA.3KUBKyc3OqnpppJtuqSc4uEjKMQ');
