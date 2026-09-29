import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

// send  request

 export async function POST(request:Request) {

    const {prompt} = await  request.json()

    const {text} = await  generateText({
        model:  openai('gpt-4o'),
        prompt
    })

    return Response.json({text})
    
}