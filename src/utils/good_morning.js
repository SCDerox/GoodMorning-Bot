/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const utils = require("./utils")
const good_morning_messages = require("../../config/good_morning_messages.json")
const {sendAllGoodMorningEmbeds} = require("./plugins");
const { MessageEmbed } = require("discord.js")
const config = require("../../config/config.json")

function replacer(text) {
    return text.replace("%prefix%", config.prefix)
}

module.exports.send_good_morning_message = async function (member, config_member) {
    let message = good_morning_messages[Math.floor(Math.random() * good_morning_messages.length)]
    message["unsubscribe"] = replacer(message["unsubscribe"]);
    let emb;
    let msg;
    if (message["embed"]) {
        emb = new MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/avatars/745173913428033537/da26ad5f3259500e45396a2bc57cf1eb.png")
            .setTitle(message["greeting"] + ", " + config_member["name"] + "!")
            .setDescription(message["message"] + "\n\n" + message["why_getting_this_message"] + "\n\n" + message["plugin_notice"] + "\n\n" + message["unsubscribe"])
            .setColor(message["embed"]["color"]);
        if (message["embed"]["image"]) emb.setImage(message["embed"]["image"])
    }else {
        msg = message["greeting"] + ", " + config_member["name"] + "\n\n" + message["message"] + "\n\n" + message["why_getting_this_message"] + "\n\n" + message["plugin_notice"] +  "\n\n" + message["unsubscribe"];
    }
    member.send(msg, emb).then(async (m) => {
        await sendAllGoodMorningEmbeds(member, config_member).then((gm) => {
           setTimeout(function () {
               member.send(message["to_the_first_message"] + m.url + "\n\n" + message["farawell"])
           }, 1000)
        })
    })
}