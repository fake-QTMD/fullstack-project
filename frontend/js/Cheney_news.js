/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 科技新闻页面逻辑
 */
(function () {
    var Cheney_apiUrl = '/api/news';
    var Cheney_newsList = document.getElementById('Cheney_newsList');
    var Cheney_newsRaw = document.getElementById('Cheney_newsRaw');

    function Cheney_renderNews(Cheney_news) {
        if (!Cheney_news || Cheney_news.length === 0) {
            Cheney_newsList.innerHTML = '<p class="Cheney_page-desc">暂时没有新闻数据。</p>';
            return;
        }

        var Cheney_cards = Cheney_news.map(function (Cheney_item) {
            var Cheney_date = String(Cheney_item.Cheney_publish_time || '').substring(0, 10);
            return '<article class="Cheney_news-card">' +
                '<h3>' + Cheney_item.Cheney_title + '</h3>' +
                '<p>' + Cheney_item.Cheney_summary + '</p>' +
                '<div class="Cheney_news-meta">' +
                    '<span>' + Cheney_item.Cheney_source + ' · ' + Cheney_date + '</span>' +
                    '<a href="' + Cheney_item.Cheney_url + '" target="_blank">查看来源 →</a>' +
                '</div>' +
            '</article>';
        });

        Cheney_newsList.innerHTML = Cheney_cards.join('');
    }

    function Cheney_loadNews() {
        fetch(Cheney_apiUrl)
            .then(function (Cheney_response) {
                return Cheney_response.json();
            })
            .then(function (Cheney_result) {
                console.log('[Cheney_news] /api/news', Cheney_result);

                if (Cheney_result.code === 0) {
                    Cheney_renderNews(Cheney_result.data);
                    Cheney_newsRaw.textContent = JSON.stringify(Cheney_result, null, 2);
                } else {
                    throw new Error(Cheney_result.msg || '新闻数据读取失败');
                }
            })
            .catch(function (Cheney_error) {
                console.error('[Cheney_news]', Cheney_error);
                Cheney_newsList.innerHTML = '<p class="Cheney_page-desc">新闻加载失败：' + Cheney_error.message + '</p>';
                Cheney_newsRaw.textContent = '请求失败：' + Cheney_error.message;
            });
    }

    Cheney_loadNews();
})();
