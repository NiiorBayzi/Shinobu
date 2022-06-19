module.exports = () => {
  let cts = await db.get("cities");
  if (!cts) cts = {};
  let result = cts.map((key, pib) => {
    cts[Number(key)].members.forEach(u => pib = pib + (await db.get(`users/${u}/cash`) || 0));
    cts[key].pib = pib;
    return [Number(key), cts[key]]
  });

  global.cities = new Discord.Collection(result);
}
