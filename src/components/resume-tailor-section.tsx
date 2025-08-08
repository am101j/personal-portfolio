
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { tailorResumeAction, TailorResumeActionState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { TailoredResumeDisplay } from './tailored-resume-display';
import { Bot, Terminal } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Tailoring..." : "Tailor Resume"}
      {!pending && <Bot className="ml-2 h-4 w-4" />}
    </Button>
  );
}

interface ResumeTailorSectionProps {
  onSuccessfulTailor?: () => void;
}

export function ResumeTailorSection({ onSuccessfulTailor }: ResumeTailorSectionProps) {
  const initialState: TailorResumeActionState = {};
  const [state, dispatch] = useActionState(tailorResumeAction, initialState);

  useEffect(() => {
    if (state.tailoredResume && onSuccessfulTailor) {
      onSuccessfulTailor();
    }
  }, [state.tailoredResume, onSuccessfulTailor]);

  return (
    <section id="resume-tailor" className="py-8 md:py-12">
      <div className="container max-w-2xl mx-auto text-center">
         <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
              AI Resume Tailor
            </h2>
            <p className="text-muted-foreground md:text-base/relaxed">
              Paste a job description below. My AI agent will analyze it and tailor my resume to highlight the most relevant skills and experiences.
            </p>

            <form action={dispatch} className="space-y-4 text-left">
               <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-muted-foreground mb-2">
                    Job Description
                  </label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    placeholder="Paste the full job description here..."
                    className="min-h-[200px]"
                    defaultValue={state.formData?.jobDescription}
                    required
                  />
               </div>
              <SubmitButton />
            </form>

            <div className="mt-8 text-left">
                {state.error && (
                   <Alert variant="destructive">
                     <Terminal className="h-4 w-4" />
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>{state.error}</AlertDescription>
                   </Alert>
                )}
                {state.tailoredResume && <TailoredResumeDisplay tailoredResume={state.tailoredResume} />}
            </div>
        </div>
      </div>
    </section>
  );
}
