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

// 旧的 favicon 代码（包含 SVG）
const oldFaviconPattern = /\s*<!-- Favicon -->\s*<link rel="icon" type="image\/svg\+xml" href="images\/favicon\.svg">\s*<link rel="icon" type="image\/png" sizes="32x32" href="images\/favicon-32x32\.png">\s*<link rel="icon" type="image\/png" sizes="16x16" href="images\/favicon-16x16\.png">\s*<link rel="apple-touch-icon" sizes="180x180" href="images\/apple-touch-icon\.png">\s*<link rel="manifest" href="site\.webmanifest">/g;

// 新的 favicon 代码（仅 PNG）
const newFavicon = `    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
    <link rel="manifest" href="site.webmanifest">`;

let updated = 0;

files.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');

        if (content.includes('<!-- Favicon -->')) {
            // 替换旧的 favicon 代码
            const newContent = content.replace(oldFaviconPattern, newFavicon);

            if (newContent !== content) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`✅ Updated favicon: ${file}`);
                updated++;
            } else {
                console.log(`⚠️  Pattern not matched: ${file}`);
            }
        } else {
            console.log(`⏭️  No favicon found: ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
    }
});

console.log(`\n📊 Summary: Updated ${updated}/${files.length} files`);
