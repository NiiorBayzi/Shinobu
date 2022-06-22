module.exports = {
  name: "bal",
  aliases: ["atm", "wallet", "saldo", "carteira"],
  run: async (client, message, args) => {
    let user = client.users.findUser(args.join(" ")) || message.author;
    let cash;
    client.db.users.findOne({ _id: message.author.id }, async (err, user) {
      if (!(await user)) return message.reply("**(${emoji.error}) | Não encontrei este usuário no meu banco de dados.**");
      cash = await user.cash.toString();
    });

    message.reply(`**(${emoji.wallet}) » <@${message.author.id}>**, **${parseText(user.username)}** possui **${emoji.stars} ${cash}** eu sua carteira.`);
  }
}
