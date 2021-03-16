const Teacher = require("../models/Teacher");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Teacher.all((teachers) => {
      return res.render("teachers/teacher", { teachers });
    });
  },
  create(req, res) {
    return res.render("teachers/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == 0) {
        return res.send("Please, fill all the fields!");
      }
    }

    Teacher.create(req.body, (teacher) => {
      return res.redirect(`/teachers/${teacher.id}`);
    });
  },
  show(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if (!teacher) return res.send("Teacher not found!");

      teacher.birth = age(teacher.birth);
      teacher.subjects = teacher.subjects.split(",");
      teacher.created_at = date(teacher.created_at).format;

      return res.render("teachers/show", { teacher });
    });
  },
  edit(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if (!teacher) return res.send("Teacher not found!");

      teacher.birth = date(teacher.birth).iso;

      return res.render("teachers/edit", { teacher });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == 0) {
        return res.send("Please, fill all the fields!");
      }
    }

    Teacher.update(req.body, () => {
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },
  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect("/teachers");
    });
  },
};
