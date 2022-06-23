const term = require("../../games/termo/index.js");
module.exports = {
  name: "termo",
  aliases: ["term"],
  run: async (client, message, args) => {
    let created = termo.create(args[0], message.author.id);
    if (!created) return message.reply(`**(${emoji.error}) | ${parseText(message.author.username)}**, você já está em uma partida.`);

    
  }
}
