/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")
const requestify = require("requestify");

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        requestify.get('https://inspirobot.me/api?generate=true').then(function(response) {
            response = response.getBody();
            resolve(new MessageEmbed()
                .setTitle(strings["embed_title"])
                .setColor(0xd35400)
                .setDescription(strings["embed_description"])
                .setTimestamp()
                .setURL(response)
                .setImage(response)
                .setAuthor("inspirobot.me", "http://inspirobot.me/website/images/inspirobot-dark-green.png")
                .setThumbnail("http://inspirobot.me/website/images/inspirobot-dark-green.png")
                .setFooter(strings["embed_footer"])
                .setTimestamp()
            );
        });
    });
}


module.exports.config = {
    "name": "Inspirobot",
    "author": "SCDerox",
    "description": "Display motivational image",
    "send_good_morning_embed": true
}