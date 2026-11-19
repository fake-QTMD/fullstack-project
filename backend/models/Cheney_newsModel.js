/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 科技新闻数据访问
 */
const { Cheney_pool } = require('../config/Cheney_db');

async function Cheney_getNews() {
    const [Cheney_rows] = await Cheney_pool.query(
        'SELECT Cheney_id, Cheney_title, Cheney_summary, Cheney_source, Cheney_publish_time, Cheney_url FROM Cheney_news ORDER BY Cheney_publish_time DESC, Cheney_id DESC'
    );
    return Cheney_rows;
}

module.exports = { Cheney_getNews };
