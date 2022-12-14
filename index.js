const { Collection, Client, Discord, MessageEmbed, Message } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
require('discord-buttons')(client);
const path = require('path')
const fs = require('fs')
const discordbuttons = require('discord-buttons')
const { MessageButton, MessageActionRow } = require("discord-buttons")
const keepAlive = require("./server");
const config = require('./config.json');
client.prefix = config.prefix;

client.on('clickButton', async (button) => {
    if (button.id == 'AddVerifiedRole') {
        button.reply.send(`You have been verified!`, true)
        const role = button.guild.roles.cache.get(config.roleid)
        const member = button.clicker.member
        await member.roles.add(role)
    }{}
})

client.on('ready', () => {
    console.log('The bot is online!')
})

client.on('message', async (message) => {
    if (message.content.startsWith('.verify')) {
        const embed = new MessageEmbed()
            .setTitle('**__VERIFICATION__**')
            .setColor("GREEN")
            .setDescription('Click on the button below to verify!')
.setImage("https://media.discordapp.net/attachments/897018463225262100/904426455486836776/standard_4.gif")
        const add = new MessageButton()
            .setStyle("green")
            .setLabel("✅Verify Me!")
            .setID("AddVerifiedRole")

        const row = new MessageActionRow()
            .addComponent([add])


        message.channel.send({ component: row, embed: embed })
    }
})
keepAlive();
client.login(process.env.TOKEN);
