import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// 1.connect openai
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// 2. image generate function

async function generateImage() {

  try {

  
    const theme = "cyberpunk cityscape";


   

    const enhancedPrompt = `
      ${theme},
      vivid neon colors,
      dramatic lighting,
      futuristic city,
      highly detailed
    `;


    console.log("Prompt:", enhancedPrompt);


  
    // GENERATE IMAGE
   

    const result = await openai.images.generate({

      model: "gpt-image-2",

      prompt: enhancedPrompt,

      size: "1024x1024"

    });


   
    // 3. CREATE IMAGES FOLDER
   

    if (!fs.existsSync("images")) {

      fs.mkdirSync("images");

    }


  
    // 4. GET IMAGE
   

    const imageBase64 =
      result.data[0].b64_json;


    // Convert Base64 to image bytes
    const imageBytes =
      Buffer.from(
        imageBase64,
        "base64"
      );


    // 5. save image
 

    const imageName =
      "outputimage.png";


    fs.writeFileSync(
      `images/${imageName}`,
      imageBytes
    );


    console.log(
      " Image saved!"
    );


   
    // 6. CREATE METADATA
   

    const metadata = {

      theme: theme,

      prompt: enhancedPrompt,

      model: "gpt-image-2",

      size: "1024x1024",

      style: "vivid",

      image: imageName,

      createdAt:
        new Date().toISOString(),

    };


    // 7. CREATE METADATA FOLDER
   

    if (!fs.existsSync("metadata")) {

      fs.mkdirSync("metadata");

    }


    // 8. SAVE METADATA
  

    fs.writeFileSync(

      "metadata/imageMedataData.json",

      JSON.stringify(
        metadata,
        null,
        2
      )

    );


    console.log(
      " Metadata saved!"
    );


  } catch (error) {

    console.log(
      " Error:",
      error.message
    );

  }

}


generateImage();