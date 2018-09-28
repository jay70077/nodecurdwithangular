var express=require('express');
var http=require('http');
var bodyparser=require('body-parser');
var session=required('express-session');
var cookies=require(cookies-parser);
var app=express();
//middle ware

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use("/js",express.static(__dirname+'/js'));
app.use("/css",express.static(__dirname+ '/css'));
app.set('view engine','ejs');


var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/databasetable');

var mongschema=mongoose.Schema({
  name:String;
  email:String;
  mobile:Number;


});

var mongmodel=mongoose.model('collectionname',mongschema);


app.get('/',function(req,res){
 res.render('index')

});

app.post('/added',function(req,res.next){
  var allrecord= new mongmodel({
   name:req.body.name;
   email:req.body.email;
   mobile:req.body.mobile;
  });

  allrecord.save(function(err,data){
   if(errr){
   	console.log(err)
   }else{
   	res.send('data added successfully');
   	consol.log(data);
   }

  })
 
});

app.get('/read',function(req,res){
   mongmodel.find(function(err,data){
   if(err){
   	consol.log(err);
   }else{
   	res.send(data);
   }

   });

});

app.delete('/read/:id',function(req,res){
 mongmodel.findOneAndRemove(req.params.id,function(err,data){
   if(err){
   	console.log('no data match');
   }else{
   	consol.log('datadelted successfully');
   }

 })

});

app.put('/read/:id',function(req,res){

mongmodel.findOneAndUpdate(req.params.id,function(err,data){
  if(err){
  	consol.log(err);
  }else{
  	body.name=req.body.name;
  	body.mobile=req.body.mobile;
  	body.email=req.body.email;
  }
  data.save(function(err,newdata){
  	if(err){
  		console.log(err);
  	}
  	else{
  		res.send(newdata);
  	}
  })

})

});

app.listen(3200,function(req,res){
	console.log('is server is ready?');
})


