const jwt = require("jsonwebtoken");
const { Members } = require("../models");
require('dotenv').config()


// 미들웨어 - 사용자인증 (sequelize 변경)
module.exports = (req, res, next) => {
    const {authorization}  = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
      res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
      return;
    }
  
    try {
      const { memberId }  = jwt.verify(authToken, process.env.SECRET_KEY);
      
      Members.findOne({
        where: {memberId: memberId}
      }).then((user) => {
        res.locals.user = user;
        next();
      });
    } catch (err) {
      res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    }
  };
  