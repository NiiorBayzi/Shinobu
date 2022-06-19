const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    type: Object,
    required: true
  },
  _id: {
    type: String,
    required: true
  }
});
const City = mongoose.model("City", CitySchema);

module.exports = City;
