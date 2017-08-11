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

//사용자들의 대한 정보는 전역변수로 설정해준다. 기본적으로 하나의 정보는 임의로 포함시킴
var users = [{
  username: 'seol',
  password: 'dlselrh24',
  displayName: 'Seol'
}];
//session옵션은 store값을 지정할 수 있다. store의 옵션으로 filestore를 주면 session값을 파일에 저장하도록 한다. 추가적으로 sessions directory가 생성된다.
app.use(session({
  secret: 'dlselrh24',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));

app.get('/auth/login', function(req, res) {
  var output = `
  <h1>Login</h1>
  <form action = '/auth/login' method = 'post'>
    <p>
      <input type = 'text' name = 'username' placeholder= 'username'>
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

app.get('/auth/logout', function(req, res) {
  delete req.session.displayName;
  res.redirect('/welcome');
});

app.get('/auth/register', function(req, res) {
  var output = `
    <h1>Register</h1>
    <form action='/auth/register' method = 'post'>
      <p>
        <input type = 'text' name = 'username' placeholder= 'username'>
      </p>
      <p>
        <input type = 'text' name = 'password' placeholder= 'password'>
      </p>
      <p>
        <input type = 'text' name = 'displayName' placeholder= 'displayName'>
      </p>
      <p>
        <input type = 'submit'>
      </p>
    </form>
  `;
  res.send(output);
});

app.post('/auth/register', function(req, res) {
  var user = {
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName
  };
  users.push(user);
  req.session.displayName= req.body.displayName;
  req.session.save(function(){
    res.redirect('/welcome');
  });
});

app.get('/welcome', function(req, res) {
  if (req.session.displayName) {
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
      </ul>
    `);
  }
});

app.post('/auth/login', function(req, res) {
  var id = req.body.username;
  var pwd = req.body.password;
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (id == user.username && pwd == user.password) {
      req.session.displayName = user.displayName;
      return req.session.save(function() {
        res.redirect('/welcome');
      });
    }
  }
  res.send('Who are you? <a href="/auth/login"> login</a>');
});

app.listen(3000, function() {
  console.log('Connexted 3000port');
});
