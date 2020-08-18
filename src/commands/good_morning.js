/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */

const {send_good_morning_message} = require("../utils/good_morning");
const fs = require("fs")
const strings = require("../../config/bot-strings.json")

module.exports.run = async (client, msg, args, utils, members) => {
    if (!members[msg.author.id]["active"]) return  await msg.author.send(strings.please_subscirbe_first)
    await send_good_morning_message(msg.author, members[msg.author.id.toString()])
};
// Aliases, name, description and usage

module.exports.help = {
    aliases: ['good_morning', 'goodmorning', "gm"],
    name: 'good_morning'
};

// Configuration

module.exports.config = {
    args: false,
    restricted: false
};