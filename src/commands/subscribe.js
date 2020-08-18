/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */

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
    if (members[msg.author.id]["active"]) return  await msg.author.send(strings.already_subscirbed)
    members[msg.author.id]["active"] = true;
    fs.writeFile('./config/members.json', JSON.stringify(members), function (err) {
        if (err) throw err;
        msg.author.send(utils.quickEmbed(strings["success"], strings["successfuly_subscribed"], "GREEN"))
    });
}

module.exports.help = {
    aliases: ['subscribe', 's'],
    name: 'subscribe'
};

// Configuration

module.exports.config = {
    args: false,
    restricted: false
};