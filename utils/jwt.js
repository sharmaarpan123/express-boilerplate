import jwt from "jsonwebtoken";

const jwtGen = (data) => {
  return jwt.sign({ data }, "shhhhh");
};

const verifyJwt = (token) => {
  try {
    return jwt.verify(token, "shhhhh");
  } catch (error) {
    console.log("error while verifying the token", error);
  }
};

const decodeToken = (token) => {
    try {
        return jwt.decode(token, "shhhhh");
      } catch (error) {
        console.log("error while decoding the token", error);
      } 
}

export { jwtGen , verifyJwt , decodeToken};
