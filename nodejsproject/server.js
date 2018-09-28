var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/recordtable');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));
// app.use("/views",express.static(__dirname + '/views'));


//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var personrecord = mongoose.Schema({
    bookname: String,
    description: String,
    available: String,
    email: String,
    mobile: Number,
    password: String,
    cpassword: String
});
var Person = mongoose.model("booklabnew", personrecord);

app.get('/', function(req, res) {

    res.render('index');
});
app.get('/head', function(req, res) {

    res.render('header');
});

app.get('/addcategory', function(req, res) {

    res.render('addcategory');
});

app.get('/viewcategory', function(req, res) {

    res.render('viewcategory');
});


app.post('/createdata', function(req, res) {

    //res.sendFile(__dirname + "/publicfile/thanks-you.html");
    var record = new Person({
        bookname: req.body.bookname,
        description: req.body.description,
        available: req.body.available,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword

    });
    record.save(function(error, doc) {
        if (doc) {
            console.log(doc);
            //res.send(JSON.stringify(doc));
            res.render('sucess');
        } else {
            console.log(error);
        }

    });


});


//login with node js
app.get("/readdata", function(req, res, next) {
    //var db = mongoose.connection;

    //var dtt=db.collection('recordcollections').find();
    Person.find(function(err, result) {
        if (err) return console.error(err);
        console.log(result);
        // res.sendFile(__dirname + "/publicfile/login.html");
        //res.send(JSON.stringify(result));
        res.json(result);
    });
});

//updatadate

app.get('/readdata/:id', function(req, res) {

    Person.findById(req.params.id, function(err, data) {
        if (err) {
            console.log(err);
        } else {

            console.log(data);
        }
        res.send(data);

    });

});

//update data

app.put('/readdata/:id', function(req, res) {

    Person.findById(req.params.id, function(err, data) {
        if (err) {
            console.log(err);
        } else {
             data.id=req.params.id;
            data.name = req.body.bookname;
            data.authorname = req.body.authorname;
        }
        data.save(function(err, newdata) {

            if (err) {
                console.log(err)

            } else {
                res.send(newdata);
            }
        })

    });

});

app.delete('/readdata/:id', function(req, res) {

    Person.findOneAndRemove(req.params.id, function(err,data) {
        if (err) {
            console.log(err);

        } else {
            res.send(data);
            console.log('id deleted');
        }

    });

});

//for no file in url
// app.get('*', function(req, res) {
//     res.send('Sorry, this is an invalid URL.');
// });


app.listen(8081, function(req, res) {

    console.log('node js environment is ready to use');
});
