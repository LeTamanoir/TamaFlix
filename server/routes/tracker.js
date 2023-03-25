const trackerRouter = require("express").Router();

const { isConnected } = require("../middleware/session");
const { saveViews, getViews, deleteViews } = require("../utils/views");

trackerRouter.post("/", isConnected, (req, res) => {
  const { file, time, played } = req.body;
  const user = req.session.user;

  if (!file || typeof time === "undefined" || typeof played === "undefined") {
    return res.sendStatus(404);
  }

  saveViews(file, time, played, user.id);

  res.sendStatus(200);
});

trackerRouter.get("/", isConnected, (req, res) => {
  const user = req.session.user;

  const views = getViews(user.id);
  res.json(views);
});

trackerRouter.delete("/", isConnected, (req, res) => {
  const { file = "" } = req.body;
  const user = req.session.user;

  if (!file) return res.sendStatus(404);

  deleteViews(file, user.id);

  const views = getViews(user.id);
  res.json(views);
});

module.exports = trackerRouter;
