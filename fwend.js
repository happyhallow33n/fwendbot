const Discord = require('discord.js');

const prefix = '!';

const fs = require('fs');



function numberstuff(min, max) {
  return Math.random() * (max - min) + min;
}

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('fwendbot is online!');
});

client.on('message', message => {



    if (message.content == "!roleme he/him") {
        let member = message.member;
        if (member.roles.cache.some(role => role.name === "he/him")) {
            message.channel.send('you already have that role');
        } else {
            var role = member.guild.roles.cache.find(role => role.name === "he/him");
            member.roles.add(role).catch(console.error);
            message.channel.send('he/him role added');
        }
    }

    if (message.content == "!roleme she/her") {
        let member = message.member;
        if (member.roles.cache.some(role => role.name === "she/her")) {
            message.channel.send('you already have that role');
        } else {
            var role = member.guild.roles.cache.find(role => role.name === "she/her");
            member.roles.add(role);
            message.channel.send('she/her role added');
        }
    }

    if (message.content == "!roleme they/them") {
        let member = message.member;
        if (member.roles.cache.some(role => role.name === "they/them")) {
            message.channel.send('you already have that role');
        } else {
            var role = member.guild.roles.cache.find(role => role.name === "they/them");
            member.roles.add(role);
            message.channel.send('they/them role added');
        }
    }


    if (message.content == "i hate chestnut") {
      let member = message.member;
      if (member.roles.cache.some(role => role.name === "queen")) {
          message.channel.send('shut up, tunie');
      } else {
          message.channel.send('shut up, nerd');
      }
  }

    if (message.content == "i hate tunie") {
        message.channel.send("me too :)");
    }

    if (message.content == "i hate fwendbot") {
        message.channel.send(":(");
    }

    if (message.content == "I hate tunie") {
        message.channel.send("me too :)");
    }

    if (message.content == "I hate chestnut") {
        message.channel.send("shut up, nerd.");
    }

    if (message.content == "I hate fwendbot") {
        message.channel.send(":(");
    }

    if (message.content == "hi fwendbot") {
        message.channel.send("hi :)");
    }





	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(process.env.FWENDTOKEN);
