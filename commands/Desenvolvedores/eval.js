const fs = require("fs");
const path = require("path");

module.exports = {
  name: "eval",
  aliases: ["ev", "e"],
  dev: true,
  run: async (client, message, args) => {
    try {
      let code = args.join(" ");
      let res = undefined;
      if (code.startsWith("--o ")) {
        args.shift();
        code = args.join(" ");
        global.main = client;
        global.main.message = message;
        global.main.message.args = args;
        res = require('util').inspect(await Object.getPrototypeOf(async () => { }).constructor(code)());
      } else {
        res = await require("util").inspect(eval(code));
      }

      message.channel.send(`\`\`\`js\n${res.slice(0, 1990).replaceAll(client.token, "/* Token */")}\`\`\``)
    } catch (err) {
      message.channel.send(`\`\`\`js\n${err}\`\`\``)
    }
  }
}
