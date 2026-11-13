# 10 — Akses dan Instalasi Tanpa Play Store / App Store

## 1. Tiga Cara Mengakses AkarKu

| Cara | Perangkat | Perlu toko aplikasi? | Bisa offline? | Rekomendasi |
|---|---|---|---|---|
| **A. Buka di browser** | Semua (HP, tablet, laptop) | Tidak | Ya, setelah dibuka sekali | Untuk mencoba |
| **B. Pasang sebagai aplikasi (PWA)** | Android, iPhone/iPad, Windows, Mac, Chromebook | **Tidak** | Ya | ⭐ **Cara utama** |
| **C. Unduh file APK** | Android saja | **Tidak** | Ya | Untuk dibagikan lewat WhatsApp/flashdisk |

Ketiganya memakai **kode JavaScript yang sama**, jadi tidak perlu membuat aplikasi terpisah.

## 2. Mengapa PWA?

- Cukup satu tautan, misalnya `https://akarku.netlify.app` (contoh).
- Setelah dipasang, ikon AkarKu muncul di layar utama, terbuka layar penuh tanpa bilah alamat, dan terasa seperti aplikasi biasa.
- Ukurannya kecil (± 1–3 MB) dibandingkan APK (± 5–10 MB).
- **Pembaruan otomatis**: saat peneliti memperbaiki materi, siswa mendapat versi terbaru tanpa install ulang.
- Gratis: tanpa biaya akun pengembang Google Play maupun Apple.

## 3. Kebutuhan Fitur (PRD F9)

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F9.1 | Tombol **"📲 Pasang Aplikasi"** di Beranda jika perangkat mendukung (Android/Chrome/Edge). Tombol disembunyikan jika aplikasi sudah terpasang | P0 |
| F9.2 | Halaman **"Cara Memasang"** yang otomatis mendeteksi perangkat (Android, iPhone, laptop) dan menampilkan langkah bergambar sesuai perangkat | P0 |
| F9.3 | Tautan **unduh APK** di halaman Cara Memasang, disertai ukuran file, versi, dan panduan izin instal | P1 |
| F9.4 | **Kode QR** menuju tautan aplikasi untuk dicetak di brosur, poster, atau slide kelas | P0 |
| F9.5 | Pemberitahuan **"Versi baru tersedia"** dengan tombol muat ulang. Progres siswa tidak hilang | P0 |
| F9.6 | Indikator status **offline** kecil ("Mode offline — progres tetap tersimpan") | P1 |

## 4. Panduan Instal untuk Siswa (bisa dicetak di brosur)

### 📱 Android (Chrome)
1. Pindai kode QR atau buka tautan AkarKu di **Chrome**.
2. Ketuk tombol **"Pasang Aplikasi"** di beranda AkarKu.
   *(Atau ketuk menu ⋮ di kanan atas, lalu pilih **"Instal aplikasi"/"Tambahkan ke layar utama"**.)*
3. Ketuk **Instal**. Ikon AkarKu muncul di layar utama.

### 🍎 iPhone / iPad (Safari)
1. Buka tautan AkarKu di **Safari** (bukan Chrome).
2. Ketuk tombol **Bagikan** (kotak dengan panah ke atas).
3. Pilih **"Tambahkan ke Layar Utama"**, lalu ketuk **Tambah**.

### 💻 Laptop (Chrome / Edge)
1. Buka tautan AkarKu.
2. Klik ikon **instal** (⊕ atau monitor dengan panah) di ujung kanan bilah alamat.
3. Klik **Instal**. AkarKu terbuka sebagai jendela aplikasi.

### 📦 File APK (Android, opsional)
1. Unduh `akarku.apk` dari halaman "Cara Memasang" atau dari guru.
2. Buka file tersebut. Jika muncul peringatan, ketuk **Setelan → izinkan "Instal aplikasi tidak dikenal"** untuk browser/WhatsApp/File Manager.
3. Ketuk **Instal**.
> APK hanya dibagikan dari sumber resmi peneliti/guru. Sertakan *checksum* SHA-256 di halaman unduhan.

## 5. Desain Brosur (Template)

```
┌───────────────────────────────────────┐
│   √ AkarKu                            │
│   Belajar Bentuk Akar,                │
│   Langkah demi Langkah                │
│                                       │
│   ✓ Contoh soal bertahap              │
│   ✓ Latihan dengan petunjuk           │
│   ✓ Soal literasi dari kehidupan nyata│
│   ✓ Bisa dipakai tanpa internet       │
│                                       │
│   ┌─────────┐  Pindai untuk membuka   │
│   │ QR CODE │  akarku.netlify.app     │
│   └─────────┘                         │
│                                       │
│   Cara pasang:                        │
│   Android → "Pasang Aplikasi"         │
│   iPhone  → Bagikan → Layar Utama     │
│                                       │
│   Gratis · Tanpa Play Store           │
│   Siti Auliyaatunnisaa — Pend. Mat.   │
└───────────────────────────────────────┘
```

Kode QR dapat dibuat dengan Python (`qrcode`, lihat [11-analisis-statistik-python.md §6](11-analisis-statistik-python.md)) atau generator QR daring.

## 6. Langkah Teknis Publikasi (untuk Peneliti)

### 6.1 Web dan PWA
```bash
npm run build                 # hasil di dist/
# Pilih salah satu:
npx netlify deploy --prod --dir=dist     # Netlify
# atau push ke GitHub dan aktifkan GitHub Pages (via GitHub Actions)
```
Periksa di Chrome DevTools → **Lighthouse → PWA**: harus berstatus *Installable*.

### 6.2 APK (opsional)
```bash
npm run build
npx cap add android           # sekali saja
npx cap sync android
npx cap open android          # Android Studio → Build → Generate Signed Bundle/APK → APK
```
Salin APK rilis ke `public/apk/akarku.apk` atau unggah ke GitHub Releases, lalu perbarui tautan di halaman "Cara Memasang".

## 7. Daftar Uji Instalasi

- [ ] Tautan terbuka di Chrome Android, Safari iPhone, dan Chrome/Edge laptop
- [ ] Tombol "Pasang Aplikasi" muncul di Android dan hilang setelah terpasang
- [ ] Panduan iPhone tampil di Safari
- [ ] Setelah dipasang, aplikasi terbuka layar penuh dengan ikon yang benar
- [ ] Mode pesawat: semua modul, latihan, dan progres tetap berfungsi
- [ ] Pembaruan versi: notifikasi muncul dan progres tidak hilang
- [ ] APK terpasang di minimal 1 HP Android fisik (Android 8+)
- [ ] Kode QR di brosur mengarah ke tautan yang benar

## 8. Risiko

| Risiko | Mitigasi |
|---|---|
| Siswa memakai browser bawaan HP yang tidak mendukung instal PWA | Halaman "Cara Memasang" menyarankan membuka di Chrome. Aplikasi tetap bisa dipakai di browser biasa |
| Data PWA terhapus jika siswa menghapus data browser | Peringatan di Pengaturan dan tombol ekspor cadangan progres |
| iPhone menghapus data PWA yang lama tidak dibuka | Peneliti mengekspor data segera setelah sesi uji coba |
| APK diblokir Play Protect | Tanda tangani APK rilis dan jelaskan langkah "tetap instal". Utamakan PWA |
