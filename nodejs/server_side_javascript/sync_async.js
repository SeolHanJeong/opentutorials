const fs = require('fs');
console.log(1);
//readFileSync는 Synchronous 파일 출력 메소드, 즉 data.txt출력이 10분 걸리는 작업이면 10분뒤에 출력될 것이다.
var data = fs.readFileSync('data.txt', {encoding: 'utf-8'});
console.log(data);


//Async
console.log(2);
fs.readFile('data.txt',{encoding:'utf-8'},function(err,data){
  console.log(3);
  console.log(data);
});
console.log(4);
