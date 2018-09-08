var express = require("express");
var app = express();
var port = 3000;
var mongodb=require("mongodb")
var ejs=require("ejs")
var assert=require("assert")
var path=require("path")
var url="mongodb://localhost:27017/NodeMongoExpress"
var bodyParser=require("body-parser")


app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.resolve( __dirname,"public")))

app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')



app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname + '/boot.html'));
  res.render('boot');


});


app.get('/quizscore',(req,res)=>{
  res.render('layout',{
      body:'quizscore'
  })
})

app.get("/getData",(req,res)=>{
      var resultArray=[];
      mongodb.connect(url,function(err,db){
      assert.equal(null,err)
      console.log("inside getdata")
     // var cursor=db.collection('regform').find()
      var allProductsArray=db.collection('regform').find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
        db.close();
      });
     // cursor.forEach(function(doc,err)  {
     // assert.equal(null,err)
      //resultArray.push(doc)
      
                     // },
                      //  function(){
                       // db.close()
                       // console.log(allProductsArray)
                       // res.send(allProductsArray)
                        //res.render('index',{items:resultArray})
                        //res.render('index',allProductsArray)
                  //    }
                 //   );
         })
})

app.post("/addData", (req, res,next) => {
  var items={
    emailid:req.body.email,
    age:req.body.age
    
  }

  mongodb.connect(url,function(err,db){
            assert.equal(null,err)
            db.collection('regform').insertOne(items,function(err,result){
                    assert.equal(null,err)
                    console.log("Item inserted")
                    db.close()
            })
  })
  res.redirect("/") 
});
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});