import type {
  CommandInteraction,
  GuildMember,
  GuildMemberRoleManager,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const Verified = {
  builder: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify a user.')
    .addUserOption((option) =>
      option.setName('user').setDescription('User to verify.').setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const target = interaction.options.getMember('user') as GuildMember;
    if (!target) return;

    const roles = interaction.guild?.roles.cache;
    const isVerified = target.roles.cache.some(
      (role) => role.name === 'verified'
    );

    if (isVerified) {
      await interaction.reply({
        content: `<@${target.user.id}> has already been verified.`,
        ephemeral: true,
      });
    } else {
      await (target.roles as GuildMemberRoleManager)
        .add(roles?.find((role) => role.name === 'verified') ?? '')
        .then(() =>
          interaction.reply({
            content: `<@${target.user.id}> has been verified.`,
          })
        );
    }
  },
};

export default Verified;
