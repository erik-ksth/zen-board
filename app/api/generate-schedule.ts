import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemma-3-27b-it";
const API_KEY = process.env.NEXT_PUBLIC_GENAI_API_KEY as string;

async function runScheduler(tasks: string[]): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: API_KEY,
  });

  const config = {
    responseMimeType: "text/plain",
  };

  const prompt = `Please generate a productive day schedule for me, only for one day. I need the schedule in the EXACT format "HH:mm-HH:mm$task%" (24 hrs format, '%' is the most IMPORTANT!). Do not include any additional information or descriptions—only the time and task in this EXACT format. You can add an emoji to each task name. Please schedule for the whole day including meals and usual habit reminders, but prioritize user's tasks. Here are the tasks: ${tasks.join(
    ", "
  )}`;

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: MODEL_NAME,
    config,
    contents,
  });

  let fullResponse = "";
  for await (const chunk of response) {
    fullResponse += chunk.text;
  }

  const match = fullResponse.match(/\{[\s\S]*\}/);
  if (match) {
    fullResponse = match[0];
  }

  console.log("Res: ", fullResponse);

  return fullResponse;
}

export default runScheduler;
