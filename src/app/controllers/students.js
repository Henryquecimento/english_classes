const Student = require("../models/Student");
const { grade, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Student.all((students) => {
      for (student of students) {
        student.education_level = grade(student.education_level);
      }

      return res.render("students/student", { students });
    });
  },
  create(req, res) {
    return res.render("students/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == 0) {
        return res.send("Please, fill all the fields!");
      }
    }

    Student.create(req.body, (student) => {
      return res.redirect(`/students/${student.id}`);
    });
  },
  show(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) return res.send("Student not found!");

      student.birth = date(student.birth).birthDay;
      student.education_level = grade(student.education_level);
      student.created_at = date(student.created_at).format;

      return res.render("students/show", { student });
    });
  },
  edit(req, res) {
    Student.find(req.params.id, (student) => {
      if (!student) return res.send("Student not found!");

      student.birth = date(student.birth).iso;

      return res.render("students/edit", { student });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == 0) {
        return res.send("Please, fill all the fields!");
      }
    }

    Student.update(req.body, () => {
      return res.redirect(`/students/${req.body.id}`);
    });
  },
  delete(req, res) {
    Student.delete(req.body.id, () => {
      return res.redirect("/students");
    });
  },
};
