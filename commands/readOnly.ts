import type { CommandInteraction, GuildMember, GuildMemberRoleManager } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

const ReadOnly = {
  builder: new SlashCommandBuilder()
    .setName('readonly')
    .setDescription('Set a user to readonly mode.'),
  async execute(interaction: CommandInteraction) {
      await interaction.reply({
        content: 'lol'
      })
  }
}

export default ReadOnly