const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require("crypto");
const { createToken } = require('../services/authentication').default;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", function(next) {
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();
})

userSchema.static("matchedPasswordAndGenerateToken", async function(email, password) {
    const user = await this.findOne({email});

    if(!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedPassword = createHmac("sha256", salt).update(password).digest("hex");

    if(hashedPassword !== userProvidedPassword) throw new Error("Incorrect Password");

    const token = createToken(user);
    return token;
})

const User = model("user", userSchema);
module.exports = User;