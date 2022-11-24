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
		option.setName('user').setDescription('User to slap.').setRequired(true)
	  ),
	async execute(interaction: CommandInteraction) {
		const target = interaction.options.getMember('user') as GuildMember;
		const author = interaction.user.toString();

		if (!target) return;
		if (target.toString() == author)await interaction.reply("Can't slap yourself weirdo.. 🤔");

		let gifs: string[] = ['https://media.tenor.com/-RSry4HDatUAAAAC/slap-out-kast.gif',
							  'https://media.tenor.com/xdF1G7Hrxa0AAAAC/slap-christmas.gif',
							  'https://media.tenor.com/f_mJk_kTQU4AAAAC/anime-girls.gif',
							  'https://media.tenor.com/NKuG255mKOcAAAAC/nami-zoro.gif',
							  'https://media.tenor.com/4tPx-valsqAAAAAC/nanbaka-ruka.gif'];

		const randomChoice = Math.floor(Math.random() * gifs.length);

		const embedOutput = new EmbedBuilder()
		.setColor('#ED4245')
		.setTitle('Slap Command')
		.setDescription(`${author} **has slapped** ${target.user}!`)
		/*.setThumbnail('clippy')*/
		.setImage(gifs[randomChoice]);
		
		await interaction.reply({ embeds: [embedOutput] });

	},
};

export default slap;