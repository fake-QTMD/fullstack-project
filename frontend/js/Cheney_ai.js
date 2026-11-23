/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-23 | 大模型：DeepSeek
 * AI 聊天页面逻辑：多轮上下文 + 控制台发送/接收日志
 */
(function () {
    var Cheney_chatMessages = document.getElementById('Cheney_chatMessages');
    var Cheney_chatEmpty = document.getElementById('Cheney_chatEmpty');
    var Cheney_chatInput = document.getElementById('Cheney_chatInput');
    var Cheney_chatStatus = document.getElementById('Cheney_chatStatus');
    var Cheney_sendButton = document.getElementById('Cheney_sendButton');
    var Cheney_clearButton = document.getElementById('Cheney_clearButton');
    var Cheney_contextCount = document.getElementById('Cheney_contextCount');
    var Cheney_modelLabel = document.getElementById('Cheney_modelLabel');
    var Cheney_messages = [];
    var Cheney_isSending = false;

    function Cheney_setStatus(Cheney_text, Cheney_type) {
        Cheney_chatStatus.textContent = Cheney_text;
        Cheney_chatStatus.className = 'Cheney_chat-status';

        if (Cheney_type === 'error') {
            Cheney_chatStatus.classList.add('Cheney_status-error');
        } else if (Cheney_type === 'ok') {
            Cheney_chatStatus.classList.add('Cheney_status-ok');
        }
    }

    function Cheney_updateCount() {
        var Cheney_userCount = Cheney_messages.filter(function (Cheney_item) {
            return Cheney_item.role === 'user';
        }).length;

        Cheney_contextCount.textContent = '已进行 ' + Cheney_userCount + ' 轮';
    }

    function Cheney_scrollToBottom() {
        Cheney_chatMessages.scrollTop = Cheney_chatMessages.scrollHeight;
    }

    function Cheney_appendMessage(Cheney_role, Cheney_content) {
        Cheney_chatEmpty.style.display = 'none';

        var Cheney_message = document.createElement('div');
        Cheney_message.className = 'Cheney_chat-message ' +
            (Cheney_role === 'user' ? 'Cheney_message-user' : 'Cheney_message-assistant');

        var Cheney_avatar = document.createElement('div');
        Cheney_avatar.className = 'Cheney_chat-avatar';
        Cheney_avatar.textContent = Cheney_role === 'user' ? '我' : 'AI';

        var Cheney_bubble = document.createElement('div');
        Cheney_bubble.className = 'Cheney_chat-bubble';

        var Cheney_roleLabel = document.createElement('span');
        Cheney_roleLabel.className = 'Cheney_chat-role';
        Cheney_roleLabel.textContent = Cheney_role === 'user' ? 'YOU' : 'ASSISTANT';

        var Cheney_textNode = document.createElement('span');
        Cheney_textNode.textContent = Cheney_content;

        Cheney_bubble.appendChild(Cheney_roleLabel);
        Cheney_bubble.appendChild(Cheney_textNode);
        Cheney_message.appendChild(Cheney_avatar);
        Cheney_message.appendChild(Cheney_bubble);
        Cheney_chatMessages.appendChild(Cheney_message);
        Cheney_scrollToBottom();
    }

    function Cheney_sendMessage() {
        var Cheney_text = Cheney_chatInput.value.trim();

        if (!Cheney_text || Cheney_isSending) {
            return;
        }

        Cheney_isSending = true;
        Cheney_sendButton.disabled = true;
        Cheney_chatInput.value = '';
        Cheney_setStatus('正在等待大模型回复……');

        Cheney_messages.push({ role: 'user', content: Cheney_text });
        Cheney_appendMessage('user', Cheney_text);
        Cheney_updateCount();

        var Cheney_payload = {
            Cheney_messages: Cheney_messages
        };

        console.log('[Cheney_ai] 发送给大模型:', JSON.parse(JSON.stringify(Cheney_payload)));

        fetch('/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Cheney_payload)
        })
            .then(function (Cheney_response) {
                return Cheney_response.json();
            })
            .then(function (Cheney_result) {
                console.log('[Cheney_ai] 从大模型接收:', Cheney_result);

                if (Cheney_result.code !== 0) {
                    throw new Error(Cheney_result.msg || '大模型请求失败');
                }

                var Cheney_reply = Cheney_result.data.Cheney_reply || '（模型没有返回内容）';
                Cheney_messages.push({ role: 'assistant', content: Cheney_reply });
                Cheney_appendMessage('assistant', Cheney_reply);
                Cheney_modelLabel.textContent = Cheney_result.data.Cheney_model || Cheney_modelLabel.textContent;
                Cheney_setStatus('回复完成，可以继续提问。', 'ok');
            })
            .catch(function (Cheney_error) {
                console.error('[Cheney_ai]', Cheney_error);
                Cheney_setStatus('请求失败：' + Cheney_error.message, 'error');
            })
            .finally(function () {
                Cheney_isSending = false;
                Cheney_sendButton.disabled = false;
                Cheney_chatInput.focus();
            });
    }

    function Cheney_clearChat() {
        Cheney_messages = [];
        var Cheney_messageNodes = Cheney_chatMessages.querySelectorAll('.Cheney_chat-message');

        Cheney_messageNodes.forEach(function (Cheney_node) {
            Cheney_node.remove();
        });

        Cheney_chatEmpty.style.display = 'block';
        Cheney_contextCount.textContent = '已进行 0 轮';
        Cheney_setStatus('对话已清空。');
        console.log('[Cheney_ai] 对话已清空');
    }

    Cheney_sendButton.addEventListener('click', Cheney_sendMessage);
    Cheney_clearButton.addEventListener('click', Cheney_clearChat);

    Cheney_chatInput.addEventListener('keydown', function (Cheney_event) {
        if (Cheney_event.key === 'Enter' && !Cheney_event.shiftKey) {
            Cheney_event.preventDefault();
            Cheney_sendMessage();
        }
    });
})();
