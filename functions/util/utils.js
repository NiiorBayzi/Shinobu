function findUser(args) {
  let user = null;
  if (!args) return user;
  user = client.users.cache.get(args.replace(/[\\<>@!]/g, "").trim()) || client.users.cache.find(u => u.tag.startsWith(args) || u.username.startsWith(args)) || null;

  return user;
}

function parseT(mls, slice) {
  if (!slice) slice = 3;
  let time = [];
  Object.entries(ms(mls)).filter(t => t[1] > 0).slice(0, slice).forEach(t => time.push(`${t[1]}${t[0]}`));

  return time.join(" ").replace("days", "d").replace("hours", "h").replace("minutes", "m").replace("seconds", "s");
}
function random(min, max) {
  return Math.round((Math.random() * (max - min)) + min)
}

function prU(text) {
  if (!text) return text;
  return text.replace(/[^a-z0-9#]/gi, "");
}

client.users.findUser = findUser;
global.parseTime = parseT;
global.randomNumber = random;
global.parseText = prU;
