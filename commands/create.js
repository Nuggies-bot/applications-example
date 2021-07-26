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
	Nuggies.applications.setup()
};

module.exports.config = {
	name: 'create',
	description: 'Create application',
	usage: '?create',
	botPerms: [],
	userPerms: ['MANAGE_GUILD'],
	aliases: []
};