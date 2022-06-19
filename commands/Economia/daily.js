module.exports = {
  name: "daily",
  category: "Economia",
  aliases: ["diária", "diaria"],
  run: async (client, message, args) => {
    let cd = await db.get(`users/${message.author.id}/cooldowns/daily`);
    if ((cd || 0) > Date.now()) return message.reply(`<:cooldown:986467656058171422> | Você precisa esperar **\`${parseTime(cd - Date.now())}\`** para coletar sua recompensa diária novamente.`);

    let won = randomNumber(528, 1056);
    message.reply(`<:_:986398385080778812> | **${parseText(message.author.username)}**, você fez sua coleta diária e ganhou **$${won}**, volte em <t:${Math.round((Date.now() + 86400000) / 1000)}:R> para coletar novamente.`);

    db.math(`users/${message.author.id}/cash`, "+", won);
    db.set(`users/${message.author.id}/cooldowns/daily`, Date.now() + 86400000);
  }
}
