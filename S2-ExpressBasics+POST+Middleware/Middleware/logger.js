// middleware/logger.js
export function logger(req, res, next) {
 
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} Query:`, req.query);
  next();
}
