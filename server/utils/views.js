const db = require("better-sqlite3")("../database/db.sqlite3");

const saveViews = (file, time, played, id) => {
  let views = JSON.parse(
    db.prepare("select `views` from `views` where `user` = ?").get(id).views
  );

  if (!views.find((v) => v.file === file)) {
    views.push({ file, played, time });
  } else {
    views = views.map((view) =>
      view.file === file ? { ...view, played, time } : view
    );
  }

  db.prepare(
    "update `views` set `views` = '" +
      JSON.stringify(views) +
      "' where `user` = ?"
  ).run(id);
};

const getViews = (id) => {
  let views = JSON.parse(
    db.prepare("select `views` from `views` where `user` = ?").get(id).views
  );

  return views;
};

const deleteViews = (file, id) => {
  let views = JSON.parse(
    db.prepare("select `views` from `views` where `user` = ?").get(id).views
  );

  views = views.filter((v) => v.file !== file);

  db.prepare(
    "update `views` set `views` = '" +
      JSON.stringify(views) +
      "' where `user` = ?"
  ).run(id);
};

module.exports = { saveViews, deleteViews, getViews };
