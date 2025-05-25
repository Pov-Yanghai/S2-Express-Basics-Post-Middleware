// server.js
import express from 'express'; // fail because ('express') not correct 
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    // convert credit values to number 
    // let min = null;
    // let max = null;

    // if (minCredits) {
    //     min = Number(minCredits);
    // }

    // if (maxCredits) {
    //     max = Number(maxCredits);
    // }
    // can be used the same way as above
    const min = minCredits ? parseInt(minCredits) : null;
    const max = maxCredits ? parseInt(maxCredits) : null;

    // case: invalid credit range 
     if (min !== null && max !== null && min > max) {
    return res.status(400).json({ error: "minCredits cannot be greater than maxCredits" });
  }

  // Filter courses by department first
  let filtered = courses.filter(course => course.department === dept);

  // Apply additional filters only if provided
  if (level) {
    filtered = filtered.filter(course => course.level === level);
  }

  if (min !== null) {
    filtered = filtered.filter(course => course.credits >= min);
  }

  if (max !== null) {
    filtered = filtered.filter(course => course.credits <= max);
  }

  if (semester) {
    filtered = filtered.filter(course => course.semester.toLowerCase() === semester.toLowerCase());
  }

  if (instructor) {
    filtered = filtered.filter(course =>
      course.instructor.toLowerCase().includes(instructor.toLowerCase())
    );
  }

  // case: no matching courses
  if (filtered.length === 0) {
    return res.json({
      results: [],
      meta: { total: 0 }
    });
  }

  // Return matching results
  res.json({
    results: filtered,
    meta: { total: filtered.length }
  });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
