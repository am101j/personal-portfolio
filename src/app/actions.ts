
'use server';

import { z } from 'zod';
import { tailorResume, TailorResumeOutput } from '@/ai/flows/tailor-resume-flow';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';
import { resumeData } from '@/lib/resume-data';

const resend = new Resend(process.env.RESEND_API_KEY);

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


const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export interface ContactActionState {
    error?: string;
    success?: boolean;
}

export async function sendContactEmailAction(
  prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  
  const validatedFields = contactFormSchema.safeParse({ name, email, message });

  if (!validatedFields.success) {
    // This is a progressive enhancement, client-side validation should catch this.
    return { error: 'Invalid form data.' };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set.');
    return { error: 'The server is not configured to send emails.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Must be a verified domain in Resend
      to: [resumeData.contact.email],
      subject: `New Message from ${name} via your Portfolio`,
      react: EmailTemplate({ name, email, message }),
      reply_to: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return { error: 'Failed to send message. Please try again later.' };
    }

    return { success: true };
  } catch (e: any) {
    console.error("Error sending email:", e);
    return { error: 'An unexpected error occurred.' };
  }
}
