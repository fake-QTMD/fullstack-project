# Cheney_prompt.md

> 本文件只追加，不覆盖已有内容。

## 2026-11-19 13:29 | 初始化全栈项目

**提示词摘要：**

根据 `AGENTS.md` 初始化全栈项目：

1. 创建前后端目录骨架；
2. 前端使用原生 HTML/CSS/JS，后端使用 Node.js + Express + MySQL；
3. 创建首页、班级成绩页、科技新闻页、图文列表页、数据库测试页；
4. 首页包含姓名、学号、项目名称、项目类别、Canvas 背景动画和全部页面链接；
5. 创建 `start.bat`、`README.md`、`.gitignore`；
6. 追加接口记录和数据库 SQL 记录；
7. 使用 `chenyingyu.json` 中的班级、教师和学生成绩作为初始数据。

**大模型：** DeepSeek

## 2026-11-19 15:00 | 创建 GitHub 提交技能并尝试推送

**提示词摘要：**

创建 `github-push` 技能：将当前项目提交 commit 并 push 到用户自己的 GitHub 仓库，使用已配置的 SSH 公钥；示例地址 `Chen-Yingyu/cheney` 仅用于说明格式，必须替换为用户自己的仓库地址。

**大模型：** DeepSeek

## 2026-11-23 14:10 | 班级名称调整并推送 GitHub

**提示词摘要：**

将项目班级名称从“前端开发2501班”统一改为“前端开发24002班”，同步修改前端页面、README、启动脚本、数据库初始化 SQL 和接口文档；提交本地 Git，并推送到用户自己的仓库 `git@github.com:fake-QTMD/fullstack-project.git`。

**大模型：** DeepSeek

## 2026-11-23 14:46 | 创建 SiliconFlow AI 聊天页面

**提示词摘要：**

根据《LLM设计 - 2026.docx》要求，在已完成的全栈项目中创建 AI 聊天页面：

1. 后端新增 `/api/ai/chat`，代理调用 SiliconFlow 的 `/v1/chat/completions`；
2. API Key 只放在 `backend/.env`，不暴露给前端；
3. 前端支持至少 3 轮上下文对话；
4. 浏览器控制台输出发送给大模型的数据和从大模型接收到的数据；
5. 在首页和所有页面导航添加入口；
6. 更新接口文档、README 和提示词记录。

**大模型：** DeepSeek


