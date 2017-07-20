//express 모듈을 제어하기위해 express변수 생성
var express = require('express');

//express모듈은 함수이다.
var app = express();

//jade의 소스코드를 페이지에서 소스보기 했을 때 자동 정렬 해준다.
//--> jade express code pretty로 search
app.locals.pretty = true;

//jade 템플릿 엔진과 express를 연결하는 코드, 템플릿 쓰기 위한 어플리케이션 설정
app.set('view engine', 'jade');

//템플리트가 있는 디렉토리, views라는 이름이 관행
app.set('views', './views');

//정적인 파일이 위치할 폴더를 지정하는 기능 -->public라는 폴더를 지정함
app.use(express.static('public'));

//url을 직접 치고 들어오는 것은 get방식 접속, 다른 방식으로는 post방식이 있다.
app.get('/', function(req,res){
  res.send("Welcome to home");
});

//topic경로 추가, 쿼리스트링에 따라 새로운 페이지 보여주는 요청을 필요 --> req객체 사용
app.get('/topic',function(req,res){
  var topics = [
    'javascript is... ',
    'nodejs is ...',
    'express is ...'
  ];
});

//가져온 템플리트를 렌더링 해주기 위해 render() 함수 사용
app.get('/template',function(req,res){
  res.render('temp',{time:Date(), _title:'Jade연습입니다.'});
});

//출력되는 메시지는 html태그 사용 가능하다.
app.get('/login',function(req,res){
  res.send('<h1>login plsease</h1>');
});

//localhost:3000/seol로 접속할 시 입력한 문장과 public디렉토리의 seol.jpg이 화면에 보여짐
app.get('/seol',function(req,res){
  res.send('Hello Router,<img src ="/seol.jpg">');
});

for(var i =0 ; i<5;i++){
  var liner = liner + `<li>coding</li>`;
}
var time = Date();
app.get('/dynamic',function(req,res){
  var output = `
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
    <ul>
    ${liner}
      hello, Dynamic!
      </ul>
      ${time}
    </body>
  </html>
  `;
  res.send(output);
});

//listen메소드에 포트번호를 지정, listen이 성공되면 callback함수를 통해 conneted 3000port출력
app.listen(3000, function() {
  console.log('Conneted 3000port');
});
