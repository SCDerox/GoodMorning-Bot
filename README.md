Good Morning Discord-Bot
---
This discord-bot greets you every day, when you are first online. 
You can configure what messages you want to get with plugins.

---

### Localization
You can translate (almost) everything. Every plugin has locales (oder strings) file, where you can translate everything.
The main bot also has some localization-files in the config folder. 

---

### Installation
1) Copy this repository
2) Install dependencies with `npm i`
3) Run `npm run setup` and edit every file shown
4) Delete the `example-plugin` folder in your `plugins` folder, if you don't need it
5) Start the bot with `npm start` (or with pm2 (suggested): `pm2 start GoodMorningBot.js`)

---

### Add a member
Currently, you only can add members in your `members.json` file. I'm also working on a command for that.
An example for a user-configuration can be found in `members.example.json`.

---
### Plugins
SOON™ 

---

### Important:
`This bot is desinged to work for me and some friends and does not need database. You should not use this bot as a public one, because everything is stored in JSON files (Note: I will maybe add DB-support later)`

`This repositiory conains shitcode: It's my first public repo (with code)`

---

#### Contributing
I have planed some more features, you can find a Roadmap [here](https://github.com/SCDerox/GoodMorning-Bot/projects/1).
Feel free to create an issue if you have any suggestions.
