/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")
const tips = require("./tips.json")
const config = require("../../config/config.json")

function replacer(text) {
    return text.split("%prefix%").join(config.prefix)
}

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        let tip = tips[Math.floor(Math.random() * tips.length)]
        resolve(new MessageEmbed()
            .setTitle(strings["embed_title"])
            .setFooter(strings["embed_footer"])
            .setDescription(replacer(tip))
            .setColor(0x1abc9c)
            .setAuthor("Good Morning Bot Tips", "https://cdn.discordapp.com/avatars/745173913428033537/da26ad5f3259500e45396a2bc57cf1eb.png")
            .setColor("GOLD")
            .setThumbnail("https://media.tenor.com/images/2b7f201f7c260b42b8b789a2d7c6cbff/tenor.gif"))

    });
}


module.exports.config = {
    "name": "Tips",
    "author": "SCDerox",
    "description": "Shows some tips",
    "send_good_morning_embed": true
}