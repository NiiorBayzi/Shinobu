module.exports = {
  name: "ping",
  aliases: ["latency", "latência"],
  run: async (client, message, args) => {
    let mongoPing;
    let now = Date.now();
    await client.db.users.findOneAndUpdate({ _id: client.user.id }, { $set: { _p: 1 } })
    mongoPing = Date.now() - now;

    message.reply(`**(${emoji.ping}) | Pong!**\n>>> **(${emoji.gateway}) Gateway: \`${client.ws.ping}ms\`\n(${emoji.database}) Database: \`${mongoPing}ms\`\n(${emoji.time}) Tempo de resposta: \`${Date.now() - message.createdTimestamp}ms\`**`);
  }
}
