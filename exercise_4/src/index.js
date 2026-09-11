import {
  generateArticle,
  generateSummary,
  generateSocialPost,
} from "./content.js";

import { createOutputFolder, saveTextFile } from "./utils.js";

import { generateHeaderImage, generateThumbnailImage } from "./images.js";

import { generateAudio } from "./audio.js";
import { createZip } from "./zipFile.js";


// start time to create article
const startTime = Date.now();

// Get topic from terminal
const topic = process.argv.slice(2).join(" ");

// Check topic
if (!topic) {
  console.log("Please provide a topic.");
  console.log('Example: npm start "Solar Energy"');
  process.exit(1);
}

// Create output folder
const outputFolder = createOutputFolder(topic);

console.log(`\nTopic: ${topic}`);

// 1. Generate Article

console.log("\n1. Generating article...");

let article = "";

let articleUsage = null;


try {
 const articleResult =
  await generateArticle(topic);

article = articleResult.text;

articleUsage = articleResult.usage;

  saveTextFile(`${outputFolder}/article.md`, article);

  console.log("Article saved.");
} catch (error) {
  console.log("Article failed:");
  console.log(error.message);
}

// 2. Generate Summary

console.log("\n2. Generating summary...");

try {
  const summary = await generateSummary(article);

  saveTextFile(`${outputFolder}/summary.txt`, summary);

  console.log("Summary saved.");
} catch (error) {
  console.log("Summary failed:");
  console.log(error.message);
}

// 3. Generate Social Post

console.log("\n3. Generating social post...");

try {
  const socialPost = await generateSocialPost(article);

  saveTextFile(`${outputFolder}/social-post.txt`, socialPost);

  console.log("Social post saved.");
} catch (error) {
  console.log("Social post failed:");
  console.log(error.message);
}

// 4. Generate Header Image

console.log("\n4. Generating header image...");

try {
  await generateHeaderImage(topic, `${outputFolder}/header.png`);

  console.log("Header image saved.");
} catch (error) {
  console.log("Header image failed:");
  console.log(error.message);
}

// 5. Generate Thumbnail

console.log("\n5. Generating thumbnail...");

try {
  await generateThumbnailImage(topic, `${outputFolder}/thumbnail.png`);

  console.log("Thumbnail image saved.");
} catch (error) {
  console.log("Thumbnail failed:");
  console.log(error.message);
}

// 6. Generate Audio

console.log("\n6. Generating narration...");

try {
  await generateAudio(article, `${outputFolder}/narration.mp3`);

  console.log("Narration audio saved.");
} catch (error) {
  console.log("Narration failed:");
  console.log(error.message);
}

const endTime = Date.now();

const totalTime =
  endTime - startTime;

console.log(
  `Total time: ${totalTime} ms`
);


// create metadata 

// const metadata = {
//   topic: topic,
//   createdAt: Date.now().toLocaleString(),
//   performance: {
//     totalMilliseconds: totalTime
//   }
// }
const metadata = {
  topic,

  usage: {
    article: articleUsage
  },

  performance: {
    totalMilliseconds: totalTime
  },

  createdAt:
    new Date().toISOString()
};

// save metadata 
saveTextFile( `${outputFolder}/metadata.json`,  
  JSON.stringify(
    metadata,
    null,
    2
  ))

 
// 7. EXPORT ZIP

console.log("\n7. Creating content suite ZIP...");
const zipPath =
  `${outputFolder}.zip`;
try {
  
   await createZip( outputFolder , zipPath)
   console.log("zip file saved.");
} catch (error) {
  console.log("failed create zip file");
  console.log(error.message);
}



// COMPLETE

console.log(`\nFiles saved in: ${outputFolder}`);
