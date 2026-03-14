#!/bin/bash
# Script to copy images from img_kef repo to public/images/
# Run from the webapp root directory

IMG_SRC="/home/user/img_kef"
IMG_DST="public/images"

echo "Copying images from $IMG_SRC to $IMG_DST..."

# ── Hero images (first 3 event photos sorted alphabetically)
hero_i=0
for f in "$IMG_SRC/Event photos/"*.webp; do
  hero_i=$((hero_i+1))
  cp "$f" "$IMG_DST/hero/hero-${hero_i}.webp"
  [ $hero_i -ge 3 ] && break
done

# ── Event photos (ALL 82 images)
i=1
for f in "$IMG_SRC/Event photos/"*.webp; do
  cp "$f" "$IMG_DST/events/event-${i}.webp"
  i=$((i+1))
done

# ── Wedding photos (ALL 18 images)
i=1
for f in "$IMG_SRC/Wedding photos/"*.webp; do
  cp "$f" "$IMG_DST/weddings/wedding-${i}.webp"
  i=$((i+1))
done

# ── Distributions/presentations (5 images)
i=1
for f in "$IMG_SRC/Distributions and presentations/"*.webp; do
  cp "$f" "$IMG_DST/distributions/dist-${i}.webp"
  i=$((i+1))
  [ $i -gt 5 ] && break
done

# ── Services: Male > Hosts > Hizam
i=1
for f in "$IMG_SRC/images-kef/الازياء الرجالي/مضيفين/حزام/"*.webp; do
  cp "$f" "$IMG_DST/services/male/hosts/hizam/hizam-${i}.webp"
  i=$((i+1))
done

# ── Services: Male > Hosts > Dagla
i=1
for f in "$IMG_SRC/images-kef/الازياء الرجالي/مضيفين/دقله/"*.webp; do
  cp "$f" "$IMG_DST/services/male/hosts/dagla/dagla-${i}.webp"
  i=$((i+1))
done

# ── Services: Male > Hosts > Dagla w Janbiya
i=1
for f in "$IMG_SRC/images-kef/الازياء الرجالي/مضيفين/دقله وجنبيه/"*.webp; do
  cp "$f" "$IMG_DST/services/male/hosts/dagla-janbiya/dagla-janbiya-${i}.webp"
  i=$((i+1))
done

# ── Services: Male > Hosts > Sideriya
i=1
for f in "$IMG_SRC/images-kef/الازياء الرجالي/مضيفين/سديريه/"*.webp; do
  cp "$f" "$IMG_DST/services/male/hosts/sideriya/sideriya-${i}.webp"
  i=$((i+1))
done

# ── Services: Male > Hosts > Makkawi
i=1
for f in "$IMG_SRC/images-kef/الازياء الرجالي/مضيفين/مكاوي/"*.webp; do
  cp "$f" "$IMG_DST/services/male/hosts/makkawi/makkawi-${i}.webp"
  i=$((i+1))
done

# ── Services: Male > Safarjia
i=1
for f in "$IMG_SRC/images-kef/الازياء الرجالي/سفرجيه/"*.webp; do
  cp "$f" "$IMG_DST/services/male/safarjia/safarjia-${i}.webp"
  i=$((i+1))
done

# ── Services: Male > Sawas (both locations)
i=1
for f in "$IMG_SRC/images-kef/الازياء الرجالي/سواس/"*.webp; do
  cp "$f" "$IMG_DST/services/male/sawas/sawas-${i}.webp"
  i=$((i+1))
done
for f in "$IMG_SRC/images-kef/سواس/"*.webp; do
  cp "$f" "$IMG_DST/services/male/sawas/sawas-${i}.webp"
  i=$((i+1))
done

# ── Services: Male > Souqiya
i=1
for f in "$IMG_SRC/images-kef/الازياء الرجالي/سوقيا/"*.webp; do
  cp "$f" "$IMG_DST/services/male/souqiya/souqiya-${i}.webp"
  i=$((i+1))
done

# ── Services: Female
i=1
for f in "$IMG_SRC/images-kef/الازياء النسائي/"*.webp; do
  cp "$f" "$IMG_DST/services/female/female-${i}.webp"
  i=$((i+1))
done

# ── Services: Artistic > Artist (Painters)
i=1
for f in "$IMG_SRC/images-kef/الرسامين/"*.webp; do
  cp "$f" "$IMG_DST/services/artistic/artist/artist-${i}.webp"
  i=$((i+1))
done

# ── Services: Artistic > Folk Band
i=1
for f in "$IMG_SRC/images-kef/الفريق الشعبيه/"*.webp; do
  cp "$f" "$IMG_DST/services/artistic/folkband/folkband-${i}.webp"
  i=$((i+1))
done

# ── Services: Artistic > Heritage Tent
i=1
for f in "$IMG_SRC/images-kef/الخيمه التراثيه/"*.webp; do
  cp "$f" "$IMG_DST/services/artistic/heritage-tent/tent-${i}.webp"
  i=$((i+1))
done

# ── Services: Artistic > Counter
i=1
for f in "$IMG_SRC/images-kef/كاونتر استقبال/"*.webp; do
  cp "$f" "$IMG_DST/services/artistic/counter/counter-${i}.webp"
  i=$((i+1))
done

# ── Services: Artistic > Photo Booth
i=1
for f in "$IMG_SRC/images-kef/الفوتو بوث/"*.webp; do
  cp "$f" "$IMG_DST/services/artistic/photo-booth/photo-booth-${i}.webp"
  i=$((i+1))
done

# ── Services: Artistic > Buffet
i=1
for f in "$IMG_SRC/images-kef/البوفيه المفتوحه/"*.webp; do
  cp "$f" "$IMG_DST/services/artistic/buffet/buffet-${i}.webp"
  i=$((i+1))
done

# ── Services: Artistic > Mobile Table
i=1
for f in "$IMG_SRC/images-kef/طاولة الخدمه/"*.webp; do
  cp "$f" "$IMG_DST/services/artistic/mobile-table/table-${i}.webp"
  i=$((i+1))
done

# ── Equipment (ALL 21 images)
i=1
for f in "$IMG_SRC/images-kef/العده/"*.webp; do
  cp "$f" "$IMG_DST/equipment/equip-${i}.webp"
  i=$((i+1))
done

# ── Partners logos
i=1
for f in "$IMG_SRC/Images of company logos/"*.webp; do
  cp "$f" "$IMG_DST/partners/partner-${i}.webp"
  i=$((i+1))
done

echo "Done! Counting copied images..."
TOTAL=$(find "$IMG_DST" -name "*.webp" | wc -l)
echo "$TOTAL images copied successfully."
