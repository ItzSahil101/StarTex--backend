const express = require("express");
const router = express.Router();

const postModel = require("../models/postModel");

router.get('/', async (req, res) => {
    try {
        const { category } = req.query; // Query parameter fetch garne
        let filter = {};

        // Check if category is not "all"
        if (category && category.toLowerCase() !== "all") {
            filter.category = category; // Filter ma category add garne
        }

        const postsData = await postModel.find(filter); // Filter apply garera data fetch garne
        res.status(200).json({ data: postsData }); // Response send garne
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Server error while fetching posts" });
    }
});

module.exports = router;
