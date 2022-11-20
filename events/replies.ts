import type { Message } from 'discord.js';

const Replies = {
  name: 'messageCreate',
  async execute(message: Message) {
    if (message.author.bot) return;

    const lowered = message.content.toLowerCase();
    const chance = Math.floor(Math.random() * 2) == 0;

    if (chance) {
      if (lowered.split(' ')[0] == 'bill')
        await message.reply(
          'https://tenor.com/view/bill-gates-dab-gif-25596097'
        );
      else if (lowered.split(' ')[0] == 'almond' || lowered === 'almond')
        await message.reply('milk');
    }

    if (message.client.user && message.mentions.has(message.client.user.id))
      await message.reply(
        'https://tenor.com/view/clippy-microsoft-word-office-publisher-gif-5630385'
      );
  },
};

export default Replies;
