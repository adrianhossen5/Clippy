import {
  ActionRowBuilder,
  CommandInteraction,
  GuildMemberRoleManager,
  SelectMenuBuilder,
  SelectMenuInteraction,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

const options: { [key: string]: string | boolean }[] = [
  {
    label: 'Xbox',
    value: 'Xbox',
  },
  {
    label: 'Minecraft',
    value: 'Minecraft',
  },
  {
    label: 'Azure',
    value: 'Azure',
  },
  {
    label: 'Bing',
    value: 'Bing',
  },
  {
    label: 'Azure',
    value: 'Azure',
  },
  {
    label: 'Office',
    value: 'Office',
  },
  {
    label: 'Teams',
    value: 'Teams',
  },
  {
    label: 'SWE',
    value: 'SWE',
  },
  {
    label: 'PM',
    value: 'PM',
  },
  {
    label: 'Explore',
    value: 'Explore',
  },
  {
    label: 'Redmond',
    value: 'Redmond',
  },
  {
    label: 'Bellevue',
    value: 'Bellevue',
  },
];

const rolesMap: { [key: string]: string } = {
  Xbox: 'Xbox',
  Azure: 'Azure',
  Minecraft: 'Minecraft',
  Bing: 'Bing',
  Office: 'Office',
  Teams: 'Teams',
  SWE: 'SWE',
  PM: 'PM',
  Explore: 'Explore',
  Redmond: 'Redmond',
  Bellevue: 'Bellevue',
};

const rolesSet = new Set(Object.keys(rolesMap));

const Roles = {
  builder: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Select your roles.'),
  async execute(interaction: CommandInteraction) {
    const roles = interaction.guild?.roles.cache;

    const roleOptions = options;

    for (const option of roleOptions) {
      const role = roles?.find(
        (role) => role.name === rolesMap[option.value as string]
      );
      option['default'] = false;
      if (
        role &&
        (interaction.member.roles as GuildMemberRoleManager).resolve(role.id)
      )
        option['default'] = true;
    }

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
      new SelectMenuBuilder()
        .setCustomId('roles')
        .setPlaceholder('Select your roles.')
        .setMaxValues(2)
        .addOptions(roleOptions as any)
    );

    await interaction.reply({
      content: 'Select roles to add.',
      components: [row],
      ephemeral: true,
    });
  },
  async onSelect(interaction: SelectMenuInteraction) {
    const roles = interaction.guild?.roles.cache;
    const valueSet = new Set(interaction.values);
    const notSelected = new Set([...rolesSet].filter((x) => !valueSet.has(x)));

    // roles to add
    valueSet.forEach(async (v) => {
      const role = roles?.find((role) => role.name === rolesMap[v]);
      if (role)
        await (interaction.member.roles as GuildMemberRoleManager).add(role);
    });

    // roles to remove
    notSelected.forEach(async (v) => {
      const role = roles?.find((role) => role.name === rolesMap[v]);
      if (role)
        await (interaction.member.roles as GuildMemberRoleManager).remove(role);
    });

    await interaction.update({
      content: `You are now part of ${interaction.values.join(', ')}.`,
      components: [],
    });
  },
};

export default Roles;
