import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Part {
  text: string;
}

interface MsgItem {
  role: string;
  parts: Part[];
}
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
  console.log("API called");
  try {
    console.log("API called");
    const { messages } = await request.json();
    console.log("Route received object ", messages);
    // Initialize the model (Gemini-Pro)
    const genAI = initializeGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("after gen AI init ");
    // Start a chat session

    const chatHistory = messages.length === 1 ? [] : messages.slice(0, -1);
    console.log("Chat History: ",
      chatHistory
    )
    // Start a chat session with the chat history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    console.log("after gen AI init ");
    // Send the last message to the chat and get the response
    const result = await chat.sendMessage(
      messages[messages.length - 1].parts[0].text
    );

    const text = result.response.text();
    console.log("Respnse test: ", text);
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
