var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dlselrh24',
  database: 'o2'
});
conn.connect();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
//req객체에 body객체를 하위 객체로 추가시킨다.
app.use(bodyParser.urlencoded({
  extended: false
}));

app.locals.pretty = true;
//views들이 views_file디렉토리에 들어있다
app.set('views', './views_mysql');
//사용하는 engine은 jade엔진을 사용한다
app.set('view engine', 'jade');

//add상단에 보여지는 목록들
app.get('/topic/add', function(req, res) {
  var sql = 'SELECT id,title FROM topic';
  conn.query(sql, function(err, topics, fields) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('add', {
      topics: topics
    });
  });
});
//add.jade를 통해 db에 데이터 추가
app.post('/topic/add', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title,description,author) VALUES(?,?,?)';
  conn.query(sql, [title, description, author], function(err, results, fields) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      //redirect는 내가 설정한 주소로 보내버린다.
      res.redirect('/topic/'+results.insertId);
    }
  });
});

app.get(['/topic', '/topic/:id'], function(req, res) {
  var sql = 'SELECT id,title FROM topic';
  conn.query(sql, function(err, topics, fields) {
    var id = req.params.id;
    if (id) {
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, topic, fields) {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.render('view', {
            topics: topics,
            topic: topic[0]
          });
        }
      });
    } else {
      res.render('view', {
        topics: topics
      });
    }
  });
});



app.listen(3000, function() {
  console.log('Connected 3000port');
});
