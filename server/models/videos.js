const db = require("better-sqlite3")("../database/db.sqlite3");

const getVideos = () => {
  const videos = JSON.parse(
    db.prepare("select `tree` from `videos`").get().tree || "{}"
  );

  return videos;
};

const getVideoHash = (hash) => {
  const hashes = JSON.parse(
    db.prepare("select `hash` from `videos`").get().hash || "{}"
  );

  if (hashes.hasOwnProperty(hash)) {
    return [true, hashes[hash]];
  }

  return [false, {}];
};

module.exports = { getVideos, getVideoHash };
