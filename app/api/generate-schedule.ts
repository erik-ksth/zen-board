import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig,
  SafetySetting,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro-001";
const API_KEY = process.env.NEXT_PUBLIC_GENAI_API_KEY as string;

async function runScheduler(tasks: string[]): Promise<string> {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig: GenerationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings: SafetySetting[] = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(
    `Please generate a productive day schedule for me, only for one day. I need the schedule in the exact format "HH:mm-HH:mm$task%" (24 hrs format). Do not include any additional information or descriptions—only the time and task in this EXACT format. You can add an emoji to each task name. Please schedule for the whole day including meals and usual habit reminders. Here are the tasks: ${tasks.join(
      ", "
    )}`
  );

  let response = result.response.text();

  const match = response.match(/\{[\s\S]*\}/);
  if (match) {
    response = match[0];
  }

  console.log("Res: ", response);

  return response;
}

export default runScheduler;
