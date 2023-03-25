require("dotenv").config();

const express = require("express");
const session = require("express-session");
const videoRouter = require("./routes/videos");
const sessionRouter = require("./routes/session");
const trackerRouter = require("./routes/tracker");
const path = require("path");
const torrentRouter = require("./routes/torrent");
const app = express();

const SqliteStore = require("better-sqlite3-session-store")(session);
const db = require("better-sqlite3")("../database/sessions.sqlite3");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    name: "session-id",
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET_PASSWORD,
    cookie: {
      maxAge: 1000 * 60 * 60 * 60,
      sameSite: true,
      secure: false,
    },
    store: new SqliteStore({
      client: db,
      expired: {
        clear: true,
        intervalMs: 900000, //ms = 15min
      },
    }),
  })
);
app.use("/api", sessionRouter);
app.use("/api/videos", videoRouter);
app.use("/api/torrent", torrentRouter);
app.use("/api/tracker", trackerRouter);

app.use(express.static(process.env.BUILD_PATH));
app.get("/*", (req, res) => {
  res.sendFile(path.join(process.env.BUILD_PATH, "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
