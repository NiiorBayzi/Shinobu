module.exports = {
  name: "help",
  aliases: ["ajuda"],
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setTitle(`Painel de Ajuda | ${client.user.username}`)
      .setThumbnail("https://cdn.discordapp.com/emojis/989710923121975327.png?size=2048")
      .addFields({
        name: `${emoji.wallet} » Economia`,
        value: "`" + client.commands.filter(x => !x.dev && x.category == "Economia").map(x => x.name).join("` | `") + "`"
      }, {
        name: `${emoji.info} » Informações`,
        value: "`" + client.commands.filter(x => !x.dev && x.category == "Informações").map(x => x.name).join("` | `") + "`"
      })
      .setFooter({ text: `${message.author.tag} (${message.author.id})`, iconURL: client.user.avatarURL({ dynamic: true }) })
      .setTimestamp()

    message.reply({ embeds: [embed] });
  }
}
