global.Discord = require("discord.js");
global.glob = require("glob");
const { Client, Collection, MessageEmbed } = Discord;
global.client = new Client({ intents: 32767 });
client.commands = new Collection();

client.on("ready", () => {
  console.log(`[ Discord.js ] Successfully connected in ${client.user.tag}.`);
});

glob.sync("./commands/**/*.js").forEach(f => {
  let command = require(f);
  let dir = file.split("/");
  command.category = dir[dir.length - 2];

  client.commands.set(command.name, command);
});

client.login(process.env.token);
