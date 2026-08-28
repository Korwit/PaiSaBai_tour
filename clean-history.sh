#!/bin/bash

# Script เพื่อลบไฟล์ .env ออกจาก git history

echo "🔧 กำลังลบไฟล์ server/.env ออกจาก history..."

# ติดตั้ง git-filter-repo ถ้ายังไม่มี
if ! command -v git-filter-repo &> /dev/null; then
    echo "📦 ติดตั้ง git-filter-repo..."
    pip install git-filter-repo
fi

# ลบไฟล์ออก
git filter-repo --invert-paths --path server/.env

echo "✅ ลบไฟล์เรียบร้อย"
echo ""
echo "⚠️  ต้อง force push กลับไป:"
echo "   git push origin --force --all"
echo "   git push origin --force --tags"
