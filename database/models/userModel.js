const UserSchema = new mongoose.Schema({
  cash: {
    type: Number,
    default: 0
  },
  cooldowns: {
    daily: { type: Number },
    work: { type: Number },
    weekly: { type: Number }
  },
  media: {
    at: { type: String, required: true },
    bio: { type: String },
    posts: { type: Array }
  },
  _id: {
    type: String,
    required: true
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
