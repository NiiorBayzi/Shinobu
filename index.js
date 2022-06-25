global.Discord = require("discord.js");
global.glob = require("glob");
global.axios = require("axios");
let { imgbox } = require("imgbox");
global.imgbox = imgbox;
const jssearch = require("js-search");
global.search = new jssearch.Search('isbn');
search.indexStrategy = new jssearch.AllSubstringsIndexStrategy();
const { Client, Collection, MessageEmbed } = Discord;
global.client = new Client({ intents: 32767 });
client.commands = new Collection();
client.config = require("./config.json");

// MongoDB
global.mongoose = require("mongoose");
client.connectDatabase = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL);
  let models = {
    users: require("./database/models/userModel.js")
  }
  client.db = {connection,...models};
  console.log("[ Mongoose ] Successfully connected.");
}
// ...

process.on('uncaughtException', err => client.channels.cache.get('989581223112343552').send(`**(${emoji.error}) | Error:** \`\`\`js\n${err.stack}\`\`\``));

client.once("ready", () => {
  console.log(`[ Discord.js ] Successfully connected in ${client.user.tag}.`);
  client.connectDatabase();
  global.emoji = Object.fromEntries(client.guilds.cache.get("985625402288529449").emojis.cache.map(x => ([x.name.toString(), `<${x.animated ? "a" : ""}:${x.name}:${x.id}>`])));
});

glob.sync("./commands/**/*.js").forEach(f => {
  let command = require(f);
  let dir = f.split("/");
  command.category = dir[dir.length - 2];

  client.commands.set(command.name, command);
});

const cooldown = new Collection();

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let prefix = "s?";
  if (message.content.replace("!", "") === `<@${client.user.id}>`) return message.reply(`>>> **(${emoji.shinoYay}) |** Olá **${parseText(message.author.username)}**, eu sou uma bot de **Economia de Cidades**, meu prefixo é **\`${prefix}\`**, use **\`${prefix}help\`** para ver meus comandos.`);
  
  if (message.content.toLowerCase().startsWith(prefix)) {
    if (cooldown.get(message.author.id)) return message.reply(`>>> **(${emoji.time}) | ${parseText(message.author.username)}**, você está executando meus comandos rápido demais.`);
    let args = message.content.trim().slice(prefix.length).split(/ +/g);
    let command = args.shift().toLowerCase();
    if (!command) return message.reply(`>>> **(${emoji.error}) | ${parseText(message.author.username)}**, digite o comando que você quer executar.`);
    let cmd = client.commands.get(command) || client.commands.find(c => (c.aliases || []).includes(command));
    if (!cmd) {
      search.addDocuments(client.commands.filter(x => (x.dev || false) != true).map(x => x));
      search.addIndex('name');
      search.addIndex('aliases');
      let sh = search.search(command)[0];
      return message.reply(`>>> **(${emoji.not_finded}) | ${parseText(message.author.username)}**, não encontrei este comando${sh ? `, você quis dizer \`${sh.name}\`?` : ", verifique como você colocou."}`);
    }
    let db = await client.db.users.find({}).then(e => e);
    db.user = await client.db.users.findOne({ _id: message.author.id });
    if (!db.user) {
      return message.reply(`**(${emoji.searchUser}) | ${parseText(message.author.username)}**, não encontrei você em meu **(${emoji.database}) Banco de Dados**, irei criar seu perfil.\n>>> **(${emoji.forms}) | Criando perfil, aguarde...**`).then((msg) => {
        cooldown.set(message.author.id, true);
        setTimeout(() => {
          msg.edit(`>>> **(${emoji.cloud_upload}) | ${parseText(message.author.username)}**, enviando dados do perfil para o **(${emoji.database}) Banco de Dados**...`);
        }, 6000);
        setTimeout(() => {
          client.db.users.create({ _id: message.author.id });
          msg.edit(`>>> **(${emoji.forms_complete}) | ${parseText(message.author.username)}**, seu perfil foi criado com **sucesso**! Agora você pode usar meus comandos.`);
          cooldown.delete(message.author.id);
        }, 12000);
      });
    }

    try {
      if ((cmd.dev || false)) {
        if (!(client.config.devs || []).includes(message.author.id)) {
          return message.reply(`>>> **(${emoji.books_coffe}) | ${parseText(message.author.username)}**, comando permitido apenas para **desenvolvedores**.`);
        } else {
          cmd.run(client, message, args, db);
        }
      } else {
        cmd.run(client, message, args, db);
      }
      cooldown.set(message.author.id, true);
      setTimeout(() => cooldown.delete(message.author.id), 5000);
    } catch (err) {
      message.reply(`>>> **(${emoji.error}) | ${parseText(message.author.username)},** ocorreu um erro, tente novamente.`);
      console.log(err);
    }
  }
});

client.on('messageUpdate', (old, new) => {
  client.emit('messageCreate', new);
});

// Function
client.users.findUser = function (args) {
  let user = null;
  if (!args) return user;
  user = client.users.cache.get(args.replace(/[\\<>@!]/g, "").trim()) || client.users.cache.find(u => u.tag.startsWith(args) || u.username.startsWith(args)) || null;

  return user;
}

global.parseText = function (text) {
  if (!text) return undefined;
  return text.replace(/[*`_]/g, "").trim();
}
global.formatMemory = function (data) {
  return `${Math.round(data / 1024 / 1024 * 100) / 100} MB`
}

client.login(process.env.token);
