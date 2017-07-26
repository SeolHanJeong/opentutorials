//설치한 oreintjs를 OrientDB객체에 담음
var OrientDB = require('orientjs');

//서버연결
var server = OrientDB({
  host:'localhost',
  port:'2480',
  username:'root',
  password:'dlselrh24'
});

//연결된 서버의 이름이 o2인 db를 사용
var db = server.use('o2');


var rec = db.record.get('#21:0')
   .then(
      function(record){
         console.log('Loaded Record:', record);
       }
   );
