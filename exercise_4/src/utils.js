import fs from "fs";
import path from "path";


// Create output folder
export function createOutputFolder(topic) {

  const folderName = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");


  const folderPath = path.join(
    "output",
    folderName
  );


  fs.mkdirSync(folderPath, {
    recursive: true
  });


  return folderPath;
}


// Save a text file
export function saveTextFile(
  filePath,
  content
) {

  fs.writeFileSync(
    filePath,
    content,
    "utf8"
  );

}