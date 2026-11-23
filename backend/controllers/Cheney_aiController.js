/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-23 | 大模型：DeepSeek
 * SiliconFlow AI 聊天代理控制器
 */
const Cheney_API_URL = process.env.SILICONFLOW_API_URL || 'https://api.siliconflow.cn/v1/chat/completions';
const Cheney_MODEL = process.env.SILICONFLOW_MODEL || 'deepseek-ai/DeepSeek-V4-Flash';

function Cheney_cleanMessages(Cheney_messages) {
    if (!Array.isArray(Cheney_messages)) {
        return [];
    }

    return Cheney_messages
        .filter(function (Cheney_item) {
            return Cheney_item &&
                typeof Cheney_item.content === 'string' &&
                ['system', 'user', 'assistant'].indexOf(Cheney_item.role) !== -1;
        })
        .slice(-20)
        .map(function (Cheney_item) {
            return {
                role: Cheney_item.role,
                content: Cheney_item.content.slice(0, 4000)
            };
        });
}

async function Cheney_aiChat(req, res) {
    const Cheney_apiKey = (process.env.SILICONFLOW_API_KEY || '').trim();
    const Cheney_messages = Cheney_cleanMessages(req.body.Cheney_messages);

    if (!Cheney_apiKey) {
        return res.json({
            code: 6001,
            msg: '未配置 SILICONFLOW_API_KEY，请在 backend/.env 中填写',
            data: null
        });
    }

    if (Cheney_messages.length === 0) {
        return res.json({ code: 6002, msg: '消息不能为空', data: null });
    }

    try {
        const Cheney_requestBody = {
            model: Cheney_MODEL,
            messages: Cheney_messages,
            stream: false,
            max_tokens: 1024,
            temperature: 0.7
        };

        console.log('[Cheney_ai] 发送给大模型:', JSON.stringify(Cheney_requestBody));

        const Cheney_response = await fetch(Cheney_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cheney_apiKey
            },
            body: JSON.stringify(Cheney_requestBody)
        });

        const Cheney_result = await Cheney_response.json();

        if (!Cheney_response.ok) {
            console.error('[Cheney_ai] SiliconFlow 返回错误:', Cheney_result);
            return res.json({
                code: 6003,
                msg: '大模型请求失败：' + (Cheney_result.message || ('HTTP ' + Cheney_response.status)),
                data: null
            });
        }

        const Cheney_reply = Cheney_result.choices &&
            Cheney_result.choices[0] &&
            Cheney_result.choices[0].message
            ? Cheney_result.choices[0].message.content
            : '';

        console.log('[Cheney_ai] 从大模型接收:', JSON.stringify(Cheney_result));

        res.json({
            code: 0,
            msg: 'success',
            data: {
                Cheney_reply: Cheney_reply,
                Cheney_model: Cheney_result.model || Cheney_MODEL,
                Cheney_usage: Cheney_result.usage || null
            }
        });
    } catch (Cheney_error) {
        console.error('[Cheney_ai]', Cheney_error);
        res.json({ code: 6004, msg: '大模型请求异常：' + Cheney_error.message, data: null });
    }
}

module.exports = { Cheney_aiChat };
