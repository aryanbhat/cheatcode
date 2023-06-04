const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
let submissionID = 3;

let problems = [
  {
    id: 1,
    name: "Two Sum",
    desc: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    difficulty: "Easy",
    tags: ["Array","Hash Table"],
    example: "Given nums = [2, 7, 11, 15], target = 9, Because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1]."
  },
  {
    id: 2,
    name: "Add Two Numbers",
    desc: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit.",
    difficulty: "Medium",
    tags: ["Linked List","Math"],
    example: "Input: (2 -> 4 -> 3) + (5 -> 6 -> 4) Output: 7 -> 0 -> 8 Explanation: 342 + 465 = 807."
  },
  {
    id: 3,
    name: "Longest Substring Without Repeating Characters",
    desc: "Given a string, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    tags: ["Hash Table","Two Pointers","String"],
    example: "Input: 'abcabcbb' Output: 3 Explanation: The answer is 'abc', with the length of 3."
  }
]

let submissions = [
  {
    id: 1,
    solution: "class Solution { public int[] twoSum(int[] nums, int target) { for (int i = 0; i < nums.length; i++) { for (int j = i + 1; j < nums.length; j++) { if (nums[j] == target - nums[i]) { return new int[] { i, j }; } } } throw new IllegalArgumentException('No two sum solution'); } }",
    language: "Java",
    status: "Accepted"
  },
  {
    id: 2,
    problem: 1,
    solution: "class Solution { public int[] twoSum(int[] nums, int target) { for (int i = 0; i < nums.length; i++) { for (int j = i + 1; j < nums.length; j++) { if (nums[j] == target - nums[i]) { return new int[] { i, j }; } } } throw new IllegalArgumentException('No two sum solution'); } }",
    language: "C++",
    status: "Accepted"
  }
]


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
  res.json(problems);
});

app.get('/submission',(req,res)=>{
  res.sendFile(__dirname + '/static/submission.html');
});

app.post('/submission',(req,res)=>{
  let qid = req.body.qid;
  let code = req.body.code;
  let lang = req.body.lang;
  let newSubmission = {
    id: submissionID,
    problem: qid,
    solution: code,
    language: lang,
    status: "Pending"
  }
  submissions.push(newSubmission);
  res.redirect('/submissions');
}
);

app.get('/submissions',(req,res)=>{
  res.json(submissions);
})

app.listen(port, ()=>{
  console.log("app running on port " + port);
})