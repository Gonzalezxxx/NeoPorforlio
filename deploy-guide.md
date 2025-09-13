# 网站部署指南

## 方法一：GitHub Pages（推荐）

### 步骤 1：创建 GitHub 仓库
1. 访问 [GitHub.com](https://github.com) 并登录
2. 点击 "New repository"
3. 仓库名：`product-store` 或任何您喜欢的名字
4. 选择 "Public"（GitHub Pages 免费版需要公开仓库）
5. 勾选 "Add a README file"
6. 点击 "Create repository"

### 步骤 2：上传文件
1. 在仓库页面点击 "uploading an existing file"
2. 拖拽以下文件到页面：
   - index.html
   - admin.html
   - styles.css
   - script.js
   - admin.js
3. 在底部填写提交信息："Initial commit"
4. 点击 "Commit changes"

### 步骤 3：启用 GitHub Pages
1. 进入仓库的 "Settings" 标签
2. 滚动到 "Pages" 部分
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"
6. 等待几分钟，您的网站将在 `https://您的用户名.github.io/仓库名` 上线

## 方法二：Netlify（最简单）

### 步骤 1：准备文件
1. 将所有网站文件放在一个文件夹中
2. 确保文件夹包含：index.html, admin.html, styles.css, script.js, admin.js

### 步骤 2：部署到 Netlify
1. 访问 [Netlify.com](https://netlify.com)
2. 点击 "Sign up" 注册账户
3. 选择 "Deploy manually"
4. 将整个网站文件夹拖拽到部署区域
5. 等待部署完成
6. 获得一个类似 `https://随机名称.netlify.app` 的网址

### 步骤 3：自定义域名（可选）
1. 在 Netlify 控制面板中点击 "Domain settings"
2. 点击 "Add custom domain"
3. 输入您的域名
4. 按照指示配置 DNS

## 方法三：Vercel

### 步骤 1：安装 Vercel CLI
```bash
npm install -g vercel
```

### 步骤 2：部署
```bash
cd /Users/mac/Desktop/Test
vercel
```

### 步骤 3：配置
1. 按照提示登录 Vercel 账户
2. 选择项目设置
3. 等待部署完成

## 方法四：传统虚拟主机

如果您有虚拟主机账户：
1. 将所有文件上传到 `public_html` 或 `www` 目录
2. 确保 index.html 在根目录
3. 通过 FTP 或文件管理器上传

## 注意事项

### 数据持久化
- 当前网站使用 Local Storage 存储数据
- 用户在不同设备上购物车不会同步
- 如需跨设备同步，需要后端数据库

### 安全性
- 管理后台没有密码保护
- 建议添加简单的身份验证
- 生产环境建议使用 HTTPS

### 性能优化
- 图片优化（当前使用 emoji 图标）
- 代码压缩
- CDN 加速

## 推荐部署流程

1. **开发阶段**：使用 GitHub Pages（免费、简单）
2. **正式运营**：使用 Netlify 或 Vercel（功能更丰富）
3. **大规模**：考虑云服务器 + CDN

## 下一步建议

1. 购买域名（可选）
2. 添加 Google Analytics
3. 设置网站监控
4. 考虑添加后端 API
5. 实现用户账户系统
