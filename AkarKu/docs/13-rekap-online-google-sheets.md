# 13 — AkarKu Online: Riwayat Semua Pengunjung secara Real-Time

Dengan panduan ini, **setiap orang yang membuka AkarKu dari HP mana pun otomatis tercatat**: nama, kunjungan, latihan, paket soal, dan nilainya. Pemilik melihat semuanya di **Mode Pemilik → 🌐 Semua perangkat** (diperbarui otomatis setiap 15 detik) atau langsung di Google Sheets.

> ⚠️ **Link claude.ai (versi demo) tidak bisa melakukan ini.** claude.ai melarang halaman mengirim data ke luar, sehingga Mode Pemilik di link demo hanya menampilkan pengunjung yang memakai perangkat yang sama. Gunakan link dari langkah A di bawah untuk siswa.

```
HP siswa ─┐
HP siswa ─┼──► Link AkarKu (Google Apps Script) ──► Google Sheets milikmu ──► Mode Pemilik (real-time)
HP siswa ─┘
```

Yang dibutuhkan: **akun Google saja**. Tidak perlu Netlify, tidak perlu server, gratis.

| File | Dipakai di mana |
|---|---|
| [backend/Code.gs](../backend/Code.gs) | Ditempel sebagai file **Code.gs** di Apps Script |
| [app/index.html](../app/index.html) | Ditempel sebagai file HTML **index** di Apps Script |

---

## A. Pasang AkarKu di Google (± 10 menit, cukup sekali)

1. Buka **sheets.google.com** → **Blank/Kosong** → beri nama **AkarKu – Riwayat**.
2. Menu **Ekstensi → Apps Script**. Tab baru terbuka.
3. **File Code.gs:** hapus semua isinya, lalu tempel seluruh isi `backend/Code.gs`.
4. Di fungsi `setup()`, ganti `GANTI-DENGAN-KUNCI-RAHASIAMU` dengan kunci rahasiamu sendiri, misalnya `akarku-Rahasia-2026` (minimal 8 karakter). **Catat kunci ini**, nanti dipakai di Mode Pemilik.
5. **File index:** klik tanda **+** di samping "File" → **HTML** → beri nama persis `index` (tanpa .html). Hapus isinya, lalu tempel **seluruh isi** `app/index.html` (buka di VS Code → Ctrl+A → Ctrl+C).
6. Klik **💾 Simpan proyek**.
7. Di bagian atas, pilih fungsi **setup** → klik **▶ Jalankan**.
   - Muncul permintaan izin: **Tinjau izin** → pilih akunmu → **Lanjutan** → **Buka … (tidak aman)** → **Izinkan**. Peringatan ini muncul karena skrip buatan sendiri belum diverifikasi Google. Skrip hanya menulis ke spreadsheet milikmu.
   - Cek spreadsheet: muncul sheet baru bernama **riwayat**.
8. Klik **Terapkan → Deployment baru** → ikon ⚙️ → **Aplikasi web**:
   - Deskripsi: `AkarKu v1`
   - Jalankan sebagai: **Saya**
   - Yang memiliki akses: **Siapa saja**
9. Klik **Terapkan** → salin **URL aplikasi web** (berakhiran `/exec`).

**URL `/exec` itulah link AkarKu** yang dibagikan ke siswa (bisa juga dijadikan kode QR untuk brosur, docs/10).

## B. Uji coba dengan 2 HP

1. **HP 1 (siswa):** buka link `/exec` → isi nama "Tes 1" → kerjakan 2 soal Latihan.
2. **HP 2 (siswa):** buka link yang sama → isi nama "Tes 2" → kerjakan Paket Soal Mudah sampai muncul nilai.
3. Buka spreadsheet → sheet **riwayat** → baris-baris aktivitas "Tes 1" dan "Tes 2" sudah masuk.
4. **HP/laptopmu (pemilik):** buka link `/exec` → di Beranda, tekan **Mode pemilik** → buat PIN → pilih **🌐 Semua perangkat** → isi **kunci rahasia** (langkah A.4) → **Tampilkan semua pengunjung**.
5. "Tes 1" dan "Tes 2" muncul dengan kunjungan, latihan, nilai, dan riwayat jawabannya. Biarkan halaman terbuka: jika HP 1 mengerjakan soal lagi, datanya muncul sendiri dalam ± 15 detik.
6. Hapus baris uji coba di spreadsheet sebelum dipakai siswa sungguhan.

## C. Jika `app/index.html` atau `Code.gs` diubah

1. Tempel ulang isi file yang berubah di Apps Script → **Simpan**.
2. **Terapkan → Kelola deployment → ✏️ Edit → Versi: Versi baru → Terapkan.**
3. Link `/exec` **tetap sama**, jadi siswa tidak perlu link baru.

> Jika langkah 2 terlewat, siswa masih melihat versi lama.

## D. Cara kerja

- Setiap aktivitas siswa (kunjungan, jawaban latihan, kuis, paket soal, literasi, refleksi, kalkulator) dikirim ± 1,5 detik setelah terjadi.
- Jika HP **offline**, aktivitas disimpan dulu di HP, lalu dikirim otomatis saat internet tersambung (dicek setiap 20 detik dan setiap kali aplikasi dibuka).
- Kiriman ulang tidak dicatat dua kali (setiap aktivitas punya `id` unik).
- Mode Pemilik → 🌐 Semua perangkat memuat ulang data **setiap 15 detik** selama halaman terbuka.
- Kunci rahasia hanya ada di Apps Script dan di perangkat pemilik, **tidak ada di kode aplikasi**. Tanpa kunci, orang lain tidak bisa membaca data walaupun tahu link-nya.
- Di bagian atas link Google, ada tulisan kecil "Aplikasi ini dibuat oleh pengguna Google Apps Script". Itu normal.
- **Laporan PDF**: saat siswa atau pemilik menekan "Buat laporan PDF", file disimpan sementara di folder Google Drive **AkarKu - Laporan PDF** milikmu dan muncul tombol **Unduh** / **Lihat** yang bisa dibuka di Android maupun iPhone. File dihapus otomatis setelah 3 hari.
- Setelah memperbarui `Code.gs` versi ini, **jalankan `setup()` sekali lagi** agar Google meminta izin akses Drive, lalu terapkan **versi baru** (langkah C).

## E. Alternatif: publikasi di Netlify (opsional)

Jika ingin alamat sendiri (misalnya `akarku-siti.netlify.app`): tetap lakukan langkah A, lalu isi `CONFIG.SYNC_URL` di `app/index.html` dengan URL `/exec`, dan unggah folder `app` ke **app.netlify.com/drop**. Data tetap masuk ke Google Sheets yang sama.

## F. Etika dan privasi (wajib untuk penelitian)

- Halaman awal aplikasi menampilkan pemberitahuan bahwa nama, kunjungan, jawaban, dan nilai tercatat dan dapat dilihat pemilik aplikasi.
- Minta **izin sekolah dan persetujuan orang tua/siswa**, serta persetujuan dosen pembimbing, sebelum uji coba.
- Sarankan siswa memakai **nama panggilan dan kode siswa** (S01, S02, …).
- Jangan membagikan spreadsheet ke orang lain. Hapus data setelah penelitian selesai.

## G. Masalah yang sering terjadi

| Masalah | Penyebab dan solusi |
|---|---|
| Membuka link muncul error "index tidak ditemukan" | File HTML belum dibuat atau namanya bukan persis `index` |
| Tombol "🌐 Semua perangkat" tidak muncul | Aplikasi dibuka dari link claude.ai atau dari file di komputer, bukan dari link `/exec` |
| Sheet "riwayat" tidak bertambah | Akses deployment bukan **Siapa saja**, atau versi baru belum diterapkan (langkah C.2) |
| "Kunci rahasia salah" | Kunci berbeda dengan yang di `setup()`. Ganti kunci di `setup()`, jalankan `setup()` lagi |
| Data pengunjung lama (dari link claude.ai) tidak muncul | Data itu hanya tersimpan di HP masing-masing dan tidak bisa dipindahkan. Mulai pengumpulan data dari link `/exec` |
