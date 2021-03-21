const db = require("../../config/db");
const { date, grade } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(
      `
        SELECT * 
        FROM students
        ORDER BY name ASC
      `,
      (err, results) => {
        if (err) throw `Database Error!${err}`;

        callback(results.rows);
      }
    );
  },
  create(data, callback) {
    const query = `
      INSERT INTO students (
        avatar_url,
        name,
        email,
        birth,
        education_level,
        workload,
        created_at,
        teacher_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.education_level,
      data.workload,
      date(Date.now()).iso,
      data.teacher.id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error!${err}`;

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      ` 
      SELECT students.*, teachers.name AS teacher_name 
      FROM students 
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1`,
      [id],
      (err, results) => {
        if (err) throw `Database Error! ${err}`;

        callback(results.rows[0]);
      }
    );
  },
  findBy(filter, callback) {
    db.query(
      `
      SELECT students.*
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.name ILIKE '%${filter}%'
      OR students.email ILIKE '%${filter}%'
      GROUP BY students.id
      ORDER BY students.name
      `,
      (err, results) => {
        if (err) throw `Database Error!${err}`;

        callback(results.rows);
      }
    );
  },
  update(data, callback) {
    const query = `
    UPDATE students SET
      avatar_url=($1),
      name=($2),
      email=($3),
      birth=($4),
      education_level=($5),
      workload=($6),
      teacher_id=($7)
    WHERE id = $8
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.education_level,
      data.workload,
      data.teacher,
      data.id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
  delete(id, callback) {
    db.query(
      `
      DELETE FROM students WHERE id = $1`,
      [id],
      (err, results) => {
        if (err) throw `Database Error! ${err}`;

        return callback();
      }
    );
  },
  teachersSelectOptions(callback) {
    db.query(`SELECT name, id FROM teachers`, (err, results) => {
      if (err) throw `Database Error!${err}`;

      callback(results.rows);
    });
  },
};
