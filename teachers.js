const fs = require('fs');
const data = require('./data.json');
const { age, date } = require('./utils.js');

//show
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
        created_at: new Intl.DateTimeFormat('en-GB').format(foundTeacher.created_at)
    }

    return res.render("teachers/show", { teacher });

}


//create
exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    };

    let {avatar_url, name, birth, education_level, class_modality, subjects} = req.body;
    
    birth = Date.parse(req.body.birth);
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

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


