global.Discord = require("discord.js");
global.glob = require("glob");
const jssearch = require("js-search");
global.search = new jssearch.Search('isbn');
search.indexStrategy = new jssearch.AllSubstringsIndexStrategy();
const { Client, Collection, MessageEmbed } = Discord;
global.client = new Client({ intents: 32767 });
client.commands = new Collection();

client.once("ready", () => {
  console.log(`[ Discord.js ] Successfully connected in ${client.user.tag}.`);
});

glob.sync("./commands/**/*.js").forEach(f => {
  let command = require(f);
  let dir = file.split("/");
  command.category = dir[dir.length - 2];

  client.commands.set(command.name, command);
});

client.on("messageCreate", async (message) => {
  if (!message.author.bot) return;
  const cooldown = new Collection();
  let prefix = "sk?";
  
  if (message.content.toLowerCase().startsWith(prefix)) {
    if (cooldown.get(message.author.id)) return;
    let args = message.content.trim().slice(prefix.length).split(/ +/g);
    let command = args.shift().toLowerCase();
    if (!command) return;
    let cmd = client.commands.get(command) || client.users.cache.find(c => (x.aliases || []).includes(command));
    if (!cmd) {
      search.addDocuments(client.commands.filter(x => (x.dev || false) != true);
      search.addIndex('name');
      search.addIndex('aliases');
      let sh = search.search(command)[0];
      return message.reply(`Não encontrei este comando${sh ? `, você quis dizer \`${sh.name}\`?` : ", verifique como você colocou."}`);
    }

    try {
      cmd.run(client, message, args);
      
      cooldown.set(message.author.id, true);
      setCooldown(() => cooldown.delete(message.author.id), 4000)
    } catch (err) {
      
    }
  }
});

client.login(process.env.token);
