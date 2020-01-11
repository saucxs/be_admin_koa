const mysql = require('mysql');
const dbConfig = require('../../config/config');
const mysqlPool = mysql.createPool({
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
});

let querys = (sql: any, values: any) => {
  return new Promise(((resolve: any, reject: any) => {
    mysqlPool.getConnection(function (err: any, connection: any) {
      if(err){
        resolve(err);
      }else{
        connection.query(sql, values, (err: any, rows: any) => {
          if(err){
            reject(err)
          }else{
            resolve(rows);
          }
          connection.release();
        })
      }
    })
  }))
}

module.exports = {
  querys
}
