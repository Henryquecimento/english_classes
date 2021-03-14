module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    //2020 - 1999
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },
  date(timestamp) {
    const date = new Date(timestamp);

    //yyyy
    const year = date.getUTCFullYear();

    //mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    //dd
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      year,
      month,
      day,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`,
    };
  },
  grade(education) {
    if (education.slice(-2) == "EF") {
      return education.replace("EF", "º Fundamental Grade");
    } else {
      return education.replace("EM", "º Medium Grade");
    }
  },
};
