# 使用 logo.png 生成各种尺寸的 favicon
# 需要安装 ImageMagick: choco install imagemagick

$logoPath = "images/logo.png"

if (Test-Path $logoPath) {
    Write-Host "✅ 找到 logo.png，开始生成 favicon..." -ForegroundColor Green
    
    # 生成各种尺寸
    $sizes = @(
        @{Size="16x16"; Output="images/favicon-16x16.png"},
        @{Size="32x32"; Output="images/favicon-32x32.png"},
        @{Size="180x180"; Output="images/apple-touch-icon.png"},
        @{Size="192x192"; Output="images/icon-192.png"},
        @{Size="512x512"; Output="images/icon-512.png"}
    )
    
    foreach ($item in $sizes) {
        $cmd = "magick `"$logoPath`" -resize $($item.Size) `"$($item.Output)`""
        Write-Host "生成 $($item.Size)..." -ForegroundColor Cyan
        Invoke-Expression $cmd
    }
    
    # 复制 32x32 作为默认 favicon.ico
    Copy-Item "images/favicon-32x32.png" "favicon.ico" -Force
    
    Write-Host "`n✅ 所有 favicon 生成完成！" -ForegroundColor Green
} else {
    Write-Host "❌ 未找到 logo.png" -ForegroundColor Red
}
