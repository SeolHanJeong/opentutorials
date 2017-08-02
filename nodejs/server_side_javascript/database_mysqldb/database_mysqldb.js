var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dlselrh24',
  database: 'o2'
});

conn.connect();

var sql = 'DELETE FROM topic WHERE id=?';
var params = ['7'];

conn.query(sql,params,function(error,results,fields){
  if(error){
    console.log(error);
  }
  else{
    console.log(results);
  }
});

// var sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
// var params = ['javascript','mincha','7'];
//
// conn.query(sql,params,function(error,results,fields){
//   if(error){
//     console.log(error);
//   }
//   else{
//     console.log(results);
//   }
// });

// var sql = 'INSERT INTO topic (title,description,author) VALUES(?,?,?)';
// var params = ['Supervisor','Watcher','graphitie'];
//
// conn.query(sql,params,function(error,results,fields){
//   if(error){
//     console.log(error);
//   }
//   else{
//     console.log(results.insertId);
//   }
// });

// var sql = 'SELECT * FROM topic';
// conn.query(sql, function(error, results, fields) {
//   if (error) {
//     console.log(err);
//   } else {
//     for(var i = 0; i<results.length; i++){
//       console.log(results[i].description);
//     }
//   }
// });
conn.end();
