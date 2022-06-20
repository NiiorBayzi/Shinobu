module.exports {
  name: "botinfo",
  aliases: ["bi", "infobot"],
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
      .setThumbnail(message.author.avatarURL({ dynamic: true })
      .setDescription(`Olá **${parseText(message.author.username)}**, eu sou o **${client.user.username}**, um bot de **Economia de Cidades**`)
      .addFields({
        name: `(${emoji.bot}) » Informações`,
        value: `>>> Criador: ${client.users.cache.get("916712541797896263").tag} \`(916712541797896263)\``
      }, {
        name: `(${emoji.statistics}) » Estatísticas`,
        value: `>>> **Servidores:** ${client.guilds.size.toLocaleString("pt-br")}\n**Usuários:** ${client.users.size.toLocaleString("pt-br")}\n**Comandos:** ${client.commands.size.toLocaleString("pt-br")}`
      })
      .setFooter({ name: message.author.tag, iconURL: message.author.avatarURL() });
      .setTimestamp()

      message.reply({ embeds: [embed] });
  }
}
