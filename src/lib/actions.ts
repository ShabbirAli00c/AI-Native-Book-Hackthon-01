"use server";

import { z } from "zod";
import { ragBasedChatbot } from "@/ai/flows/rag-based-chatbot";
import type { RAGBasedChatbotInput } from "@/ai/flows/rag-based-chatbot";
import { automaticUrduTranslation } from "@/ai/flows/automatic-urdu-translation";
import type { AutomaticUrduTranslationInput } from "@/ai/flows/automatic-urdu-translation";
import { personalizedChapterGeneration } from "@/ai/flows/personalized-chapter-generation";
import type { PersonalizedChapterGenerationInput } from "@/ai/flows/personalized-chapter-generation";

// Helper for action responses
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// --- Contact Form Action ---

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  purpose: z.enum(["Support", "Feedback", "Research", "Partnership"]),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(
  values: z.infer<typeof contactFormSchema>
): Promise<ActionResponse<null>> {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data." };
  }

  // In a real app, you would process this data (e.g., send an email, save to DB)
  console.log("Contact form submitted:", validatedFields.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true };
}


// --- Auth Actions ---

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUpAction(
  values: z.infer<typeof signUpSchema>
): Promise<ActionResponse<null>> {
  const validatedFields = signUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid email or password." };
  }
  
  // Mock sign-up logic
  console.log("Signing up user:", validatedFields.data.email);
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate a case where the user might already exist
  if (validatedFields.data.email === "exists@example.com") {
      return { success: false, error: "An account with this email already exists." };
  }

  return { success: true };
}

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signInAction(
  values: z.infer<typeof signInSchema>
): Promise<ActionResponse<null>> {
  const validatedFields = signInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data." };
  }

  // Mock sign-in logic
  console.log("Signing in user:", validatedFields.data.email);
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (validatedFields.data.email !== "alo450843@gmail.com" || validatedFields.data.password !== "password123") {
      return { success: false, error: "Invalid credentials." };
  }

  return { success: true };
}

// --- Chatbot Action ---
export async function askQuestion(
  chatHistory: RAGBasedChatbotInput['chatHistory'],
  query: string
): Promise<{ answer: string | null }> {
    try {
        const response = await ragBasedChatbot({ chatHistory, query });
        return { answer: response.answer };
    } catch (e) {
        console.error("Chatbot action error:", e);
        return { answer: "Sorry, an error occurred while processing your request." };
    }
}

// --- Personalized Chapter Generation Action ---

const chapterGenerationSchema = z.object({
  userReadingLevel: z.string(),
  preferredLanguage: z.string(),
  topicInterest: z.string(),
  previousInteractions: z.string().optional(),
});

export async function generateChapter(
  values: z.infer<typeof chapterGenerationSchema>
): Promise<ActionResponse<{ chapterContent: string }>> {
  const validatedFields = chapterGenerationSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid chapter generation options." };
  }

  try {
    const response = await personalizedChapterGeneration(validatedFields.data as PersonalizedChapterGenerationInput);
    return { success: true, data: response };
  } catch (e) {
    console.error("Chapter generation action error:", e);
    return { success: false, error: "Failed to generate chapter." };
  }
}

// --- Urdu Translation Action ---

const translationSchema = z.object({
  text: z.string().min(1),
});

export async function translateToUrdu(
  values: z.infer<typeof translationSchema>
): Promise<ActionResponse<{ translatedText: string }>> {
  const validatedFields = translationSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid text for translation." };
  }
  
  try {
    const response = await automaticUrduTranslation(validatedFields.data as AutomaticUrduTranslationInput);
    return { success: true, data: response };
  } catch(e) {
    console.error("Translation action error:", e);
    return { success: false, error: "Failed to translate text." };
  }
}
