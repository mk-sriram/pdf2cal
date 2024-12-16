export const maxDuration = 60;
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

interface Part {
  text: string;
}

interface MsgItem {
  role: string;
  content: string;
}

const client = new Cerebras({
  apiKey: process.env["CEREBRAS_API_KEY"], 
});

interface ChatChoice {
  finish_reason: string;
  index: number;
  message: {
    content?: string;
  };
}

interface ChatCompletion {
  id: string;
  choices: ChatChoice[];
}
export async function POST(request: NextRequest) {
  //console.log("API called");
  try {
    //console.log("API called");
    const { messages } = await request.json();

    //const chatHistory = messages.length === 1 ? [] : messages.slice(0, -1);

    //console.log("Message", messages);
    // const lastMessage = messages[messages.length - 1].parts[0].text;
    // console.log("last Message", lastMessage);

    const params: Cerebras.Chat.ChatCompletionCreateParams = {
      messages: messages,
      model: "llama3.1-8b", // Specify the Cerebras model
    };
    if (!messages || messages.length === 0) {
      throw new Error("The 'messages' array is undefined or empty.");
    }
    const chatCompletion = (await client.chat.completions.create(
      params
    )) as ChatCompletion;

    // Extract the assistant's response from the API result
    const reply = chatCompletion.choices?.[0]?.message?.content;

    //console.log("Chat Completion Response:", reply);

    if (!reply) {
      throw new Error("No content received from Cerebras API.");
    }

    // Return the response
    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
