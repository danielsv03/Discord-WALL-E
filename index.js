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

  //console.log("musarg ==== "+musarg)
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

    if (command === prefix+"invite") {

      message.reply("Here is my invite link:  https://discordapp.com/api/oauth2/authorize?client_id=387327239672430594&permissions=8&scope=bot")

    }


    if (command === prefix+"play") {
      var musarg = message.content.replace(prefix+"play", '')
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

<<<<<<< HEAD


      var server = servers[message.guild.id]
      if(!server.queue[0]) {
        message.reply(":white_check_mark: Succefully Started playing song. :white_check_mark: ")
        console.log(server.queue)

=======
      message.reply("Searching for: "+musarg)
      var server = servers[message.guild.id]




      var YouTube = require('youtube-node');
      
            var youTube = new YouTube();
      
            youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');
      
            youTube.search(musarg, 1, function(error, result) {
              if (error) {
                console.log(error);
              }
              else {
                vidid = result.items[0].id.videoId
                url = ("https://www.youtube.com/watch?v="+vidid)
                //console.log(url)
                server.queue.push(url);

                //let requs = (client.users.find("username", args[0]));
                let embed = new Discord.RichEmbed()
                //.setAuthor(message.author.username)
                .setColor("#ff0000")
                .setTitle("Song Info")
                .setDescription("This is the youtube song info!")
                .setThumbnail(result.items[0].snippet.thumbnails.high.url)
                .addField("Song name", result.items[0].snippet.title)
                .addField("Channel Name", result.items[0].snippet.channelTitle)
                .addField("Published At", result.items[0].snippet.publishedAt)
                .addField("Song Requested by:", message.author);
                //.addField("Created At", requs.createdAt);
                //.addField("Created At", requs.createdAt);
              message.channel.send(embed);


                
              }
            });





      if(!server.queue[1]) {
        //message.reply(":white_check_mark: Succefully Found song.. :white_check_mark: ")
        

        //console.log(server.queue)
    
>>>>>>> f98f5fbbe337f1dedb90112c648aa62a1ab4af14
      }
      if(server.queue[1]) {
        message.reply(":white_check_mark: Succefully added song to playlist. :white_check_mark: ")
<<<<<<< HEAD
        console.log(server.queue)

=======
        //console.log(server.queue)
        
>>>>>>> f98f5fbbe337f1dedb90112c648aa62a1ab4af14
      }



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

<<<<<<< HEAD
=======
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
>>>>>>> f98f5fbbe337f1dedb90112c648aa62a1ab4af14


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
      message.author.send("```Here is a list of my commands please note that all of these commands has the set prefix before \
      * purge number NOTE: Only for ADMINISTRATORS \
      * newprefix prefix \
      * userinfo user NOTE: if no user defined the user info will be of you \
      * help \
      ____________Music__________ \
      *play song name \
      *skip \
      *stop \
      I'm adding more stuff soon, if you have contact with DanielSv03 please feel free to suggest improvments :) ```")
      
    }
})


client.login('Mzg3MzI3MjM5NjcyNDMwNTk0.DQc7kA.3KUBKyc3OqnpppJtuqSc4uEjKMQ');
