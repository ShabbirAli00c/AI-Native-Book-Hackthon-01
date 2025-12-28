'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically translating AI-generated book content into Urdu.
 *
 * - automaticUrduTranslation - A function that translates English text to Urdu.
 * - AutomaticUrduTranslationInput - The input type for the automaticUrduTranslation function.
 * - AutomaticUrduTranslationOutput - The return type for the automaticUrduTranslation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomaticUrduTranslationInputSchema = z.object({
  text: z.string().describe('The English text to translate to Urdu.'),
});
export type AutomaticUrduTranslationInput = z.infer<
  typeof AutomaticUrduTranslationInputSchema
>;

const AutomaticUrduTranslationOutputSchema = z.object({
  translatedText: z.string().describe('The Urdu translation of the input text.'),
});
export type AutomaticUrduTranslationOutput = z.infer<
  typeof AutomaticUrduTranslationOutputSchema
>;

export async function automaticUrduTranslation(
  input: AutomaticUrduTranslationInput
): Promise<AutomaticUrduTranslationOutput> {
  return automaticUrduTranslationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automaticUrduTranslationPrompt',
  input: {schema: AutomaticUrduTranslationInputSchema},
  output: {schema: AutomaticUrduTranslationOutputSchema},
  prompt: `You are a professional translator specializing in translating English text into Urdu, while preserving technical accuracy and maintaining professional terminology.  Return only the translated text.

English Text: {{{text}}}`,
});

const automaticUrduTranslationFlow = ai.defineFlow(
  {
    name: 'automaticUrduTranslationFlow',
    inputSchema: AutomaticUrduTranslationInputSchema,
    outputSchema: AutomaticUrduTranslationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
