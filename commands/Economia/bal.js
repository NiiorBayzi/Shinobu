module.exports = {
  name: "bal",
  aliases: ["atm", "wallet", "saldo", "carteira"],
  run: async (client, message, args, db) => {
    let user = client.users.findUser(args.join(" ")) || message.author;
    let data = db.find(x => x._id === user.id);
    if (!data) message.reply(`**(${emoji.error}) | ${parseText(message.author.username)}**, não encontrei esse usuário em meu **(${emoji.database}) Banco de Dados**.`);

    message.reply(`**(${emoji.wallet}) | <@${message.author.id}>**, **${parseText(user.username)}** possui **${emoji.starcoins} ${data.cash}** eu sua carteira.`);
  }
}
