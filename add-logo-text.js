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

// 旧的 logo HTML（只有图片）
const oldLogoPattern = /<a href="\/" class="logo">\s*<img src="images\/logo\.svg" alt="ClawdBot Logo" class="logo-img">\s*<\/a>/g;

// 新的 logo HTML（图片 + 文字）
const newLogo = `<a href="/" class="logo">
                    <img src="images/logo.svg" alt="ClawdBot Logo" class="logo-img">
                    <span class="logo-text">ClawdBot</span>
                </a>`;

let updated = 0;

files.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');

        const newContent = content.replace(oldLogoPattern, newLogo);

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
console.log(`✅ Added "ClawdBot" text next to logo icon`);
