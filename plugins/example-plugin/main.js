/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

module.exports.good_morning_embed = function (config_member) {
    return new Promise(function (resolve) {
    })
}

module.exports.commandHandler = async function (client, msg, args, utils, members) {
    // You can place your command handler here
}

module.exports.config = {
    "name": "Example Plugin", // Name of your plugin
    "author": "SCDerox", // put your name here xD
    "description": "This plugin demonstrates how to create plugins", // Short description of what the plugin does
    "send_good_morning_embed": true, // Enable if you want to send a good morning embed
    "commands": ["command-1", "command-2"], // You can register command here, just leave it out if you don't need it
    "need_config": true, // optional - determins if a user need to set a config for your plugin
    "not_automatically_enabled": true, // optional - normally a new plugin will be automaticlly enabled - enable this if you don't want that
    "not_editable": true // optional - if enabled a user can not enable this plugin themselfs

}