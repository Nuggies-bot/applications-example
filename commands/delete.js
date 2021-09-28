// require Nuggies
const Nuggies = require('nuggies');
const Discord = require('discord.js');
/**
 * @param {Discord.Client} client
 * @param {Discord.CommandInteraction} message
 * @param {Discord.CommandInteractionOptionResolver} args
 */
module.exports.run = async (client, interaction, args) => {
	const state = await Nuggies.applications.deleteApplication({ guildID: interaction.guild.id, name: args.getString('name') });
	console.log(state);
	if (state) return interaction.reply('application deleted!');
	else if (!state) return interaction.reply('application not found');
};

module.exports.config = {
	name: 'delete',
	description: 'delete application',
	usage: '?delete',
	botPerms: [],
	userPerms: ['MANAGE_GUILD'],
	data: {
		name: 'delete',
		description: 'Deletes application',
		defaultPermission: true,
		options: [
			{
				name: 'name',
				description: 'Name of the application',
				required: true,
				type: 'STRING',
			},
		],
	},
};