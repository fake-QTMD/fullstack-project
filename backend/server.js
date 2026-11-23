/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * Express 服务入口：端口 8325，托管 frontend 静态资源
 */
const Cheney_express = require('express');
const Cheney_cors = require('cors');
const Cheney_path = require('path');
const Cheney_dotenv = require('dotenv');

Cheney_dotenv.config({ path: Cheney_path.join(__dirname, '.env') });

const Cheney_apiRoutes = require('./routes/Cheney_apiRoutes');
const Cheney_aiRoutes = require('./routes/Cheney_aiRoutes');
const Cheney_app = Cheney_express();

Cheney_app.use(Cheney_cors());
Cheney_app.use(Cheney_express.json());
Cheney_app.use(Cheney_express.urlencoded({ extended: false }));

Cheney_app.use('/api', Cheney_apiRoutes);
Cheney_app.use('/api', Cheney_aiRoutes);
Cheney_app.use(Cheney_express.static(Cheney_path.join(__dirname, '..', 'frontend')));

Cheney_app.use((req, res) => {
    res.status(404).json({ code: 404, msg: '资源不存在', data: null });
});

Cheney_app.use((Cheney_error, req, res, next) => {
    console.error('[Cheney_server]', Cheney_error);
    res.status(500).json({ code: 500, msg: '服务器内部错误', data: null });
});

const Cheney_port = Number(process.env.PORT || 8325);
Cheney_app.listen(Cheney_port, () => {
    console.log('==========================================');
    console.log('前端开发24002班学习管理平台');
    console.log('作者：吴钊燊 24001010208');
    console.log('访问：http://localhost:' + Cheney_port);
    console.log('API ：http://localhost:' + Cheney_port + '/api/health');
    console.log('==========================================');
});
