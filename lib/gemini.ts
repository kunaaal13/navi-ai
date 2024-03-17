import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

const API_KEY = '';

const ai = new GoogleGenerativeAI(API_KEY);

async function getAIResponse(request: string, messages: Message[]) {
  const model = ai.getGenerativeModel({ model: 'gemini-pro' });

  // get a response
  const result = await model.generateContent([request]);
  const response = result.response;
  const text = response.text();

  return text;
}

export default getAIResponse;
