const sessionRouter = require("express").Router();

const {
  isConnected,
  isNotConnected,
  isAdmin,
} = require("../middleware/session");
const { getUser, getUsers, deleteUser, addUser } = require("../models/user");

sessionRouter.get("/session", (req, res) => {
  const session = req.session;

  if (session.user) res.json({ connected: true, user: session.user });
  else res.json({ connected: false });
});

sessionRouter.post("/login", isNotConnected, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      connected: false,
      error: "please complete all fields",
    });
  }

  const [check, user] = await getUser(username, password);

  if (check) {
    req.session.user = user;
    return res.json({ connected: true, user });
  }

  res.json({
    connected: false,
    error: "username or password invalid",
  });
});

sessionRouter.get("/logout", isConnected, (req, res) => {
  req.session.destroy(() => res.json({ connected: false }));
});

sessionRouter.get("/users", isConnected, (req, res) => {
  const users = getUsers();

  res.json({ users });
});

sessionRouter.delete("/users", isAdmin, (req, res) => {
  const { id } = req.body;

  if (!id) return res.sendStatus(404);

  const check = deleteUser(id);

  if (check) res.sendStatus(200);
  else res.sendStatus(403);
});

sessionRouter.post("/users", isAdmin, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ ok: false, error: "Please complete all fields" });
  }

  const check = await addUser(username, password);
  res.json(check);
});

module.exports = sessionRouter;
