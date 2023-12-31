// controllers/api/users.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');


module.exports = {
  create,
  login,
  checkToken,
  emailToId, // Added this line
  getUserNameById,
};

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}


async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    // The token is a string, but yes, we can
    // res.json a string
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

// New function for email to user ID conversion
async function emailToId(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error('User not found');
    res.json({ id: user._id });
  } catch (err) {
    res.status(400).json('Bad Request');
  }
}

async function getUserNameById(req, res) {
  const userId = req.params.id; // Get the user ID from the route parameter
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json({ name: user.name }); // Send the user's name in the response
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.log('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/*-- Helper Functions --*/
function createJWT(user) {
  return jwt.sign(
    // extra data for the payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
