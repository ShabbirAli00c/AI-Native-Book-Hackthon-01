import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, ShieldCheck, Telescope } from "lucide-react";

const techStack = [
  "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Genkit AI SDK", "Gemini", "Vector Database", "Server Actions"
];

const ethicalPrinciples = [
  "Accountability", "Transparency", "Fairness", "Privacy & Security", "Beneficence"
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">The Genesis of AI-Native Content</h1>
          <p className="mt-4 text-lg text-muted-foreground">Understanding the paradigm shift from human-written to intelligence-generated literature.</p>
        </header>

        <section>
          <h2 className="text-3xl font-headline font-semibold mb-4 border-b pb-2">What "AI-Native" Means</h2>
          <p className="text-lg leading-relaxed">
            AI-Native does not mean taking human-written text and running it through a translation or summarization tool. It signifies content that is <span className="font-semibold text-primary">born from AI</span>. At Aetherium Books, every chapter, sentence, and idea originates from a sophisticated AI model guided by a structured specification. The content is conceived and authored by intelligence, not merely converted or adapted by it. This is a fundamental shift, enabling a level of dynamism and personalization previously unimaginable.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-headline font-semibold mb-4 border-b pb-2">Why Spec-Driven Books Are Superior</h2>
          <p className="text-lg leading-relaxed mb-4">
            Traditional writing is a linear, manual, and often inconsistent process. A spec-driven approach transforms book creation into a deterministic, programmatic task.
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li><span className="font-semibold">Single Source of Truth:</span> The specification acts as the blueprint, ensuring all generated content is consistent and coherent.</li>
            <li><span className="font-semibold">Scalability & Speed:</span> Updates to the spec propagate across the entire book instantly, eliminating manual rewrites and enabling rapid iteration.</li>
            <li><span className="font-semibold">Precision & Control:</span> We replace the ambiguity of manual writing with the precision of code, allowing for fine-grained control over tone, style, and complexity.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-headline font-semibold mb-4 border-b pb-2">Personalization and Accuracy</h2>
          <div className="space-y-4 text-lg">
            <p>
              Your interaction with an Aetherium Book is unique. By analyzing your reading level, topic interests, and past interactions, our AI generates chapters specifically for you. A beginner might receive foundational concepts with simple analogies, while an expert gets deep dives with complex examples—all from the same core specification.
            </p>
            <p>
              To ensure factual accuracy, we employ a Retrieval-Augmented Generation (RAG) system. Our AI doesn't just "remember"—it actively queries a curated vector database of knowledge to find relevant, verified information. This grounds the generated content in facts, dramatically reducing the risk of hallucination and ensuring our books are as trustworthy as they are intelligent.
            </p>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="flex-row items-center gap-4">
              <Telescope className="w-8 h-8 text-accent" />
              <CardTitle>Our Mission & Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong className="text-primary">Mission:</strong> To democratize knowledge by creating intelligent, personalized, and universally accessible literature through AI.</p>
              <p><strong className="text-primary">Vision:</strong> A world where every book is a living document, adapting to its reader and evolving with the pace of human discovery.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
              <Cpu className="w-8 h-8 text-accent" />
              <CardTitle>Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.map(tech => (
                  <span key={tech} className="bg-muted px-2 py-1 text-sm rounded-md">{tech}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <section>
          <Card>
            <CardHeader className="flex-row items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-accent" />
              <CardTitle>Ethical AI Principles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">We are committed to the responsible development and deployment of AI. Our work is guided by:</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {ethicalPrinciples.map(principle => (
                  <span key={principle} className="font-medium">{principle}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
