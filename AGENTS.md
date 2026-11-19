# AGENTS.md

> 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek

## 项目结构与技术栈

- 前端：`frontend/`
  - 原生 HTML、CSS、JavaScript，禁止第三方库、框架和 CDN 链接。
  - 目录：`frontend/css/`、`frontend/js/`、`frontend/fonts/`、`frontend/images/`。
  - 字体图标放在 `frontend/fonts/`，没有就不创建占位文件。
- 后端：`backend/`
  - Node.js + Express，RESTful + MVC 风格。
  - 所有接口以 `/api/` 为前缀，端口固定 `8325`。
  - 使用 `express.static` 托管 `frontend/`。
  - 支持所有跨域访问。
- 后端依赖安装：优先 `cnpm i 包名`；失败或超时改用 `npm i 包名`。
- 数据库：MySQL。
  - 数据库凭据只写入 `backend/.env`：`DB_USER`、`DB_PASSWORD`、`DB_HOST`、`DB_NAME`。
  - 密码不得出现在代码、文档、README 或本文件中。
  - `.env` 必须加入 `.gitignore`。
  - 每张表建立后，至少插入 8 条具有真实业务意义的测试数据。

## 命名与注释

- CSS 类名、JS 变量名、JS 函数名、数据库表名和字段名一律以 `Cheney_` 开头。
- 每个源码文件头部必须有注释块：
  - 姓名：吴钊燊
  - 学号：24001010208
  - 时间：2026-11-19
  - 大模型：DeepSeek
- HTML 使用 `<!-- ... -->`，CSS/JS 使用 `/* ... */`。

## 记录文件

以下文件只追加，不覆盖已有内容：

- `Cheney_prompt.md`：每次 AI 开发指令后追加：时间 | 提示词全文 | 大模型名称。
- `backend/Cheney_interface.md`：每次创建或修改接口后追加：接口路径 | HTTP 方法 | 请求参数（含示例）| 响应格式（含 JSON 示例）| 修改时间。
- `backend/Cheney_database.md`：按执行顺序追加建库、建表、改表和测试数据的 SQL，仅凭此文件可在新机器重建数据库。

统一 JSON 响应格式：

```json
{ "code": 0, "msg": "提示信息", "data": {} }
```

`code = 0` 表示成功，非 `0` 表示失败。

## 前端约定

- 服务器返回的数据和错误信息必须输出到浏览器控制台：`console.log` / `console.error`。
- 新建 HTML 页面后，在 `frontend/index.html` 中追加超链接入口；文件名包含 `detail` 的页面除外。
- 所有页面必须有统一导航、姓名学号信息，并链接回首页。
