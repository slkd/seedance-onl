const fs = require('fs');
const path = require('path');

// 所有 HTML 文件
const files = [
    'index.html',
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
    'clawdbot-windows.html',
    'how-to-use-clawdbot.html'
];

// Favicon 链接代码
const faviconLinks = `    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="images/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
    <link rel="manifest" href="site.webmanifest">`;

let updated = 0;
let skipped = 0;

files.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 检查是否已经有 favicon
        if (content.includes('<!-- Favicon -->')) {
            console.log(`⏭️  Already has favicon: ${file}`);
            skipped++;
            return;
        }

        // 在 </head> 之前插入 favicon 链接
        const headCloseTag = '</head>';
        if (content.includes(headCloseTag)) {
            content = content.replace(headCloseTag, faviconLinks + '\n' + headCloseTag);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Added favicon: ${file}`);
            updated++;
        } else {
            console.log(`⚠️  No </head> tag found: ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
    }
});

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${updated} files`);
console.log(`   Skipped: ${skipped} files`);
console.log(`   Total: ${files.length} files`);
