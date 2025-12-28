"use client";

import { askQuestion } from "@/lib/actions";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Loader2, Send, User } from "lucide-react";
import { FormEvent, useRef, useState, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
const aiAvatar = PlaceHolderImages.find(p => p.id === 'ai-avatar');

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to get the viewport. This depends on the implementation of ScrollArea.
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = messages.map(m => ({ role: m.role, content: m.content}));
      const response = await askQuestion(chatHistory, input);
      
      if (response.answer) {
        const assistantMessage: Message = { role: "assistant", content: response.answer };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = { role: "assistant", content: "Sorry, I couldn't get a response. Please try again." };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = { role: "assistant", content: "An error occurred. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      <div className="flex-1 container mx-auto py-6 flex flex-col">
        <div className="text-center mb-6">
            <h1 className="text-4xl font-headline font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Ask me anything about Aetherium Books chapters.</p>
        </div>
        <ScrollArea className="flex-1 mb-4 p-4 border rounded-lg" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                     {aiAvatar && <AvatarImage src={aiAvatar.imageUrl} alt="AI Assistant" data-ai-hint={aiAvatar.imageHint} />}
                    <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-lg p-3 max-w-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                     {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User" data-ai-hint={userAvatar.imageHint} />}
                    <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8">
                       {aiAvatar && <AvatarImage src={aiAvatar.imageUrl} alt="AI Assistant" data-ai-hint={aiAvatar.imageHint} />}
                       <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 max-w-lg bg-muted flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="px-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
