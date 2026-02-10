# ☁️ Cloudflare Pages 部署指南

将 ClawdBot.onl 部署到 Cloudflare Pages 的详细步骤。

## 📦 1. 准备工作：推送到 GitHub

Cloudflare Pages 需要从 Git 仓库拉取代码。

```powershell
# 1. 确保在项目根目录
cd d:\工作\web\clawdbot.onl

# 2. 初始化 Git（如果还没有）
git init

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "Ready for deployment"

# 5. 推送到 GitHub（替换为你的仓库地址）
# git remote add origin https://github.com/你的用户名/clawdbot-website.git
# git branch -M main
# git push -u origin main
```

## 🚀 2. Cloudflare 部署配置

1. **登录**: 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **导航**: 点击左侧 `Workers & Pages`
3. **新建**: 点击 `Create application` -> `Pages` -> `Connect to Git`
4. **选择仓库**: 选择 `clawdbot-website`
5. **配置构建**:
   - **Framework preset**: `None` (纯静态 HTML)
   - **Build command**: *(留空)*
   - **Build output directory**: `.` (或者不填，直接使用根目录)
6. **部署**: 点击 `Save and Deploy`

## 🌐 3. 绑定域名 (www.clawdbot.onl)

我们采用 **www 为主域名**，根域名自动跳转的策略。

### 3.1 在 Pages 中绑定 www
1. 进入 Cloudflare Pages 项目 -> `Custom domains`。
2. 点击 `Set up a custom domain`。
3. 输入 **`www.clawdbot.onl`** (注意带 www)。
4. 激活域名 (Activate)。

### 3.2 设置根域名重定向 (clawdbot.onl -> www)
为了让用户访问 `clawdbot.onl` 时自动跳转到 `www.clawdbot.onl`：

1. **添加 DNS A 记录**:
   - 进入 `DNS` -> `Records`。
   - 添加记录: Type `A`, Name `@`, Content `192.0.2.1`, Proxy status `Proxied` (橙色云)。

2. **设置重定向规则**:
   - 进入 `Rules` -> `Page Rules` (或 Redirect Rules)。
   - 创建新规则:
     - **URL Matches**: `clawdbot.onl/*`
     - **Setting**: `Forwarding URL` -> `301 Permanent Redirect`
     - **Destination**: `https://www.clawdbot.onl/$1`
   - 保存并部署。

## ⚙️ 4. 域名服务器 (Nameservers)
如果域名在其他注册商 (如 Porkbun)，需要将 Nameservers 修改为 Cloudflare 提供的地址 (例如 `brian.ns.cloudflare.com` 和 `hera.ns.cloudflare.com`)。

## 🛡️ 5. 推荐的 Cloudflare 设置

在 Cloudflare 控制台的网站设置中：

- **SSL/TLS**: 设置为 `Full (Strict)`
- **Speed -> Optimization**:
  - 开启 `Auto Minify` (HTML, CSS, JS)
  - 开启 `Brotli`
- **Caching**:
  - `Browser Cache TTL`: Respect Existing Headers 或 4 hours

## 🔄 5. 如何更新网站？

只需在这个文件夹运行：

```powershell
# 修改文件后...
git add .
git commit -m "更新说明"
git push
```

Cloudflare 会自动检测到 GitHub 的变动，并在几秒钟内自动重新部署！
