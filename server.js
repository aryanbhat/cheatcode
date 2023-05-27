const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const alert = require('alert');


app.use(session({
  secret:"cheatcode",
  saveUninitialized: true,
  resave: true
}))

app.use(flash());

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

    res.send("Passwords do not match");
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
    res.redirect('/login');
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
    res.send("User does not exist");
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