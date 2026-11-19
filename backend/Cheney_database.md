# Cheney_database.md

> 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
>
> 本文件只追加，不覆盖已有内容。数据库连接凭据只保存在 backend/.env。

## 2026-11-19 初始化数据库

执行方式：在 MySQL 客户端中按顺序执行以下 SQL。执行后可重建数据库、4 张表和全部测试数据。

```sql
-- 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
-- 前端开发2501班学习管理平台数据库初始化脚本

CREATE DATABASE IF NOT EXISTS cheney_fullstack
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cheney_fullstack;

DROP TABLE IF EXISTS Cheney_gallery;
DROP TABLE IF EXISTS Cheney_news;
DROP TABLE IF EXISTS Cheney_student;
DROP TABLE IF EXISTS Cheney_class;

CREATE TABLE Cheney_class (
  Cheney_id INT PRIMARY KEY AUTO_INCREMENT,
  Cheney_class_name VARCHAR(100) NOT NULL,
  Cheney_teacher VARCHAR(50) NOT NULL,
  Cheney_subject VARCHAR(50) NOT NULL,
  Cheney_year VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Cheney_student (
  Cheney_id INT PRIMARY KEY,
  Cheney_name VARCHAR(50) NOT NULL,
  Cheney_no VARCHAR(20) NOT NULL UNIQUE,
  Cheney_gender VARCHAR(10) NOT NULL,
  Cheney_html INT NOT NULL DEFAULT 0,
  Cheney_css INT NOT NULL DEFAULT 0,
  Cheney_js INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Cheney_news (
  Cheney_id INT PRIMARY KEY AUTO_INCREMENT,
  Cheney_title VARCHAR(200) NOT NULL,
  Cheney_summary VARCHAR(500) NOT NULL,
  Cheney_source VARCHAR(50) NOT NULL,
  Cheney_publish_time DATE NOT NULL,
  Cheney_url VARCHAR(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Cheney_gallery (
  Cheney_id INT PRIMARY KEY AUTO_INCREMENT,
  Cheney_title VARCHAR(100) NOT NULL,
  Cheney_image VARCHAR(200) NOT NULL,
  Cheney_description VARCHAR(500) NOT NULL,
  Cheney_category VARCHAR(50) NOT NULL,
  Cheney_create_time DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Cheney_class
  (Cheney_class_name, Cheney_teacher, Cheney_subject, Cheney_year)
VALUES
  ('前端开发2501班', '陈莹羽', '高级网页设计', '2026-2027'),
  ('前端开发2502班', '陈莹羽', '高级网页设计', '2026-2027'),
  ('前端开发2503班', '陈莹羽', '高级网页设计', '2026-2027'),
  ('前端开发2504班', '陈莹羽', '高级网页设计', '2026-2027'),
  ('软件工程2501班', '陈莹羽', 'Web前端基础', '2026-2027'),
  ('软件工程2502班', '陈莹羽', 'Web前端基础', '2026-2027'),
  ('数字媒体2501班', '陈莹羽', '网页设计与制作', '2026-2027'),
  ('数字媒体2502班', '陈莹羽', '网页设计与制作', '2026-2027');

INSERT INTO Cheney_student
  (Cheney_id, Cheney_name, Cheney_no, Cheney_gender, Cheney_html, Cheney_css, Cheney_js)
VALUES
  (1, '张小明', '250101', '男', 92, 88, 85),
  (2, '李小红', '250102', '女', 95, 93, 90),
  (3, '王大伟', '250103', '男', 78, 82, 75),
  (4, '赵小雪', '250104', '女', 88, 91, 86),
  (5, '刘洋', '250105', '男', 90, 87, 92),
  (6, '陈思', '250106', '女', 85, 80, 78),
  (7, '周涛', '250107', '男', 96, 94, 95),
  (8, '吴敏', '250108', '女', 82, 85, 88),
  (9, '郑浩', '250109', '男', 70, 72, 68),
  (10, '孙丽', '250110', '女', 91, 89, 93);

INSERT INTO Cheney_news
  (Cheney_title, Cheney_summary, Cheney_source, Cheney_publish_time, Cheney_url)
VALUES
  ('国产大模型加速进入多模态时代', '多家厂商发布支持文本、图像与音频理解的新模型，多模态能力成为新一轮竞争焦点。', '科技日报', '2026-11-08', 'https://www.stdaily.com/'),
  ('HarmonyOS 6.1 开发者预览版发布', '新版本在分布式能力、ArkUI 渲染和开发工具链上继续升级，原生应用生态进一步扩展。', '华为开发者联盟', '2026-11-07', 'https://developer.huawei.com/'),
  ('WebGPU 成为前端图形渲染新焦点', '越来越多浏览器完善 WebGPU 支持，网页端实时渲染和可视化应用获得更高性能。', 'InfoQ', '2026-11-06', 'https://www.infoq.cn/'),
  ('Node.js 24 提升异步性能与开发体验', '新版运行时优化了异步任务调度和模块加载机制，为全栈项目提供更稳定的运行环境。', '开源中国', '2026-11-05', 'https://www.oschina.net/'),
  ('高校推进人工智能通识课程建设', '多所高校将人工智能基础、提示词工程和数据分析纳入通识课程，强调跨学科实践能力。', '中国教育报', '2026-11-04', 'https://www.jyb.cn/'),
  ('低代码平台与专业开发协同发展', '低代码工具正在进入企业应用开发流程，与传统前端工程化体系形成互补。', 'CSDN', '2026-11-03', 'https://www.csdn.net/'),
  ('开源社区推动前端工程化工具升级', '新一代构建工具更加关注冷启动速度、产物体积和开发调试体验，生态持续活跃。', '开源中国', '2026-11-02', 'https://www.oschina.net/'),
  ('高校网页设计课程引入 Vibe Coding', '课堂开始尝试用自然语言描述需求，再由 AI 辅助生成页面与接口，提升项目实践效率。', '学院教学动态', '2026-11-01', 'https://www.neusoft.edu.cn/');

INSERT INTO Cheney_gallery
  (Cheney_title, Cheney_image, Cheney_description, Cheney_category, Cheney_create_time)
VALUES
  ('Canvas 粒子背景', '/images/Cheney_gallery_1.svg', '使用 Canvas 绘制粒子与连线，形成轻量的科技感背景动画。', 'Canvas', '2026-11-01'),
  ('Flex 卡片布局', '/images/Cheney_gallery_2.svg', '利用 Flex 完成自适应卡片排列，适合展示课程作业与项目信息。', 'Flex', '2026-11-02'),
  ('CSS Grid 作品墙', '/images/Cheney_gallery_3.svg', '通过 Grid 构建整齐的作品网格，配合悬停效果增强浏览体验。', 'Grid', '2026-11-03'),
  ('深色科技风首页', '/images/Cheney_gallery_4.svg', '深色渐变与细网格背景结合，突出数据与项目卡片的层级。', 'UI', '2026-11-04'),
  ('响应式导航', '/images/Cheney_gallery_5.svg', '桌面端横向导航与移动端折叠导航结合，保证不同屏幕下的可用性。', 'Responsive', '2026-11-05'),
  ('Tabs 选项卡', '/images/Cheney_gallery_6.svg', '使用排他思想切换选项卡，支持鼠标悬停和点击两种交互方式。', 'JavaScript', '2026-11-06'),
  ('数据可视化面板', '/images/Cheney_gallery_7.svg', '将成绩数据整理为表格和统计卡片，帮助快速了解班级学习情况。', 'Data', '2026-11-07'),
  ('校园学习管理', '/images/Cheney_gallery_8.svg', '围绕班级、成绩和课程资源设计的学习管理平台界面方案。', 'Project', '2026-11-08');

```

## 数据表说明

| 表名 | 用途 | 测试数据 |
| --- | --- | --- |
| Cheney_class | 班级信息 | 8 条 |
| Cheney_student | 学生成绩 | 10 条 |
| Cheney_news | 科技新闻 | 8 条 |
| Cheney_gallery | 图文列表 | 8 条 |
