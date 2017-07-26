var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
//views들이 views_file디렉토리에 들어있다
app.set('views', './views_file');
//사용하는 engine은 jade엔진을 사용한다
app.set('view engine','jade');


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
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
    //id값이 있을 때
    fs.readFile('data/'+id,'utf8',function(err,data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('view',{topics:files, title:id, description:data});
    });
  } else{
    //id값이 없을 때
    res.render('view',{topics:files, title:'welcome',description:'Hellp,javascript'});
  }
  });
});

// 중복 제거로 인한 미사용
// app.get('/topic/:id',function(req,res){
//   var id = req.params.id;
//   fs.readdir('data',function(err,files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//       fs.readFile('data/'+id,'utf8',function(err,data){
//         if(err){
//           console.log(err);
//           res.status(500).send('Internal Server Error');
//         }
//         res.render('view',{topics:files, title:id, description:data});
//       });
//   });
// });


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
