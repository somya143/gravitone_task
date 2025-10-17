import authService from "../services/authServices.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.register(name, email, password, role);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    // set refresh token as HttpOnly cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // set to true if using HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
    console.log("err", err.message)
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    const newTokens = await authService.refreshAccessToken(refreshToken);
    res.json(newTokens);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
