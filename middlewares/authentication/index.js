require("./oauth");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const getGoogleProfile = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = passport.authenticate("google", { session: false });

const signJWT = (req, res) => {
  const user = req.user;
  // Generate a JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET);

  res.send({ token });
};
module.exports = {
  authenticateJWT,
  getGoogleProfile,
  googleCallback,
  signJWT,
};
