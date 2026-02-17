import express from "express";
import Thread from "../models/Thread.js";
const router = express.Router();

//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz",
      title: "testing New Thread",
    });

    const response = await thread.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, "Failed to save in database");
  }
});

// Get all threads
router.get("/thread", async (req, res) => {
  try {
    // descending order of updatedAT // most recent data on top
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// Get thread message with thread id.
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "Thread is not found." });
    }

    res.json(thread.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      res.status(404).json({ error: "Thread could not be found." });
    }
    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});
export default router;
