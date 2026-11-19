/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * MySQL 连接池
 */
const Cheney_mysql = require('mysql2/promise');
const Cheney_path = require('path');
const Cheney_dotenv = require('dotenv');

Cheney_dotenv.config({ path: Cheney_path.join(__dirname, '..', '.env') });

const Cheney_pool = Cheney_mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cheney_fullstack',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

module.exports = { Cheney_pool };
