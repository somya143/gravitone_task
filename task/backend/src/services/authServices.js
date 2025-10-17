import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userDao from "../dao/authDao.js";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const register = async (name, email, password, role) => {
  const existingUser = await userDao.findUserByEmailAndRole(email);
  if (existingUser) throw new Error("Email already registered");

  const user = await userDao.createUser({ name, email, password, role });
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

const login = async (email, password) => {
  const user = await userDao.findUserByEmailAndRole(email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await userDao.findById(decoded.id);
    if (!user) throw new Error("User not found");

    const newAccessToken = generateAccessToken(user);
    return { accessToken: newAccessToken };
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
};

export default { register, login, refreshAccessToken };
