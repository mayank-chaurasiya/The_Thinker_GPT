import "dotenv/config";

const getGenAIAPIResponse = async (message) => {
  //   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Note: Usually, the key is passed as a query param (above) or x-goog-api-key header.
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: message }], // Parts must be an array of objects with a 'text' property
        },
      ],
    }),
  };

  try {
    // 2. Added 'await' here
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      options,
    );
    const data = await response.json();

    console.log("Gemini Response:", data.candidates[0].content.parts[0]); //reply
    return data.candidates[0].content.parts[0];
  } catch (err) {
    console.error("Error calling Gemini:", err);
    res.status(500).send({ error: "Failed to fetch from Gemini API" });
  }
};

export default getGenAIAPIResponse;
