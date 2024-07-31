import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const initializeGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
    console.log("Gemini init didn't work ");
  }
  return new GoogleGenerativeAI(apiKey);
  console.log("Gemi init worked work ");
};

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Initialize the model (Gemini-Pro)
    const genAI = initializeGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Start a chat session
    const chat = model.startChat({
      history: messages.slice(0, -1),
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    // Send the last message to the chat and get the response
    const result = await chat.sendMessage(
      messages[messages.length - 1].content
    );
    
    const text = result.response.text();
    // Return the response
    return NextResponse.json({ reply: text }, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
