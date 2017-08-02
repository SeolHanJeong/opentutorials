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
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
//views들이 views_file디렉토리에 들어있다
app.set('views', './views_mysql');
//사용하는 engine은 jade엔진을 사용한다
app.set('view engine','jade');

v
app.get('/topic/new',function(req,res){
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
      res.render('new',{topics:files});
  });
});

app.get(['/topic','/topic/:id'],function(req,res){
  var sql = 'SELECT id,title FROM topic';
  conn.query(sql,function(err,topics,fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql,[id],function(err,topic,fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else{
          res.render('view', {topics:topics, topic:topic[0]});
        }
      });
    }
    else{
      res.render('view', {topics:topics});
    }
  });
});

app.post('/topic',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  //writeFile(폴더/파일명, 파일내용, 에러여부)
  fs.writeFile('data/'+title,description,function(err){
     if(err){
       console.log(err);
       res.status(500).send('Internal Server Error');
     }
     //redirect는 내가 설정한 주소로 보내버린다.
     res.redirect('/topic/'+title);
  });
});


app.listen(3000,function(){
  console.log('Connected 3000port');
});
