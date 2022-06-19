module.exports = async () => {
  let cts = await db.get("cities");
  if (!cts) cts = [];
  let result = cts.map((c, pib, i) => {
    c.members.map(async (u) => { 
      let cash = await db.get(`users/${u}/cash`) || 0;
      pib = pib + cash;
    });
    c.pib = pib;
    c.index = i;
    return [i++, c];
  });

  global.cities = new Discord.Collection(result);
}
