const cooldown = new Discord.Collection();
const jssearch =  require('js-search')
const search = new jssearch.Search('isbn')
search.indexStrategy = new jssearch.AllSubstringsIndexStrategy()

module.exports = {
  name: "messageCreate",
  execute: async (client, message) => {
    if (message.author.bot) return;
    let prefix = "sk?";
    if (message.content.replace("!", "") === `<@${client.user.id}>`) {
      message.reply(`**[ <:sukuna:987021031493500969> ] | Olá, eu sou um bot de Economia de Cidades. Meu prefixo é \`${prefix}\`, use \`${prefix}help\` para ver meus comandos.**`);
    }
    
    if (message.content.toLowerCase().startsWith(prefix)) {
      require("../functions/util/global.js")();
      if (cooldown.get(message.author.id)) return;
      const args = message.content.trim().slice(prefix.length).split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd = client.commands.get(command) || client.commands.find(c => (c.aliases || []).includes(command));
      if (!command) return;
      if (!cmd) {
        search.addDocuments(client.commands.filter(x => x.category != "Desenvolvedores").map(x => x));
search.addIndex('name');
search.addIndex('aliases');
        let sh = search.search(command)[0]

        return message.reply(`<:_:987795714069368844> | Não encontrei este comando${sh ? `, você quis dizer \`${sh.name}\`?` : "."}`);
      }

      try {
        cmd.run(client, message, args);     
        cooldown.set(message.author.id, true);
        setTimeout(() => {
          cooldown.delete(message.author.id);
        }, 2500);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
