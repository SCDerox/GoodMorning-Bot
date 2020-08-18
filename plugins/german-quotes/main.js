/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */


const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")
const quotes = require("./quotes.json")

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        let quote = quotes[Math.floor(Math.random() * quotes.length)]
        resolve(new MessageEmbed()
            .setTitle(strings["embed_title"])
            .setFooter(strings["embed_footer"])
            .setDescription(quote["quote"] + " " + strings["by"] + " " + quote["author"])
            .setColor(0xe67e22)
            .setThumbnail("https://media1.tenor.com/images/262fb60814fce40a86236094e661426d/tenor.gif?itemid=6227358"))

    });
}


module.exports.config = {
    "name": "German-Quotes",
    "author": "SCDerox",
    "description": "One of " + quotes.length +  " quotes in german",
    "send_good_morning_embed": true
}