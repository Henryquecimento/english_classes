const Teacher = require("../models/Teacher");
const { date, grade } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  index(req, res) {
    return res.render("./teachers/teacher");
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

    const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth,
        education_level,
        class_modality,
        subjects,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `
    const values = [
      req.body.avatar_url,
      req.body.name,
      date(req.body.birth).iso,
      req.body.education_level,
      req.body.class_modality,
      req.body.subjects,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if (err) throw 'Database Error!';

      return res.redirect(`/teachers/${results.rows[0].id}`);
    })
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
