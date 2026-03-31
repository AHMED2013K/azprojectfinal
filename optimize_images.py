import os
from PIL import Image

public_dir = '/home/ahmed/Bureau/edugrowth/public'
images_to_optimize = [
    'favicon Vizo.png',
    'only logo vizo .png',
    'Simplified logo ful.png',
    'Submark.png',
    'abraod.jpeg'
]

def optimize_image(filename):
    filepath = os.path.join(public_dir, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return

    img = Image.open(filepath)
    name, ext = os.path.splitext(filename)
    
    # Save as WebP
    webp_path = os.path.join(public_dir, name + '.webp')
    
    # Resize if too large
    max_size = (1200, 1200)
    if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
        img.thumbnail(max_size, Image.LANCZOS)
    
    img.save(webp_path, 'WEBP', quality=80)
    print(f"Optimized {filename} to {name}.webp")

    # Also optimize the original if it's PNG
    if ext.lower() == '.png':
        img.save(filepath, 'PNG', optimize=True)
        print(f"Optimized original PNG: {filename}")
    elif ext.lower() in ['.jpg', '.jpeg']:
        img.save(filepath, 'JPEG', quality=85, optimize=True)
        print(f"Optimized original JPEG: {filename}")

if __name__ == "__main__":
    for img_name in images_to_optimize:
        optimize_image(img_name)
