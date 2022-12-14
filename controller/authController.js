const User = require('../model/User');
const Role = require('../model/Role');
const Token = require('../model/Token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret, jwtLifetime } = require('../config');
const logger = require('../logger');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  };
  return jwt.sign(payload, secret, { expiresIn: jwtLifetime });
};
class authController {
  async registration(req, res) {
    try {
      logger.info(req, { meta: 'registration' }); 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Reg error', errors });
      }
      const { username, email, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'Username has already used' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        username,
        email,
        password: hashPassword,
        roles: [userRole.value]
      });
      await user.save();
      return res.json({ message: 'Registration done' });
    } catch (e) {
      logger.error(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }
  async login(req, res) {
    try {    
      logger.info(req, { meta: 'registration' });  
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect Password' });
      }
      const accessToken = generateAccessToken(user._id, user.roles);      
      const refreshToken = jwt.sign({ id: user._id }, secret);
      const token = new Token({ token: refreshToken, userId: user._id });
      await token.save();
      return res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (e) {
      logger.error('text error');
      res.status(400).json({ message: 'Login error' });
    }
  }
}

module.exports = new authController();
