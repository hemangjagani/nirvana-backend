const mongoose = require("mongoose");

const userResumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    resumeFilePath: {
        type: String,
        required: true,
    },
});

const UserResume = mongoose.model("UserResume", userResumeSchema, "UserResume");

module.exports = UserResume;
