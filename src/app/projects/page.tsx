
'use client';

import { Header } from "@/components/header";
import { ProjectsSection } from "@/components/projects-section";
import { Footer } from "@/components/footer";
import dynamic from 'next/dynamic';

const DynamicParticleBackground = dynamic(
  () => import('@/components/particle-background').then(m => m.ParticleBackground),
  { ssr: false }
);

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8 relative">
        <DynamicParticleBackground />
        <div className="relative z-10">
            <ProjectsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
