# 06 — Roadmap dan Daftar Tugas

Tandai `[x]` jika selesai. ID kebutuhan merujuk ke [PRD.md](../PRD.md).

## Fase A — Analysis (Minggu 1–2)
- [x] Wawancara siswa tentang beban kognitif (S01)
- [x] Pengkodean IL/EL/GL/K/DS
- [ ] Sebar angket analisis kebutuhan ke ±30 siswa ([01-analisis-kebutuhan.md §8](01-analisis-kebutuhan.md))
- [ ] Wawancara guru matematika kelas IX
- [ ] Analisis CP/ATP sekolah dan buku siswa
- [ ] Kaji kerangka literasi matematika (PISA 2022, AKM Numerasi) dan contoh soal AKM kelas VIII–IX

## Fase B — Design (Minggu 3–4)
- [x] PRD, CLAUDE.md, dan dokumen perencanaan
- [ ] Finalisasi TP dan kisi-kisi ([02](02-desain-pembelajaran.md), [05](05-spesifikasi-konten.md))
- [ ] Storyboard semua layar ([08-storyboard.md](08-storyboard.md))
- [ ] Mockup UI (Figma/kertas), cukup 6 layar kunci
- [ ] Susun instrumen: lembar validasi ahli materi, ahli media, angket siswa, dan skala beban kognitif ([07](07-rencana-evaluasi.md))
- [ ] Finalisasi bank stimulus literasi, tes literasi pre/post, dan rubrik ([09](09-literasi-matematika.md))
- [ ] Konsultasi dosen pembimbing

## Fase C — Development (Minggu 5–10)

### Sprint 1 — Fondasi (Minggu 5)
- [ ] Inisialisasi proyek: Vite + React (**JavaScript**, template `react`), Tailwind, ESLint, Prettier, Vitest
- [ ] Siapkan `.gitignore` (termasuk `data/`, `analisis/.venv/`)
- [ ] Token desain di `tailwind.config.js` (warna, ukuran, dan jarak dari docs/04)
- [ ] Komponen UI dasar: Button, Card, TopBar, ProgressBar, BottomSheet
- [ ] Komponen `<Tex>` (KaTeX) dengan `aria-label`
- [ ] Routing dan layout halaman kosong
- [ ] Fondasi smartphone ([docs/12 §4](12-optimasi-smartphone.md)): meta viewport, `100dvh`, *safe area*, satuan `rem`, target sentuh 48 px
- [ ] Penanganan tombol Kembali Android via History API (F11.2)
- [ ] Anggaran ukuran bundel: pasang `rollup-plugin-visualizer`, target JavaScript awal ≤ 250 KB gzip
- [ ] Definisi tipe JSDoc `src/types.js` dan `jsconfig.json` (checkJs)

### Sprint 2 — Mesin Matematika (Minggu 6)
- [ ] `engine/radical.js`: largestPerfectSquareFactor, simplifyRadical, beserta test
- [ ] `engine/steps.js`: langkah dan alasan, beserta test
- [ ] `engine/rationalize.js`, beserta test
- [ ] `engine/parse.js` dan `MathKeyboard` (token terstruktur, `inputmode="none"`, kolom tidak tertutup keyboard, desimal koma) (F11.4)
- [ ] `engine/checkAnswer.js` dan `misconceptions.js`, beserta test
- [ ] Generator soal M2 dan M5 (prioritas)
- [ ] `engine/approximate.js`: approximate, estimateBounds, beserta test

### Sprint 3 — Mode Belajar (Minggu 7)
- [ ] ConceptCard (F2.1), navigasi Lanjut/Kembali/Ulangi (F2.2, F2.3)
- [ ] StepReveal/WorkedExample dengan alasan dan highlight aksen (F2.4–F2.6)
- [ ] FadedExample (F2.7)
- [ ] SelfExplain (F2.8), kartu Pola (F2.9)
- [ ] Konten M0, M2, dan M5

### Sprint 4 — Mode Latihan dan Alat Bantu (Minggu 8)
- [ ] Halaman Latihan: pilih topik/tingkat (F3.1, F3.2)
- [ ] Jenis soal PG, isian, dan susun langkah (F3.3)
- [ ] HintPanel 3 tingkat (F3.4), FeedbackBox (F3.5)
- [ ] Soal kembar setelah salah (F3.7)
- [ ] Kartu Rumus dan Tabel Kuadrat Sempurna di BottomSheet (F4.1, F4.2)
- [ ] StoryProblemGuide (F5.1–F5.3)

### Sprint 4b — Literasi Matematika (Minggu 8–9)
- [ ] Pembuka kontekstual dan kartu "Kembali ke Konteks" di mode Belajar (F8.1)
- [ ] StimulusCard (≤ 60 kata, 1 visual, info dapat diketuk) (F8.2)
- [ ] LiteracyCycle Rumuskan → Kerjakan → Tafsirkan dengan pemudaran bantuan (F8.3, F8.4)
- [ ] EstimateLine: garis bilangan dan nilai pendekatan (F8.5)
- [ ] ReasoningQuestion: benar/salah dan pilih alasan (F8.6)
- [ ] Bentuk soal AKM: PG kompleks dan menjodohkan (F8.7)
- [ ] Konten Pojok Literasi M1–M5 dan M6 dari bank stimulus docs/09 (F8.8)
- [ ] Label literasi dan progres per proses (F8.9)

### Sprint 5 — Progres, Evaluasi, dan Ekspor Data (Minggu 9)
- [ ] Dexie: profil, progres, attempts, refleksi
- [ ] Onboarding nama panggilan dan kode siswa (F1.4)
- [ ] Kuis modul, pretest, dan posttest (F6.1, F6.2)
- [ ] Tes literasi pre/post dengan input uraian dan ekspor untuk dinilai dengan rubrik (F8.10)
- [ ] Refleksi skala 1–9 (F6.4), halaman Progres (F6.3)
- [ ] `lib/exportCsv.js` sesuai kontrak kolom docs/03 §7 (F6.5, F10.1), menu ekspor dengan PIN peneliti (F10.2)
- [ ] Cadangkan/pulihkan progres (F7.4)
- [ ] Simpan otomatis per langkah dan pada `visibilitychange`, lalu pulihkan ke layar terakhir (F11.3)
- [ ] `navigator.storage.persist()` dan penanganan kuota penuh (F11.10)

### Sprint 5a — Kalkulator Akar dan Mode Pemilik (Minggu 9)
- [ ] `engine/nthRoot.js`: faktorisasi prima, sederhanakan akar indeks 2–10, letak di antara bilangan bulat, beserta test (F12.1–F12.3)
- [ ] Halaman Kalkulator: tab Sederhanakan, Operasi, dan Rasionalkan, dengan langkah dan pratinjau (F12.4–F12.6)
- [ ] Kalkulator disembunyikan saat kuis/pretest/posttest/tes literasi
- [ ] Multi-pengguna per HP dan pencatatan semua aktivitas (F13.1, F13.2)
- [ ] Mode Pemilik dengan PIN: ringkasan, daftar pengunjung, riwayat jawaban, pencarian (F13.3)
- [ ] Unduh CSV riwayat dan ringkasan, serta hapus data (F13.4, F13.5)
- [ ] (Menunggu keputusan pemilik) rekap online dari semua HP (F13.6)

### Sprint 5b — Akses Browser dan Instalasi Tanpa Toko Aplikasi (Minggu 9)
- [ ] PWA: manifest, ikon 192/512/maskable, service worker (vite-plugin-pwa), uji mode pesawat
- [ ] `pwa/useInstallPrompt.js` dan tombol "Pasang Aplikasi" (F9.1)
- [ ] Halaman "Cara Memasang" dengan deteksi Android/iPhone/laptop (F9.2)
- [ ] Notifikasi "Versi baru tersedia" (F9.5), indikator offline (F9.6)
- [ ] Deploy ke GitHub Pages/Netlify (HTTPS). Lighthouse PWA berstatus *Installable*
- [ ] (Opsional) Capacitor: build APK rilis bertanda tangan dan tautan unduh (F9.3)
- [ ] Daftar uji instalasi [docs/10 §7](10-instalasi-tanpa-playstore.md)

### Sprint 5c — Analisis Statistik dengan Python (Minggu 10, paralel)
- [ ] `analisis/requirements.txt`, `config.py`, dan data dummy di `data/contoh/`
- [ ] `01_validasi_ahli.py` (persentase dan Aiken's V)
- [ ] `02_kepraktisan.py`
- [ ] `03_ngain_hasil_belajar.py` (N-gain, Shapiro–Wilk, uji-t/Wilcoxon, effect size)
- [ ] `04_beban_kognitif.py` (IL/EL/GL, Cronbach's alpha, Paas per modul)
- [ ] `05_literasi.py` (N-gain per proses literasi)
- [ ] `06_log_aplikasi.py` (miskonsepsi, petunjuk, langkah siklus yang gagal)
- [ ] `07_buat_qr.py`: kode QR untuk brosur (F9.4)
- [ ] `jalankan_semua.py` dan uji dengan CSV hasil ekspor aplikasi asli

### Sprint 5d — Uji dan Optimasi Smartphone (Minggu 10)
- [ ] Kumpulkan perangkat uji: HP Android kelas bawah, Android kelas menengah, dan iPhone ([docs/12 §5.1](12-optimasi-smartphone.md))
- [ ] Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 95
- [ ] Remote debugging `chrome://inspect` di HP kelas bawah: cek memori dan respons tombol
- [ ] Jalankan seluruh daftar uji smartphone [docs/12 §5.3](12-optimasi-smartphone.md)
- [ ] (Opsional) Uji otomatis Playwright dengan profil perangkat mobile
- [ ] Perbaiki temuan, lalu uji ulang

### Sprint 6 — Konten Lengkap dan Validasi Ahli (Minggu 10)
- [ ] Konten M1, M3, M4, dan M6
- [ ] Review semua layar dengan daftar periksa [04 §9](04-panduan-ui-ux.md)
- [ ] Validasi ahli materi dan ahli media
- [ ] Revisi berdasarkan masukan ahli
- [ ] Deploy versi final dan cetak brosur dengan kode QR (template [docs/10 §5](10-instalasi-tanpa-playstore.md))

## Fase D — Implementation (Minggu 11–13)
- [ ] Uji coba perorangan (one-to-one): 3 siswa (kemampuan rendah, sedang, dan tinggi). Termasuk S01 jika memungkinkan
- [ ] Revisi
- [ ] Uji coba kelompok kecil: 6–9 siswa
- [ ] Revisi
- [ ] Uji coba lapangan: 1 kelas (pretest + tes literasi → penggunaan aplikasi → posttest + tes literasi + angket)

## Fase E — Evaluation (Minggu 14–15)
Semua analisis dijalankan dengan skrip **Python** di `analisis/` ([docs/11](11-analisis-statistik-python.md)).
- [ ] Analisis kevalidan (skor ahli, `01_validasi_ahli.py`)
- [ ] Analisis kepraktisan (angket siswa/guru, `02_kepraktisan.py`)
- [ ] Analisis keefektifan (N-gain dan skala beban kognitif, `03`, `04`)
- [ ] Analisis literasi matematika (N-gain per proses, `05_literasi.py`)
- [ ] Analisis log aplikasi sebagai bahan revisi (`06_log_aplikasi.py`)
- [ ] Laporan dan revisi akhir produk

## Backlog (Setelah MVP)
- [ ] Mode "Jelaskan ke teman" (F6.6)
- [ ] "Buat soalmu sendiri" / problem posing (F8.11)
- [ ] Pencari faktor visual (F4.3)
- [ ] Mode gelap (F7.2)
- [ ] Dasbor guru (memerlukan backend, misalnya Supabase/Firebase)
- [ ] Materi lanjutan: bilangan berpangkat, notasi ilmiah

## Contoh Prompt untuk Vibe Coding dengan Claude Code

```
Baca CLAUDE.md dan PRD.md. Kerjakan Sprint 1 di docs/06-roadmap-dan-tugas.md.
Setelah selesai, jalankan check/lint/test dan centang tugas yang selesai.
```
```
Implementasikan engine/radical.js sesuai docs/03 §8, lengkap dengan unit test
untuk semua kasus pada tabel "Uji wajib".
```
```
Buat komponen WorkedExample (F2.4–F2.6). Ikuti docs/04 §5.1. Gunakan contoh √72
dari docs/05 M2 sebagai data demo.
```
```
Kerjakan Sprint 5b: jadikan aplikasi PWA yang bisa diinstal tanpa Play Store,
lengkap dengan tombol "Pasang Aplikasi" dan halaman "Cara Memasang" sesuai docs/10.
```
```
Periksa seluruh aplikasi terhadap docs/12-optimasi-smartphone.md. Uji di Device Mode
320/360/430 px dengan CPU throttling 4×, lalu perbaiki semua yang tidak lulus.
```
```
Kerjakan Sprint 5c: buat skrip Python di analisis/ sesuai docs/11. Buat juga data
dummy di data/contoh/ dan pastikan jalankan_semua.py berjalan tanpa error.
```
