<div align="center">

# 🕵️‍♂️ Mafia Discord Bot

**A fully automated, asynchronous Discord bot for the classic social deduction game "Mafia".**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()
[![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white)]()
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)]()


<img src="https://media.discordapp.net/attachments/541691734833496084/1474401073870540881/image.png?ex=6999b681&is=69986501&hm=d7434f1fde56d53e1ff170d4279d95b69dad9d0698786d85d411dce49acf4795&=&format=webp&quality=lossless&width=833&height=1177" alt="demo" width="200"/>
</div>

# [Add to server link](https://discord.com/oauth2/authorize?client_id=1015703495288037407)

---

## 📌 About The Project

This project brings the classic party game **"Mafia"** to Discord. It acts as an automated Game Master, seamlessly handling complex game logic, asynchronous voting phases, private role assignments, and database persistence. 

Built as an exercise in **robust state management** and **asynchronous event handling**, the bot ensures a smooth and cheat-free gaming experience for servers of any size.

### ✨ Key Features
* **🤖 Automated Game Master:** Completely handles Day (discussion/voting) and Night (mafia/doctor actions) phases.
* **🎭 Dynamic Role Assignment:** Secretly assigns and manages roles (Mafia, Doctor, Detective, Citizen) via direct messages.
* **🗳️ Real-time Voting System:** Interactive voting mechanics with automatic vote tallying and execution logic.
* **💾 Persistent State:** Uses TypeORM to securely save game states, player stats, and active sessions.

---

## 🛠️ Built With

* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing for robust logic)
* **Runtime:** [Node.js](https://nodejs.org/)
* **API Wrapper:** [Discord.js](https://discord.js.org/) (v14)
* **Database/ORM:** [TypeORM](https://typeorm.io/) (PostgreSQL / SQLite)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* Node.js (v16.x or higher)
* A Discord Bot Token (from the [Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1. **Clone the repository:**
   ```sh
   git clone [https://github.com/Pazzann/mafia-bot.git](https://github.com/Pazzann/mafia-bot.git)
   cd mafia-bot


2. **Install NPM packages:**
```sh
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory and add your credentials:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_test_server_id_here
DATABASE_URL=your_database_connection_string

```


4. **Compile and Run:**
```sh
npm run build
npm run start

```



---

## 🧠 Architecture & Logic (For Developers)


The bot relies on a **Finite State Machine (FSM)** architecture to transition between game phases (`Lobby` -> `Night Phase` -> `Day Phase` -> `Voting`). All interactions are handled asynchronously via Discord's Slash Commands and Button Interactions, ensuring non-blocking performance.
For roles, interactions and actions uses custom scripts made with Factory and Builder patterns
---

<div align="center">
<i>Developed by Anton Matiash</i>



<a href="https://www.google.com/search?q=https://linkedin.com/in/anton-matiash-bfg">LinkedIn</a> • <a href="https://www.google.com/search?q=https://github.com/Pazzann">GitHub</a>
</div>
