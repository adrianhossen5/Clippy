import type { Interaction, TextChannel } from 'discord.js';
import getCommands from '../utils/getCommands';

let commands: { [key: string]: any };
(async () => (commands = await getCommands()))();

const InteractionCreate = {
  name: 'interactionCreate',
  async execute(interaction: Interaction) {
    if (interaction.isCommand()) {
      const command = commands[interaction.commandName];
      if (!command) return;

      if (
        command.channels &&
        !command.channels.includes((interaction.channel as TextChannel)?.name)
      ) {
        await interaction.reply({
          content: `You can only use this command in ${command.channels.join(
            ', '
          )}.`,
          ephemeral: true,
        });
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }

    if (interaction.isSelectMenu()) {
      const command =
        commands[(interaction.message.interaction as any).commandName];
      if (!command) return;

      try {
        await command.onSelect(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};

export default InteractionCreate;
