const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const user = new User({username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await user.comparePassword(password);

    if (passwordMatch) {
      const token = jwt.sign({ email: user.email }, '3addff626c1b0fbe03e41c93dd7e35037c272624fa90fbb00afbe0c83198abcc');
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
}

module.exports = { register, login };
