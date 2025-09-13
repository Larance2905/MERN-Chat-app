// // server/routes/avatarRoutes.js
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// router.get("/:random", async (req, res) => {
//   try {
//     const { random } = req.params;
//     const response = await axios.get(`https://api.multiavatar.com/${random}.svg`);
//     res.set("Content-Type", "image/svg+xml");
//     res.send(response.data);
//   } catch (err) {
//     console.error("Error fetching avatar:", err.message);
//     res.status(500).send("Failed to load avatar");
//   }
// });

// module.exports = router;
