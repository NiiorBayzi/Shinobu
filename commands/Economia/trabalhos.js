module.exports = {
  name: "trabalhos",
  category: "Economia",
  run: async (client, message, args) => {
    let xp = db.get(`users/${message.author.id}/xp`) || 0;

    let embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setTitle("<:_:986402052957696061> | Trabalhos")
      .setDescription(`Escolha a profissão que você deseja se tornar no menu abaixo.\n> **EXP:** \`${xp}\``)
      .setFooter({ text: `${message.author.tag} (${message.author.id})`, iconURL: message.author.avatarURL({ dynamic: true }) });
    let arr = [];
    Object.entries(require("../../economy.json")).forEach(t => {
      arr.push({ label: t[0].replaceAll("-", " "), description: `Salário: $${t[1].min} - $${t[1].max} | Level: ${(t[1].min + t[1].max) * 9}`, value: `${t[0]}/${(t[1].min + t[1].max) * 8}` });
    });
    
    let row = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu().setCustomId(`works-${message.author.id}`).setPlaceholder(`Escolher profissão`).addOptions(arr));

    message.reply({ embeds: [embed], components: [row] }).then((msg) => {
      setTimeout(() => {
        msg.delete()
      }, 35000);
    });
  }
}
