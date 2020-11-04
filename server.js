
//variables which will require the node faker and fs modules.
var faker = require('faker');
var fs = require('fs');
var express = require('express');
var body_parser = require('body-parser')

//variable which will use the express module to carry out tasks
var app = express();
var path = require(path);

//create the path that will be used. 
app.use(body_parser.urlencoded({
    extended: false;
}));
app.use(body_parser.json());
app.use(express.static(path.join(_dirname,'/')));
//array which will contain the relevant information.
var dataArray = [];
//for loop which will run 15 times until all the necessary data has been generated. 
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
//will write the data which is stored within the dataArray to a json file called data.json. 
fs.writeFile('data.json', JSON.stringify(dataArray), (err) =>{
  //conditional statment which checkes for errors and if there is so alerts the user that it could not be located and if not then will tell them the file has successfully been generated.
    if(err){
    err += '404 page not found'; 
    console.log(err);  
    } 
    console.log('the json file has succesfully be generation');
})


//Update the json file with additional information
app.post('/postData', function(req, res){
    var key = req.body.key;
    var value = req.body.value;
    console.log('Key = ' + key + ', Value = '+ value);
    var newContact = {
        name: req.body.key,
        phone: req.body.value,
    };
    data.push(newContact);
    res.end('yes');
});

app.get('/getData', function(req, res){
    res.json(quotes);
    console.log(quotes);
    res.end('yes');
});

app.listen(1337);

//Delete data from the json file