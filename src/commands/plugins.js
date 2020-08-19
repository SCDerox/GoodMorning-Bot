/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */


const strings = require("../../config/bot-strings.json")
const config = require("../../config/config.json")
const fs = require("fs")
const {MessageEmbed} = require("discord.js")
const pluginFunctions = require("../utils/plugins")

function replacer(text) {
    return text.split("%prefix%").join(config.prefix)
}


module.exports.run = async (client, msg, args, utils, members) => {
    pluginFunctions.pluginList().then(async plugins => {
        if (!args[0]) {
            let emb = new MessageEmbed()
                .setTitle(strings["plugin_command"]["list_title"])
                .setDescription(replacer(strings["plugin_command"]["list_description"]))
                .setColor("YELLOW")
                .setThumbnail("https://sc-netzwerk.de/img/icons/package.png")
                .setTimestamp()
                .setFooter(strings["plugin_command"]["list_footer"])
            for (let i in plugins) {
                let plugin = plugins[i]
                let led = "🔴";
                let prefix = "";
                let config = ""
                if (members[msg.author.id]["plugins_settings"][plugin["dirName"]]) led = "🟢"
                else if (members[msg.author.id]["plugins_settings"][plugin["dirName"]] === undefined) {
                    if (!plugin["config"]["not_automatically_enabled"]) led = "🟢";
                    prefix = "🆕"
                }
                if (plugin["config"]["need_config"]) config = "🔧";
                if (plugin["config"]["not_editable"]) config = config + " 🔐"
                emb.addField(prefix + " " + plugin["config"]["name"] + " " + led + " " + config, "`" + plugin["config"]["description"] + "`\nDir: `" + plugin["dirName"] + "`")
            }
            return msg.author.send(emb);
        }
        if (!plugins[args[1]]) return await msg.author.send(strings["plugin_does_not_exist_or_not_set"]);
        if (plugins[args[1]]["config"]["not_editable"]) return await msg.author.send("You can not edit this plugin.")
        switch (args[0]) {
            case "activate":
                members[msg.author.id]["plugins_settings"][args[1]] = true;
                break;
            case "deactivate":
                members[msg.author.id]["plugins_settings"][args[1]] = false;
                break;
            default:
                return await msg.author.send("Invalid argument.")
        }
        fs.writeFile('./config/members.json', JSON.stringify(members), function (err) {
            if (err) throw err;
            msg.author.send(utils.quickEmbed(strings["success"], strings["successfuly_edited"], "GREEN"))
        });
    })
}

module.exports.help = {
    aliases: ['plugins', "plugin", 'p'],
    name: 'plugins'
};

// Configuration

module.exports.config = {
    args: false,
    restricted: false
};

