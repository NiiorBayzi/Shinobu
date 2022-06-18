const words = ["pneumoultramicroscopicossilicovulcanoconiotico", "pneumoultramicroscopicossilicovulcanoconiose", "paraclorobenzilpirrolidinonetilbenzimidazol", "piperidinoetoxicarbometoxibenzofenona", "dimetilaminofenildimetilpirazolona", "hipopotomonstrosesquipedaliofobia", "tetrabrometacresolsulfonoftaleina", "monosialotetraesosilgangliosideo"];

module.exports = {
  name: "fast",
  category: "Jogos",
  aliases: ["fast-type", "fasttype"],
  run: async (client, message, args) => {
    let word = words[Math.floor(Math.random() * words.length)];
    let time = (word.length / 3 * 1000);
    let now = Date.now();

    let arrW = [];
    word.split("").forEach(l => arrW.push(`:regional_indicator_${l}:`));
    let filter = m => m.author.id === message.author.id && m.content.toLowerCase() === word;
    message.reply(`<:fast:987111227912245309> | Digite a seguinte palavra em **${parseTime(time, 1)}**: ${arrW.join(" ")}`).then((msg) => {
      const collector = message.channel.createMessageCollector({ filter, time: 35000 });

      collector.on("collect", m => {
        m.reply(`<:fast:987111227912245309> | Parabéns! Você conseguiu digitar \`${word}\` em **${parseTime(Date.now() - now, 1)}**.`);
        collector.stop();
      });

      collector.on("end", (collected, err) => {
        if (err == "time") {
          message.reply("<:fast:987111227912245309> | O tempo acabou, boa sorte dá próxima vez.");
        }
      });
    });
  }
}