import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Authorization failed!,please login again",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        statusCode: 401,
        message: "Session expired, please login again.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid token, please login again.",
      });
    } else {
      next(error);
    }
  }
};

export default authMiddleware;
