const fs = require('fs');
const data = require('../data.json');
const { date, grade } = require('../utils.js');

// index - Student
exports.index = (req, res) => {
    const students = [];

    //Crio um array students(vou chamar de 1), depois para cada student(2) de data.students
    //eu vou enviar para dento do array students(1 - que está vazio) os dados de cada student(2 - com todas as informações)
    // e também com o tratamento do education_level

    for (student of data.students) {
        students.push({
            ...student,
            education_level: grade(student.education_level)
        })
    }

    return res.render('./students/student', { students });
}

// create
exports.create = (req, res) => {
    return res.render('students/create');
}

// put - create
exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    };
    
    birth = Date.parse(req.body.birth);
    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if(lastStudent) {
        id = lastStudent.id + 1;
    }

    data.students.push({
        ...req.body,
        id, 
        birth
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Write the error!');
    
        return res.redirect('/students');
    })
}

// show
exports.show = (req, res) => {
    const { id } = req.params;

    const foundStudent = data.students.find((student) => {
        return student.id == id;
    });

    if(!foundStudent) {
        return res.send("Student not found!");
    };

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        education_level: grade(foundStudent.education_level)
    }

    return res.render("students/show", { student });

}

// edit
exports.edit = (req, res) => {
    const { id } = req.params;

    const foundStudent = data.students.find((student) => {
        return student.id == id;
    });

    if (!foundStudent) {
        return res.send('Student not found!');
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render("students/edit", { student });

}

// put - modification
exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundStudent = data.students.find((student, foundIndex) => {
        if (id == student.id) {
            index = foundIndex;

            return true;
        }
    });

    if (!foundStudent) {
        return res.send('Student not found!');
    }

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Write error! -- line 110');

        return res.redirect(`/students/${id}`);
    });
}

// delete 
exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredStudents = data.students.filter(student => {
        return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Write error! -- line 127');

        return res.redirect('/students');
    });
}