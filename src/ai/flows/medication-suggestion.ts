'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting over-the-counter medications based on user-provided symptoms and language.
 *
 * - `suggestMedication` -  A function that takes user symptoms and a language, then returns a list of potential medications with dosages and side effects in that language.
 * - `MedicationSuggestionInput` - The input type for the `suggestMedication` function.
 * - `MedicationSuggestionOutput` - The return type for the `suggestMedication` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicationSuggestionInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the symptoms experienced by the user.'),
  language: z.enum(['en', 'hi', 'te']).describe("The language for the response (English, Hindi, or Telugu)."),
});
export type MedicationSuggestionInput = z.infer<typeof MedicationSuggestionInputSchema>;

const MedicationSuggestionOutputSchema = z.object({
  medications: z.array(
    z.object({
      name: z.string().describe('The generic name of the medication.'),
      brandName: z.string().describe('A popular brand name for the medication.'),
      dosage: z.string().describe('The recommended dosage of the medication.'),
      sideEffects: z.string().describe('Potential side effects of the medication.'),
    })
  ).describe('A list of suggested medications.'),
});
export type MedicationSuggestionOutput = z.infer<typeof MedicationSuggestionOutputSchema>;

export async function suggestMedication(input: MedicationSuggestionInput): Promise<MedicationSuggestionOutput> {
  return suggestMedicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicationSuggestionPrompt',
  input: {schema: MedicationSuggestionInputSchema},
  output: {schema: MedicationSuggestionOutputSchema},
  prompt: `You are a helpful AI assistant that provides suggestions for over-the-counter medications based on the symptoms described by the user.

  Provide the response in the language specified by the user's language code: {{{language}}}.
  The entire response, including medication names, brand names, dosages, and side effects, should be translated into that language.

  Provide a list of potential medications including the generic name, a popular brand name, the dosage, and potential side effects.

  Symptoms: {{{symptoms}}}

  Format your response as a JSON object with a "medications" field containing an array of medication objects. Each medication object should have "name", "brandName", "dosage", and "sideEffects" fields.
  `,
});

const suggestMedicationFlow = ai.defineFlow(
  {
    name: 'suggestMedicationFlow',
    inputSchema: MedicationSuggestionInputSchema,
    outputSchema: MedicationSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
