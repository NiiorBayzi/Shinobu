module.exports = {
  name: "bal",
  aliases: ["atm", "wallet", "saldo", "carteira],
  run: async (client, message, args) => {
    let user = client.users.findUser(args.join(" ")) || message.author;
    let cash = client.db.users.findOne({ _id: message.author.id }).cash;

    message.reply(`**(${emoji.wallet}) »** <@${message.author.id}>, **${parseText(user.username)}** possui **${emoji.stars} ${cash}** eu sua carteira.`);
  }
}
