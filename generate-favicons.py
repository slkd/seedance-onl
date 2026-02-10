from PIL import Image
import os

# 源 logo 文件
logo_path = "images/logo.png"

# 检查文件是否存在
if not os.path.exists(logo_path):
    print(f"❌ 错误: 找不到 {logo_path}")
    exit(1)

print(f"✅ 找到 logo: {logo_path}")

# 打开原始 logo
try:
    logo = Image.open(logo_path)
    print(f"📐 原始尺寸: {logo.size}")
    
    # 如果有透明通道，保留它；否则转换为 RGBA
    if logo.mode != 'RGBA':
        logo = logo.convert('RGBA')
    
except Exception as e:
    print(f"❌ 无法打开图片: {e}")
    exit(1)

# 需要生成的尺寸
sizes = [
    (16, 16, "images/favicon-16x16.png"),
    (32, 32, "images/favicon-32x32.png"),
    (180, 180, "images/apple-touch-icon.png"),
    (192, 192, "images/icon-192.png"),
    (512, 512, "images/icon-512.png"),
]

# 生成各种尺寸
for width, height, output_path in sizes:
    try:
        # 使用高质量的 LANCZOS 重采样
        resized = logo.resize((width, height), Image.Resampling.LANCZOS)
        resized.save(output_path, 'PNG', optimize=True)
        print(f"✅ 生成: {output_path} ({width}x{height})")
    except Exception as e:
        print(f"❌ 生成失败 {output_path}: {e}")

print("\n🎉 所有 favicon 生成完成！")
print("\n📂 生成的文件:")
for _, _, path in sizes:
    if os.path.exists(path):
        size = os.path.getsize(path)
        print(f"   ✅ {path} ({size} bytes)")
