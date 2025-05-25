// server.js
import express from 'express';
import courses from './course.js';
import { logger } from './logger.js';
import { validateQuery } from './validateQuery.js';
import { authenticate } from './auth.js';

const app = express();
const PORT = 3000;

// Global middleware
app.use(logger);
// app.use(authenticate); // Optional: apply auth to ALL routes

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', authenticate, validateQuery, (req, res) => {
  const { dept } = req.params;
  const { level, semester, instructor } = req.query;
  const min = req.min;
  const max = req.max;

  let filtered = courses.filter(course => course.department === dept);

  if (level) filtered = filtered.filter(course => course.level === level);
  if (min !== null) filtered = filtered.filter(course => course.credits >= min);
  if (max !== null) filtered = filtered.filter(course => course.credits <= max);
  if (semester) filtered = filtered.filter(course => course.semester.toLowerCase() === semester.toLowerCase());
  if (instructor) filtered = filtered.filter(course => course.instructor.toLowerCase().includes(instructor.toLowerCase()));

  res.json({
    results: filtered,
    meta: { total: filtered.length }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
