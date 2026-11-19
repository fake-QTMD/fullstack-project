/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 班级与学生成绩数据访问
 */
const { Cheney_pool } = require('../config/Cheney_db');

async function Cheney_getClassInfo() {
    const [Cheney_rows] = await Cheney_pool.query(
        'SELECT Cheney_id, Cheney_class_name, Cheney_teacher, Cheney_subject, Cheney_year FROM Cheney_class ORDER BY Cheney_id ASC LIMIT 1'
    );
    return Cheney_rows.length > 0 ? Cheney_rows[0] : null;
}

async function Cheney_getStudents() {
    const [Cheney_rows] = await Cheney_pool.query(
        'SELECT Cheney_id, Cheney_name, Cheney_no, Cheney_gender, Cheney_html, Cheney_css, Cheney_js FROM Cheney_student ORDER BY Cheney_id ASC'
    );
    return Cheney_rows;
}

module.exports = {
    Cheney_getClassInfo,
    Cheney_getStudents
};
