const UserSchema = new mongoose.Schema({
  cash: {
    type: Number,
    default: 0
  },
  cooldowns: {
    type: Object,
    default: {}
  },
  _id: {
    type: String,
    required: true
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
