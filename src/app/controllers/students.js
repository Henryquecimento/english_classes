const Student = require("../models/Student");
const { grade, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 4;

    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {

        const pagination = {
          total: students[0] ? Math.ceil(students[0].total / limit) : 0,
          page,
        }

        for (student of students) {
          student.education_level = grade(student.education_level);
        }

        return res.render("students/student", { students, filter, pagination });
      },
    };

    Student.paginate(params);

  },
  create(req, res) {
    Student.teachersSelectOptions((options) => {
      return res.render("students/create", { teacherOptions: options });
    });
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

      Student.teachersSelectOptions((options) => {
        return res.render("students/edit", {
          student,
          teacherOptions: options,
        });
      });
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
