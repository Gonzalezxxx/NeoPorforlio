# Git 部署命令

## 初始化 Git 仓库
```bash
git init
```

## 添加远程仓库（替换 YOUR_USERNAME 和 YOUR_REPO_NAME）
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

## 添加文件到暂存区
```bash
git add index.html admin.html styles.css script.js admin.js
```

## 提交更改
```bash
git commit -m "Initial commit: Add product store website"
```

## 推送到 GitHub
```bash
git branch -M main
git push -u origin main
```

## 注意事项
- 确保安装了 Git：`git --version`
- 如果没有安装：`brew install git`（macOS）
- 首次使用需要配置用户信息：
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```
