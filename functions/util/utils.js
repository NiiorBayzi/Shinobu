function findUser(args) {
  let user = null;
  args = args.toString();
  if (!args) return user;
  user = client.users.cache.get(args.replace(/[\\<>@!]/g, "").trim()) || client.users.cache.find(u => u.tag.startsWith(args) || u.username.startsWith(args)) || null;

  return user;
}

function parseT(mls) {
  let d = Math.floor(mls / 86400000);
  let h = Math.floor(mls % 86400000 / 3600000);
  let m = Math.floor(mls % 86400000 % 3600000 / 60000);
  let s = Math.floor(mls % 86400000 % 3600000 % 60000 / 1000);
  
  return `${d > 0 ? `${d}d ` : ""}${h > 0 ? `${h}h ` : ""}${m > 0 ? `${m}m ` : ""}${s > 0 ? `${s}s` : ""}`;
}
function random(min, max) {
  return Math.round((Math.random() * (max - min)) + min)
}

function prU(text) {
  if (!text) return text;
  return text.replace(/[*_`]/g, "");
}

client.users.findUser = findUser;
global.parseTime = parseT;
global.randomNumber = random;
global.parseText = prU;
