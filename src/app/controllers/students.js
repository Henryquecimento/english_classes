const Student = require("../models/Student");
const { date, grade } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("./students/student");
  },
  create(req, res) {
    return res.render("students/create");
  },
  post(req, res) {
    return res.redirect("/students");
  },
  show(req, res) {
    return res.render("students/show");
  },
  edit(req, res) {
    return res.render("students/edit");
  },
  put(req, res) {
    return res.redirect(`/students`);
  },
  delete(req, res) {
    return res.redirect("/students");
  },
};
