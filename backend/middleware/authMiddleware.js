import jwt from "jsonwebtoken";

const protectMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "no token is provided",
    });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("this is the middleware error ", error);
    res.status(401).json({
      message: "invalid token",
    });
  }
};

export { protectMiddleware };
