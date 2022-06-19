function addCity(name, author) {
  db.set(`cities/${cities.size}`, { name: parseText(name), members: [author] });
}

module.exports = {
  name: "city",
  aliases: ["cidade"],
  subcommands: ["create | criar"],
  run: async (client, message, args) => {
    let subcommand = args[0] ? args[0].toLowerCase() : args[0];
    args = args.slice(args.indexOf(subcommand) + 1, args.length);
    if (subcommand === "create" || subcommand === "criar") {
      if (cities.find(x => (x.members || []).includes(message.author.id))) return message.reply("<:_:987355647987318834> | Você está em uma cidade, saia para criar uma.");
      if ((await db.get(`users/${message.author.id}/cash`) || 0) < 5000) return message.reply("<:_:986394930844946523> | Para criar uma cidade você precisa de **$5000** na carteira.");
      if (!parseText(args[0])) return message.reply("<:_:987355647987318834> | Coloque o nome de sua nova cidade.")

      addCity(parseText(args.slice(0, 3).join(" ")), message.author.id);
      db.math(`users/${message.author.id}/cash`, "-", 5000);
      message.reply(`<:_:987355647987318834> | Você criou uma cidade chamada **\`${parseText(args.slice(0, 3).join(" "))}\`**, use \`sk?city\` para ver as informações.`);
    } else {
      let user = client.users.findUser(args.join(" ")) || message.author;
      let city = cities.find(c => (c.members || []).includes(user.id));

      if (!city) return message.reply(`<:_:987355647987318834> | **${parseText(user.username)}** não está em uma cidade ainda.`);

      let members = [];
      let m = await db.get(`cities/${city.index}/members`);
      city.members.map(u => client.users.findUser(u) != null ? members.push(`**${parseText(client.users.findUser(u).tag)}**`) : () => { db.set(`cities/${city.index}/members`, m.splice(m.indexOf(u))); city.members = m.splice(m.indexOf(u)); }))
      let embed = new Discord.MessageEmbed()
        .setColor(client.config.color)
        .setTitle(`<:_:987363119837872138> | Cidade de ${user.username}`)
        .addFields({ name: "<:_:987355647987318834> » Informações:", value: `>>> **Nome:** ${city.name}\n**Dono:** ${parseText(client.users.findUser(city.members[0]))}` }, { name: `<:_:987362684565618829> » PIB:`, value: `> PIB de **$${city.pib.toLocaleString()}**` }, { name: `<:_:987362339969990707> » Habitantes: [${city.members.length}]`, value: `>>> ${members.join("\n")}` })
        .setThumbnail(user.avatarURL({ dynamic: true }))

      message.reply({ embeds: [embed] });
    }
  }
};
