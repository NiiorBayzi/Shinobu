module.exports = {
  name: "ping",
  aliases: ["latency", "latência"],
  run: async (client, message, args) => {
    let mongoPing = 1;
    let now = Date.now();
    client.db.users.findOneAndUpdate({ _id: message.author.id }, { $set: { ping: 1 } }).then((a) => {
      mongoPing = Date.now() - now;
    });

    message.reply(`>>> ()`)
  }
}
