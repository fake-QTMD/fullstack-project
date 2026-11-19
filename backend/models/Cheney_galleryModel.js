/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 图文列表数据访问
 */
const { Cheney_pool } = require('../config/Cheney_db');

async function Cheney_getGallery() {
    const [Cheney_rows] = await Cheney_pool.query(
        'SELECT Cheney_id, Cheney_title, Cheney_image, Cheney_description, Cheney_category, Cheney_create_time FROM Cheney_gallery ORDER BY Cheney_id ASC'
    );
    return Cheney_rows;
}

module.exports = { Cheney_getGallery };
