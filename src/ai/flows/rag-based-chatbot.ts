'use server';

/**
 * @fileOverview RAG-based chatbot flow for answering questions about AI-Native-Book chapters.
 *
 * - ragBasedChatbot - A function that handles the chatbot interaction.
 * - RAGBasedChatbotInput - The input type for the ragBasedChatbot function.
 * - RAGBasedChatbotOutput - The return type for the ragBasedChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RAGBasedChatbotInputSchema = z.object({
  query: z.string().describe('The user query about the book chapter.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The chat history between the user and the assistant.'),
  retrievedContext: z.string().optional().describe('Retrieved content from the vector DB.'),
});
export type RAGBasedChatbotInput = z.infer<typeof RAGBasedChatbotInputSchema>;

const RAGBasedChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type RAGBasedChatbotOutput = z.infer<typeof RAGBasedChatbotOutputSchema>;

export async function ragBasedChatbot(input: RAGBasedChatbotInput): Promise<RAGBasedChatbotOutput> {
  return ragBasedChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ragBasedChatbotPrompt',
  input: {schema: RAGBasedChatbotInputSchema},
  output: {schema: RAGBasedChatbotOutputSchema},
  prompt: `You are an AI assistant specialized in answering questions about AI-Native-Book chapters. Use the retrieved content to provide accurate answers and cite the source internally.

If no documents are found, fallback to your general AI knowledge.

Context from retrieved documents:
{{#if retrievedContext}}
{{{retrievedContext}}}
{{else}}
No relevant documents found.
{{/if}}

Chat History:
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}

User Query: {{{query}}}`, // Ensure this is triple-braced to prevent HTML escaping
});

const ragBasedChatbotFlow = ai.defineFlow(
  {
    name: 'ragBasedChatbotFlow',
    inputSchema: RAGBasedChatbotInputSchema,
    outputSchema: RAGBasedChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
