"use client";

import Message from "@/dto/Message";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { SendIcon, Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AiChatProps {
    welcomeMessage?: string;
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
}

export default function AiChat({ 
    welcomeMessage, 
    messages, 
    setMessages, 
    input, 
    setInput 
}: AiChatProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: input.trim()
        };

        // Add user message and a placeholder for assistant message
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        setError(null);

        // Create a placeholder for the assistant's message that will be updated by the stream
        const assistantMessageId = `assistant-${Date.now()}`;
        const assistantMessagePlaceholder: Message = {
            id: assistantMessageId, // Assign an ID to find and update it
            role: 'assistant',
            content: '' // Start with empty content
        };
        setMessages(prev => [...prev, assistantMessagePlaceholder]);

        try {            
            const response = await fetch('/api/gemini-ai-model', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: userMessage.content })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Failed to get response and parse error JSON.", details: response.statusText }));
                throw new Error(errorData.error || 'Failed to get response');
            }

            if (!response.body) {
                throw new Error("Response body is null");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const chunk = decoder.decode(value, { stream: true });
                accumulatedContent += chunk;
                setMessages(prevMessages => 
                    prevMessages.map(msg => 
                        msg.id === assistantMessageId 
                            ? { ...msg, content: accumulatedContent } 
                            : msg
                    )
                );
            }

        } catch (err: any) {
            setError(err.message || 'Failed to get response. Please try again.');
            console.error(err);
            setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {welcomeMessage && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{welcomeMessage}</ReactMarkdown>
                        </div>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div
                        key={message.id || index} // Use message.id if available, otherwise fallback to index
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {error && (
                    <div className="flex justify-center">
                        <div className="text-destructive text-sm">{error}</div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t bg-background p-2">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Stelle deine Frage zum CICD..."
                        className="flex-1 p-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                    />
                    <Button 
                        type="submit" 
                        size="icon"
                        variant="default"
                        disabled={isLoading || !input.trim()}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
                    </Button>
                </form>
            </div>
        </div>
    );
}