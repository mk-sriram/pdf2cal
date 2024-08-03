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

    const genAI = initializeGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chatHistory = messages.length === 1 ? [] : messages.slice(0, -1);

    console.log("chat History Message", chatHistory);
    const lastMessage = messages[messages.length - 1].parts[0].text;
    console.log("last Message", lastMessage);

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1500,
      },
    });

    try {
      const result = await chat.sendMessage(lastMessage);
      const text = result.response.text();
      //console.log("Respnse test: ", text);
      // Return the response
      return NextResponse.json({ reply: text }, { status: 200 });

      // const result = await chat.sendMessageStream(lastMessage);
      // console.log(result);
      // // Set up Server-Sent Events (SSE)
      // const stream = new ReadableStream({
      //   async start(controller) {
      //     for await (const chunk of result.stream) {
      //       const chunkText = chunk.text();
      //       controller.enqueue(
      //         `data: ${JSON.stringify({ text: chunkText })}\n\n`
      //       );
      //     }
      //     controller.enqueue(`data: ${JSON.stringify({ done: true })}\n\n`);
      //     controller.close();
      //   },
      // });

      // return new Response(stream, {
      //   headers: {
      //     "Content-Type": "text/event-stream",
      //     "Cache-Control": "no-cache",
      //     Connection: "keep-alive",
      //   },
      // });
    } catch (err) {
      console.log("couldnt start chat, ", err);
    }
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
