/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 科技新闻控制器
 */
const { Cheney_getNews } = require('../models/Cheney_newsModel');

async function Cheney_newsList(req, res) {
    try {
        const Cheney_news = await Cheney_getNews();
        res.json({ code: 0, msg: 'success', data: Cheney_news });
    } catch (Cheney_error) {
        console.error('[Cheney_newsList]', Cheney_error);
        res.json({ code: 5002, msg: '新闻数据读取失败', data: null });
    }
}

module.exports = { Cheney_newsList };
