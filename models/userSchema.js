const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    salt:{
        type:String,
    }

}, { timestamps: true });

userSchema.pre("save", function (next) {
    const userDetails = this;
    if (!userDetails.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(userDetails.password)
        .digest("hex");

        this.salt =salt;
        this.password = hashedPassword;
        next();
});

module.exports = model("user", userSchema);
