const torrentRouter = require("express").Router();

const { isConnected } = require("../middleware/session");
const { indexFiles } = require("../utils/indexer");
const torrentClient = require("../utils/torrent");

torrentRouter.get("/", isConnected, async (req, res) => {
  try {
    const data = await torrentClient.getAllData();
    return res.json({ ok: true, torrents: data.torrents });
  } catch (err) {
    console.warn("torrent client timeout : " + new Date().toLocaleString("fr"));
  }

  res.json({ ok: false });
});

torrentRouter.post("/state", isConnected, async (req, res) => {
  const { state, id } = req.body;

  if (!state || !id) return res.sendStatus(404);

  try {
    if (state === "pause") {
      await torrentClient.pauseTorrent(id);
    } else {
      await torrentClient.resumeTorrent(id);
    }
  } catch (err) {
    console.warn("torrent client timeout : " + new Date().toLocaleString("fr"));
  }

  res.sendStatus(200);
});

torrentRouter.post("/upload", isConnected, async (req, res) => {
  const { magnet, name } = req.body;

  if (!magnet || !name) {
    return res.json({
      ok: false,
      message: "Name and Magnet must be specified",
    });
  }

  if (/[^a-zA-Z0-9\_\-\.]|\s/g.test(name)) {
    return res.json({
      ok: false,
      message: "Name must match this pattern [a-zA-Z0-9_-.]",
    });
  }

  try {
    let result = await torrentClient.addMagnet(magnet, {
      savepath: process.env.QBT_PATH,
      rename: name,
    });

    if (result) {
      return res.json({ ok: true, message: "Added torrent successfully" });
    }
  } catch (err) {
    console.warn("torrent client timeout : " + new Date().toLocaleString("fr"));
  }

  res.json({ ok: false, message: "Invalid magnet link format" });
});

torrentRouter.delete("/", isConnected, async (req, res) => {
  const { hash } = req.body;

  if (!hash) return res.sendStatus(404);

  try {
    await torrentClient.removeTorrent(hash, true);
    indexFiles();
    return res.sendStatus(200);
  } catch (err) {
    console.warn("torrent client timeout : " + new Date().toLocaleString("fr"));
  }

  res.sendStatus(404);
});

module.exports = torrentRouter;
