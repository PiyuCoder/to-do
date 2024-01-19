import jwt from "jsonwebtoken";

export const authenticator = async (req, res, next) => {
  try {
    const token = req.header("jwt") || req.query.jwt;

    if (token !== null) {
      const verifiedUser = await jwt.verify(token, process.env.SECRET_KEY);

      if (!verifiedUser) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized Access" });
      }

      req.user = verifiedUser; // Store the user in the request for future use

      return next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).send({ success: false, message: "Re-Login" });
    }
  } catch (error) {
    return res.status(400).send({ success: false, message: "Invalid Token" });
  }
};
