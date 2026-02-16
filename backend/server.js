import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post("/test", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
