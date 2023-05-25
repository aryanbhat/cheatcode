const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const alert = require('alert');


app.use(bodyParser.urlencoded({extended: true}));
const users = [];

app.get('/user',(req,res)=>{
  res.json(users);
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/static/index.html');
})

app.get('/signup',(req,res)=>{
  res.sendFile(__dirname + '/static/signup.html');
})

app.get('/login',(req,res)=>{
  res.sendFile(__dirname + '/static/login.html');
});

app.post('/signup',(req,res)=>{
  let username = req.body.username;
  let password = req.body.password;
  let check = req.body.check;
  let exists = false;
  for(let i = 0;i<users.length;i++){
    if(users[i].username == username){
      exists = true;
      break;
    }
  }
  if(check != password){
    res.send("passwords do not match");
  }
  else if(exists){
    res.send("User already exists");
  }
  else{
    let newUser = {
      username: username,
      password: password
    }
    users.push(newUser);
    res.sendStatus(200);
  }
});

app.post('/login',(req,res)=>{
  let username = req.body.username;
  let password = req.body.password;
  let exists = false;
  let check ;
  for(let i = 0;i<users.length;i++){
    if(users[i].username == username){
      exists = true;
      check = users[i].password;
      break;
    }
  }
  if(!exists){
    alert("user does not exist");
    res.redirect('/signup');
  }
  else if(check != password){
    res.send("Incorrect password");
  }
  else{
    res.redirect('/problems');
  }
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