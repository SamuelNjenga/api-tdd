var express = require("express");
var router = express.Router();
var createError = require("http-errors");

const students = [{ id: 1, name: "Samuel Njenga", completed: false }];

router.get("/", function (req, res, next) {
  res.json(students);
});

router.get("/:id", function (req, res, next) {
  const foundStudent = students.find(
    (student) => student.id === Number(req.params.id)
  );

  if (!foundStudent) {
    return next(createError(404, "Not Found"));
  }

  res.json(foundStudent);
});

router.post("/", function (req, res, next) {
  const { body } = req;

  if (typeof body.name !== "string") {
    return next(createError(422, "Validation Error"));
  }

  const newStudent = {
    id: students.length + 1,
    name: body.name,
    completed: false,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

module.exports = router;
