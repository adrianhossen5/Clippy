import {
	CommandInteraction,
	GuildMember,
} from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';
const { EmbedBuilder } = require('discord.js');

const slap = {
	builder: new SlashCommandBuilder()
		.setName('slap')
		.setDescription('slap')
		.addUserOption((option) =>
		option.setName('user').setDescription('User to verify.').setRequired(true)
	  ),
	async execute(interaction: CommandInteraction) {
		const target = interaction.options.getMember('user') as GuildMember;
		if (!target) return;
		
		const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/AfFp7pu.png')
		.addFields(
			{ name: 'Regular field title', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
			{ name: 'Inline field title', value: 'Some value here', inline: true },
		)
		.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
		.setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


		interaction.reply({ embeds: [exampleEmbed] });

	},
};

export default slap;