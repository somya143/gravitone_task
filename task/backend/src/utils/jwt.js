import jwt from "jsonwebtoken";

export const generateToken = async(payload) => {
 return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
 });
};

export const verifyToken = async(token) => {
    return jwt.verify(token,process.env.JWT_SECRET)
}