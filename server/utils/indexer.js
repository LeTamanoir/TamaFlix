const fs = require("fs");
const path = require("path");
const db = require("better-sqlite3")("../database/db.sqlite3");
const { v4: uuidv4 } = require("uuid");

const videoPath = process.env.VIDEO_PATH;

const indexFiles = () => {
  const hashedFiles = Object.assign(
    {},
    ...Object.entries(
      JSON.parse(db.prepare("select `hash` from `videos`").get().hash || "{}")
    ).map(([a, b]) => ({ [b.path]: a }))
  );
  const hashFiles = {};

  const getAllFiles = (dirPath, arrFiles) => {
    const files = fs.readdirSync(dirPath);
    arrFiles = arrFiles || [];

    files.forEach((file) => {
      if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
        arrFiles.push({
          type: "folder",
          name: file,
          path: path.join(dirPath, file).replace(videoPath, ""),
          children: getAllFiles(path.join(dirPath, file), arrFiles[file]),
        });
      }

      if (file.endsWith(".mp4")) {
        let hash = uuidv4();

        let fileData = {
          type: "video",
          name: file.replace(".mp4", ""),
          path: path
            .join(dirPath, file)
            .replace(videoPath, "")
            .replace(".mp4", ""),
        };

        if (hashedFiles.hasOwnProperty(fileData.path)) {
          fileData.hash = hashedFiles[fileData.path];
        } else {
          fileData.hash = hash;
        }

        hashFiles[fileData.hash] = fileData;
        arrFiles.push(fileData);
      }
    });

    return arrFiles;
  };

  const structure = getAllFiles(videoPath);

  db.prepare("update `videos` set `tree` = ?, `hash` = ?").run(
    JSON.stringify(structure),
    JSON.stringify(hashFiles)
  );
};

module.exports = { indexFiles };
