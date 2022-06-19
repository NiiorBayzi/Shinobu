module.exports = async () => {
  let cts = await db.get("cities");
  if (!cts) cts = [];
  let i = 0;
  let result = cts.map((c, pib) => {
    c.members.forEach(u => { pib = pib + (await db.get(`users/${u}/cash`) || 0) });
    c.pib = pib;
    return [i++, c]
  });

  global.cities = new Discord.Collection(result);
}
