module.exports = {
    age: (timestamp) => {
        const today = new Date();
        const birthDate = new Date(timestamp);

        //2020 - 1999
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();


        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }
        
        return age;

    },

    date: (timestamp) => {
        const date = new Date(timestamp);
        
        //yyyy
        const year =  date.getUTCFullYear();

        //mm
        const month = date.getUTCMonth() + 1;

        //dd
        const day = date.getUTCDate();

        return `${year}-${month}-${day}`;
    }
    
}