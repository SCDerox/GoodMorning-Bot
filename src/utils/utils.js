/*
 * Copyright (c) 2020. Simon Csaba
 * Licensed under GNU General Public License v3.0
 * Any changes must be documented as per the license!
 */

const { MessageEmbed } = require("discord.js");

module.exports.quickEmbed = function(title, content, color, imageurl, thumbnail) {
    const quickEmbed = new MessageEmbed();
    if (imageurl) quickEmbed.setImage(imageurl)
    if (thumbnail) quickEmbed.setThumbnail(thumbnail)
    if(color) quickEmbed.setColor(color);
    else quickEmbed.setColor("0xe67e22");
    quickEmbed.setDescription(content);
    quickEmbed.setTitle(title);
    return quickEmbed;
}