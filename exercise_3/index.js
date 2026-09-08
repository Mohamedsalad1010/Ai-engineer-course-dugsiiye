import OPENAI from 'openai'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config()

const openai = new OPENAI({
    apiKey: process.env.OPEN_AI_KEY
})


// create text to voice function
const speakers = [
  {
    name: "Alex",
    voice: "coral",
    instructions:
      "Speak with excitement and high energy. Sound happy and enthusiastic.",
    text: "Hey Sarah! Did you hear the news? We finally finished the project!",
  },

  {
    name: "Sarah",
    voice: "sage",
    instructions:
      "Speak calmly and warmly. Sound thoughtful, supportive, and friendly.",
    text: "Really? That's wonderful. I knew you could do it!",
  },

  {
    name: "Mike",
    voice: "ash",
    instructions:
      "Speak with surprise and a little nervousness. Sound shocked but natural.",
    text: "Wait... you finished it already? I thought we still had another week!",
  },
];

async function generateVoice() {
  
 for (const speaker of speakers) {
    const mp3Voice = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: speaker.voice,
      input: speaker.text,
      instructions: speaker.instructions,
    });

    // create file to save voice
    const audioDir = 'audio'
    if(!fs.existsSync(audioDir)){
        fs.mkdirSync(audioDir)
    }

    // save file path name
    const filePath = path.join(
audioDir , `${speaker.name.toLowerCase()}.mp3`)
const buffer = Buffer.from( await mp3Voice.arrayBuffer())
fs.writeFileSync(filePath , buffer)

console.log("saved voices ");
}
}

generateVoice(speakers)

