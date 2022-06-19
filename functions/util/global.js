module.exports = async () => {
  let cts = await db.get("cities");
  if (!cts) cts = [];
  let i = 0;
  let result = cts.map(async (c) => {
    let pib = 0;
    c.members.map(async (u) => { 
      let cash = await db.get(`users/${u}/cash`);
      pib = pib + cash;
    });
    c.pib = await pib;
    c.index = i;
    return [i++, c];
  });

  global.cities = new Discord.Collection(result);
}
