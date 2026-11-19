/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * RESTful API 路由
 */
const Cheney_express = require('express');
const Cheney_router = Cheney_express.Router();

const { Cheney_classInfo } = require('../controllers/Cheney_classController');
const { Cheney_newsList } = require('../controllers/Cheney_newsController');
const { Cheney_galleryList } = require('../controllers/Cheney_galleryController');
const { Cheney_testDatabase } = require('../controllers/Cheney_databaseController');
const { Cheney_pool } = require('../config/Cheney_db');

Cheney_router.get('/health', async (req, res) => {
    try {
        await Cheney_pool.query('SELECT 1');
        res.json({ code: 0, msg: 'service ok', data: { Cheney_service: 'running' } });
    } catch (Cheney_error) {
        res.json({ code: 5000, msg: 'database unavailable', data: null });
    }
});

Cheney_router.get('/class', Cheney_classInfo);
Cheney_router.get('/news', Cheney_newsList);
Cheney_router.get('/gallery', Cheney_galleryList);
Cheney_router.post('/database/test', Cheney_testDatabase);

module.exports = Cheney_router;
