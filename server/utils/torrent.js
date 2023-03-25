const { QBittorrent } = require("@ctrl/qbittorrent");

const client = new QBittorrent({
  baseUrl: process.env.QBT_URL,
  username: process.env.QBT_USER,
  password: process.env.QBT_PASS,
});

module.exports = client;
