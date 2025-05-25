// middleware/validateQuery.js
export function validateQuery(req, res, next) {
  const { minCredits, maxCredits } = req.query;

  const min = minCredits ? parseInt(minCredits) : null;
  const max = maxCredits ? parseInt(maxCredits) : null;

  // Check if min/max are valid numbers
  if ((minCredits && isNaN(min)) || (maxCredits && isNaN(max))) {
    return res.status(400).json({ error: "minCredits and maxCredits must be valid integers" });
  }

  // Check range validity
  if (min !== null && max !== null && min > max) {
    return res.status(400).json({ error: "minCredits cannot be greater than maxCredits" });
  }

  // Save parsed values to req for later use
  req.min = min;
  req.max = max;

  next();
}
