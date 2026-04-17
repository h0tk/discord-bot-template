import "dotenv/config";
import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";

const PREFIX = process.env.COMMAND_PREFIX ?? "!";
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

/** @type {Map<string, { description: string; usage?: string; run: (msg: import('discord.js').Message, args: string[]) => Promise<void> | void }>} */
const commands = new Map();

commands.set("help", {
  description: "Show this help message.",
  usage: `${PREFIX}help [command]`,
  async run(message, args) {
    if (args.length > 0) {
      const name = args[0].toLowerCase();
      const cmd = commands.get(name);
      if (!cmd) {
        await message.reply(`Unknown command: \`${name}\`. Use \`${PREFIX}help\` for a list.`);
        return;
      }
      const lines = [
        `**${name}** — ${cmd.description}`,
        cmd.usage ? `Usage: \`${cmd.usage}\`` : null,
      ].filter(Boolean);
      await message.reply(lines.join("\n"));
      return;
    }

    const list = [...commands.keys()].sort().map((n) => `\`${PREFIX}${n}\``).join(", ");
    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle("Commands")
      .setDescription(`Prefix: \`${PREFIX}\`\n\n${list}`)
      .setFooter({ text: `Use ${PREFIX}help <command> for details.` });
    await message.reply({ embeds: [embed] });
  },
});

commands.set("ping", {
  description: "Check if the bot is responding.",
  usage: `${PREFIX}ping`,
  async run(message) {
    const sent = await message.reply("Pong!");
    const latency = sent.createdTimestamp - message.createdTimestamp;
    await sent.edit(`Pong! Round-trip: **${latency}** ms.`);
  },
});

client.once("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}`);
  console.log(`Command prefix: ${PREFIX}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const withoutPrefix = message.content.slice(PREFIX.length).trim();
  if (!withoutPrefix) return;

  const [name, ...argParts] = withoutPrefix.split(/\s+/);
  const commandName = name.toLowerCase();
  const command = commands.get(commandName);
  if (!command) return;

  const args = argParts;
  try {
    await command.run(message, args);
  } catch (err) {
    console.error(`Error in ${commandName}:`, err);
    await message.reply("Something went wrong while running that command.").catch(() => {});
  }
});

if (!TOKEN) {
  console.error("Missing DISCORD_TOKEN. Copy .env.example to .env and set your token.");
  process.exit(1);
}

client.login(TOKEN);
