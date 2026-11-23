/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-23 | 大模型：DeepSeek
 * AI 聊天接口路由
 */
const Cheney_express = require('express');
const Cheney_router = Cheney_express.Router();
const { Cheney_aiChat } = require('../controllers/Cheney_aiController');

Cheney_router.post('/ai/chat', Cheney_aiChat);

module.exports = Cheney_router;
