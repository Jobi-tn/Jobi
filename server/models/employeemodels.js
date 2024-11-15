const connection = require('../database/index');


  const createEmployee=function (data){
    const query = 'INSERT INTO employees SET ?';
    const values = {
      pic: data.pic,
      skills: data.skills,
      experience: data.experience,
      age: data.age,
      education: data.education,
      location: data.location,
      phone_number: data.phone_number
    };
    return connection.query(query, values);
  }



  const createEmployer =function (data) {
    const query = 'INSERT INTO employers SET ?';
    const values = {
      owner: data.owner,
      location: data.location,
      phone_number: data.phone_number,
      description: data.description,
      field: data.field
    };
    return connection.query(query, values);
  }

  
  module.exports = { createEmployee, createEmployer }