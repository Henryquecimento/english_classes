const fs = require('fs');
const data = require('./data.json');
const Intl = require('intl');
const { age, date } = require('./utils.js');

// show
exports.show = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id;
    });

    if(!foundTeacher) {
        return res.send("Teacher not found!");
    };

    const teacher = {
        ...foundTeacher,
        birth: age(foundTeacher.birth),
        subjects: foundTeacher.subjects.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    return res.render("teachers/show", { teacher });

}

// create
exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    };

    let {avatar_url, name, birth, education_level, class_modality, subjects} = req.body;
    
    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number (data.teachers.length + 1);

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        education_level,
        class_modality,
        subjects,
        created_at
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Write the error!');
    
        return res.redirect('/teachers');
    })
}

// edit
exports.edit = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id;
    });

    if (!foundTeacher) {
        return res.send('Teacher not found!');
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render("teachers/edit", { teacher });

}

// put
exports.put = (req, res) => {
    const { id } = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex;

            return true;
        }
    });

    if (!foundTeacher) {
        return res.send('Teacher not found!');
    }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Write error! -- line 110');

        return res.redirect(`/teachers/${id}`);
    });
}

// delete 
exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredTeachers = data.teachers.filter(teacher => {
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Write error! -- line 127');

        return res.redirect('/teachers');
    });
}