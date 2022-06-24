module.exports = {
  name: "help",
  aliases: ["ajuda"],
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setTitle(`Painel de Ajuda | ${client.user.username}`)
      .setThumbnail()
      .addFields({
        name: `${emoji.wallet} » Economia`,
        value: "`" + client.commands.filter(x => !x.dev && x.category == "Economia").map(x => x.name).join("` | `") + "`"
      })

    message.reply({ embeds: [embed] });
  }
}
