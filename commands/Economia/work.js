module.exports = {
  name: "work",
  category: "Economia",
  aliases: ["trabalhar", "trabalho"],
  run: async (client, message, args) => {
    let pr = db.get(`users.${message.author.id}.profession`);
    if (!pr) return message.reply("<:_:986400479598743612> | Você não está em um trabalho, use `sk?trabalhos` para escolher seu trabalho.");
    let prL = require("../../economy.json")[pr];
    if ((db.get(`users.${message.author.id}.cds.work`) || 0) > Date.now()) return message.reply(`<:_:986467656058171422> | Você precisa esperar **\`${parseTime(db.get(`users.${message.author.id}.cds.work`))}\`** para trabalhar novamente.`);
    let tm = randomNumber(4, 8);
    let won = randomNumber(prL.min, prL.max) * tm;
    message.reply(`<:_:986398385080778812> | **${parseText(message.author.username)}**, você trabalhou por **${tm} Horas** e ganhou **$${won}**, volte em <t:${Math.floor((Date.now() + 5400000) / 1000)}:R> para trabalhar novamente.`);

    db.add(`users.${message.author.id}.cash`, won);
    db.set(`users.${message.author.id}.cds.work`, Date.now() + 5400000);
  }
}
