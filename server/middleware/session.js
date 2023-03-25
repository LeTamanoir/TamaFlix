const isConnected = (req, res, next) => {
  if (!req.session.user) {
    return res.json({
      connected: false,
      error: "not connected",
    });
  }

  next();
};

const isNotConnected = (req, res, next) => {
  if (req.session.user) {
    return res.json({
      connected: true,
      error: "already connected",
    });
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.json({
      connected: false,
      error: "not connected",
    });
  }

  if (req.session.user.role !== "admin") {
    return res.json({
      connected: true,
      error: "only for admin",
    });
  }

  next();
};

module.exports = { isConnected, isNotConnected, isAdmin };
