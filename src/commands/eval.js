/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */


module.exports.run = async (client, msg, args, utils, members) => {
    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        await msg.channel.send(clean(evaled), {code: "xl"});
    } catch (err) {
        msg.channel.send(`\`ERROR \` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}

module.exports.help = {
    aliases: ['eval'],
    name: 'eval'
};

// Configuration

module.exports.config = {
    args: false,
    restricted: true
};