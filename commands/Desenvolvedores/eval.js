const fs = require("fs");
const path = require("path");

module.exports = {
  name: "eval",
  aliases: ["ev", "e"],
  category: "Desenvolvedores",
  run: async (client, message, args) => {
    if (!client.config.devs.includes(message.author.id)) return message.reply("**<:_:986835551372075068> | Você não é um de meus desenvolvedores.**");
    try {
      let code = args.join(" ");
      let res = await require("util").inspect(eval(code));

      message.channel.send(`\`\`\`js\n${res.slice(0, 1990).replaceAll(client.token, "/* Token */")}\`\`\``)
    } catch (err) {
      message.channel.send(`\`\`\`js\n${err}\`\`\``)
    }
  }
}