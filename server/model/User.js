const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            maxlength: 10
        },
        password: {
            type: String
        },
        score: {
            type: Number
        }
    }
)

module.exports = mongoose.model("User", userSchema)