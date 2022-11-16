import type { Client, Guild } from 'discord.js'
import { config } from 'dotenv'

config()

const Ready = {
  name: 'ready',
  once: true,
  async execute(client: Client) {
    if (!client.user) throw new Error('Client user is null')

    if (!client.application?.owner) await client.application?.fetch()

    const guild = await client.guilds.cache.get(process.env.GUILD_ID ?? '') as Guild

    console.log(`Ready! Logged in as ${client.user.tag}`)
  }
}

export default Ready