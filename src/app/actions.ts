
'use server';

import { z } from 'zod';
import { tailorResume, TailorResumeOutput } from '@/ai/flows/tailor-resume-flow';

const tailorResumeSchema = z.object({
  jobDescription: z.string().min(100, "Job description must be at least 100 characters."),
});

export interface TailorResumeActionState {
    formData?: {
        jobDescription: string;
    },
    error?: string,
    tailoredResume?: TailorResumeOutput
}

export async function tailorResumeAction(
  prevState: TailorResumeActionState,
  formData: FormData,
): Promise<TailorResumeActionState> {
  const jobDescription = formData.get('jobDescription') as string;
  
  const validatedFields = tailorResumeSchema.safeParse({
    jobDescription: jobDescription,
  });

  if (!validatedFields.success) {
    return {
      formData: {
        jobDescription
      },
      error: validatedFields.error.flatten().fieldErrors.jobDescription?.[0]
    };
  }

  try {
    const tailoredResume = await tailorResume({ jobDescription });
    return { tailoredResume };
  } catch(e: any) {
     console.error("Error tailoring resume:", e);
     return {
        formData: {
          jobDescription
        },
        error: e.message || "An unknown error occurred."
     }
  }
}
