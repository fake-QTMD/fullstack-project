/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 图文列表页面逻辑
 */
(function () {
    var Cheney_apiUrl = '/api/gallery';
    var Cheney_galleryList = document.getElementById('Cheney_galleryList');
    var Cheney_galleryRaw = document.getElementById('Cheney_galleryRaw');

    function Cheney_renderGallery(Cheney_gallery) {
        if (!Cheney_gallery || Cheney_gallery.length === 0) {
            Cheney_galleryList.innerHTML = '<p class="Cheney_page-desc">暂时没有图文数据。</p>';
            return;
        }

        var Cheney_cards = Cheney_gallery.map(function (Cheney_item) {
            return '<article class="Cheney_gallery-card">' +
                '<img src="' + Cheney_item.Cheney_image + '" alt="' + Cheney_item.Cheney_title + '">' +
                '<div class="Cheney_gallery-body">' +
                    '<span class="Cheney_tag">' + Cheney_item.Cheney_category + '</span>' +
                    '<h3>' + Cheney_item.Cheney_title + '</h3>' +
                    '<p>' + Cheney_item.Cheney_description + '</p>' +
                '</div>' +
            '</article>';
        });

        Cheney_galleryList.innerHTML = Cheney_cards.join('');
    }

    function Cheney_loadGallery() {
        fetch(Cheney_apiUrl)
            .then(function (Cheney_response) {
                return Cheney_response.json();
            })
            .then(function (Cheney_result) {
                console.log('[Cheney_gallery] /api/gallery', Cheney_result);

                if (Cheney_result.code === 0) {
                    Cheney_renderGallery(Cheney_result.data);
                    Cheney_galleryRaw.textContent = JSON.stringify(Cheney_result, null, 2);
                } else {
                    throw new Error(Cheney_result.msg || '图文数据读取失败');
                }
            })
            .catch(function (Cheney_error) {
                console.error('[Cheney_gallery]', Cheney_error);
                Cheney_galleryList.innerHTML = '<p class="Cheney_page-desc">图文加载失败：' + Cheney_error.message + '</p>';
                Cheney_galleryRaw.textContent = '请求失败：' + Cheney_error.message;
            });
    }

    Cheney_loadGallery();
})();
