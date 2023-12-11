const User = require('../models/user.model'); 
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config'); 

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  
  res.status(200).send("Admin Content.");
  
};

exports.adminBoard = (req, res) => {
  // You can add logic specific to admin content here
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

exports.moderatorBoard = (req, res) => {
  // You can add logic specific to moderator content here
  res.status(200).send("Moderator Content.");
};
