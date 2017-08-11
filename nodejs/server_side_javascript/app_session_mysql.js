var express = require('express');
var session = require('express-session'); //메모리에 정보를 저장
//msysqkstore npm 설치 후 객체생성
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

//filestore방식과는 다르게 store의 mysql의 옵션에 기본적인 연걸 조건을 필수로 적어줘야한다. database는 3306port사용하고있다.
app.use(session({
  secret: 'dlselrh24',
  resave: false,
  saveUninitialized: true,
  store:new MySQLStore({
    host:'localhost',
    port: 3306,
    user:'root',
    password:'dlselrh24',
    database:'o2'
  })
}));

app.get('/count', function(req, res) {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('count : ' + req.session.count);
});

app.get('/auth/login', function(req, res) {
  var output = `
  <h1>Login</h1>
  <form action = '/auth/login' method = 'post'>
    <p>
      <input type = 'text' name = 'id' placeholder= 'username'>
    </p>
    <p>
      <input type = 'text' name = 'password' placeholder= 'password'>
    </p>
    <p>
      <input type = 'submit'>
    </p>
  </form>
  `;
  res.send(output);
});

app.get('/auth/logout',function(req,res){
  delete req.session.displayName;
  req.session.save(function(){
    res.redirect('/welcome');
  })
});

app.get('/welcome', function(req, res){
  if(req.session.displayName) {
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
    `);
  }
});

app.post('/auth/login', function(req, res) {
  var user = {
    username : 'seol',
    password : 'dlselrh24',
    displayName :'Seol'
  };
  var id = req.body.id;
  var pwd = req.body.password;
  if(id ==user.username && pwd==user.password){
    req.session.displayName = user.displayName;
    req.session.save(function(){
      res.redirect('/welcome');
    })
  } else {
    res.send('Who are you? <a href="/auth/login"> login</a>');
  }
});

app.listen(3000, function() {
  console.log('Connexted 3000port');
});
