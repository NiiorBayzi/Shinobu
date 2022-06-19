require("./db.js");

module.exports = async () => {
  let cts = await client.db.city.find();
  if (!cts) cts = [];
  let i = 0;
  let result = cts.map((c) => {
    c.index = i;
    return [i++, c];
  });

  global.cities = new Discord.Collection(result);
}
