module.exports = function logger(req, res, next) {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
    // Example: send this to a file or external service
    console.log(log);
    next();
  };
  