const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");


function adminMiddelware(req, res, next) {
  const token = req.headers.token;
  const decodeData = jwt.verify(token, JWT_USER_SECRET);

  if (decodeData) {
    req.adminId = decodeData.id;
    next();
  } else {
    res.status(403).json({
      message: "your not login / token Invalid",
    });
  }
}

module.exports = {
  adminMiddelware: adminMiddelware,
};
