/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */


const utils = require("./src/utils/utils");
const config = require("./config/config.json");
const bot_strings = require("./config/bot-strings.json");
const fs = require("fs")
const Discord = require("discord.js");

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.prefix = config.prefix;

fs.readdir("./src/events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./src/events/${file}`);
        let eventStart = eventFunction.run.bind(null, client);
        let eventName = file.split(".")[0];
        client.events.set(eventName, eventStart);
        client.on(eventName, (...args) => eventFunction.run(client, utils, ...args));
    });
});

fs.readdir('./src/commands/', (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        let props = require(`./src/commands/${ f }`);
        props.fileName = f;
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

// Here because something could happen with the

client.on("message", async message => {
    try {
        if (message.author.bot) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        if (!client.aliases.has(command)) return message.author.send(bot_strings["command_not_found"]);
        if (client.aliases.has(command)) command = client.commands.get(client.aliases.get(command)).help.name;
        if (client.commands.get(command).config.restricted === true) {
            if (message.author.id !== config.ownerID) return message.author.send(bot_strings["command_only_for_bot_owner"])
        }
        if (client.commands.get(command).config.args === true) {
            if (!args[0]) return message.channel.send(bot_strings["need_more_arguments"])
        }
        fs.readFile('config/members.json', async function(err, data) {
            if (err) throw new Error()
            const members = JSON.parse(data)
            if (!members[message.author.id]) return await message.author.send(bot_strings["you_are_not_registed_yet"])
            let commandFile = require(`./src/commands/${command}.js`);
            commandFile.run(client, message, args, utils, members);
        });
    } catch (err) {
        console.error(err);
    }
});

client.on("error", function (error) {
    throw new Error("error" + error)
})
client.login(config.token);