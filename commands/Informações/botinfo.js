module.exports {
  name: "botinfo",
  aliases: ["bi", "infobot"],
  run: async (client, message, args) => {
    
   
    let embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
      .setThumbnail(message.author.avatarURL({ dynamic: true })
      .setDescription(`Olá **${parseText(message.author.username)}**, eu sou o **${client.user.username}**, um bot de **Economia de Cidades**`)
  }
}
