/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */
const {MessageEmbed} = require("discord.js");
const strings = require("./strings.json");
const fs = require("fs")
const config = require("../../config/config.json")

function replaceReminder(text, reminder) {
    return text.split("%reminder%").join(reminder)
}

function replacePrefix(text) {
    return text.split("%prefix%").join(config.prefix);
}

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve) {
        fs.readFile('./plugins/reminder/reminders.json', async function (err, data) {
            let reminders = JSON.parse(data);
            if (err || !reminders) throw new Error()
            let emb = new MessageEmbed()
                .setTitle(strings["embed_title"])
                .setDescription(replacePrefix(strings["embed_description"]))
                .setFooter(replacePrefix(strings["embed_footer"]))
                .setThumbnail("https://media1.tenor.com/images/b5a9bcee7809b2e7d032c8c9acc6fdbf/tenor.gif?itemid=14389737")
                .setColor(0xf1c40f)
                .setTimestamp()
                .setAuthor("Good Morning Bot", "https://cdn.discordapp.com/avatars/745173913428033537/da26ad5f3259500e45396a2bc57cf1eb.png");
            let i = 1;
            reminders[config_member["id"]].forEach(r => {
                emb.addField(strings["reminder"] + " #" + i, r)
                i = i+1;
            })
            if (i === 1) emb.addField(strings["error"], replacePrefix(strings["no_reminders_find"]));
            reminders[config_member["id"]] = [];
            fs.writeFile('./plugins/reminder/reminders.json', JSON.stringify(reminders), async function (err) {
                if (err) throw err;
                resolve(emb)
            });
        });
    })
}

module.exports.commandHandler = async function (client, msg, args, utils, members) {
    fs.readFile('./plugins/reminder/reminders.json', async function (err, data) {
        let reminders = JSON.parse(data);
        if (err || !reminders) throw new Error()

        let text = "";
        let i = 0;
        args.forEach(a => {
            i = i + 1;
            let prefix = " ";
            if (i === 1) {
                prefix = ""
            }
            text = text + prefix + a
        })

        if (!reminders[msg.author.id]) reminders[msg.author.id] = [];
        reminders[msg.author.id].push(text)
        fs.writeFile('./plugins/reminder/reminders.json', JSON.stringify(reminders), async function (err) {
            if (err) throw err;
            await msg.channel.send(utils.quickEmbed(strings["success"], replaceReminder(strings["successfully_added_reminder"], text), "GREEN"))
        });
    });
}

module.exports.config = {
    "name": "Reminder",
    "author": "SCDerox",
    "description": "Set yourself reminders for the next day",
    "send_good_morning_embed": true,
    "commands": ["reminder", "remindme"]
}