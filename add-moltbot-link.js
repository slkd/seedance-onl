const fs = require('fs');
const path = require('path');

// 要添加的链接
const moltbotLink = `                <p>Also check out: <a href="https://www.moltbotai.onl/" target="_blank" rel="noopener">MoltBot AI Assistant</a></p>\r\n`;

// 获取所有 HTML 文件
const htmlFiles = [
    'index.html',
    'how-to-use-clawdbot.html',
    'clawdbot-app.html',
    'clawdbot-aws.html',
    'clawdbot-browser.html',
    'clawdbot-claude.html',
    'clawdbot-discord.html',
    'clawdbot-docker.html',
    'clawdbot-gateway.html',
    'clawdbot-gemini.html',
    'clawdbot-github.html',
    'clawdbot-install.html',
    'clawdbot-linux.html',
    'clawdbot-mac-mini.html',
    'clawdbot-mac.html',
    'clawdbot-models.html',
    'clawdbot-pricing.html',
    'clawdbot-reddit.html',
    'clawdbot-requirements.html',
    'clawdbot-review.html',
    'clawdbot-skills.html',
    'clawdbot-telegram.html',
    'clawdbot-whatsapp.html',
    'clawdbot-windows.html'
];

let successCount = 0;
let skipCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);

    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  文件不存在: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 检查是否已经包含 MoltBot 链接
    if (content.includes('moltbotai.onl')) {
        console.log(`⏭️  跳过 (已存在): ${file}`);
        skipCount++;
        return;
    }

    // 在 footer-bottom 的最后一个 </p> 之后、</div> 之前插入链接
    // 查找 footer-bottom 部分
    const footerBottomRegex = /(<div class="footer-bottom">[\s\S]*?<\/p>)\r?\n(\s*<\/div>)/;

    if (footerBottomRegex.test(content)) {
        content = content.replace(footerBottomRegex, `$1\r\n${moltbotLink}$2`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 已添加: ${file}`);
        successCount++;
    } else {
        console.log(`❌ 未找到 footer-bottom 结构: ${file}`);
    }
});

console.log(`\n📊 总结:`);
console.log(`   ✅ 成功添加: ${successCount} 个文件`);
console.log(`   ⏭️  已跳过: ${skipCount} 个文件`);
console.log(`   📁 总文件数: ${htmlFiles.length} 个`);
