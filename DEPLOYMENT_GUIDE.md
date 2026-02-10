# Seedance.onl 部署指南

完整的 Git + Cloudflare Pages + Porkbun 部署流程

---

## 📋 前置准备

### 需要的账号
- ✅ GitHub 账号
- ✅ Cloudflare 账号
- ✅ Porkbun 域名 (seedance.onl)

### 本地检查
```powershell
# 确认当前目录
cd d:\工作\web\seedance.onl

# 检查文件
ls *.html
```

---

## 🚀 步骤 1: 初始化 Git 仓库

### 1.1 初始化 Git
```powershell
# 初始化 Git 仓库
git init

# 检查状态
git status
```

### 1.2 创建 .gitignore
```powershell
# 创建 .gitignore 文件
@"
node_modules/
.DS_Store
Thumbs.db
*.log
.env
"@ | Out-File -FilePath .gitignore -Encoding UTF8
```

### 1.3 添加所有文件
```powershell
# 添加所有文件到暂存区
git add .

# 查看将要提交的文件
git status

# 首次提交
git commit -m "Initial commit: Seedance 2.0 website with 22 pages"
```

---

## 📦 步骤 2: 推送到 GitHub

### 2.1 在 GitHub 创建仓库

1. 访问：https://github.com/new
2. 仓库名称：`seedance-onl` 或 `seedance.onl`
3. 设置为 **Public** (Cloudflare Pages 免费版需要)
4. **不要** 初始化 README, .gitignore, license
5. 点击 **Create repository**

### 2.2 关联远程仓库
```powershell
# 替换 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/seedance-onl.git

# 确认远程仓库
git remote -v

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 2.3 验证推送成功
访问你的 GitHub 仓库页面，确认文件已上传。

---

## ☁️ 步骤 3: 部署到 Cloudflare Pages

### 3.1 创建 Cloudflare Pages 项目

1. **登录 Cloudflare**
   - 访问：https://dash.cloudflare.com
   - 进入 `Workers & Pages`

2. **创建新项目**
   - 点击 `Create application`
   - 选择 `Pages` → `Connect to Git`

3. **连接 GitHub**
   - 授权 Cloudflare 访问 GitHub
   - 选择 `seedance-onl` 仓库

4. **配置构建设置**
   ```
   Project name: seedance-onl
   Production branch: main
   Build command: (留空)
   Build output directory: /
   ```

5. **部署**
   - 点击 `Save and Deploy`
   - 等待部署完成（约 1-2 分钟）

### 3.2 获取 Cloudflare Pages URL
部署成功后，你会得到一个临时 URL：
```
https://seedance-onl.pages.dev
```

访问这个 URL 验证网站是否正常工作。

---

## 🌐 步骤 4: 配置自定义域名 (Porkbun → Cloudflare)

### 4.1 在 Cloudflare 添加自定义域名

1. **进入 Pages 项目设置**
   - `Workers & Pages` → `seedance-onl` → `Custom domains`

2. **添加域名**
   - 点击 `Set up a custom domain`
   - 输入：`seedance.onl`
   - 点击 `Continue`

3. **添加 www 域名 (可选)**
   - 再次点击 `Set up a custom domain`
   - 输入：`www.seedance.onl`
   - 点击 `Continue`

### 4.2 在 Porkbun 配置 DNS

**选项 A: 使用 Cloudflare DNS (推荐)**

1. **在 Cloudflare 添加站点**
   - Cloudflare 主页 → `Add site`
   - 输入：`seedance.onl`
   - 选择 **Free** 计划

2. **获取 Cloudflare Nameservers**
   Cloudflare 会显示 2 个 nameserver，类似：
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```

3. **在 Porkbun 更改 Nameservers**
   - 登录 Porkbun: https://porkbun.com/account/domain
   - 找到 `seedance.onl` → `Details`
   - `Nameservers` → `Use Custom Nameservers`
   - 输入 Cloudflare 的 2 个 nameserver
   - 点击 `Submit`

4. **等待 DNS 传播**
   - 回到 Cloudflare → `Check nameservers`
   - 通常需要 5-30 分钟

5. **在 Cloudflare 添加 DNS 记录**
   DNS 会自动配置，但确认有这些记录：
   ```
   CNAME  seedance.onl      →  seedance-onl.pages.dev
   CNAME  www               →  seedance-onl.pages.dev
   ```

**选项 B: 保持 Porkbun DNS**

如果不想转移 DNS 到 Cloudflare：

1. **登录 Porkbun**
   - https://porkbun.com/account/domain

2. **进入 DNS 管理**
   - 找到 `seedance.onl` → `DNS`

3. **删除现有 A/CNAME 记录**
   - 删除任何指向 seedance.onl 的记录

4. **添加 CNAME 记录**
   ```
   Type: CNAME
   Host: @
   Answer: seedance-onl.pages.dev
   TTL: 600
   ```

5. **添加 www CNAME (可选)**
   ```
   Type: CNAME
   Host: www
   Answer: seedance-onl.pages.dev
   TTL: 600
   ```

---

## ✅ 步骤 5: 验证部署

### 5.1 检查域名解析
```powershell
# 检查 DNS 是否生效
nslookup seedance.onl
nslookup www.seedance.onl
```

### 5.2 访问网站
- https://seedance.onl
- https://www.seedance.onl

### 5.3 检查 SSL 证书
- Cloudflare 自动颁发免费 SSL 证书
- 可能需要 5-30 分钟生效
- 强制 HTTPS: Cloudflare → SSL/TLS → `Full` 或 `Full (strict)`

---

## 🔄 步骤 6: 设置自动部署

### 6.1 配置完成后的自动部署流程
```powershell
# 1. 本地修改文件
# 2. 提交更改
git add .
git commit -m "Update: 描述你的更改"

# 3. 推送到 GitHub
git push

# 4. Cloudflare Pages 自动部署
# 访问 Cloudflare Dashboard 查看部署进度
# 部署完成后，seedance.onl 自动更新
```

---

## 📊 完整流程时间估计

| 步骤 | 预计时间 |
|------|---------|
| Git 初始化和推送 | 5 分钟 |
| Cloudflare Pages 部署 | 2 分钟 |
| DNS 配置 | 5 分钟 |
| DNS 传播 | 5-30 分钟 |
| SSL 证书生效 | 5-30 分钟 |
| **总计** | **约 30-60 分钟** |

---

## 🛠️ 故障排查

### 问题 1: Git 推送失败
```powershell
# 检查远程仓库
git remote -v

# 重新设置远程仓库
git remote set-url origin https://github.com/YOUR_USERNAME/seedance-onl.git
```

### 问题 2: Cloudflare 部署失败
- 检查构建日志
- 确认构建命令为空
- 确认输出目录是 `/`

### 问题 3: 域名无法访问
```powershell
# 检查 DNS
nslookup seedance.onl

# 清除本地 DNS 缓存
ipconfig /flushdns
```

### 问题 4: SSL 证书错误
- 等待 30 分钟后重试
- Cloudflare → SSL/TLS → 设置为 `Full`
- 清除浏览器缓存

---

## 🎯 快速部署命令汇总

```powershell
# === Git 初始化 ===
cd d:\工作\web\seedance.onl
git init
git add .
git commit -m "Initial commit: Seedance 2.0 website"

# === 推送到 GitHub ===
git remote add origin https://github.com/YOUR_USERNAME/seedance-onl.git
git branch -M main
git push -u origin main

# === 后续更新 ===
git add .
git commit -m "Update: 描述更改"
git push
```

---

## 📝 部署检查清单

- [ ] Git 仓库已初始化
- [ ] 代码已推送到 GitHub
- [ ] Cloudflare Pages 项目已创建
- [ ] 临时 URL (*.pages.dev) 可访问
- [ ] 自定义域名已添加到 Cloudflare
- [ ] DNS 已在 Porkbun/Cloudflare 配置
- [ ] seedance.onl 可访问
- [ ] www.seedance.onl 可访问 (可选)
- [ ] HTTPS 已启用
- [ ] 自动部署测试成功

---

## 🚀 部署完成！

你的 Seedance 2.0 网站现已上线：
- **主域名**: https://seedance.onl
- **备用域名**: https://www.seedance.onl
- **Cloudflare**: https://seedance-onl.pages.dev

每次推送到 GitHub main 分支，Cloudflare Pages 会自动重新部署。

---

**创建时间**: 2026-02-10
**状态**: ✅ 完整流程指南
