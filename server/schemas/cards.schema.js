import mongoose from "mongoose";

const card = mongoose.Schema({
    name: String,
    type: String,
    address: String,
    phone: String,
    imageUrl: String,
    description: String,
    userId: String
});

const cardModel = mongoose.model("Card", card);

export default cardModel;
