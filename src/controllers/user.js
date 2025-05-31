const {registerUserSchema, loginUserSchema} = require("../validation/userValidation.js");
const {registerUser, loginUser} = require("../services/userService.js");

exports.registerUser = async(req, res) => {
  try {
  const { error, value } = registerUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await registerUser(value);

    res.status(201).json({ message: 'User registered successfully', data: user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || 'Internal Server Error' });
  }
};


exports.loginUser = async(req, res) => {
  try {
  const { error, value } = loginUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
   const { user, token } = await loginUser(value);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Internal server error'
    });
  }
};
    
