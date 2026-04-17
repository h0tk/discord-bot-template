<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 18+" />
  <img src="https://img.shields.io/badge/discord.js-v14-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="discord.js v14" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License MIT" />
</p>

<h1 align="center">Discord Bot Starter</h1>

<p align="center">
  <strong>A lean, production-minded foundation for prefix-based Discord bots.</strong><br />
  Built with <code>discord.js</code> v14, ESM, and a single extensible command map—ship features, not boilerplate.
</p>

---

## Why this template

| Principle | What you get |
|-----------|----------------|
| **Clarity** | One entry file, explicit command registration, no hidden magic. |
| **Safety** | Centralized error handling; failed commands don’t crash the process. |
| **Velocity** | Add a command → it appears in `!help` automatically. |
| **Ops-ready** | Environment-based config, sensible defaults, watch mode for local dev. |

---

## Features

- **Prefix commands** — Configurable via `COMMAND_PREFIX` (default `!`).
- **Self-documenting help** — `!help` lists all commands; `!help <name>` shows usage for one command.
- **Rich embeds** — Help overview uses Discord’s native embed styling (brand-aligned accent).
- **Latency check** — `!ping` included as a reference implementation for edit/reply flows.
- **ES modules** — Modern `import`/`export`; aligns with current Node LTS practices.

---

## Requirements

- **Node.js** ≥ 18
- A **Discord application** with a bot user and valid token
- **Message Content Intent** enabled (required for reading message text and prefix parsing)

---

## Quick start

```bash
git clone <your-repo-url>
cd discord-bot
npm install
cp .env.example .env
```

Edit `.env` and set `DISCORD_TOKEN` to your bot token. Optionally set `COMMAND_PREFIX`.

```bash
npm start
```

For development with automatic restarts on file changes:

```bash
npm run dev
```

---

## Discord application setup

1. Open the [Discord Developer Portal](https://discord.com/developers/applications) and create or select an application.
2. Under **Bot**, create a token and paste it into `.env` as `DISCORD_TOKEN`.
3. Under **Bot → Privileged Gateway Intents**, enable **Message Content Intent**.
4. Under **OAuth2 → URL Generator**, select scope **bot** and grant at least **Send Messages** and **Read Message History** (adjust to your needs).
5. Use the generated URL to invite the bot to a server you manage.

> **Security:** Never commit `.env` or expose your token. Rotate it immediately if leaked.

---

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `DISCORD_TOKEN` | Yes | Bot token from the Developer Portal. |
| `COMMAND_PREFIX` | No | Prefix for commands (default: `!`). |

---

## Commands (shipped)

| Command | Description |
|---------|-------------|
| `!help` | Lists all registered commands in an embed. |
| `!help <command>` | Shows description and usage for a single command. |
| `!ping` | Measures round-trip latency between your message and the bot’s reply. |

Replace `!` with your configured prefix if different.

---

## Project structure

```
discord-bot/
├── src/
│   └── index.js      # Client bootstrap, command map, message handler
├── .env.example      # Template for environment variables
├── package.json
└── README.md
```

---

## Extending the bot

Register new commands on the `commands` `Map` in `src/index.js`. Each entry should include:

- `description` — Short text shown in help.
- `usage` *(optional)* — Shown when users run `!help <command>`.
- `run(message, args)` — Async handler; `args` is the token list after the command name.

New commands are picked up by `!help` without additional wiring.

---

## Scripts

| Script | Command |
|--------|---------|
| Start | `npm start` |
| Dev (watch) | `npm run dev` |

---

## License

MIT — use freely in personal and commercial projects. Attribution appreciated but not required.

---

<p align="center">
  <sub>Built for developers who prefer a small surface area and room to grow.</sub>
</p>
