/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */


const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")
const quotes = require("./quotes.json")

module.exports.good_morning_embed = function () {
    return new Promise(function (resolve) {
        let quote = quotes[Math.floor(Math.random() * quotes.length)]
        resolve(new MessageEmbed()
            .setTitle(strings["embed_title"])
            .setFooter(strings["embed_footer"])
            .setDescription(quote["quote"] + " " + strings["by"] + " " + quote["author"])
            .setColor(0xe67e22)
            .setTimestamp()
            .setThumbnail("https://media1.tenor.com/images/262fb60814fce40a86236094e661426d/tenor.gif?itemid=6227358"))

    });
}


module.exports.config = {
    "name": "German-Quotes",
    "author": "SCDerox",
    "description": "One of " + quotes.length +  " quotes in german",
    "send_good_morning_embed": true,
    "not_automatically_enabled": true // It's german so I thought it's better if it's disabled by default
}