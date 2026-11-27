# AkarKu — Belajar Bentuk Akar, Langkah demi Langkah

Aplikasi pembelajaran matematika untuk siswa SMP kelas IX pada materi **bilangan bentuk akar**. Aplikasi ini dirancang berdasarkan **Cognitive Load Theory**, menumbuhkan **literasi matematika**, dan dikembangkan dengan model **ADDIE**.

> Penelitian pengembangan oleh **Siti Auliyaatunnisaa** (NIM 2225250085), S1 Pendidikan Matematika.

## 🔗 Buka Aplikasi

### **https://sitiauliyaatunnisaa.github.io/2225250085_Siti_Auliyaatunnisaa/**

Bisa dibuka di HP Android, iPhone, tablet, maupun laptop lewat browser (Chrome/Safari). Gratis, tanpa Play Store atau App Store.

---

## 📱 Cara Memakai (Siswa)

1. **Buka link** di atas di browser HP atau laptop.
2. **Isi nama panggilan** dan **kode siswa** (dari guru, boleh dikosongkan), lalu tekan **Mulai belajar**.
3. Di **Beranda**, pilih kegiatan:

| Menu | Isi |
|---|---|
| 📖 **Belajar** | Materi menyederhanakan bentuk akar, satu konsep per layar, contoh soal yang dibuka langkah demi langkah, kuis, dan refleksi |
| ✏️ **Latihan Soal** | Soal acak tingkat mudah, sedang, sulit, dengan petunjuk 3 tingkat dan pembahasan |
| 🏆 **Paket Soal** | 10 soal per tingkat (mudah, sedang, sulit). Nilai dan pembahasan muncul setelah selesai |
| 🌏 **Pojok Literasi** | Soal cerita bergambar dengan langkah Rumuskan → Kerjakan → Tafsirkan |
| 🧮 **Kalkulator Akar** | Menyederhanakan akar (kuadrat, pangkat 3, dst.), operasi, dan merasionalkan penyebut, lengkap dengan langkahnya |
| 📘 **Kartu Rumus** | Flashcard rumus, ketuk untuk melihat contoh |
| 🔢 **Tabel Kuadrat** | Tabel kuadrat yang bisa diatur sendiri |
| 📊 **Laporan** | Grafik perkembangan nilai dan unduh laporan PDF |
| 💬 **Tanya Si Akar** | Asisten AI yang membimbing cara berpikir, **tidak langsung memberi jawaban** |

4. **Bertanya ke Si Akar:** tekan **"Tanya Si Akar 💬"** di Beranda, atau tombol maskot di pojok atas halaman Belajar, Latihan, dan Pojok Literasi. Tulis pertanyaan atau jawabanmu, atau pilih tombol cepat seperti *"Beri aku petunjuk"*. Si Akar tidak tersedia saat mengerjakan kuis dan paket soal.
5. **Laporan PDF:** buka menu **📊 Laporan** → **Buat laporan PDF** → **Unduh PDF**.
6. **Ganti pengguna:** jika satu HP dipakai bergantian, tekan **👤 Ganti pengguna** di bagian bawah Beranda.

**Tips:** supaya mudah dibuka lagi, tambahkan AkarKu ke layar utama HP.
- **Android (Chrome):** menu ⋮ → **Tambahkan ke layar utama**.
- **iPhone (Safari):** tombol Bagikan → **Tambahkan ke Layar Utama**.

---

## 👩‍🏫 Cara Memakai (Guru/Pemilik)

**Melihat jawaban dan nilai siswa**
1. Di Beranda, tekan **Mode pemilik** (di bagian bawah), lalu buat PIN 4–6 angka.
2. Lihat ringkasan, daftar pengunjung, nilai, dan riwayat jawaban setiap siswa.
3. Unduh **Laporan PDF semua pengunjung**, atau **CSV** untuk diolah di Excel/Python.

> Di versi GitHub Pages, riwayat tersimpan di perangkat tempat siswa belajar. Untuk mengumpulkan riwayat semua HP secara otomatis ke Google Sheets, lihat [docs/13](AkarKu/docs/13-rekap-online-google-sheets.md).

**Asisten AI "Si Akar"**
- Si Akar memakai **OpenRouter** dengan model gratis **NVIDIA Nemotron 3 Ultra (free)** dan sudah aktif untuk semua pengunjung.
- API key **tidak disimpan di kode**. Key disimpan di **GitHub Secrets** dan dipasang otomatis saat situs diterbitkan.
- **Mengganti API key:** buat key baru di openrouter.ai/keys → buka **Settings → Secrets and variables → Actions** di repositori ini → ubah secret `OPENROUTER_API_KEY` → buka tab **Actions** → **Terbitkan AkarKu** → **Run workflow**.
- **Mengganti model:** tambahkan variable `OPENROUTER_MODEL` di halaman yang sama (contoh: `google/gemma-4-31b-it:free`), lalu jalankan ulang workflow.
- **Keamanan:** atur **Key limit** di OpenRouter (misalnya $1) dan pakai model `:free` saja. Key tetap terkirim ke browser pengunjung, jadi orang yang paham teknis bisa menemukannya.
- Rancangan pedagogis (bantuan bertingkat, beban kognitif, literasi, RMT Kinard & Kozulin): [docs/14](AkarKu/docs/14-asisten-ai-pedagogis.md).

---

## 🗂️ Struktur Proyek

```
AkarKu/
  app/index.html     # kerangka halaman
  app/style.css      # tampilan
  app/app.js         # seluruh logika aplikasi (JavaScript)
  app/config.js      # pengaturan Si Akar (key diisi otomatis dari GitHub Secrets)
  backend/Code.gs    # Google Apps Script (opsional): rekap online, PDF di Drive, AI lewat server
  build.sh           # menggabungkan app/* menjadi dist/index.html untuk Google Apps Script
  dist/index.html    # file gabungan hasil build.sh
  docs/              # dokumen perencanaan (01–14)
.github/workflows/pages.yml   # penerbitan otomatis ke GitHub Pages
```

## 🛠️ Pengembangan

- Ubah kode di `AkarKu/app/app.js` dan `AkarKu/app/style.css`, lalu **push ke branch `main`**. Situs diterbitkan ulang otomatis dalam ±1 menit.
- Untuk versi Google Apps Script, jalankan `bash AkarKu/build.sh`, lalu tempel `AkarKu/dist/index.html` ke file `index` di Apps Script.
- Bahasa: **JavaScript** (aplikasi dan Apps Script), **Python** (rencana analisis statistik penelitian, [docs/11](AkarKu/docs/11-analisis-statistik-python.md)).

## 📚 Dokumen

| File | Isi |
|---|---|
| [PRD.md](PRD.md) | Kebutuhan produk (Product Requirements Document) |
| [CLAUDE.md](CLAUDE.md) | Instruksi untuk asisten AI pengembang |
| [docs/01](AkarKu/docs/01-analisis-kebutuhan.md) | Analisis kebutuhan (hasil wawancara) |
| [docs/02](AkarKu/docs/02-desain-pembelajaran.md) | Desain pembelajaran dan strategi CLT |
| [docs/03](AkarKu/docs/03-arsitektur-teknis.md) | Arsitektur dan stack teknologi |
| [docs/04](AkarKu/docs/04-panduan-ui-ux.md) | Panduan tampilan |
| [docs/05](AkarKu/docs/05-spesifikasi-konten.md) | Isi materi, bank soal, dan paket soal |
| [docs/06](AkarKu/docs/06-roadmap-dan-tugas.md) | Roadmap dan daftar tugas |
| [docs/07](AkarKu/docs/07-rencana-evaluasi.md) | Rencana evaluasi dan instrumen |
| [docs/08](AkarKu/docs/08-storyboard.md) | Storyboard layar |
| [docs/09](AkarKu/docs/09-literasi-matematika.md) | Rancangan literasi matematika |
| [docs/10](AkarKu/docs/10-instalasi-tanpa-playstore.md) | Akses browser dan instalasi tanpa toko aplikasi |
| [docs/11](AkarKu/docs/11-analisis-statistik-python.md) | Analisis statistik dengan Python |
| [docs/12](AkarKu/docs/12-optimasi-smartphone.md) | Optimasi dan pengujian di smartphone |
| [docs/13](AkarKu/docs/13-rekap-online-google-sheets.md) | Rekap online semua pengunjung (Google Sheets) |
| [docs/14](AkarKu/docs/14-asisten-ai-pedagogis.md) | Asisten belajar AI "Si Akar" |

## Lisensi

Untuk keperluan akademik/penelitian.
