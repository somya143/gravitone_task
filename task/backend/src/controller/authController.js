import { registerUser, loginUser } from "../services/authServices.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const { user, token } = await registerUser(name, email, password, role);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const { user, token } = await loginUser(email, password, role);
    res.status(200).json({
      success: true,
      message: `${role} logged in successfully`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
