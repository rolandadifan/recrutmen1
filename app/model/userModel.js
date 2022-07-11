const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        nama: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['customer' , 'admin']
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
