import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, FileCode, Languages, Lock, User, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

const features = [
  {
    icon: <FileCode className="h-8 w-8 text-accent" />,
    title: "Spec-Driven Creation",
    description: "Define the structure and let our AI write the content, ensuring consistency and accuracy from a single source of truth.",
  },
  {
    icon: <User className="h-8 w-8 text-accent" />,
    title: "Personalized Content",
    description: "Each chapter is dynamically tailored to the user's reading level, interests, and preferred language for a unique experience.",
  },
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: "Built-in RAG Chatbot",
    description: "Get instant, context-aware answers. Our RAG-powered chatbot understands the book's content inside and out.",
  },
  {
    icon: <Languages className="h-8 w-8 text-accent" />,
    title: "Automatic Translation",
    description: "Content is automatically translated to languages like Urdu, maintaining technical accuracy and professional terminology.",
  },
  {
    icon: <Lock className="h-8 w-8 text-accent" />,
    title: "Secure Authentication",
    description: "Enterprise-grade user management ensures that personal reading data and preferences are always secure.",
  },
];

const architecture = [
  {
    icon: <Cpu className="h-8 w-8" />,
    title: "AI Models",
    description: "Utilizing state-of-the-art models like Gemini for content generation, translation, and reasoning.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    title: "Vector Search (RAG)",
    description: "A vector database powers our RAG system, enabling fast, accurate retrieval of information for the chatbot.",
  },
  {
    icon: <User className="h-8 w-8" />,
    title: "User Profiles",
    description: "Stores individual user preferences and interaction history to drive content personalization.",
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Auth Layer",
    description: "Secure, scalable authentication protects user data and manages access to platform features.",
  },
];


export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center text-primary-foreground">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            AI-Native Books: Written by Intelligence, Not Hands
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium tracking-wide">
            Spec-Driven | Personalized | Multilingual | Always Updated
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/chapters">Start Reading</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">The Future of Content is Here</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Aetherium Books redefines publishing with an AI-first approach from concept to delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col items-start p-6 bg-card border-2 border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-headline font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Built on a Modern AI Stack</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Our platform leverages an enterprise-grade, scalable architecture to deliver a seamless experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {architecture.map((item) => (
              <div key={item.title} className="text-center flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-background mb-4 shadow-md">
                  {item.icon}
                </div>
                <h3 className="text-lg font-headline font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
