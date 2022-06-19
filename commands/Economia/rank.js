module.exports = {
  name: "rank",
  category: "Economia",
  aliases: ["lb", "leaderboard", "top"],
  run: async (client, message, args) => {
    let rank = Object.entries(await db.get("users")).sort((a, b) => b - a).map(lb => ({
      money: lb[1], id: lb[0]
    }));
    let arr = [];
    let i = 1;
    rank.forEach((lb) => {
      if (!client.users.cache.get(lb.id)) return;
      if (isNaN(lb.money.cash)) return;
      arr.push(`\`[ ${i++}° ]\` **${parseText(client.users.cache.get(lb.id).tag)}** - $${lb.money.cash.toLocaleString()}`);
    });

    let embed = new Discord.MessageEmbed()
      .setColor(client.config.color)
      .setTitle(`<:_:986461166740062239> | Ranking - Economia`)
      .setDescription(arr.slice(0, 10).join("\n"))
      .setFooter({ text: `・${message.author.tag} (${message.author.id})`, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setTimestamp();

    let row = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu().setCustomId(`rank-${message.author.id}`).setPlaceholder("Selecionar Ranking").addOptions([{ label: "Economia", description: "Usuários mais ricos.", emoji: { name: "dinheiro", id: "986394930844946523" }, value: "eco" }, { label: "Cidades", description: "Cidades com maior PIB.", emoji: { name: "pib_2", id: "987570945118048366" }, value: "cities" }]));

    message.reply({ content: `${message.author}`, embeds: [embed], components: [row] });
  }
}
