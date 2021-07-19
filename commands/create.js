// require Nuggies
const Nuggies = require('nuggies');
const Discord = require('discord.js');
const application = {
	questions: [],
};
/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.run = async (client, message, args) => {
	message.channel.send('What should be the name of the application?');
	const filter = m => m.author.id === message.author.id;
	const collector = message.channel.createMessageCollector(filter);
	let step = 0;
	collector.on('collect', (msg) => {
		if (!msg.content) return msg.reply('That is not valid option!');
		step++;
		if (step == 1) {
			application.name = msg.content;
			message.channel.send('What should be the description of the application?');
		}
		else if (step == 2) {
			application.description = msg.content;
			message.channel.send('Where should be the responses sent in? Provide the ID of the channel');
		}
		else if (step == 3) {
			if (!message.guild.channels.cache.get(msg.content)) return collector.stop('INVALID_CHANNEL');
			application.responseChannelID = msg.content;
			message.channel.send('Where should the message be sent? Provide the ID of the channel');
		}
		else if (step == 4) {
			if (!message.guild.channels.cache.get(msg.content)) return collector.stop('INVALID_CHANNEL');
			application.channel = msg.content;
			message.channel.send('What should be the emoji? Optional');
		}
		else if (step == 5) {
			const reaction = await msg.react(msg.content).catch(() => null);
			if (reaction) application.emoji = reaction.emoji.id ? reaction.emoji.id : reaction.emoji.name;
			message.channel.send('What should be the label?');
		}
		else if (step == 6) {
			application.label = msg.content;
			message.channel.send('How many max applications should 1 person be able to create?');
		}
		else if (step == 7) {
			if (isNaN(msg.content)) return collector.stop('INVALID_NUMBER');
			application.maxApps = parseInt(msg.content);
			message.channel.send('What questions do you want in the application? Say `done` when you have put all the questions');
		}
		else if (step >= 8) {
			if (msg.content.toLowerCase() == 'done') {
				return collector.stop('DONE');
			}
			application.questions.push(msg.content);
			message.channel.send(`Question #${application.questions.length + 1} is?`)
		}
	});

	collector.on('end', (msgs, reason) => {
		const data = await Nuggies.applications.addApplication(application);
	});
};

module.exports.config = {
	name: 'create',
	description: 'Create application',
	usage: '?create',
	botPerms: [],
	userPerms: ['MANAGE_GUILD'],
	aliases: []
};