/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */

const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")
const config = require("./config.json")
const requestify = require("requestify");


module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        requestify.get('https://api.nasa.gov/planetary/apod?api_key=' + config["api-key"] + '&count=1').then(function(response) {
            response = response.getBody()[0];
            resolve(new MessageEmbed()
                .setTitle(strings["embed_title"])
                .setColor(0x34495e)
                .setDescription(response["title"])
                .setTimestamp()
                .setImage(response["hdurl"])
                .setURL(response["url"])
                .setAuthor("© " + response["copyright"], "https://i.pinimg.com/originals/4d/e4/30/4de430dde2298e5af2f8287318acf19f.png")
                .setThumbnail("https://i.pinimg.com/originals/4d/e4/30/4de430dde2298e5af2f8287318acf19f.png")
                .setFooter(strings["embed_footer"])
                .setTimestamp(response["date"])
            );
        });
    });
}


module.exports.config = {
    "name": "Nasa Image of the day",
    "author": "SCDerox",
    "description": "Shows a random NASA-Image",
    "send_good_morning_embed": true
}