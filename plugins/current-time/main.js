/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        var today = new Date();
        resolve(new MessageEmbed()
            .setTitle(strings["embed_title"])
            .setFooter(strings["embed_footer"])
            .setDescription(strings["prefix"] + today.getHours() + strings["hour"] + today.getMinutes() + strings["minute"])
            .setAuthor("Good Morning Bot", "https://cdn.discordapp.com/avatars/745173913428033537/da26ad5f3259500e45396a2bc57cf1eb.png")
            .setColor(0xecf0f1)
            .setThumbnail("https://media1.tenor.com/images/5b00eb97755ca1d241480774a4102717/tenor.gif?itemid=7378835"))

    });
}


module.exports.config = {
    "name": "Current Time",
    "author": "SCDerox",
    "description": "Shows the current time",
    "send_good_morning_embed": true,
}