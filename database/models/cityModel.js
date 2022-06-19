const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    type: Object,
    default: [],
    required: true
  },
  _id: {
    type: String,
    required: true
  }
});
const City = mongoose.model("City", CitySchema);

client.db.city = City;
