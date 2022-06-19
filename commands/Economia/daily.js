module.exports = {
  name: "daily",
  category: "Economia",
  aliases: ["diária", "diaria"],
  run: async (client, message, args) => {
    if ((db.get(`users/${message.author.id}/cooldowns/daily`) || 0) > Date.now()) return message.reply(`<:cooldown:986467656058171422> | Você precisa esperar **\`${parseTime(db.get(`users.${message.author.id}.cds.daily`) - Date.now())}\`** para coletar sua recompensa diária novamente.`);

    let won = randomNumber(528, 1056);
    message.reply(`<:_:986398385080778812> | **${parseText(message.author.username)}**, você fez sua coleta diária e ganhou **$${won}**, volte em <t:${Math.round((Date.now() + 86400000) / 1000)}:R> para coletar novamente.`);

    db.add(`users/${message.author.id}/cash`, won);
    db.set(`users/${message.author.id}/cooldowns/daily`, Date.now() + 86400000);
  }
}
