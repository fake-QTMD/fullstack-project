/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 数据库连接测试控制器
 */
const Cheney_mysql = require('mysql2/promise');

async function Cheney_testDatabase(req, res) {
    const Cheney_user = req.body.Cheney_user || 'root';
    const Cheney_password = req.body.Cheney_password || '';

    let Cheney_connection = null;

    try {
        Cheney_connection = await Cheney_mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            port: Number(process.env.DB_PORT || 3306),
            user: Cheney_user,
            password: Cheney_password,
            connectTimeout: 5000
        });

        const [Cheney_rows] = await Cheney_connection.query('SELECT VERSION() AS Cheney_version');
        await Cheney_connection.end();

        res.json({
            code: 0,
            msg: '数据库连接成功',
            data: {
                Cheney_user: Cheney_user,
                Cheney_version: Cheney_rows[0].Cheney_version
            }
        });
    } catch (Cheney_error) {
        if (Cheney_connection) {
            try {
                await Cheney_connection.end();
            } catch (Cheney_closeError) {
                console.error('[Cheney_testDatabase close]', Cheney_closeError);
            }
        }

        console.error('[Cheney_testDatabase]', Cheney_error.message);
        res.json({
            code: 4001,
            msg: '数据库连接失败：' + Cheney_error.message,
            data: null
        });
    }
}

module.exports = { Cheney_testDatabase };
