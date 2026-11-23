# Cheney_interface.md

> 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek
>
> 本文件只追加，不覆盖已有内容。所有接口以 `/api/` 开头，端口 `8325`。

## 2026-11-19 初始化接口

### 1. 健康检查

- 路径：`/api/health`
- 方法：`GET`
- 请求参数：无
- 响应示例：

```json
{
  "code": 0,
  "msg": "service ok",
  "data": {
    "Cheney_service": "running"
  }
}
```

### 2. 获取班级与学生成绩

- 路径：`/api/class`
- 方法：`GET`
- 请求参数：无
- 响应示例：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "Cheney_classInfo": {
      "Cheney_id": 1,
      "Cheney_class_name": "前端开发24002班",
      "Cheney_teacher": "陈莹羽",
      "Cheney_subject": "高级网页设计",
      "Cheney_year": "2026-2027"
    },
    "Cheney_students": [
      {
        "Cheney_id": 1,
        "Cheney_name": "张小明",
        "Cheney_no": "250101",
        "Cheney_gender": "男",
        "Cheney_html": 92,
        "Cheney_css": 88,
        "Cheney_js": 85
      }
    ]
  }
}
```

### 3. 获取科技新闻

- 路径：`/api/news`
- 方法：`GET`
- 请求参数：无
- 响应示例：

```json
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "Cheney_id": 1,
      "Cheney_title": "国产大模型加速进入多模态时代",
      "Cheney_summary": "多家厂商发布支持文本、图像与音频理解的新模型，多模态能力成为新一轮竞争焦点。",
      "Cheney_source": "科技日报",
      "Cheney_publish_time": "2026-11-07T16:00:00.000Z",
      "Cheney_url": "https://www.stdaily.com/"
    }
  ]
}
```

### 4. 获取图文列表

- 路径：`/api/gallery`
- 方法：`GET`
- 请求参数：无
- 响应示例：

```json
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "Cheney_id": 1,
      "Cheney_title": "Canvas 粒子背景",
      "Cheney_image": "/images/Cheney_gallery_1.svg",
      "Cheney_description": "使用 Canvas 绘制粒子与连线，形成轻量的科技感背景动画。",
      "Cheney_category": "Canvas",
      "Cheney_create_time": "2026-10-31T16:00:00.000Z"
    }
  ]
}
```

### 5. 测试数据库连接

- 路径：`/api/database/test`
- 方法：`POST`
- 请求头：`Content-Type: application/json`
- 请求参数示例：

```json
{
  "Cheney_user": "root",
  "Cheney_password": "root"
}
```

- 成功响应示例：

```json
{
  "code": 0,
  "msg": "数据库连接成功",
  "data": {
    "Cheney_user": "root",
    "Cheney_version": "8.0.36"
  }
}
```

- 失败响应示例：

```json
{
  "code": 4001,
  "msg": "数据库连接失败：Access denied for user 'root'@'localhost'",
  "data": null
}
```

## 统一响应约定

```json
{
  "code": 0,
  "msg": "提示信息",
  "data": {}
}
```

- `code = 0`：成功
- `code != 0`：失败
- 修改时间：2026-11-19
