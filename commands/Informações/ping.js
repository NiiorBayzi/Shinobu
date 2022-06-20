module.exports = {
  name: "ping",
  aliases: ["latency", "latência"],
  run: async (client, message, args) => {
    let mongoPing = 100;
    let now = Date.now();
    client.db.users.findOneAndUpdate({ _id: client.user.id }, { $set: { ping: 1 } }).then((a) => {
      mongoPing = Date.now() - now;
    });

    message.reply(`**(${emoji.ping}) | Pong!**\n>>> **(${emoji.gateway}) Gateway: \`${client.ws.ping}ms\`\n(${emoji.database}) Database: \`${mongoPing}ms\`**`);
  }
}
