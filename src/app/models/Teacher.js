const db = require("../../config/db");
const { date, grade } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(
      `
        SELECT * FROM teachers
      `,
      (err, results) => {
        if (err) throw `Database Error!${err}`;

        callback(results.rows);
      }
    );
  },
  create(data, callback) {
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
    `;

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.education_level,
      grade(data.class_modality),
      data.subjects,
      date(Date.now()).iso,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error!${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(` SELECT * FROM teachers WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },
};
