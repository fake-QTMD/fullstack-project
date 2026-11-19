/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 数据库连接测试页面逻辑
 */
(function () {
    var Cheney_apiUrl = '/api/database/test';
    var Cheney_userInput = document.getElementById('Cheney_user');
    var Cheney_passwordInput = document.getElementById('Cheney_password');
    var Cheney_testButton = document.getElementById('Cheney_testButton');
    var Cheney_resultBox = document.getElementById('Cheney_databaseResult');
    var Cheney_rawBox = document.getElementById('Cheney_databaseRaw');

    function Cheney_showResult(Cheney_result) {
        Cheney_resultBox.classList.remove('Cheney_result-ok', 'Cheney_result-error');

        if (Cheney_result.code === 0) {
            Cheney_resultBox.classList.add('Cheney_result-ok');
            Cheney_resultBox.innerHTML = '<strong>连接成功</strong>' +
                'MySQL 版本：' + Cheney_result.data.Cheney_version +
                '<br>测试用户：' + Cheney_result.data.Cheney_user;
        } else {
            Cheney_resultBox.classList.add('Cheney_result-error');
            Cheney_resultBox.innerHTML = '<strong>连接失败</strong>' + Cheney_result.msg;
        }

        Cheney_rawBox.textContent = JSON.stringify(Cheney_result, null, 2);
    }

    function Cheney_testDatabase() {
        var Cheney_user = Cheney_userInput.value.trim();
        var Cheney_password = Cheney_passwordInput.value;

        if (!Cheney_user) {
            Cheney_resultBox.classList.add('Cheney_result-error');
            Cheney_resultBox.textContent = '请输入 MySQL 用户名。';
            return;
        }

        Cheney_testButton.disabled = true;
        Cheney_testButton.textContent = '测试中……';
        Cheney_resultBox.textContent = '正在连接 MySQL，请稍候……';

        fetch(Cheney_apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Cheney_user: Cheney_user,
                Cheney_password: Cheney_password
            })
        })
            .then(function (Cheney_response) {
                return Cheney_response.json();
            })
            .then(function (Cheney_result) {
                console.log('[Cheney_database] /api/database/test', Cheney_result);
                Cheney_showResult(Cheney_result);
            })
            .catch(function (Cheney_error) {
                console.error('[Cheney_database]', Cheney_error);
                Cheney_resultBox.classList.remove('Cheney_result-ok');
                Cheney_resultBox.classList.add('Cheney_result-error');
                Cheney_resultBox.innerHTML = '<strong>请求失败</strong>' + Cheney_error.message;
                Cheney_rawBox.textContent = '请求失败：' + Cheney_error.message;
            })
            .finally(function () {
                Cheney_testButton.disabled = false;
                Cheney_testButton.textContent = '测试数据库连接';
            });
    }

    Cheney_testButton.addEventListener('click', Cheney_testDatabase);
})();
