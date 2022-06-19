const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ intents: 32767 });
const glob = require("glob");
client.commands = new Collection();

// global
global.Discord = require("discord.js");
global.client = client;
client.config = require("./config.json");
require("./functions/util/firebase.js");
require("./functions/util/utils.js");
require("./functions/util/global.js")();

const app = require("express")();
app.get("/", (req, res) => {
  res.send("A aplicação está online.");
});
app.listen(process.env.PORT)

glob.sync("./commands/**/*.js").forEach(file => {
  const command = require(file);
  let dir = (file).split("/");
  command.category = dir[dir.length - 2];
  client.commands.set(command.name, command);
});

glob.sync("./events/*.js").forEach(file => {
  const event = require(file);
  client.on(event.name, (...args) => {
    event.execute(client, ...args);
  });
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  client.emit("messageCreate", newMessage);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId == `works-${interaction.user.id}`) {
    let xp = db.get(`users/${interaction.user.id}/xp`) || 0;
    let select = interaction.values[0].split("/");
    if (xp < select[1]) return interaction.reply({ content: `<:_:986860739920814100> | Você precisa usar pelo menos **${select[1]} EXP** para essa profissão.`, ephemeral: true });

    interaction.reply({ content: `<:_:986836780168925194> | Parabéns, agora você exerce a profissão de **${select[0].replaceAll("-", " ")}**.`, ephemeral: true });
    db.set(`users/${interaction.user.id}/profession`, select[0]);
  } else if (interaction.customId === `rank-${interaction.user.id}`) {
    let vl = interaction.values[0];
    if (vl === "eco") {
      let arr = [];
      let i = 1;
      Object.entries(db.get("users")).sort((a, b) => b.cash - a.cash).map((lb) => {
        if (isNaN(lb[1].cash)) return;
        if (!client.users.cache.get(lb[0])) return;
        arr.push(`\`[ ${i++}° ]\` **${parseText(client.users.cache.get(lb[0]).tag)}** - $${lb[1].cash.toLocaleString()}`);
      });

      let embed = new MessageEmbed()
      .setColor(client.config.color)
      .setTitle(`<:_:986461166740062239> | Ranking - Economia`)
      .setDescription(arr.slice(0, 10).join("\n"))
      .setFooter({ text: `・${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
      .setTimestamp();

      interaction.update({ embeds: [embed] });
    } else if (vl === "cities") {
      let arr = [];
cities.sort((a, b) => b.pib - a.pib).map((lb, i) => {
  ++i;
  if (isNaN(lb.pib)) return;
  arr.push(`\`[${i++}]\` ${lb.name}:\n> <:pib_2:987570945118048366> » PIB: ${lb.pib.toLocaleString()}\n> <:population:987362339969990707> » Habitantes: ${lb.members.length}`);
}); 

      let embed = new MessageEmbed().setColor(client.config.color).setTitle(`<:_:986461166740062239> | Ranking - Cidades`).setDescription("**" + arr.slice(0, 10).join("\n") + "**").setFooter({ text: `・${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.avatarURL({ dynamic: true }) }).setTimestamp();

      interaction.update({ embeds: [embed] });
    }
  }
});

client.login(process.env.token);
