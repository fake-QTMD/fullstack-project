/*
 * 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
 * 班级成绩页面逻辑
 */
(function () {
    var Cheney_apiUrl = '/api/class';
    var Cheney_scoreBody = document.getElementById('Cheney_scoreBody');
    var Cheney_scoresRaw = document.getElementById('Cheney_scoresRaw');
    var Cheney_classInfoText = document.getElementById('Cheney_classInfoText');
    var Cheney_studentCount = document.getElementById('Cheney_studentCount');
    var Cheney_classAverage = document.getElementById('Cheney_classAverage');
    var Cheney_maxTotal = document.getElementById('Cheney_maxTotal');

    function Cheney_totalOf(Cheney_student) {
        return Number(Cheney_student.Cheney_html) +
            Number(Cheney_student.Cheney_css) +
            Number(Cheney_student.Cheney_js);
    }

    function Cheney_renderScores(Cheney_payload) {
        var Cheney_classInfo = Cheney_payload.Cheney_classInfo;
        var Cheney_students = Cheney_payload.Cheney_students || [];

        if (Cheney_classInfo) {
            Cheney_classInfoText.textContent =
                Cheney_classInfo.Cheney_class_name + ' · ' +
                Cheney_classInfo.Cheney_subject + ' · 授课教师：' +
                Cheney_classInfo.Cheney_teacher + ' · ' +
                Cheney_classInfo.Cheney_year;
        }

        var Cheney_totalSum = 0;
        var Cheney_max = 0;
        var Cheney_rankMap = {};
        var Cheney_ranked = Cheney_students.slice().sort(function (Cheney_a, Cheney_b) {
            return Cheney_totalOf(Cheney_b) - Cheney_totalOf(Cheney_a);
        });

        Cheney_ranked.forEach(function (Cheney_student, Cheney_index) {
            Cheney_rankMap[Cheney_student.Cheney_id] = Cheney_index + 1;
        });

        var Cheney_rows = Cheney_students.map(function (Cheney_student) {
            var Cheney_total = Cheney_totalOf(Cheney_student);
            var Cheney_average = (Cheney_total / 3).toFixed(1);
            var Cheney_rank = Cheney_rankMap[Cheney_student.Cheney_id];

            Cheney_totalSum += Cheney_total;
            if (Cheney_total > Cheney_max) {
                Cheney_max = Cheney_total;
            }

            return '<tr>' +
                '<td><span class="Cheney_rank' + (Cheney_rank > 3 ? ' Cheney_rank-normal' : '') + '">' + Cheney_rank + '</span></td>' +
                '<td class="Cheney_name-cell">' + Cheney_student.Cheney_name + '</td>' +
                '<td>' + Cheney_student.Cheney_no + '</td>' +
                '<td>' + Cheney_student.Cheney_gender + '</td>' +
                '<td>' + Cheney_student.Cheney_html + '</td>' +
                '<td>' + Cheney_student.Cheney_css + '</td>' +
                '<td>' + Cheney_student.Cheney_js + '</td>' +
                '<td>' + Cheney_total + '</td>' +
                '<td>' + Cheney_average + '</td>' +
                '</tr>';
        });

        Cheney_scoreBody.innerHTML = Cheney_rows.join('');
        Cheney_studentCount.textContent = String(Cheney_students.length);
        Cheney_classAverage.textContent = Cheney_students.length > 0
            ? (Cheney_totalSum / Cheney_students.length / 3).toFixed(1)
            : '0';
        Cheney_maxTotal.textContent = String(Cheney_max);
        Cheney_scoresRaw.textContent = JSON.stringify(Cheney_payload, null, 2);
    }

    function Cheney_loadScores() {
        fetch(Cheney_apiUrl)
            .then(function (Cheney_response) {
                return Cheney_response.json();
            })
            .then(function (Cheney_result) {
                console.log('[Cheney_scores] /api/class', Cheney_result);

                if (Cheney_result.code === 0) {
                    Cheney_renderScores(Cheney_result.data);
                } else {
                    throw new Error(Cheney_result.msg || '成绩数据读取失败');
                }
            })
            .catch(function (Cheney_error) {
                console.error('[Cheney_scores]', Cheney_error);
                Cheney_scoreBody.innerHTML = '<tr><td colspan="9">成绩数据加载失败：' +
                    Cheney_error.message + '</td></tr>';
                Cheney_scoresRaw.textContent = '请求失败：' + Cheney_error.message;
            });
    }

    Cheney_loadScores();
})();
