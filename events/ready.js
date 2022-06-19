module.exports = {
  name: "ready",
  execute: () => {
    client.connectDatabase();
    console.log(`[ Discord.js ] Successfully connected in ${client.user.tag}`);
  }
}
