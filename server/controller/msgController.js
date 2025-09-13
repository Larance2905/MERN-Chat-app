const msgModel = require("../model/msgModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    if (!from || !to || !message) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const data = await msgModel.create({
      message: { text: message.trim() },
      users: [from, to],
      sender: from,
    });

    if (data) return res.status(201).json({ msg: "Message added successfully." });

    return res.status(500).json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    console.error("Error in addMessage:", ex);
    next(ex);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const messages = await msgModel.find({
      users: { $all: [from, to] },
    }).sort({ createdAt: 1 }).limit(100);

    return res.json(messages);
  } catch (ex) {
    console.error("Error in getAllMessages:", ex);
    next(ex);
  }
};
