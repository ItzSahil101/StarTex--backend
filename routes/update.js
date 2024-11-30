const express = require("express");
const router = express.Router();
const userModel = require('../models/userModel');
const { generateToken } = require("../utils/generateToken");

router.post('/', async (req, res) => {
  try {
    const { username, pass, id, bio } = req.body;

    // Update user profile with new image ID and other details
    await userModel.updateOne(
      { _id: id },
      {
        $set: {
          userName: username,
          pass: pass,
          bio: bio
        }
      }
    );

    // Generate a new token if necessary (uncomment if needed)
    // let uUser = await userModel.findOne({ _id: id });
    // let token = generateToken(uUser);

    return res.status(200).json({ msg: "Updated"});
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
