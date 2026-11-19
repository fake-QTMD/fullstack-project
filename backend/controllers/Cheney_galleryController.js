/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 图文列表控制器
 */
const { Cheney_getGallery } = require('../models/Cheney_galleryModel');

async function Cheney_galleryList(req, res) {
    try {
        const Cheney_gallery = await Cheney_getGallery();
        res.json({ code: 0, msg: 'success', data: Cheney_gallery });
    } catch (Cheney_error) {
        console.error('[Cheney_galleryList]', Cheney_error);
        res.json({ code: 5003, msg: '图文数据读取失败', data: null });
    }
}

module.exports = { Cheney_galleryList };
