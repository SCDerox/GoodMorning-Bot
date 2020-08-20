/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const {MessageEmbed} =  require("discord.js");
const weather = require("weather-js");
const wetter_translations = require("./weather_translations.json")
const strings = require("./locales.json")

function translate(text) {
    if (wetter_translations[text]) {
        return wetter_translations[text]
    }else {
        return text + " (" + strings["translation_missing"] + ")"
    }
}

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        weather.find({search: config_member["plugins"]["weather"]["location"], degreeType: 'C'}, function (err, result) {
            if (err) console.log(err);
            let forecast = result[0]
            const day_of_week = new Date().getDay() -1;
            let embed = new MessageEmbed()
                .setTitle(strings["weather"])
                .setDescription(strings["your_current_location"] + config_member["plugins"]["weather"]["location"])
                .setColor(0x3498db)
                .setTimestamp()
                .setFooter(strings["embed_footer"])
                .addField(strings["currently"], strings["prefix"] + translate(forecast["current"]["skytext"]) + strings["middle"] + forecast["current"]["temperature"] + strings["suffix"])
                .addField(strings["today_forecast"], strings["prefix"] + translate(forecast["forecast"][day_of_week]["skytextday"]) + strings["middle"] + strings["temperatures_between"] + forecast["forecast"][day_of_week]["low"] + strings["and"] + forecast["forecast"][day_of_week]["high"] + strings["suffix"])
                .addField(strings["tomorrow_forecast"], strings["prefix"] + translate(forecast["forecast"][day_of_week + 1]["skytextday"]) + strings["middle"] + strings["temperatures_between"] + forecast["forecast"][day_of_week + 1]["low"] + strings["and"] + forecast["forecast"][day_of_week + 1]["high"] + strings["suffix"])
                .setThumbnail(forecast["current"]["imageUrl"]);
            if (forecast["location"]["alert"]) {
                embed.addField(":warning: " + strings["warning"] + " :warning:", forecast["location"]["alert"]);
                embed.setColor("RED")
            }
            resolve(embed)
        });
    });
}


module.exports.config = {
    "name": "Weather",
    "author": "SCDerox",
    "description": "Shows the current weather in the good mornig message",
    "send_good_morning_embed": true,
    "need_config": true
}