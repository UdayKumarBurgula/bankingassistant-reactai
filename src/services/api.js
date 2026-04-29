import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const sendMessageToLLM = async (userMessage) => {
  try {
    const prompt = `
You are a banking customer support assistant.

Rules:
- Do not provide financial advice
- Explain transactions clearly
- Suggest safe next steps
- Be concise and professional
- Never ask for PIN, OTP, CVV, or passwords
- If fraud is suspected, suggest contacting bank support

User query:
${userMessage}
`;

    const response = await axios.post(
      `${GEMINI_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return "No response received from AI assistant.";
    }

    return text;
  } catch (error) {
    if (error.response?.status === 401) {
      return "Invalid API key. Please verify your Gemini API key.";
    }

    if (error.response?.status === 429) {
      return "Rate limit exceeded. Please try again later.";
    }

    return "Something went wrong while contacting the AI service.";
  }
};