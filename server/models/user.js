const db = require("better-sqlite3")("../database/db.sqlite3");
const bcrypt = require("bcrypt");

const getUser = async (username, password) => {
  const user = db
    .prepare("select * from `users` where `username` = ?")
    .get(username);

  if (user) {
    try {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return [true, user];
      }
    } catch (err) {
      console.log(err);
    }
  }

  return [false, {}];
};

const getUsers = () => {
  const users = db
    .prepare("select `username`, `role`, `id` from `users`")
    .all();

  return users;
};

const getUserPrivate = (id) => {
  const user = db.prepare("select * from `users` where `id` = ?").get(id);

  return user;
};

const deleteUser = (id) => {
  const userTest = getUserPrivate(id);

  if (userTest.role !== "admin") {
    db.prepare("delete from `users` where `id` = ?").run(id);
    db.prepare("delete from `views` where `user` = ?").run(id);
    return true;
  } else {
    return false;
  }
};

const addUser = async (username, password) => {
  const check = db
    .prepare("select `id` from `users` where `username` = ?")
    .get(username);

  if (check) {
    return {
      ok: false,
      error: "Username already exists",
    };
  }

  db.prepare(
    "insert into `users` ('username', 'password', 'role')" +
      "values (@username, @password, 'user')"
  ).run({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const user_ = db
    .prepare("select * from `users` where `username` = ?")
    .get(username);

  db.prepare(
    "insert into `views` ('finished', 'views', 'user') values (@finished, @views, @id)"
  ).run({
    finished: JSON.stringify([]),
    views: JSON.stringify([]),
    id: user_.id,
  });

  return { ok: true };
};

module.exports = { getUser, getUsers, deleteUser, addUser };
