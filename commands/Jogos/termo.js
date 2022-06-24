const termo = require("../../games/termo/index.js");
const cd = new Discord.Collection();

module.exports = {
  name: "termo",
  aliases: ["term"],
  run: async (client, message, args) => {
    let first = parseText(args[0]?.toLowerCase());
    if (!first) return message.reply(`**(${emoji.error}) | ${parseText(message.author.username)}**, digite a primeira palavra para começar.`);
    let created = termo.create(first, message.author.id);
    if (!created) return message.reply(`**(${emoji.error}) | ${parseText(message.author.username)}**, você já está em uma partida.`);
    let word = created.word.split("");

    let embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setTitle(`(${emoji.graduation}) | Termo`)
      .setDescription(`${created.attempts.join("\n")}`)
      .setThumbnail("https://cdn.discordapp.com/emojis/989366183235043378.png?size=2048")
      .setFooter({ text: `${message.author.tag} (${message.author.id})`, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setTimestamp()

    message.reply({ embeds: [embed] }).then((msg) => {
      let filter = m => m.author.id === message.author.id && m.content;
      const collector = message.channel.createMessageCollector({ filter, time: 90000 });
      
      collector.on("collect", (m) => {
        if (cd.get(m.author.id)) return message.reply(`**(${emoji.time}) | ${parseText(m.author.username)}**, você está digitando muito rápido.`).then((a) => { setTimeout(() => a.delete(), 2500) });
        cd.set(m.author.id, true);
        setTimeout(() => cd.delete(m.author.id), 1500);
        if (["tip", "dica", "tips", "dicas"].includes(m.content.toLowerCase())) {
          let tipArr = word.slice(0, word.length / 2);
          word.slice(word.length / 2, word.length).forEach(x => tipArr.push("_"));
          return m.reply(`**(${emoji.tip}) | Dica:** \`${tipArr.join(" ")}\`.`)
        }
        answer = m.content.trim().split(/ +/g);
        created = termo.add(parseText(answer[0].toLowerCase()), m.author.id);

        embed.setDescription(`${(created.attempts.length > 10 ? created.attempts.slice(created.attempts.length - 9, created.attempts.length) : created.attempts).join("\n")}`)
        msg.edit({ embeds: [embed] });
        if (created.win) {
          collector.stop("wins");
        }
      });
      
      collector.on("end", (collected, reason) => {
        termo.stop(message.author.id);
        if (reason == "time") {
          msg.reply(`**(${emoji.time}) | <@${message.author.id}>**, seu tempo acabou, a palavra era \`${created.word}\`.`);
        } else if (reason == "wins") {
          msg.reply(`**(${emoji.confetti}) | <@${message.author.id}>**, você conseguiu acertar a palavra do termo.`);
        }
      });
    });
  }
}
