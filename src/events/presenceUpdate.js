/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under Apache License 2.0
 * Any changes must be documented as per the license!
 */

const fs = require("fs")
const {send_good_morning_message} = require("../utils/good_morning");

exports.run = async (client, utils, oldMember, newMember) => {
    fs.readFile('config/members.json', function(err, data) {
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
                        send_good_morning_message(client.users.cache.find(m => m.id === newMember.userID), members[newMember.userID.toString()])
                        send_messages[newMember.userID] = timestamp;
                        fs.writeFile('./data/send_messages.json', JSON.stringify(send_messages), function (err) {
                            if (err) throw err;
                            console.log('Updated!');
                        });
                    }
                });
            }
        }
    });
}