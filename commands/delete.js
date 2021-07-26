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
    if(!args[0]) return message.channel.send('please specify the name of the application you want to delete')
	const state = Nuggies.applications.deleteApplication(message.guild.id, args[0]);
    if(state) return message.channel.send('application deleted!');
    else if(!state) return message.channel.send('application not found');
};

module.exports.config = {
	name: 'delete',
	description: 'delete application',
	usage: '?delete',
	botPerms: [],
	userPerms: ['MANAGE_GUILD'],
	aliases: []
};