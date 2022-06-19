module.exports = {
  name: "bal",
  aliases: ["atm", "saldo", "dinheiro"],
  run: async (client, message, args) => {
    let user = client.users.findUser(args.join(" ")) || message.author;

    if (user.id === message.author.id) {
      message.reply(`<:_:986394930844946523> | <@${user.id}>, você possui **$${(await db.get(`users/${user.id}/cash`) || 0).toLocaleString()}** em sua carteira.`);
    } else {
      message.reply(`<:_:986394930844946523> | <@${message.author.id}>, **${parseText(user.tag)}** possui **$${(await db.get(`users/${user.id}/cash`) || 0).toLocaleString()}** em sua carteira.`) 
    }
  }
}
