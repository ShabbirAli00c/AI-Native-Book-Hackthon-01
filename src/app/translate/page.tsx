"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { translateToUrdu } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  text: z.string().min(10, "Text to translate must be at least 10 characters."),
});

type TranslateFormValues = z.infer<typeof formSchema>;

const defaultEnglishText = `AI-Native signifies content that is born from AI. At Aetherium Books, every chapter, sentence, and idea originates from a sophisticated AI model guided by a structured specification.

## Key Features
- **Scalability**: Updates propagate instantly.
- **Precision**: Fine-grained control over tone.

\`\`\`javascript
console.log("Hello, AI World!");
\`\`\``;

export default function TranslatePage() {
  const { toast } = useToast();
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const form = useForm<TranslateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: defaultEnglishText,
    },
  });

  const onSubmit = async (values: TranslateFormValues) => {
    setIsTranslating(true);
    setTranslatedText("");
    const result = await translateToUrdu(values);
    setIsTranslating(false);

    if (result.success && result.data) {
      toast({
        title: "Translation Complete",
        description: "The Urdu translation is displayed below.",
      });
      setTranslatedText(result.data.translatedText);
    } else {
      toast({
        variant: "destructive",
        title: "Translation Failed",
        description: result.error || "Could not translate the text. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">Automatic Urdu Translation</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Preserve technical accuracy and professional terminology with our AI-powered translation engine.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">English Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter English text here..."
                      className="min-h-[250px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel className="text-lg">Urdu Translation</FormLabel>
              <Card className="min-h-[250px] mt-2">
                <CardContent className="p-4">
                  {isTranslating ? (
                    <div className="flex items-center justify-center h-full min-h-[200px]">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : translatedText ? (
                    <div dir="rtl" lang="ur" className="prose dark:prose-dark max-w-none text-right font-['Noto_Nastaliq_Urdu'] text-xl" dangerouslySetInnerHTML={{ __html: translatedText.replace(/\n/g, '<br />') }} />
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[200px]">
                      <p className="text-muted-foreground">Translation will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="text-center">
            <Button type="submit" size="lg" disabled={isTranslating}>
              {isTranslating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Translate to Urdu
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
