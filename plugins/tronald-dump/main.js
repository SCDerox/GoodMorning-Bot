/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */

const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")
const requestify = require("requestify");

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        requestify.get('https://www.tronalddump.io/random/quote').then(function(response) {
            response = response.getBody();
            resolve(new MessageEmbed()
                .setTitle(strings["embed_title"])
                .setColor(0xd35400)
                .setDescription(response["value"] + "\n[" + strings["source"] + "](" + response["_links"]["self"]["href"] + ")")
                .setTimestamp()
                .setURL(response["_links"]["self"]["href"])
                .setAuthor("Tronald Dump", "https://www.tronalddump.io/img/tronalddump_850x850.png")
                .setThumbnail("http://kwtri4b8r0ep8ho61118ipob.wpengine.netdna-cdn.com/wp-content/uploads/2017/10/19535228309_141913cee1_o.jpg")
                .setFooter(strings["embed_footer"])
                .setTimestamp(response["appeared_at"])
            );
        });
    });
}


module.exports.config = {
    "name": "Tronald Dump",
    "author": "SCDerox",
    "description": "Shows a random dumb quote from Donald Trump",
    "send_good_morning_embed": true
}