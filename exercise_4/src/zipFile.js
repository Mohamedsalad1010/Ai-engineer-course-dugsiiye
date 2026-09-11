import fs from "fs";
import { ZipArchive } from "archiver";


// Create ZIP file
export function createZip(folderPath, zipPath) {

  return new Promise((resolve, reject) => {

    // 1. Create a stream that writes
    //    ZIP data into the ZIP file
    const output =
      fs.createWriteStream(zipPath);


    // 2. Create ZIP archive
    const archive =
      new ZipArchive({
        zlib: {
          level: 9
        }
      });


    // 3. ZIP file completely finished
    output.on("close", () => {

      console.log(
        "ZIP file created and saved."
      );

      // SUCCESS
      resolve();

    });


    // 4. Handle archive errors
    archive.on("error", (error) => {

      reject(error);

    });


    // 5. Connect archive → output file
    archive.pipe(output);


    // 6. Add folder contents
    archive.directory(
      folderPath,
      false
    );


    // 7. Finish the ZIP
    archive.finalize();

  });
}