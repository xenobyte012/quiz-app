import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // basic validation

    if (!username || !email || !password) {
      return res.status(400).json({ message: "all field are important" });
    }

    // check if user exist already

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: " user already exists!!" });
    }

    // create user

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      role,
    });

    res.status(201).json({
      message: "User registered",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // checking if the user exists
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({
        message: "USer not found",
      });

    // compare password

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    res.status(200).json({
      message: "User Logged in",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Sever error",
    });
  }
};

const logoutuser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
export { registerUser, loginUser, logoutuser };
