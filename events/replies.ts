import type { Message } from 'discord.js';

const Replies = {
  name: 'messageCreate',
  async execute(message: Message) {
    if (message.author.bot) return;

    if (message.client.user && message.mentions.has(message.client.user.id))
      await message.reply('weeb');
  },
};

export default Replies;
