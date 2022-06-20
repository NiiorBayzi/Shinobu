const ClientSchema = new mongoose.Schema({
  ping: {
    type: Number
  },
  _id: {
    type: String,
    required: true
  }
});
const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
