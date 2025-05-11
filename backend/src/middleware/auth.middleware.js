const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Ensure JWT_SECRET is set
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Role-based authorization middleware
const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

const isSchoolAdmin = async (req, res, next) => {
  if (req.user.role !== 'school_admin') {
    return res.status(403).json({ message: 'School admin access required' });
  }
  next();
};

const isCoordinator = async (req, res, next) => {
  if (req.user.role !== 'coordinator') {
    return res.status(403).json({ message: 'Coordinator access required' });
  }
  next();
};

module.exports = {
  auth,
  isAdmin,
  isSchoolAdmin,
  isCoordinator
}; 