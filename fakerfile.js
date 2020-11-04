var faker = require('faker');
var fs = require('fs');

var dataArray = [];


for(var i = 0; i < 15; i++){
    var data = {};
    data.image = faker.image.avatar();
    data.name = faker.name.findName();
    data.phone = faker.phone.phoneNumber();
    data.email = faker.internet.email();
    data.job = faker.name.jobTitle();
    data.streetName = faker.address.streetName();
    data.city = faker.address.city();
    data.zipCode = faker.address.zipCode();
    dataArray.push(data);
}

fs.writeFile('data.json', JSON.stringify(dataArray), (err) =>{
    if(err){
    err += '404 page not found'; 
    console.log(err);  
    } 
    console.log('the json file has succesfully be generation');
})