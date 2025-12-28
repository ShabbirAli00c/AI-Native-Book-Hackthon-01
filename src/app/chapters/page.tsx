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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateChapter } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  userReadingLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  preferredLanguage: z.enum(["English", "Urdu"]),
  topicInterest: z.string().min(3, "Topic must be at least 3 characters."),
  previousInteractions: z.string().optional(),
});

type ChapterFormValues = z.infer<typeof formSchema>;

export default function ChaptersPage() {
  const { toast } = useToast();
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<ChapterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topicInterest: "The role of AI in modern science",
      previousInteractions: "User has previously read introductory chapters on machine learning.",
    },
  });

  const onSubmit = async (values: ChapterFormValues) => {
    setIsGenerating(true);
    setGeneratedContent("");
    const result = await generateChapter(values);
    setIsGenerating(false);

    if (result.success && result.data) {
      toast({
        title: "Chapter Generated",
        description: "Your personalized chapter is ready below.",
      });
      setGeneratedContent(result.data.chapterContent);
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error || "Could not generate the chapter. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Personalize Your Chapter</CardTitle>
              <CardDescription>
                Adjust the settings below to generate a chapter tailored to your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="topicInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic of Interest</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Quantum Computing" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userReadingLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reading Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a level" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl><SelectTrigger><SelectValue placeholder="Select a language" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Urdu">Urdu</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousInteractions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reading History (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Read about neural networks" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isGenerating}>
                    {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate Chapter
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-headline font-bold mb-4">Generated Chapter</h2>
          <Card className="min-h-[500px]">
            <CardContent className="p-6">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">AI is writing your chapter...</p>
                </div>
              ) : generatedContent ? (
                <div className="prose dark:prose-dark max-w-none" dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <p className="text-muted-foreground">Your personalized chapter will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
