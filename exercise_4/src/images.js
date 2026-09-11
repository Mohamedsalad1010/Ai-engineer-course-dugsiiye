import Openai from "./openai.js";
import fs from "fs";


// generateHeaderImage dall-e-3
export async function generateHeaderImage(topic , outputPath) {
     const response = await Openai.images.generate({
        model: 'gpt-image-1',
        size: '1024x1024',
        prompt: `Create a professional header image
about:

${topic}

Style:

- modern
- clean
- professional
- high quality
- suitable for an article
- no text

`,
     })
     // get image url

const imageBase64 = response.data[0].b64_json
const imageBytes =  Buffer.from(  imageBase64 , 'base64')
fs.writeFileSync(outputPath , imageBytes)


}

// Generate Thumbnail
export async function generateThumbnailImage(
  topic,
  outputPath
) {

  const response =
    await Openai.images.generate({

      model: "gpt-image-1",

      prompt: `
Create an attractive thumbnail
about:

${topic}

Style:

- modern
- clean
- professional
- eye-catching
- suitable for social media
`,

      size: "1024x1024"
    });


  const imageBase64 =
    response.data[0].b64_json;


  const buffer =
    Buffer.from(
      imageBase64,
      "base64"
    );


  fs.writeFileSync(
    outputPath,
    buffer
  );

}
