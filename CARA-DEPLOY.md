# 📦 Cara Deploy Absensi HR sebagai PWA

## File yang Dibutuhkan
```
absensi-karyawan.html   ← Aplikasi utama
manifest.json           ← Konfigurasi PWA
sw.js                   ← Service Worker (offline support)
icon-192.png            ← Icon PWA
icon-512.png            ← Icon PWA (splash screen)
```

---

## 🥇 Rekomendasi 1: Netlify (TERMUDAH - Drag & Drop)

1. Buka https://app.netlify.com
2. Daftar gratis (bisa pakai Google/GitHub)
3. Pada dashboard → klik **"Add new site"** → **"Deploy manually"**
4. **Drag & drop** folder berisi semua file ke area upload
5. Selesai! Dapat URL seperti `https://nama-random.netlify.app`

✅ **Gratis selamanya** | ✅ HTTPS otomatis | ✅ Custom domain gratis

---

## 🥈 Rekomendasi 2: Vercel (Performa Terbaik)

1. Buka https://vercel.com → Sign up gratis
2. Klik **"Add New Project"** → **"Upload"** (tidak perlu Git)
3. Upload folder semua file
4. Deploy otomatis, dapat URL `https://nama.vercel.app`

✅ **Gratis** | ✅ CDN global (load cepat) | ✅ HTTPS otomatis

---

## 🥉 Rekomendasi 3: GitHub Pages (Untuk yang familiar Git)

1. Buat repository baru di https://github.com (nama bebas)
2. Upload semua file ke repository
3. Masuk Settings → Pages → Source: **Deploy from branch: main**
4. URL: `https://username.github.io/nama-repo/absensi-karyawan.html`

✅ **Gratis** | ✅ Kontrol penuh

---

## 📱 Cara Install PWA di HP (setelah upload)

### Android (Chrome):
1. Buka URL aplikasi di Chrome
2. Muncul banner **"Tambahkan ke layar utama"** → Ketuk Install
3. Atau: Menu (⋮) → **"Tambahkan ke layar utama"**

### iPhone (Safari):
1. Buka URL di Safari
2. Ketuk tombol **Share** (kotak dengan panah ↑)
3. Pilih **"Add to Home Screen"**
4. Beri nama → Tambahkan

### Desktop (Chrome/Edge):
1. Buka URL di browser
2. Klik ikon **Install** (⊕) di address bar kanan
3. Atau: Menu → **"Install Absensi HR"**

---

## ⚠️ Penting: HTTPS Wajib untuk Kamera
Kamera scan hanya berfungsi di HTTPS. Semua platform di atas sudah otomatis HTTPS.

---

## 🔒 Keamanan Data
- Semua data tersimpan di **localStorage browser** perangkat masing-masing
- Tidak ada data yang dikirim ke server manapun
- Untuk berbagi data antar perangkat, gunakan fitur Export Excel/PDF

