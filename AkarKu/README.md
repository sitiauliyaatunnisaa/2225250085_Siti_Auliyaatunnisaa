# AkarKu — Belajar Bentuk Akar, Langkah demi Langkah

Aplikasi pembelajaran matematika untuk siswa SMP kelas IX pada materi **bilangan bentuk akar**. Aplikasi ini dirancang berdasarkan **Cognitive Load Theory** dan dikembangkan dengan model **ADDIE**.

> Penelitian pengembangan oleh **Siti Auliyaatunnisaa** (NIM 2225250085), S1 Pendidikan Matematika.

## Fitur Utama

- **Belajar**: materi singkat (satu konsep per layar) dan contoh soal yang dibuka langkah demi langkah
- **Latihan**: soal mandiri dari mudah ke sulit, petunjuk 3 tingkat, dan umpan balik langsung
- **Kartu Rumus**: rumus dan tabel kuadrat sempurna yang bisa dibuka kapan saja
- **Literasi Matematika**: pembuka kontekstual, Pojok Literasi, dan siklus Rumuskan → Kerjakan → Tafsirkan pada konteks personal, sosial budaya, dan saintifik
- **Progres dan Refleksi**: skor, kesalahan yang sering terjadi, dan skala kesulitan
- **Dibuka di browser** dan **dapat diinstal tanpa Play Store/App Store** (PWA di Android, iPhone, dan laptop; APK opsional), serta dapat dipakai **offline**

## Bahasa Pemrograman

| Bahasa | Untuk |
|---|---|
| **JavaScript** | Aplikasi siswa (data umum): React + Vite, PWA |
| **Python** | Analisis data statistik penelitian: validasi ahli, N-gain, beban kognitif, literasi |

## Status

📋 **Fase Design (ADDIE)**: dokumen perencanaan sudah tersedia; kode belum dibuat.

## Dokumen

| File | Isi |
|---|---|
| [PRD.md](PRD.md) | Kebutuhan produk (Product Requirements Document) |
| [CLAUDE.md](CLAUDE.md) | Instruksi untuk asisten AI pengembang |
| [docs/01-analisis-kebutuhan.md](docs/01-analisis-kebutuhan.md) | Analisis kebutuhan (hasil wawancara) |
| [docs/02-desain-pembelajaran.md](docs/02-desain-pembelajaran.md) | Desain pembelajaran dan strategi CLT |
| [docs/03-arsitektur-teknis.md](docs/03-arsitektur-teknis.md) | Arsitektur dan stack teknologi |
| [docs/04-panduan-ui-ux.md](docs/04-panduan-ui-ux.md) | Panduan tampilan |
| [docs/05-spesifikasi-konten.md](docs/05-spesifikasi-konten.md) | Isi materi dan bank soal |
| [docs/06-roadmap-dan-tugas.md](docs/06-roadmap-dan-tugas.md) | Roadmap dan daftar tugas |
| [docs/07-rencana-evaluasi.md](docs/07-rencana-evaluasi.md) | Rencana evaluasi dan instrumen |
| [docs/08-storyboard.md](docs/08-storyboard.md) | Storyboard layar |
| [docs/09-literasi-matematika.md](docs/09-literasi-matematika.md) | Rancangan literasi matematika |
| [docs/10-instalasi-tanpa-playstore.md](docs/10-instalasi-tanpa-playstore.md) | Akses browser, instal tanpa toko aplikasi, dan template brosur |
| [docs/11-analisis-statistik-python.md](docs/11-analisis-statistik-python.md) | Analisis statistik dengan Python |
| [docs/12-optimasi-smartphone.md](docs/12-optimasi-smartphone.md) | Optimasi dan pengujian di smartphone |
| [docs/13-rekap-online-google-sheets.md](docs/13-rekap-online-google-sheets.md) | Rekap online semua pengunjung (Google Sheets) |

## Cara Memakai (Siswa)

1. Pindai kode QR di brosur atau buka tautan AkarKu di browser.
2. **Android/laptop:** ketuk **"Pasang Aplikasi"**. **iPhone:** Safari → Bagikan → **Tambahkan ke Layar Utama**.
3. Buka AkarKu dari ikon di layar utama. Aplikasi tetap bisa dipakai tanpa internet.

## Menjalankan (Pengembang, setelah kode dibuat)

Prasyarat: Node.js 20+ dan Python 3.11+.

```bash
# Aplikasi (JavaScript)
npm install
npm run dev           # buka http://localhost:5173
npm run build         # hasil di dist/, unggah ke GitHub Pages/Netlify

# Analisis statistik (Python)
cd analisis
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python jalankan_semua.py
```

APK opsional: `npx cap sync android` lalu build di Android Studio (lihat docs/10 §6.2).

## Lisensi

Untuk keperluan akademik/penelitian.
