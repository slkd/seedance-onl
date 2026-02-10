# 批量替换所有 HTML 文件中的 logo
$files = Get-ChildItem -Path "." -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 替换 logo div 为 logo link with image
    $oldPattern = '<div class="logo">🦞 ClawdBot\.onl</div>'
    $newPattern = '<a href="/" class="logo"><img src="images/logo.png" alt="ClawdBot Logo" class="logo-img"></a>'
    
    $newContent = $content -replace $oldPattern, $newPattern
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "No change: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`nLogo replacement complete!" -ForegroundColor Cyan
