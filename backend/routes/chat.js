import express from "express";
import Thread from "../models/Thread.js";
import getGenAIAPIResponse from "../utils/genai.js";

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

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    const userMessage =
      typeof message === "string" ? message : JSON.stringify(message);
    if (!thread) {
      //create a new thread in db
      thread = new Thread({
        threadId,
        title: userMessage,
        messages: [{ role: "user", content: userMessage }],
      });
    } else {
      thread.messages.push({ role: "user", content: userMessage });
    }
    const assistantReply = await getGenAIAPIResponse(userMessage);

    thread.messages.push({
      role: "assistant",
      content:
        typeof assistantReply === "string"
          ? assistantReply.text
          : JSON.stringify(assistantReply.text),
    });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ reply: assistantReply.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
});
export default router;
