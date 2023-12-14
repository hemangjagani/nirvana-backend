const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { userResume } = require('../models');
const UserResume = require('../models/userResume.model');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {

  res.status(200).send("Admin Content.");

};

exports.adminBoard = (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    const currentUserID = decoded.id;

    // To send all user data from the "users" collection excluding the current user and password field
    User.find({ _id: { $ne: currentUserID } }, { password: 0 }, (err, users) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      res.status(200).send(users);
    });
  });
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch user from the database based on the provided ID
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data as the response (without the password)
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.moderatorBoard = (req, res) => {
  // You can add logic specific to moderator content here
  res.status(200).send("Moderator Content.");
};

exports.uploadResume = async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const setImagePath = "/public/resume/" + req.file.filename;
    const resumeFilePath = setImagePath;

    // Save resume data to the database
    const uploadResumeAction = new userResume({
      name,
      email,
      description,
      resumeFilePath,
    });

    await uploadResumeAction.save();

    res.status(200).json({ message: "Resume uploaded successfully", uploadResumeAction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllResumes = async (req, res) => {
  try {
    // Fetch all resumes from the database
    const resumes = await UserResume.find();

    res.status(200).json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};