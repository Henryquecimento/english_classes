const Teacher = require("../models/Teacher");
const { date, grade } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("./teachers/teacher");
  },
  create(req, res) {
    return res.render("teachers/create");
  },
  post(req, res) {
    return res.redirect("/teachers");
  },
  show(req, res) {
    return res.render("teachers/show");
  },
  edit(req, res) {
    return res.render("teachers/edit");
  },
  put(req, res) {
    return res.redirect(`/teachers`);
  },
  delete(req, res) {
    return res.redirect("/teachers");
  },
};
