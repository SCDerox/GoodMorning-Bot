/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

console.log("Grab yourself a cup of coffee, the bot is starting...\n\n")
const utils = require("./src/utils/utils");
const config = require("./config/config.json");
const bot_strings = require("./config/bot-strings.json");
const fs = require("fs")
const Discord = require("discord.js");

const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.pluginCommands = new Discord.Collection();
client.events = new Discord.Collection();
client.prefix = config.prefix;

// Load events

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


// Load commands

fs.readdir('./src/commands/', (err, files) => {
    if (err) console.error(err);
    console.log("Loading build-in commands...")
    files.forEach(f => {
        let props = require(`./src/commands/${f}`);
        props.fileName = f;
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            console.log("\tLoaded alias \"" + config.prefix + alias + "\" for command \""+ config.prefix + props.help.name + "\"")
            client.aliases.set(alias, props.help.name);
        });
    });
    console.log("All build-in commands successfully loaded.\n\n")
});

// Load commands from plugins

fs.readdir('./plugins/', (err, files) => {
    if (err) console.error(err);
    console.log("Loading plugins...")
    files.forEach(f => {
        let props = require(`./plugins/${f}/main.js`);
        console.log("\nLoading plugin \"" + f + "\" by \"" + props.config.author + "\"")
        props.fileName = f;
        if (props.config.send_good_morning_embed) console.log("\tRegistered Good-Morning-Embed")
        else console.log("\tGood-Morning-Embed for this plugin not enabled")
        if (props.config.commands) {
            props.config.commands.forEach(alias => {
                console.log("\tLoaded alias: " + config.prefix + alias)
                client.pluginCommands.set(alias, props.fileName);
            });
        } else console.log("\tPlugin has no commands")
    });
    console.log("\nAll plugins successfully loaded.\n\n")
});

// Here because something could happen with the command handler

client.on("message", async message => {
    try {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix)) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        if (!client.aliases.has(command) && !client.pluginCommands.has(command)) return message.author.send(bot_strings["command_not_found"]);
        fs.readFile('config/members.json', async function (err, data) {
            if (err) throw new Error()
            const members = JSON.parse(data);
            if (message.channel.name !== undefined) return message.channel.send(bot_strings["only_pns"])
            if (!members[message.author.id]) return await message.author.send(bot_strings["you_are_not_registed_yet"])
            if (!client.aliases.has(command)) {
                command = client.pluginCommands.get(command);
                let commandFile = require(`./plugins/${command}/main.js`);
                return commandFile.commandHandler(client, message, args, utils, members);
            }
            command = client.commands.get(client.aliases.get(command)).help.name;
            if (client.commands.get(command).config.restricted === true) {
                if (message.author.id !== config.ownerID) return message.author.send(bot_strings["command_only_for_bot_owner"])
            }
            if (client.commands.get(command).config.args === true) {
                if (!args[0]) return message.channel.send(bot_strings["need_more_arguments"])
            }
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