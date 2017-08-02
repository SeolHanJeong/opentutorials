var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dlselrh24',
  database: 'o2'
});

conn.connect();

var sql = 'SELECT * FROM topic';
conn.query(sql, function(error, results, fields) {
  if (error) {
    console.log(err);
  } else {
    console.log('results', results);
    console.log('fields', fields);
  }
});
conn.end();
