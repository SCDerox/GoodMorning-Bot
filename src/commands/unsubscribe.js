/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */

const strings = require("../../config/bot-strings.json")
const config = require("../../config/config.json")
const fs = require("fs")

function replacer(text) {
   return text.replace("%command%", config.prefix + "unsubscribe yes")
}

module.exports.run = async (client, msg, args, utils, members) => {
    if (!members[msg.author.id]["active"]) return  await msg.author.send(strings.please_subscirbe_first)
    if (args[0] === "yes") {
        members[msg.author.id]["active"] = false;
        fs.writeFile('./config/members.json', JSON.stringify(members), function (err) {
            if (err) throw err;
            msg.author.send(utils.quickEmbed(strings["success"], strings["successfuly_unsubscribed"], "GREEN"))
        });
    } else {
        await msg.author.send(utils.quickEmbed(strings["are_you_sure"], strings["do_you_really_want_to_unsubscribe"] + "\n\n" + replacer(strings["write_command_to_contiue"])))
    }
}

module.exports.help = {
    aliases: ['unsubscribe', 'u'],
    name: 'unsubscribe'
};

// Configuration

module.exports.config = {
    args: false,
    restricted: false
};