const fs = require('fs');
const path = require('path');

// 要替换的文件列表（除了 index.html 已经手动更新）
const files = [
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

const oldLogo = '                <div class="logo">🦞 ClawdBot.onl</div>';
const newLogo = `                <a href="/" class="logo">
                    <img src="images/logo.png" alt="ClawdBot Logo" class="logo-img">
                </a>`;

let updated = 0;
let errors = 0;

files.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes(oldLogo)) {
            content = content.replace(oldLogo, newLogo);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${file}`);
            updated++;
        } else {
            console.log(`⚠️  No match: ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        errors++;
    }
});

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${updated} files`);
console.log(`   Errors: ${errors} files`);
console.log(`   Total: ${files.length} files`);
