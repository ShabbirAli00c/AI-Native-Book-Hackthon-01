'use server';

/**
 * @fileOverview AI-powered personalized book chapter generation.
 *
 * This file defines a Genkit flow that dynamically generates book chapters based on individual user profiles and preferences.
 *
 * @exports personalizedChapterGeneration - The function to generate personalized book chapters.
 * @exports PersonalizedChapterGenerationInput - The input type for the personalizedChapterGeneration function.
 * @exports PersonalizedChapterGenerationOutput - The return type for the personalizedChapterGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedChapterGenerationInputSchema = z.object({
  userReadingLevel: z.string().describe('The user reading level (e.g., beginner, intermediate, advanced).'),
  preferredLanguage: z.string().describe('The user preferred language (e.g., English, Urdu).'),
  topicInterest: z.string().describe('The user topic interest (e.g., AI, history, science).'),
  previousInteractions: z.string().describe('The history of the user interactions with the platform.'),
});
export type PersonalizedChapterGenerationInput = z.infer<typeof PersonalizedChapterGenerationInputSchema>;

const PersonalizedChapterGenerationOutputSchema = z.object({
  chapterContent: z.string().describe('The AI-generated chapter content tailored to the user preferences.'),
});
export type PersonalizedChapterGenerationOutput = z.infer<typeof PersonalizedChapterGenerationOutputSchema>;

export async function personalizedChapterGeneration(input: PersonalizedChapterGenerationInput): Promise<PersonalizedChapterGenerationOutput> {
  return personalizedChapterGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedChapterGenerationPrompt',
  input: {schema: PersonalizedChapterGenerationInputSchema},
  output: {schema: PersonalizedChapterGenerationOutputSchema},
  prompt: `You are an expert book chapter generator, skilled at creating content tailored to individual user profiles.

  Based on the user's profile, generate a book chapter that is adjusted for their reading level, language, topic interest and previous interactions.

  User Reading Level: {{{userReadingLevel}}}
  Preferred Language: {{{preferredLanguage}}}
  Topic Interest: {{{topicInterest}}}
  Previous Interactions: {{{previousInteractions}}}

  Ensure the content is consistent, accurate, and engaging.

  Output the chapter content in the specified language. Use appropriate examples and explanations.
  Do not include any introduction or conclusion sections. Just output the generated chapter content.
  The chapter content must be in markdown format.
  `,
});

const personalizedChapterGenerationFlow = ai.defineFlow(
  {
    name: 'personalizedChapterGenerationFlow',
    inputSchema: PersonalizedChapterGenerationInputSchema,
    outputSchema: PersonalizedChapterGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
