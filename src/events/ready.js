/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

exports.run = async (client, utils) => {
    await client.user.setActivity("Bot is starting...")

    const activities = require("../../config/bot-activities.json")
    setInterval(async () => {
        const activity = activities[Math.floor(Math.random() * activities.length)] + " | " + client.prefix + "help";
        await client.user.setActivity(activity)
    }, 5000);
    console.log("Bot successfully logged in as " + client.user.tag)
}