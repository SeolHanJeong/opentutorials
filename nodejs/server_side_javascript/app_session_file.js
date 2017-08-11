var express = require('express');
var session = require('express-session'); //메모리에 정보를 저장
//session은 기본적으로 express-session에 의존하며 메모리에 저장되도록 한다
//session정보를 file에 저장시키기 위해서는 session-feile-store 모듈을 사용하며
//기본적으로 express-session에 의존한다는 것을 알려주기 위해 인자값으로 session을 준다
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

//session옵션은 store값을 지정할 수 있다. store의 옵션으로 filestore를 주면 session값을 파일에 저장하도록 한다. 추가적으로 sessions directory가 생성된다.
app.use(session({
  secret: 'dlselrh24',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
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
  res.redirect('/welcome');
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
    res.redirect('/welcome');
  } else {
    res.send('Who are you? <a href="/auth/login"> login</a>');
  }
});

app.listen(3000, function() {
  console.log('Connexted 3000port');
});
