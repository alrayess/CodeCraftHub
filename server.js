const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, "data", "courses.json");
const validStatuses = ["planned", "in-progress", "completed"];

function getCourses() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch (error) {
    return [];
  }
}

function saveCourses(courses) {
  fs.writeFileSync(dataFile, JSON.stringify(courses, null, 2));
}

// Home
app.get("/", (req, res) => {
  res.json({ message: "CodeCraftHub API is running" });
});

// READ ALL
app.get("/api/courses", (req, res) => {
  res.status(200).json({
    success: true,
    data: getCourses(),
  });
});

// READ ONE
app.get("/api/courses/:id", (req, res) => {
  const courses = getCourses();
  const course = courses.find(
    (course) => course.id === Number(req.params.id)
  );

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// CREATE
app.post("/api/courses", (req, res) => {
  const { name, description, target_date, status } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Course name is required",
    });
  }

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be planned, in-progress, or completed",
    });
  }

  const courses = getCourses();

  const newCourse = {
    id:
      courses.length > 0
        ? Math.max(...courses.map((course) => course.id)) + 1
        : 1,
    name: name.trim(),
    description: description || "",
    target_date: target_date || "",
    status: status || "planned",
  };

  courses.push(newCourse);
  saveCourses(courses);

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    data: newCourse,
  });
});

// UPDATE
app.put("/api/courses/:id", (req, res) => {
  const courses = getCourses();

  const index = courses.findIndex(
    (course) => course.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  const { name, description, target_date, status } = req.body;

  if (name !== undefined && !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Course name cannot be empty",
    });
  }

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be planned, in-progress, or completed",
    });
  }

  courses[index] = {
    ...courses[index],
    name: name !== undefined ? name.trim() : courses[index].name,
    description:
      description !== undefined
        ? description
        : courses[index].description,
    target_date:
      target_date !== undefined
        ? target_date
        : courses[index].target_date,
    status: status !== undefined ? status : courses[index].status,
  };

  saveCourses(courses);

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    data: courses[index],
  });
});

// DELETE
app.delete("/api/courses/:id", (req, res) => {
  const courses = getCourses();

  const index = courses.findIndex(
    (course) => course.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Course not found",
    });
  }

  const deletedCourse = courses.splice(index, 1)[0];
  saveCourses(courses);

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
    data: deletedCourse,
  });
});

app.listen(PORT, () => {
  console.log(`CodeCraftHub API running at http://localhost:${PORT}`);
});