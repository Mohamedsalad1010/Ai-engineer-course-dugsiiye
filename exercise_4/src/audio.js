import Openai from "./openai.js";
import fs from "fs";

// generate audio
export async function  generateAudio (text , outputPath){
    const response = await Openai.audio.speech.create({
        model: 'gpt-4o-mini-tts',
        voice: 'nova',
        input: text,
        instructions:  "Speak clearly and naturally. " +
        "Use a warm, friendly, confident, " +
        "and engaging emotion."
    })

    // get voice and save it
    const buffer = Buffer.from(await response.arrayBuffer())
    fs.writeFileSync( outputPath , buffer)
}