const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const postModel = require("../models/postModel");
const userModel = require('../models/userModel');

router.post("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const SECRET_KEY = process.env.JWT_KEY;

    // console.log(req.body, token)

    if (!token) {
      return res.status(400).json({ msg: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ msg: 'Invalid token' });
      }

      const userDetails = await userModel.findOne({ email: decoded.email });

      // Check if a post with the same title and description already exists
      let postExists = await postModel.findOne({ title: req.body.title, description: req.body.description });
      if (postExists) {
        return res.status(400).json({ msg: "Post already exists with that title and description" });
      }

      // Create the post and save the image reference
      const post = await postModel.create({
        title: req.body.title,
        desc: req.body.description,
        category: req.body.category,
        owners: userDetails.email,
        url: req.body.url
      });

      userDetails.posts.push(post._id);
      await userDetails.save();

      res.status(200).json({ msg: "Successfully uploaded!" });
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
