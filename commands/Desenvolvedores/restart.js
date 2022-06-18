module.exports = {
  name: "restart",
  category: "Desenvolvedores",
  aliases: ["reset", "reiniciar"],
  run: async (client, message, args) => {
    let msg;
    if (!client.config.devs.includes(message.author.id)) return message.reply("**<:_:986835551372075068> | Você não é um de meus desenvolvedores.**");

    message.reply(`<:_:986836753413439538> | Reiniciando...`).then(m => {
      msg = m.id;
      client.destroy();
    }).then(() => {
      client.login(process.env.token);
      setTimeout(() => {
        message.channel.messages.fetch(msg).then(s => s.edit(`<:_:986836780168925194> | Reiniciei com sucesso.`));
      }, 1000);
    });
  }
}