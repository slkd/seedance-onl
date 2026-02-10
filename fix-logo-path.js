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

let updated = 0;

files.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // 替换 logo.png 为 logo.svg
        const newContent = content.replace(/images\/logo\.png/g, 'images/logo.svg');

        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Updated: ${file}`);
            updated++;
        } else {
            console.log(`⏭️  No change: ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error: ${file}:`, error.message);
    }
});

console.log(`\n📊 Updated ${updated}/${files.length} files`);
console.log(`✅ Logo path changed from images/logo.png to images/logo.svg`);
