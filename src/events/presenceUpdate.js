/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const fs = require("fs")
const {send_good_morning_message} = require("../utils/good_morning");
const strings = require("../../config/bot-strings.json");
const config = require("../../config/config.json")

function replacer(text) {
    return text.split("%prefix%").join(config.prefix)
}

exports.run = async (client, utils, oldMember, newMember) => {
    fs.readFile('config/members.json', function (err, data) {
        if (err) throw new Error()
        const members = JSON.parse(data)
        if (!members[newMember.userID.toString()]) return;
        if (members[newMember.userID.toString()].active) {
            if (newMember.status === "online") {
                fs.readFile('data/send_messages.json', function (err, data) {
                    if (err) throw new Error();
                    let send_messages = JSON.parse(data);
                    let date_ob = new Date(Date.now());
                    let date = date_ob.getDate();
                    let month = date_ob.getMonth() + 1;
                    let timestamp = date + "/" + month
                    if (send_messages[newMember.userID] !== timestamp) {
                        fs.readFile('data/confirmation.json', function (err, data) {
                            let confirmations = JSON.parse(data);
                            send_messages[newMember.userID] = timestamp;
                            fs.writeFile('./data/send_messages.json', JSON.stringify(send_messages), function (err) {
                                if (err) throw err;
                            });
                            send_good_morning_message(client.users.cache.find(m => m.id === newMember.userID), members[newMember.userID.toString()]).then(() => {
                                if (confirmations[newMember.userID]) {
                                    if (confirmations[newMember.userID] === 6) {
                                        if (!members[newMember.userID]["disable-confirmation"]) {
                                            confirmations[newMember.userID] = 0;
                                            members[newMember.userID]["active"] = false;
                                            fs.writeFile('./config/members.json', JSON.stringify(members), function (err) {
                                                if (err) throw err;
                                                client.users.cache.find(m => m.id === newMember.userID).send(strings["important_message"], utils.quickEmbed(strings["automatic_unsubscribe"]["embed_title"], replacer(strings["automatic_unsubscribe"]["embed_description"]), "RED"))
                                                console.log("Informed member about automatic unsubscribing of the service.")
                                            });
                                        }
                                    }else confirmations[newMember.userID] = confirmations[newMember.userID] + 1;
                                }else confirmations[newMember.userID] = 1;
                                fs.writeFile('./data/confirmation.json', JSON.stringify(confirmations), function (err) {
                                    if (err) throw err;
                                });
                            })
                        });
                    }
                });
            }
        }
    });
}