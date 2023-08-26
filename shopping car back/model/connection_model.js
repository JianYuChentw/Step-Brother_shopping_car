const mysql = require('mysql2/promise');

// 資料庫連線資料
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'pass123456',
  database: 'e-commerce-website',
});
// 資料庫連線資料線上部署用
// const connection = mysql.createPool({
//   host: process.env.MYSQL_HOS || '127.0.0.1',
//   user: process.env.MYSQL_USERNAME || root,
//   port: process.env.MYSQL_PORT || 3306,
//   password: process.env.MYSQL_PASSWORD || 'pass123456',
//   database: process.env.DATABASENAME || 'e-commerce-website',
// });

// 測試資料庫連線
async function test_connection() {
  try {
    // 獲取資料庫連線
    const conn = await connection.getConnection();
    // 釋放資料庫連線
    conn.release();
    console.log('成功連線到資料庫');
  } catch (error) {
    console.error('無法連線到資料庫:', error);
  }
}

module.exports = {
  connection,
};
