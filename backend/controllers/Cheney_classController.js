/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 班级与学生成绩控制器
 */
const {
    Cheney_getClassInfo,
    Cheney_getStudents
} = require('../models/Cheney_classModel');

async function Cheney_classInfo(req, res) {
    try {
        const Cheney_classInfo = await Cheney_getClassInfo();
        const Cheney_students = await Cheney_getStudents();

        res.json({
            code: 0,
            msg: 'success',
            data: {
                Cheney_classInfo,
                Cheney_students
            }
        });
    } catch (Cheney_error) {
        console.error('[Cheney_classInfo]', Cheney_error);
        res.json({ code: 5001, msg: '班级数据读取失败', data: null });
    }
}

module.exports = { Cheney_classInfo };
