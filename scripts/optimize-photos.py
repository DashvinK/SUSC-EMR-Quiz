"""One-off: downsample the raw department photos in resources/ into web-ready
JPEGs under public/assets/departments/<slug>/. Long edge capped at 1400px,
quality 82. Run: python scripts/optimize-photos.py
"""
import os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "resources")
OUT = os.path.join(ROOT, "public", "assets", "departments")
MAX_EDGE = 1400
QUALITY = 82

# (source folder, slug, [(source filename, output basename), ...])
MAP = {
    "AA": ("academic-affairs", [
        ("ff1.JPG", "freshman-fiesta-1"),
        ("ff2.JPG", "freshman-fiesta-2"),
        ("hiredly1.JPG", "internedge-1"),
        ("hiredly2.JPG", "internedge-2"),
        ("hiredly3.JPG", "internedge-3"),
        ("hiredly4.JPG", "internedge-4"),
    ]),
    "EC": ("extracurricular", [
        ("councilroyal1.JPG", "council-royale-1"),
        ("councilroyale2.JPG", "council-royale-2"),
        ("cuppa1.JPG", "cuppa-coffee-1"),
        ("cuppa2.JPG", "cuppa-coffee-2"),
        ("cuppa3.JPG", "cuppa-coffee-3"),
        ("cns1.jpg", "cns-carnival-1"),
        ("cns2.JPG", "cns-carnival-2"),
    ]),
    "ER": ("external-relations", [
        ("bob-29.jpg", "battle-of-the-brains-1"),
        ("bob-40.jpg", "battle-of-the-brains-2"),
        ("bob-110.jpg", "battle-of-the-brains-3"),
        ("bob-170.jpg", "battle-of-the-brains-4"),
    ]),
    "PR": ("public-relations", [
        ("pr1.JPG", "public-relations-1"),
        ("pr2.JPG", "public-relations-2"),
    ]),
    "SR": ("student-relations", [
        ("ff3.JPG", "freshman-fiesta-1"),
        ("ff4.JPG", "freshman-fiesta-2"),
        ("welfare wave1.JPG", "welfare-wave-1"),
        ("welfare wave2.JPG", "welfare-wave-2"),
    ]),
}


def main():
    total_before = total_after = 0
    for folder, (slug, files) in MAP.items():
        out_dir = os.path.join(OUT, slug)
        os.makedirs(out_dir, exist_ok=True)
        for src_name, out_base in files:
            src_path = os.path.join(SRC, folder, src_name)
            if not os.path.exists(src_path):
                print(f"  MISSING: {src_path}")
                continue
            out_path = os.path.join(out_dir, out_base + ".jpg")
            before = os.path.getsize(src_path)
            with Image.open(src_path) as im:
                im = ImageOps.exif_transpose(im)  # respect camera rotation
                im = im.convert("RGB")
                im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
                im.save(out_path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
            after = os.path.getsize(out_path)
            total_before += before
            total_after += after
            print(f"  {slug}/{out_base}.jpg  {before//1024}KB -> {after//1024}KB")
    print(f"\nTotal: {total_before//1024//1024}MB -> {total_after//1024}KB")


if __name__ == "__main__":
    main()
