const termo = require("../../games/termo/index.js");

module.exports = {
  name: "termo",
  aliases: ["term"],
  run: async (client, message, args) => {
    let created = termo.create(args[0], message.author.id);
    if (!created) return message.reply(`**(${emoji.error}) | ${parseText(message.author.username)}**, você já está em uma partida.`);

    let embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setTitle(`(${emoji.graduation}) | Termo`)
      .setDescription(`${created.attempts.join("\n")}`)
      .setThumbnail("https://cdn.discordapp.com/emojis/989366183235043378.png?size=2048")
      .setFooter({ text: `${message.author.tag} (${message.author.id})`, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setTimestamp()

    message.reply({ embeds: [embed] }).then((msg) => {
      let filter = m => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector({ filter, time: 90000 });
      
      collector.on("collect", (m) => {
        
      });
      
      collector.on("end", (collected, reason) => {
        if (reason == "time") {
          
        }
      });
    });
  }
}
