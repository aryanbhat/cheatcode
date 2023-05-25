const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/static/index.html');
})

app.get('/signup',(req,res)=>{
  res.send("signup");
})

app.get('/login',(req,res)=>{
  res.send("login");
});

app.get('/problems',(req,res)=>{
  res.send("problems");
});

app.get('/submission',(req,res)=>{
  res.send("submission");
});

app.listen(port, ()=>{
  console.log("app running on port " + port);
})