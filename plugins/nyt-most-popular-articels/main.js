/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */


const {MessageEmbed} =  require("discord.js");
const strings = require("./strings.json")
const config = require("./config.json")

function popolarArticelsEmbed() {
    return new Promise(function (resolve) {
        const nyt = require('newyorktimes')({
            most_popular: config["most_popular_api_key"]
        });
        nyt.query('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + config["most_popular_api_key"], function (err, json) {
            let articels = JSON.parse(json.body)
            articels = articels["results"]
            if (!articels) throw new Error()
            let description = "";
            for (let i in articels) {
                if (i > 5) continue;
                description = description + "\n• [" + articels[i]["title"] + "](" + articels[i]["url"] + ")"
            }
            resolve(new MessageEmbed()
                .setTitle(strings["embed_title"])
                .setColor(0xe67e22)
                .setDescription(description)
                .setTimestamp()
                .setAuthor("New York Times", "https://www.seekpng.com/png/detail/49-496399_narcotics-anonymous-clipart-new-york-times-app-icon.png")
                .setThumbnail("https://www.seekpng.com/png/detail/49-496399_narcotics-anonymous-clipart-new-york-times-app-icon.png")
                .setFooter(strings["footer"]));
        });
    });
}


module.exports.good_morning_embed = function () {
    return new Promise(function (resolve) {
        popolarArticelsEmbed().then(e => {
            resolve(e);
        })
    });
}

module.exports.commandHandler = async function (client, msg) {
    popolarArticelsEmbed().then(e => {
        msg.channel.send(e)
    })
}


module.exports.config = {
    "name": "New York Time Popular Articles",
    "author": "SCDerox",
    "description": "Shows today's morst popular articels on NYT",
    "send_good_morning_embed": true,
    "commands": ["news", "n"]

}