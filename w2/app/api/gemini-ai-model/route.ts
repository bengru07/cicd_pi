import { GoogleGenerativeAI } from "@google/generative-ai";
import { formatGeminiPrompt } from "./prompt";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash-latest"});

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const userQuery = data.text || "What is Suduxu?";
        console.log('Received query:', userQuery);

        const formattedPrompt = formatGeminiPrompt(userQuery);
        const result = await model.generateContentStream(formattedPrompt);

        // Create a ReadableStream to send back to the client
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text();
                        if (chunkText) {
                            // Encode the chunk text to Uint8Array and enqueue it
                            controller.enqueue(new TextEncoder().encode(chunkText));
                        }
                    }
                } catch (err: any) {
                    console.error('Error during stream generation:', err);
                    // Optionally, enqueue an error message or handle differently
                    controller.enqueue(new TextEncoder().encode(`Error: ${err.message}`))
                } finally {
                    controller.close();
                }
            },
            cancel() {
                console.log("Stream cancelled by client.");
                // Handle cancellation if necessary, e.g., clean up resources
            }
        });

        // Return the stream directly
        return new Response(stream, {
            headers: { "Content-Type": "text/plain; charset=utf-8" }, // Or application/octet-stream
        });

    } catch (error: any) {
        console.error('Gemini API Error (outside stream):', error);
        
        // Check for rate limit error
        if (error.message?.includes('429') || error.message?.includes('quota')) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Rate limit exceeded. Please try again later.",
                    details: error.message 
                }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({
                success: false,
                error: "Failed to generate content",
                details: error.message 
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}