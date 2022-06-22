module.exports = {
  name: "bal",
  aliases: ["atm", "wallet", "saldo", "carteira"],
  run: async (client, message, args, db) => {
    let user = client.users.findUser(args.join(" ")) || message.author;
    let data = db.find(x => x._id === user.id);
    if (!data) return message.reply(`**(${emoji.error}) | ${parseText(message.author.username)}**, não encontrei esse usuário em meu **(${emoji.database}) Banco de Dados**.`);
    let pos = db.filter((a) => a.cash > 0).sort((a, b) => b.cash - a.cash).findIndex(x => x._id === user.id) + 1;

    message.reply(`**(${emoji.wallet}) | <@${message.author.id}>**, **${parseText(user.username)}** possui **${emoji.starcoins} ${data.cash}** eu sua carteira${pos > 0 ? `.\n> **(${emoji.rank}) |** Sabia que **${parseText(user.username)}** está na posição **#${pos}** no ranking?` : "."}`);
  }
}
