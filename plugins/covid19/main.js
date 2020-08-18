/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */
const requestify = require("requestify");
const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        requestify.get('https://disease.sh/v3/covid-19/countries/' + config_member["plugins"]["covid19"]["country"]).then(function(response) {
            response = response.getBody();
            let emb = new MessageEmbed()
                .setColor(0x9b59b6)
                .setThumbnail(response["countryInfo"]["flag"])
                .setTitle(strings["embed_title"])
                .setDescription(strings["your_country"] + " " + response["countryInfo"]["iso3"])
                .setFooter(strings["embed_footer"])
                .setAuthor("disease.sh", "https://disease.sh/assets/img/rona.jpg")
                .addField(strings["cases"], response["cases"], true)
                .addField(strings["active"], response["active"], true)
                .addField(strings["critical"], response["critical"], true)
                .addField(strings["deaths"], response["deaths"], true)
                .addField(strings["recovered"], response["recovered"], true)
            resolve(emb)
        });
    });
}


module.exports.config = {
    "name": "Covid19",
    "author": "SCDerox",
    "description": "Shows the current covid-numbers in your country",
    "send_good_morning_embed": true,
    "need_config": true
}