const exp = require('express');
//const path = require('path');
const BodyParser = require('body-parser');

/*
    in line 08 User is located at User.js => line 12.
 */
const userObject = require('./User');

/*
    create object using express
    in line 13 exp() act like a constructor, and exp() is in line 01
 */
const app = exp();

/*
    create an array to store object at the runtime
 */
const userArr = [];

/*
    Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions,
    where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.
 */
app.use(BodyParser.json());

/*
    Create a server that listens on port 3000
 */
app.listen(3000,function () {
    console.log("Server listen on port: 3000")
})

/**
 *  POST - Method
 *  Add user to the array
 *  Date.now() is the ID of the object
 */
app.post('/add',function (req, res) {

    const user = new userObject(req.body.fName,req.body.lName,new Date(req.body.bDay),Date.now());

    userArr.push(user);
    res.status(200).send({message:"User added to the array", data :user});
});

/**
 * GET-Method
 * Get all the objects from the array
 */
app.get('/all', function (req, res) {
    try{
        res.status(200).send({data:userArr});
    }catch (e) {
        res.status(500).send({message:e});
    }
});

/**
 * GET-Method
 * Get user by ID
 */
app.get('/userbyid/:Id',function (req, res) {

    try{
        const index = userArr.findIndex(x => x.id == req.params.Id);
        if (index > -1){
            res.status(200).send(userArr[index]);
        } else{
            res.status(404).send({message: 'Invalid Id Provided'});
        }
    }catch (e) {
        res.status(500).send({message:e});
    }

});

/**
 * PUT-Method
 * Update user by ID
 */
app.put('/update/:Id',function (req, res) {

    const index = userArr.findIndex(instence => instence.id == req.params.Id);
    userArr[index].firstName = req.body.fName;
    userArr[index].lastName = req.body.lName;
    userArr[index].birthDay = req.body.bDay;

    res.status(200).send(userArr[index]);
});

// noinspection JSAnnotator
/**
 * DELETE-Method
 * Delete user
 */
app.delete('/user/:Id',function (req, res) {

    try{
        const index = userArr.findIndex(x => x.id == req.params.Id);
        if (index > -1){
            const delUser = userArr.splice(index,1);
            res.status(200).send({message:'User remove from the array',removedObject:delUser,data:userArr});
        } else{
            res.status(404).send({message: 'Invalid Id Provided'});
        }
    }catch (e) {
        res.status(500).send({message:e});
    }
});