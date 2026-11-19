---
name: github-push
description: 将当前 Git 项目提交 commit 并 push 到用户自己的 GitHub 仓库，使用已配置的 SSH 公钥。用户要求“提交到 GitHub / commit 并 push / 推送项目”时使用。
---

# 提交到 GitHub

> 姓名：吴钊燊 | 学号：24001010208 | 时间：2026-11-19 | 大模型：DeepSeek

## 目标

把一个已经存在的本地 Git 项目提交并推送到**用户自己的** GitHub 仓库。

必须使用用户电脑上已经配置好的 SSH 公钥，不要重新生成或覆盖 SSH 密钥。

## 绝对不要做

1. 不要使用示例地址 `https://github.com/Chen-Yingyu/cheney.git`。这是别人的仓库，只用于说明格式。
2. 不要猜测用户的 GitHub 用户名或仓库名。
3. 不要把 `.env`、私钥、密码、token、`node_modules` 提交到 Git。
4. 不要使用 `git push --force`，除非用户明确要求。
5. 不要读取或输出私钥内容。

## 执行步骤

### 1. 确认项目根目录

当前目录必须是包含 `.git` 的项目根目录。先执行：

```powershell
git rev-parse --show-toplevel
git status --short
git remote -v
```

如果当前目录不是 Git 仓库，停止并告诉用户。

### 2. 确认远程仓库地址

如果 `git remote -v` 没有 `origin`：

- 向用户询问**自己的** GitHub 仓库 SSH 地址；
- 正确格式：

```text
git@github.com:用户名/仓库名.git
```

- 添加远程：

```powershell
git remote add origin git@github.com:用户名/仓库名.git
```

如果已有 `origin` 但地址是 HTTPS，而用户要求使用 SSH 公钥，可以改为：

```powershell
git remote set-url origin git@github.com:用户名/仓库名.git
```

### 3. 检查敏感文件

提交前检查：

```powershell
git status --short
git check-ignore -v .env
```

如果 `.env` 没有被忽略，先把它加入 `.gitignore`：

```text
.env
backend/.env
node_modules/
```

如果 `.env` 已经被 Git 跟踪，立即停止，并提示用户先从暂存区移除：

```powershell
git rm --cached .env
```

### 4. 提交

```powershell
git add -A
git status --short
git commit -m "更新项目"
```

如果没有任何改动，`git commit` 会提示 nothing to commit，此时可以只执行 push 或告诉用户无需提交。

提交信息优先使用用户指定的内容；用户没有指定时使用：

```text
更新项目
```

### 5. 推送

确认当前分支：

```powershell
git branch --show-current
```

统一使用 `main`：

```powershell
git branch -M main
git push -u origin main
```

如果用户明确要求其他分支，按用户要求执行。

### 6. 验证

```powershell
git log -1 --oneline
git remote -v
git status --short
```

推送成功后向用户报告：

- 提交哈希
- 提交信息
- 远程仓库地址
- 推送分支
- GitHub 仓库网页地址（如果知道）

## 常见错误处理

### Permission denied (publickey)

说明当前电脑的 SSH 公钥没有添加到 GitHub，或者添加到了别的账号。

提示用户：

1. 查看公钥：

```powershell
Get-Content "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

2. 添加到 GitHub：

```text
GitHub → Settings → SSH and GPG keys → New SSH key
```

3. 测试：

```powershell
ssh -T git@github.com
```

### 提示输入 passphrase

这是正常的，说明私钥设置了保护密码。让用户自己输入，不要索取密码。

### non-fast-forward / rejected

不要强制推送。先提示用户远程仓库有新的提交，询问是否允许：

```powershell
git pull --rebase origin main
```

得到允许后再执行。

### 远程仓库不存在或没有权限

停止操作，让用户检查：

- 仓库是否已经创建；
- 仓库地址是否为自己的；
- 当前 GitHub 账号是否有写权限。
