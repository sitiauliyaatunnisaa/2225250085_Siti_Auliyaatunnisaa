# CLAUDE.md

Panduan untuk Claude Code (dan asisten AI lain) saat mengembangkan proyek ini. **Baca seluruh file ini sebelum menulis kode.**

## Tentang Proyek

**AkarKu** adalah aplikasi belajar **bilangan bentuk akar** untuk siswa SMP kelas IX. Aplikasi **dibuka di browser** dan **dapat diinstal tanpa Play Store/App Store** (PWA, dengan APK unduhan langsung sebagai opsi). Proyek ini merupakan bagian dari penelitian pengembangan (model **ADDIE**) mahasiswa S1 Pendidikan Matematika, dengan landasan **Cognitive Load Theory (CLT)**. Aplikasi ini juga bertujuan **menumbuhkembangkan literasi matematika** (kerangka PISA dan AKM Numerasi) melalui siklus Rumuskan → Kerjakan → Tafsirkan pada konteks nyata.

Sumber kebenaran:
- Kebutuhan produk: [PRD.md](PRD.md)
- Dasar pedagogis: [docs/01-analisis-kebutuhan.md](AkarKu/docs/01-analisis-kebutuhan.md), [docs/02-desain-pembelajaran.md](AkarKu/docs/02-desain-pembelajaran.md)
- Teknis: [docs/03-arsitektur-teknis.md](AkarKu/docs/03-arsitektur-teknis.md)
- Smartphone: [docs/12-optimasi-smartphone.md](AkarKu/docs/12-optimasi-smartphone.md)
- Tampilan: [docs/04-panduan-ui-ux.md](AkarKu/docs/04-panduan-ui-ux.md)
- Isi materi dan soal: [docs/05-spesifikasi-konten.md](AkarKu/docs/05-spesifikasi-konten.md)
- Urutan pekerjaan: [docs/06-roadmap-dan-tugas.md](AkarKu/docs/06-roadmap-dan-tugas.md)
- Literasi matematika: [docs/09-literasi-matematika.md](AkarKu/docs/09-literasi-matematika.md)
- Instalasi tanpa toko aplikasi: [docs/10-instalasi-tanpa-playstore.md](AkarKu/docs/10-instalasi-tanpa-playstore.md)
- Analisis statistik (Python): [docs/11-analisis-statistik-python.md](AkarKu/docs/11-analisis-statistik-python.md)
- Asisten AI pedagogis: [docs/14-asisten-ai-pedagogis.md](AkarKu/docs/14-asisten-ai-pedagogis.md)

Jika ada konflik, urutan prioritasnya: PRD.md → docs/02 → docs/04 → dokumen lain.

## Pembagian Bahasa (WAJIB)

| Bahasa | Dipakai untuk | Folder |
|---|---|---|
| **JavaScript** | Data **umum**: seluruh aplikasi (tampilan, materi, soal, pemeriksa jawaban, progres, PWA, ekspor CSV) | `src/`, `tests/` |
| **Python** | Data **statistik**: analisis hasil penelitian (validasi ahli, N-gain, uji statistik, beban kognitif, literasi, grafik, kode QR brosur) | `analisis/` |

- **Jangan** memakai TypeScript. Gunakan JavaScript (`.js`/`.jsx`) dengan anotasi **JSDoc** dan `// @ts-check` agar editor tetap memeriksa tipe.
- **Jangan** memakai Python di dalam aplikasi siswa (tanpa server Python, tanpa Pyodide). Python hanya dijalankan peneliti di laptop.
- Penghubung keduanya adalah **file CSV hasil ekspor** dengan kontrak kolom di [docs/03 §7](AkarKu/docs/03-arsitektur-teknis.md).

## Akses dan Instalasi

- Aplikasi harus berjalan sebagai **web biasa** di browser HP dan laptop.
- Aplikasi harus **dapat diinstal sebagai PWA** (manifest, service worker, HTTPS) di Android, iPhone, dan laptop **tanpa toko aplikasi**.
- APK unduhan langsung (Capacitor) bersifat **opsional**.
- Jangan menambahkan fitur yang mengharuskan distribusi lewat Play Store/App Store atau memerlukan izin yang tidak perlu.

## Stack Aplikasi (JavaScript)

- **React 18 + Vite**, JavaScript/JSX dengan JSDoc
- **Tailwind CSS** (gunakan token di `tailwind.config.js`, jangan menulis warna heksadesimal langsung di komponen)
- **KaTeX** untuk semua notasi matematika
- **Zustand** untuk state, **Dexie (IndexedDB)** untuk penyimpanan progres
- **React Router** untuk navigasi
- **vite-plugin-pwa** untuk offline dan instalasi PWA
- **Capacitor** (opsional) untuk APK unduhan langsung
- **Vitest + Testing Library** untuk pengujian

## Stack Analisis (Python)

- Python 3.11+, **pandas**, **numpy**, **scipy**, **pingouin**, **matplotlib**, **openpyxl**, **qrcode**

## Perintah

```bash
# ── JavaScript (aplikasi) ──
npm install            # pasang dependensi
npm run dev            # server pengembangan (http://localhost:5173)
npm run build          # build produksi ke dist/
npm run preview        # pratinjau hasil build (uji PWA dan instalasi)
npm run test           # unit test (Vitest)
npm run lint           # ESLint
npm run check          # pemeriksaan JSDoc (tsc --noEmit -p jsconfig.json)
npx cap sync android   # (opsional) salin build ke proyek Android untuk APK

# ── Python (analisis statistik) ──
cd analisis
python -m venv .venv
.venv\Scripts\activate         # Windows
pip install -r requirements.txt
python jalankan_semua.py       # hasil di data/hasil/
```

## Struktur Folder

```
src/              # ── JAVASCRIPT ──
  app/            # routing, layout, provider
  pages/          # Beranda, PetaModul, Belajar, Latihan, Kuis, KartuRumus, Progres, PasangAplikasi, Pengaturan
  components/
    ui/           # Button, Card, BottomSheet, ProgressBar, InstallButton
    math/         # Tex, MathKeyboard, StepReveal, PerfectSquareTable
    learning/     # ConceptCard, WorkedExample, FadedExample, HintPanel, FeedbackBox, StoryProblemGuide
    literacy/     # StimulusCard, LiteracyCycle, EstimateLine, ReasoningQuestion
  content/        # DATA materi, soal, dan stimulus per modul (m0..m6), terpisah dari kode UI
  engine/         # logika matematika murni: simplifyRadical, rationalize, checkAnswer, approximate, generators
  store/          # Zustand store + Dexie db
  pwa/            # useInstallPrompt, notifikasi versi baru
  lib/            # util umum, exportCsv.js
  types.js        # definisi tipe JSDoc (@typedef)
tests/            # Vitest untuk engine/ dan komponen penting
analisis/         # ── PYTHON ── skrip statistik 01–07, config.py, requirements.txt
data/             # CSV mentah dan hasil analisis (JANGAN di-commit; masukkan ke .gitignore)
docs/             # dokumen perencanaan
```

## Aturan Wajib — Prinsip Cognitive Load

Aturan ini berasal langsung dari hasil wawancara siswa. **Jangan dilanggar** kecuali PRD diubah.

1. **Satu konsep per layar.** Kartu materi maksimal ±40 kata dan **maksimal 1 rumus utama** per layar. (EL01, EL03, DS03)
2. **Tidak ada perpindahan otomatis.** Semua perpindahan layar/langkah dilakukan siswa lewat tombol. Jangan memakai carousel otomatis, timer pada mode belajar, atau animasi yang tidak bisa dihentikan. (EL04)
3. **Worked example ditampilkan bertahap.** Langkah muncul satu per satu (`StepReveal`) dan setiap langkah wajib punya `reason`. (EL02, IL02, GL01)
4. **Satu warna aksen.** `accent` hanya untuk menandai bagian yang berubah/sedang dibahas. `success`/`danger` hanya untuk umpan balik. Tanpa warna dekoratif, gradien, atau ilustrasi ramai. (EL03)
5. **Materi dan latihan terpisah.** Halaman Belajar tidak berisi soal yang dinilai (kecuali faded example/self-explanation). Halaman Latihan tidak berisi teks materi panjang. (DS02)
6. **Petunjuk bertahap, dibuka atas permintaan.** Maksimal 3 tingkat: arah umum → langkah pertama → contoh mirip. (GL03)
7. **Umpan balik menjelaskan "mengapa".** Jangan hanya menampilkan "Salah". Kenali pola kesalahan umum (`engine/misconceptions.js`). (IL05)
8. **Urutan sederhana → kompleks.** Angka kecil → angka besar → pecahan → bentuk campuran. (IL01, IL04)
9. **Bahasa singkat dan ramah siswa SMP.** Kalimat aktif, maksimal ±15 kata per kalimat, tanpa istilah yang tidak dijelaskan.
10. **Alat bantu memori selalu dapat dijangkau.** Kartu Rumus dan Tabel Kuadrat Sempurna bisa dibuka dari panel bawah di Belajar dan Latihan (kecuali saat pretest/posttest/tes literasi). (IL02, IL03)

## Aturan Wajib — Literasi Matematika

11. **Setiap modul punya konteks nyata.** Ada pembuka kontekstual yang dijawab kembali di akhir modul, serta Pojok Literasi di Latihan. (F8.1, F8.2)
12. **Siklus literasi tiga langkah.** Soal kontekstual memakai `LiteracyCycle`: Rumuskan → Kerjakan → Tafsirkan. Langkah Tafsirkan wajib ada (nilai pendekatan, satuan, dan kewajaran). (F8.3)
13. **Stimulus tetap ramah beban kognitif.** Maksimal 60 kata dan 1 visual. Pengecoh hanya di tingkat sulit. Bantuan dipudarkan: `penuh` → `sebagian` → `mandiri`. (F8.4)
14. **Setiap soal literasi diberi label** `context`, `process`, `cognitiveLevel`, dan `aiType`. (F8.9)

## Aturan Wajib — Smartphone

Rincian: [docs/12-optimasi-smartphone.md](AkarKu/docs/12-optimasi-smartphone.md). Perangkat acuan minimum: **Android 8, RAM 2–3 GB, lebar layar 320 px**.

15. **Mobile-first dan tanpa gulir horizontal.** Rancang untuk 360 px dan pastikan rapi di 320 px. Rumus panjang dipecah per langkah atau digeser di dalam kotaknya sendiri. Gunakan `100dvh`, `rem`, dan `env(safe-area-inset-*)`. Jangan menonaktifkan zoom.
16. **Sentuhan, bukan mouse.** Target ≥ 48×48 px, tombol utama di zona jempol, `touch-action: manipulation`. Jangan ada fungsi yang bergantung pada *hover*. Swipe tidak boleh menjadi satu-satunya cara navigasi.
17. **Tombol Kembali Android harus benar.** Panel/BottomSheet/petunjuk ditutup lebih dulu lewat History API (dan `backButton` Capacitor di APK). Jangan langsung keluar aplikasi.
18. **Progres tidak boleh hilang.** Simpan otomatis setiap perpindahan layar/jawaban dan pada `visibilitychange`. Pulihkan ke layar dan langkah terakhir. Panggil `navigator.storage.persist()`.
19. **Keyboard terkendali.** Input bentuk akar memakai `MathKeyboard` (`inputmode="none"`). Huruf input ≥ 16 px. Kolom aktif tidak boleh tertutup keyboard. Desimal menerima koma.
20. **Ringan dan hemat.** JavaScript awal ≤ 250 KB gzip, total offline ≤ 3 MB, *lazy load* per halaman/modul, tanpa library animasi berat, tanpa proses latar belakang. Setelah unduhan pertama, internet hanya dipakai untuk pembaruan.

## Aturan Wajib — Asisten AI

21. **AI adalah pembimbing, bukan pemberi jawaban.** Jangan mengubah instruksi `TUTOR_PROMPT` sehingga AI memberi jawaban akhir. Bantuan bertingkat 0–3, pesan ≤ 60 kata, satu langkah per pesan.
22. **API key hanya di server.** Jangan pernah menaruh API key AI (Gemini, OpenRouter, DeepSeek, atau key apa pun) di `app/index.html`. Simpan di Properti skrip Apps Script.
23. **Chat dimatikan saat penilaian** (kuis, paket soal, pretest, posttest, tes literasi). Jangan kirim nama/kode siswa ke layanan AI.

Jika diminta membuat fitur yang bertentangan dengan aturan di atas, beri tahu pengguna tentang konfliknya terlebih dahulu.

## Konvensi Kode

**Umum**
- Teks yang tampil ke pengguna dalam **Bahasa Indonesia**.
- Jangan menyimpan data pribadi selain nama panggilan dan kode siswa.

**JavaScript**
- Setiap file diawali `// @ts-check`. Fungsi publik diberi JSDoc (`@param`, `@returns`).
- Nama variabel, fungsi, dan komponen dalam bahasa Inggris (kecuali nama halaman/konten domain, misalnya `KartuRumus`).
- Komponen fungsional + hooks, satu komponen per file (`.jsx`), PascalCase.
- Konten materi/soal **tidak boleh di-hardcode di komponen**. Simpan di `src/content/` sesuai `@typedef` di `src/types.js`.
- Logika matematika di `src/engine/` berupa **fungsi murni** tanpa ketergantungan pada React dan **wajib diuji** (Vitest).
- Notasi matematika selalu lewat komponen `<Tex>` (KaTeX).
- Mobile-first 360 px (rapi di 320 px), target sentuh ≥ 48×48 px, huruf dasar 16–18 px dalam satuan `rem`.
- Tanyakan dahulu sebelum menambah library > 50 KB gzip.

**Python**
- PEP 8. Nama variabel boleh berbahasa Indonesia agar mudah dibaca peneliti. Cetakan dan label grafik dalam Bahasa Indonesia.
- Skrip **hanya membaca** `data/mentah/` dan **hanya menulis** ke `data/hasil/`. Setiap skrip dapat dijalankan sendiri.
- Sediakan data dummy di `data/contoh/` untuk menguji skrip.
- Kriteria dan konstanta (skor maksimal, α, kategori) dipusatkan di `analisis/config.py`.

**Kontrak data**
- Kolom CSV ekspor ([docs/03 §7](AkarKu/docs/03-arsitektur-teknis.md)) harus sama di `src/lib/exportCsv.js` dan `analisis/config.py`. Ubah keduanya bersamaan.

## Mesin Matematika (engine, JavaScript)

Fungsi inti yang harus tersedia dan teruji:
- `largestPerfectSquareFactor(n)` → faktor kuadrat sempurna terbesar dari n
- `simplifyRadical(coef, radicand)` → `{ coef, radicand }` bentuk paling sederhana
- `simplifySteps(n)` → array langkah beserta alasan, untuk worked example
- `rationalize(expr)` → hasil dan langkah merasionalkan penyebut (a/√b dan a/(b ± √c))
- `areEquivalent(a, b)` → membandingkan dua ekspresi secara numerik dan struktural
- `checkAnswer(input, expected, { requireSimplest })` → `{ correct, simplest, misconception? }`
- `generators/*` → pembuat soal acak per modul dan tingkat kesulitan
- `approximate(radical, decimals)` → nilai pendekatan desimal (untuk langkah Tafsirkan)
- `estimateBounds(n)` → dua bilangan bulat yang mengapit √n

Pola kesalahan yang harus dikenali (`misconceptions.js`):
- Jawaban setara tetapi belum paling sederhana (misalnya `2√18` untuk √72)
- Salah mengalikan koefisien ke dalam akar
- `√a + √b = √(a+b)`
- Lupa mengalikan pembilang dengan sekawan saat merasionalkan
- Salah tanda pada bentuk sekawan

## Definition of Done (setiap fitur)

- [ ] Sesuai ID kebutuhan di PRD (sebutkan ID di deskripsi commit/PR, misalnya `F2.4`)
- [ ] Mematuhi aturan Cognitive Load (1–10), Literasi (11–14), dan Smartphone (15–20)
- [ ] Tampil baik di lebar 320, 360, 430 px (potret dan lanskap) serta 1280 px
- [ ] Dicek di Chrome DevTools Device Mode dengan CPU throttling 4× dan Slow 4G
- [ ] Tombol Kembali Android dan pemulihan progres berfungsi pada fitur tersebut
- [ ] Berfungsi offline dan aplikasi tetap dapat diinstal sebagai PWA
- [ ] `npm run check`, `npm run lint`, dan `npm run test` lulus
- [ ] Logika engine baru memiliki unit test
- [ ] (Python) Skrip berjalan dengan data dummy di `data/contoh/`

## Hal yang Perlu Ditanyakan ke Pengguna

- Perubahan cakupan materi atau urutan modul
- Penambahan backend/server/akun online, atau penggantian bahasa (misalnya ke TypeScript/Flutter)
- Perubahan kontrak kolom CSV ekspor
- Perubahan instrumen penelitian (pretest, posttest, tes literasi, angket)
- Penambahan library besar atau layanan pihak ketiga (analitik, iklan) — **default: jangan**
