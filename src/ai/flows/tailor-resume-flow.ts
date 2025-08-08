
'use server';

/**
 * @fileOverview An AI agent that tailors a resume to a specific job description.
 * 
 * - tailorResume - A function that handles the resume tailoring process.
 * - TailorResumeInput - The input type for the tailorResume function.
 * - TailorResumeOutput - The return type for the tailorResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { resumeData } from '@/lib/resume-data';
import { llama3x70b } from 'genkitx-groq';

const TailorResumeInputSchema = z.object({
  jobDescription: z.string().describe("The job description to tailor the resume to."),
});
export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

const TailorResumeOutputSchema = z.object({
  summary: z.string().describe("A rewritten summary section of the resume, tailored to the job description."),
  keyAchievements: z.array(z.object({
    company: z.string().describe("The company name for the experience."),
    role: z.string().describe("The exact role for the experience, as stated in the resume (e.g., 'Software Engineer Intern')."),
    tailoredAchievement: z.string().describe("A brief, bullet-point summary of the key achievement from this role, rewritten to be highly relevant to the job description."),
  })).describe("An array of key achievements from past experiences, rewritten as brief bullet points to highlight relevance to the job description."),
});
export type TailorResumeOutput = z.infer<typeof TailorResumeOutputSchema>;


const tailorResumePrompt = ai.definePrompt({
  name: 'tailorResumePrompt',
  input: { schema: TailorResumeInputSchema },
  output: { schema: TailorResumeOutputSchema },
  model: llama3x70b,
  prompt: `You are an expert career coach and resume writer. Your task is to tailor a candidate's resume to a specific job description. Your tone should be confident and professional.

**Crucially, you must only use the information present in the candidate's resume. Do not add skills, technologies, or outcomes that are not explicitly mentioned. Your task is to re-frame the existing facts to align with the job description, not to invent new ones.**

**Job Description to Target:**
\`\`\`
{{{jobDescription}}}
\`\`\`

**Candidate's Resume to Tailor (This is the source of truth):**
\`\`\`
${resumeData.fullResume}
\`\`\`

**Instructions:**
1.  **Rewrite the Summary:** Create a new, concise summary (2-3 sentences) that directly addresses the key requirements from the **Job Description to Target**. You must use information from the candidate's resume to back up your claims.
2.  **Rewrite Key Achievements:** For each of the most recent 2-3 work experiences, distill the key achievement into a single, powerful bullet point. This point must be brief and directly highlight how an accomplishment from the resume is relevant to the new job. Do not invent new experiences. **You must use the exact, full role title (e.g., "Software Engineer Intern" or "Technology Intern") from the provided resume. Do not shorten, alter, or generalize the role title.**

Your output must be a perfect JSON object, without any markdown formatting.
`,
});

const tailorResumeFlow = ai.defineFlow(
  {
    name: 'tailorResumeFlow',
    inputSchema: TailorResumeInputSchema,
    outputSchema: TailorResumeOutputSchema,
  },
  async (input) => {
    const { output } = await tailorResumePrompt(input);
    if (!output) {
      throw new Error("The AI failed to generate a tailored resume. Please try again.");
    }
    return output;
  }
);


export async function tailorResume(input: TailorResumeInput): Promise<TailorResumeOutput> {
  return await tailorResumeFlow(input);
}
