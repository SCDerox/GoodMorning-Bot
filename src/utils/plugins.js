/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const fs = require("fs");
const strings = require("../../config/bot-strings.json")

async function loadPlugins() {
    return new Promise(async function(resolve, reject) {
        await fs.readdir('./plugins/', (err, files) => {
            let plugins = {};
            if (err) console.error(err);
            let i = 1;
            files.forEach(f => {
                let props = require(`../../plugins/${f}/main.js`);
                props.fileName = f;
                plugins[f] = [];
                plugins[f]["id"] = i;
                plugins[f]["dirName"] = props.fileName;
                plugins[f]["config"] = props.config;
                i = i+1;
            });
            resolve(plugins);
        });
    })
}
module.exports.sendAllGoodMorningEmbeds = async function (member, config_member) {
    return new Promise(async resolve => {
        loadPlugins().then(async plugins => {
            let messages = [];
            for (let i in plugins) {
                let p = plugins[i];
                if (p["config"]) {
                    if (p["config"]["send_good_morning_embed"]) {
                        if (config_member["plugins_settings"][p["dirName"]] !== false) { // Why? Because new plugins should be automatically enabled
                            if (config_member["plugins_settings"][p["dirName"]] === undefined) {
                                if (p["config"]["not_automatically_enabled"]) continue;
                            }
                            let pluginFile = require("../../plugins/" + p["dirName"] + "/main.js")
                            await pluginFile.good_morning_embed(config_member).then((embed) => {
                                member.send("Plugin \"" + p["config"]["name"] + "\" "+ strings["developed_by"] + " \"" + p["config"]["author"] + "\"", embed).then((m) => {
                                    messages.push(m)
                                })
                            })
                        }
                    }
                }
            }
            resolve(messages);
        })
    })
}
module.exports.pluginList = async function() {
    return new Promise(async resolve => {
        loadPlugins().then(async plugins => {
            resolve(plugins)
        });
    });
}