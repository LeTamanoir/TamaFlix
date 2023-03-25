const videoRouter = require("express").Router();

const { isConnected } = require("../middleware/session");
const { getVideos, getVideoHash } = require("../models/videos");
const { indexFiles } = require("../utils/indexer");
const path = require("path");
const fs = require("fs");

videoRouter.get("/", isConnected, (req, res) => {
  const videos = getVideos();

  res.json({ videos });
});

videoRouter.get("/index", isConnected, (req, res) => {
  indexFiles();

  res.sendStatus(200);
});

videoRouter.get("/video/:vid", isConnected, (req, res) => {
  const { vid } = req.params;

  if (!vid) {
    res.sendStatus(404);
  }
  const [vidExists, videoData] = getVideoHash(vid);

  if (vidExists) {
    let videoPath = path.join(process.env.VIDEO_PATH, `${videoData.path}.mp4`);

    if (fs.existsSync(videoPath)) {
      const fileSize = fs.statSync(videoPath).size;
      const requestRangeHeader = req.headers.range;

      if (!requestRangeHeader) {
        res.writeHead(200, {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        });
        fs.createReadStream(videoPath).pipe(res);
      } else {
        const parts = requestRangeHeader.replace(/bytes=/, "").split("-");

        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        const readStream = fs.createReadStream(videoPath, { start, end });

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4",
        });

        readStream.pipe(res);
      }
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = videoRouter;
