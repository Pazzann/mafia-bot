<div align="center">

# 🕵️‍♂️ Mafia Discord Bot

**An asynchronous, DM-based Discord bot for the social-deduction game "Mafia" — with a scriptable engine for building your own roles and win conditions.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()
[![Discord.js](https://img.shields.io/badge/Discord.js%20v14-5865F2?style=for-the-badge&logo=discord&logoColor=white)]()
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)]()

<img src="https://media.discordapp.net/attachments/541691734833496084/1474401073870540881/image.png?ex=6999b681&is=69986501&hm=d7434f1fde56d53e1ff170d4279d95b69dad9d0698786d85d411dce49acf4795&=&format=webp&quality=lossless&width=833&height=1177" alt="demo" width="200"/>

### [➕ Add to your server](https://discord.com/oauth2/authorize?client_id=1015703495288037407) &nbsp;•&nbsp; [💬 Support server](https://discord.gg/ZWnx8rqGTD)

</div>

---

## 📌 About

Mafia Bot runs the party game **Mafia** (aka Werewolf) entirely through Discord. Unlike most implementations that play out in a shared channel, this bot runs each game **privately in players' DMs** — roles stay secret, and night actions and day votes are collected through interactive buttons and select menus. The bot acts as the game master: it deals roles, resolves night actions, tallies votes, checks win conditions, and tracks per-player stats.

Its distinguishing feature is a small **sandboxed scripting engine**: premium users can design their own **roles** and **winning conditions** from a formula/expression language, without touching the bot's source.

---

## ✨ Features

- **🎭 Asynchronous, DM-based play** — a game is opened in a server with `/create`; from there each player plays privately in DMs, so roles and actions stay hidden.
- **🌗 Night & day rounds** — each day has a *choosing* stage (night actions like kill/heal/check) and a *discussion* stage (day voting with tallying, ties, and elimination).
- **🧩 Built-in roles** — Mafia, Killer, Doctor, Police (detective), Mistress, and Peaceful (citizen).
- **🛠️ Custom roles & win conditions** — build your own using a safe expression language evaluated in a [vm2](https://github.com/patriksimek/vm2) sandbox (see [Scripting](#-custom-roles--scripting)).
- **👤 Profiles & stats** — per-user total games, wins, and join date, persisted with TypeORM. View with `/profile`.
- **🌍 Localization** — 11 languages, selectable per user via `/lang` (English, Russian, Ukrainian, German, Polish, Spanish, Arabic, and more).
- **💎 Premium tier** — custom roles/conditions and scripting are gated behind a premium role, synced from a designated Discord server.
- **📣 News broadcasts** — a script to DM announcements to users who opted in to notifications.

---

## 🎮 How it works

1. A host runs `/create` in a server channel. This posts a lobby with **Join / Leave / Start / Edit / Cancel** buttons.
2. Players join the lobby. The host can edit which **roles** and **winning conditions** are in play before starting.
3. On start, roles are shuffled and dealt to players **via DM**. From here the game is played entirely in DMs.
4. **Night (choosing stage):** players with night actions (kill, heal, check, alibi, …) pick targets through select menus.
5. **Day (discussion stage):** surviving players vote; the bot tallies votes, handles ties, and eliminates the chosen player.
6. After each stage the bot evaluates all active **winning conditions**; when one is met, it announces winners, updates stats, and records the game.

---

## 🧙 Built-in roles

| Role | Night action | Notes |
|------|--------------|-------|
| **Mafia** | `kill` | Coordinated group elimination |
| **Killer** | `kill` | Independent killer with its own win condition |
| **Doctor** | `heal` | Protects a player from being killed |
| **Police** | `check` / `full_check` | Investigates a player's role |
| **Mistress** | `alibi` | Provides an alibi / blocks a target |
| **Peaceful** | `no_activity` | Standard citizen, wins with the innocents |

Actions are defined in [`src/types/Action.ts`](src/types/Action.ts); role logic lives in [`src/Classes/Roles/`](src/Classes/Roles).

---

## 🧠 Custom roles & scripting

Premium users can create custom **roles** and **winning conditions** through the `/profile` menus. Numeric/text/boolean behavior (role counts, win checks, embed descriptions) is expressed with a small template language and evaluated safely:

- Expressions run inside a **vm2 `VM`** with an empty sandbox, no async, and a 100 ms timeout ([`src/Classes/ScriptBuilder.ts`](src/Classes/ScriptBuilder.ts)).
- A validator rejects anything containing `require`, `import`, `process`, `eval`, `Function`, `async`, `await`, `vm`, or `new`.
- Template variables (resolved by [`src/Classes/ScriptFactory.ts`](src/Classes/ScriptFactory.ts)) let scripts reference live game state, e.g. `{pCount}` (player count), `{aPlayerCount}` (alive players), `{r:<role>:count}` (players with a role), `{a:<action>:count}` (players who took an action), and alive-only variants.

This is what powers, for example, a win condition like "mafia win when their count ≥ half the alive players."

---

## 🧱 Tech stack

- **Language:** TypeScript
- **Runtime:** Node.js **≥ 16.11** (required by discord.js v14; 18/20 recommended)
- **Discord API:** [discord.js](https://discord.js.org/) v14 + `@discordjs/rest`
- **Database:** PostgreSQL via [TypeORM](https://typeorm.io/) (`synchronize: true` — schema is created automatically)
- **Sandbox:** [vm2](https://github.com/patriksimek/vm2) for custom scripts
- **Config:** dotenv

---

## 🚀 Getting started

### Prerequisites
- Node.js **≥ 16.11** (18 or 20 recommended)
- A PostgreSQL database (any provider; a free [Supabase](https://supabase.com/) project works well)
- A Discord application + bot token from the [Discord Developer Portal](https://discord.com/developers/applications)

### Installation

```sh
git clone https://github.com/Pazzann/mafia-bot.git
cd mafia-bot
yarn install      # or: npm install
```

### Configuration

Copy the example env file and fill in your values:

```sh
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `TOKEN` | Discord bot token |
| `CLIENT_ID` | Discord application (client) ID — used to register commands |
| `GUILD_ID` | Server used for premium-role syncing |
| `ROLE_ID` | Role ID that grants premium features |
| `SQLHOST` | Postgres host |
| `SQLPORT` | Postgres port (e.g. `5432`) |
| `SQLUSERNAME` | Postgres username |
| `SQLPASSWORD` | Postgres password |
| `SQLDATABASE` | Postgres database name |

> **Supabase note:** the direct DB host (`db.<ref>.supabase.co`) is IPv6-only. On IPv4 networks use the **connection pooler** host (`aws-0-<region>.pooler.supabase.com`, port `5432`) with the username form `postgres.<project-ref>`.

### Register slash commands (run once)

```sh
yarn register
```

### Run

```sh
# Development (ts-node, no build step)
yarn dev

# Production (compile, then run the compiled output)
yarn build
yarn start
```

---

## 📜 Scripts

| Script | What it does |
|--------|--------------|
| `yarn dev` | Run the bot with `ts-node` (development) |
| `yarn build` | Compile TypeScript to `dist/` |
| `yarn start` | Run the compiled bot (`node dist/index.js`) |
| `yarn register` | Register the slash commands with Discord |
| `yarn notifications` | DM a news broadcast to users who opted in |
| `yarn test` | Run the Mocha/nyc test suite |

Slash commands: **`/create`**, **`/lang`**, **`/profile [user]`**, **`/help`**. All other interactions (joining games, managing custom roles/conditions, voting, etc.) are handled through buttons, select menus, and modals.

---

## 🗂️ Project structure

```
src/
├── index.ts              # Entry point: Discord client, interaction router, TypeORM data source
├── deploy-commands.ts    # Registers slash commands (yarn register)
├── notifications.ts      # One-off news broadcast to opted-in users
├── commands/             # Interaction handlers
│   ├── gameCommands/     #   lobby & in-game actions (join, start, edit, cancel, ...)
│   ├── profileCommands/  #   profile, custom roles/conditions, premium, scripting
│   └── modals/           #   modal (form) submissions
├── Classes/
│   ├── MafiaGame.ts      # Core game loop (stages, voting, win checks)
│   ├── MafiaUser.ts      # In-game player wrapper
│   ├── Roles/            # Built-in role behaviors
│   ├── WinningConditions/# Built-in win conditions
│   ├── ScriptBuilder.ts  # vm2 sandboxed expression evaluator
│   └── ScriptFactory.ts  # Template-variable resolution for scripts
├── Entities/             # TypeORM entities: User, Role, WinningCondition, Game
├── Functions/            # Helpers (shuffle, embeds, buttons, ...)
├── langs/                # Localization JSON (11 languages)
└── types/                # Shared types & interfaces
```

---

## ☁️ Deployment

- Deploy the **compiled** build (`yarn build` → `node dist/index.js`), not `ts-node`.
- Ensure the host runs **Node ≥ 16.11** — discord.js v14 will not run on older Node (e.g. Node 12 fails immediately on modern syntax).
- Provide the environment variables from the table above (via the host's env/secrets panel or an uploaded `.env`).
- `pg` is a runtime dependency, so `npm install --production` on the host installs everything the bot needs.

---

<div align="center">
<i>Developed by Anton Matiash</i>

<a href="https://github.com/Pazzann">GitHub</a>
</div>
</content>
