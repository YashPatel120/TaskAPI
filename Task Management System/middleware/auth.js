const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = (req, res, next) => {
  cookieParser()(req, res, () => {
    // Retrieve the token from the cookie
    const token = req.cookies.token || null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
      }

      // Store the decoded user information for use in subsequent middleware or routes
      req.user = decoded;
      next();
    });
  });
};
