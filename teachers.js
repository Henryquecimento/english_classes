const fs = require('fs');
const data = require('./data.json');


//create
exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if(req.body[key] == "") {
            return res.send("Please, fill all the fields!");
        }
    };

    let {avatar_url, name, age, education_level, class_modality, subjects} = req.body;

    

    data.teachers.push(req.body);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send('Write the error!');
    
        return res.redirect('/teachers');
    })
}


