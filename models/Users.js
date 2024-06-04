const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, default: "" },
        walletAddress: { type: String, default: "" },
        gameBalance: { type: Number, default: 0 },
        avatar: { type: String, default: "" },
        highest: { type: Number, default: 0 },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", UserSchema)