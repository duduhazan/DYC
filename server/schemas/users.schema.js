import mongoose from "mongoose";

const user = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isBusiness: Boolean,
  cardLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

const userModel = mongoose.model("User", user);

export default userModel;
