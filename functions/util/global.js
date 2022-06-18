module.exports = () => {
  let cts = db.get("cities");
  let result = Object.keys(cts).map((key, pib) => {
    db.get(`cities.${Number(key)}.members`).forEach(u => pib = pib + (db.get(`users.${u}.cash`) || 0));
    cts[key].pib = pib;
    return [Number(key), cts[key]]
  });

  global.cities = new Discord.Collection(result);
}