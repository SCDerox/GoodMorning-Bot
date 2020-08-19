/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const {WakaTime} = require("wakatime");
const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")



module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve, reject) {
        if (!config_member["plugins"]["wakatime"]["api_key"]) {
            resolve(new MessageEmbed().setTitle("missing api key for wakatime").setColor("RED").setDescription("please set a wakatime key."))
        }
        const wakaTimeInstance = new WakaTime(config_member["plugins"]["wakatime"]["api_key"])
        wakaTimeInstance.stats('last_7_days').then((r) => {
            if (r) {
                r = r["data"]
                let emb = new MessageEmbed()
                    .setColor(0x2980b9)
                    .setTitle(strings["embed_title"])
                    .setDescription(strings["embed_description"])
                    .addField(strings["total"], r["human_readable_total_including_other_language"], true)
                    .addField(strings["daily_average"], r["human_readable_daily_average_including_other_language"], true)
                    .setFooter(strings["embed_footer"])
                    .setTimestamp()
                    .setThumbnail("https://wakatime.com/static/img/wakatime-logo-text-vertical.png")
                    .setAuthor(r["username"], "https://wakatime.com/static/img/wakatime-logo-text-vertical.png")
                resolve(emb)
            }else reject();
        })
    });
}


module.exports.config = {
    "name": "Wakatime",
    "author": "SCDerox",
    "description": "Shows stats from the last 7 days",
    "send_good_morning_embed": true,
    "need_config": true,
    "not_automatically_enabled": true,
    "not_editable": true
}