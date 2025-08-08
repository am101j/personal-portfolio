
import {genkit} from 'genkit';
import { groq, llama3x70b } from 'genkitx-groq';

export const ai = genkit({
  plugins: [
    groq({ apiKey: process.env.GROQ_API_KEY || "no-key" })
  ],
  model: llama3x70b,
});
