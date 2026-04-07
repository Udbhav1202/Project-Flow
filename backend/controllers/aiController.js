const axios = require("axios");

const generateDescription = async (req, res) => {
  try {
    const { title } = req.body;

    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: `Write a short (2-3 lines) simple plain text description for the task: ${title}. Do not use bullet points, headings, or formatting.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const description = response.data.choices[0].message.content;

    res.json({ description });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "AI generation failed" });
  }
};

module.exports = { generateDescription };