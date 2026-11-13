# 03 — Arsitektur Teknis

## 1. Pembagian Bahasa Pemrograman

| Bahasa | Untuk apa | Jenis data | Lokasi |
|---|---|---|---|
| **JavaScript** | Aplikasi AkarKu: tampilan, materi, latihan, pemeriksa jawaban, penyimpanan progres, dan instalasi | **Data umum**: konten materi, soal, jawaban siswa, dan progres | `src/` |
| **Python** | Analisis data penelitian: validasi ahli, N-gain, uji statistik, beban kognitif, literasi, dan grafik | **Data statistik**: hasil ekspor CSV dari aplikasi, angket, dan lembar validasi | `analisis/` |

Alur data:
```
[Aplikasi JavaScript di HP/laptop siswa]
        │  siswa belajar → data tersimpan di perangkat (IndexedDB)
        │  peneliti menekan "Ekspor data" → file CSV
        ▼
[data/mentah/*.csv]  ──►  [Skrip Python: analisis/]  ──►  [hasil/: tabel, grafik, laporan]
```

Aplikasi **tidak membutuhkan server Python** saat dipakai siswa. Python hanya dijalankan peneliti di laptop untuk mengolah data.

## 2. Keputusan Utama — Aplikasi (JavaScript)

| Kebutuhan | Keputusan | Alasan |
|---|---|---|
| Dibuka di browser | **Aplikasi web** dengan React + Vite (JavaScript/JSX) | Cukup membuka tautan, tidak perlu install apa pun |
| Dapat diinstal **tanpa Play Store/App Store** | **PWA (Progressive Web App)** | Tombol "Pasang Aplikasi" langsung dari browser. Ikon muncul di layar utama seperti aplikasi biasa. Berlaku untuk Android, iPhone, Windows, dan Mac |
| File APK (opsional) | **Capacitor**, APK diunduh langsung dari situs | Untuk sekolah yang ingin membagikan file APK lewat WhatsApp/flashdisk |
| Offline | Service worker (vite-plugin-pwa / Workbox) + IndexedDB | Siswa dengan kuota terbatas tetap bisa belajar |
| Notasi matematika | **KaTeX** | Cepat, ringan, dan tetap berjalan tanpa internet |
| State | **Zustand** | Sederhana dan kecil |
| Penyimpanan | **Dexie** (IndexedDB) | Progres dan riwayat jawaban tersimpan di perangkat |
| Styling | **Tailwind CSS** | Konsisten dengan token desain |
| Pemeriksaan tipe | **JSDoc** (`// @ts-check`) | Tetap JavaScript murni, tetapi editor dapat memberi peringatan kesalahan tipe |
| Backend | **Google Apps Script + Google Sheets** (hanya untuk rekap riwayat pengunjung, F13.6) | Gratis, data langsung di spreadsheet milik pemilik, tanpa server sendiri. Lihat docs/13 |
| Pengujian | Vitest + Testing Library | Ekosistem Vite |
| Hosting | **GitHub Pages / Netlify / Vercel** (gratis, HTTPS) | HTTPS wajib agar PWA bisa diinstal |

Cara instal tanpa toko aplikasi dijelaskan di [10-instalasi-tanpa-playstore.md](10-instalasi-tanpa-playstore.md).

## 3. Keputusan Utama — Analisis (Python)

| Kebutuhan | Library |
|---|---|
| Membaca dan mengolah CSV | `pandas` |
| Uji statistik (normalitas, uji-t, Wilcoxon) | `scipy` |
| Reliabilitas (Cronbach's alpha) dan statistik tambahan | `pingouin` |
| Grafik | `matplotlib` |
| Laporan interaktif (opsional) | `jupyter` |
| Ekspor tabel ke Excel/Word | `openpyxl` |

Rincian: [11-analisis-statistik-python.md](11-analisis-statistik-python.md).

## 4. Diagram Arsitektur Aplikasi

```
┌──────────────────────── UI (React, JavaScript) ────────────────────────┐
│  pages/  →  components/learning  →  components/literacy  →  components/ui │
└───────────────┬──────────────────────────────────┬─────────────────────┘
                │ membaca                            │ memanggil
        ┌───────▼─────────┐                 ┌───────▼─────────┐
        │ content/ (data)  │                 │ engine/ (murni)  │ ← diuji Vitest
        │ materi, soal,    │                 │ simplify,        │
        │ stimulus literasi│                 │ rationalize,     │
        └──────────────────┘                 │ checkAnswer,     │
                                             │ approximate      │
                                             └──────────────────┘
                │ simpan/baca
        ┌───────▼─────────────────┐
        │ store/ (Zustand + Dexie) │ → IndexedDB (perangkat) → Ekspor CSV → Python
        └─────────────────────────┘
                │
        Service Worker + manifest → bisa dibuka offline dan diinstal (PWA)
                │
        (opsional) Capacitor → file APK unduhan langsung
```

## 5. Struktur Folder

```
akarku/
├─ public/
│  ├─ icons/               # ikon PWA 192, 512, maskable
│  └─ apk/                 # (opsional) akarku.apk untuk diunduh langsung
├─ src/                    # ── JAVASCRIPT ──
│  ├─ app/                 # App.jsx, router.jsx, Layout.jsx
│  ├─ pages/
│  │  ├─ Onboarding.jsx
│  │  ├─ Beranda.jsx
│  │  ├─ PetaModul.jsx
│  │  ├─ Belajar.jsx
│  │  ├─ Latihan.jsx
│  │  ├─ Kuis.jsx          # kuis modul, pretest, posttest, tes literasi
│  │  ├─ KartuRumus.jsx
│  │  ├─ Progres.jsx
│  │  ├─ PasangAplikasi.jsx  # panduan instal per perangkat (F9.2)
│  │  └─ Pengaturan.jsx
│  ├─ components/
│  │  ├─ ui/               # Button, Card, BottomSheet, ProgressBar, TopBar, InstallButton
│  │  ├─ math/             # Tex, MathKeyboard, MathInput, PerfectSquareTable, FactorFinder
│  │  ├─ learning/         # ConceptCard, WorkedExample, StepReveal, FadedExample,
│  │  │                    # SelfExplain, HintPanel, FeedbackBox, StoryProblemGuide, Reflection
│  │  └─ literacy/         # StimulusCard, LiteracyCycle, EstimateLine, ReasoningQuestion,
│  │                       # MultiSelectQuestion, MatchingQuestion
│  ├─ content/
│  │  ├─ index.js
│  │  ├─ m0-prasyarat.js … m6-literasi.js
│  │  ├─ literacy/         # personal.js, sosial-budaya.js, saintifik.js
│  │  ├─ formulas.js
│  │  └─ tests/            # pretest.js, posttest.js, literasi-pre.js, literasi-post.js
│  ├─ engine/
│  │  ├─ radical.js        # simplifyRadical, largestPerfectSquareFactor
│  │  ├─ steps.js
│  │  ├─ rationalize.js
│  │  ├─ parse.js
│  │  ├─ checkAnswer.js
│  │  ├─ misconceptions.js
│  │  ├─ approximate.js
│  │  └─ generators/
│  ├─ store/
│  │  ├─ db.js
│  │  ├─ useProgress.js
│  │  └─ useSettings.js
│  ├─ pwa/
│  │  └─ useInstallPrompt.js   # menangkap event beforeinstallprompt
│  ├─ lib/
│  │  └─ exportCsv.js      # format CSV untuk dianalisis Python
│  ├─ types.js             # definisi tipe JSDoc (@typedef)
│  └─ main.jsx
├─ tests/                  # Vitest
├─ analisis/               # ── PYTHON ──
│  ├─ requirements.txt
│  ├─ config.py            # skor maksimal, kriteria, dan path
│  ├─ 01_validasi_ahli.py
│  ├─ 02_kepraktisan.py
│  ├─ 03_ngain_hasil_belajar.py
│  ├─ 04_beban_kognitif.py
│  ├─ 05_literasi.py
│  ├─ 06_log_aplikasi.py
│  ├─ 07_buat_qr.py        # kode QR untuk brosur
│  ├─ jalankan_semua.py
│  └─ notebook/laporan.ipynb
├─ data/                   # (tidak di-commit) CSV mentah hasil ekspor dan angket
│  ├─ mentah/
│  └─ hasil/               # tabel dan grafik keluaran Python
├─ android/                # (opsional) dibuat oleh `npx cap add android`
├─ capacitor.config.json
├─ tailwind.config.js
├─ vite.config.js
├─ jsconfig.json           # "checkJs": true untuk pemeriksaan JSDoc
└─ package.json
```

## 6. Model Data Konten (`src/types.js`, JSDoc)

```js
// @ts-check

/** @typedef {'mudah' | 'sedang' | 'sulit'} Level */

/**
 * @typedef {Object} Step
 * @property {string} tex        - "\\sqrt{72} = \\sqrt{36 \\times 2}"
 * @property {string} reason     - "36 adalah kuadrat sempurna terbesar yang membagi 72"
 * @property {string} [highlight]
 */

/**
 * @typedef {(
 *   { kind: 'intro', text: string, hook?: string } |
 *   { kind: 'concept', text: string, tex?: string, highlight?: string } |
 *   { kind: 'worked', problemTex: string, steps: Step[] } |
 *   { kind: 'faded', problemTex: string, steps: (Step & { blank?: boolean, answer?: string })[] } |
 *   { kind: 'selfExplain', question: string, options: string[], correct: number, feedback: string } |
 *   { kind: 'pattern', points: string[] } |
 *   { kind: 'reflection' }
 * )} Screen
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {Level} level
 * @property {'mcq' | 'input' | 'order'} type
 * @property {string} [promptText]
 * @property {string} [promptTex]
 * @property {string[]} [options]
 * @property {string} answer              - bentuk kanonik, misalnya "6\\sqrt{2}"
 * @property {boolean} [requireSimplest]
 * @property {[string, string, string]} hints
 * @property {string} explanation
 */

/**
 * @typedef {Object} Module
 * @property {'m0'|'m1'|'m2'|'m3'|'m4'|'m5'|'m6'} id
 * @property {string} title
 * @property {string} objective
 * @property {string[]} prerequisites
 * @property {Screen[]} screens
 * @property {Question[]} quiz
 * @property {string} [generatorId]
 * @property {{ stimulusId: string, question: string }} [contextHook]   - F8.1
 * @property {string[]} [literacyCorner]                                 - F8.2
 */
```

Tipe `Stimulus` dan `LiteracyQuestion`: lihat [09-literasi-matematika.md §7](09-literasi-matematika.md).

## 7. Model Data Progres (Dexie) dan Format Ekspor

```js
// db.js
profile:        { id: 'me', nickname, studentCode, createdAt }
moduleProgress: { moduleId, status, lastScreen, quizScore, completedAt }
attempts:       { ++id, questionId, moduleId, mode, answer, correct, simplest, misconception,
                  hintsUsed, durationMs, createdAt,
                  stimulusId, context, process, cognitiveLevel, failedCycleStep, essayText }
reflections:    { ++id, moduleId, difficulty /*1–9*/, confusingNote, createdAt }
settings:       { id: 'app', fontSize, theme }
```

**Format ekspor CSV (kontrak antara JavaScript dan Python)**. Nama kolom tidak boleh diubah tanpa memperbarui `analisis/config.py`.

| File | Kolom |
|---|---|
| `attempts_<kode>.csv` | `student_code, mode, module_id, question_id, level, correct, simplest, misconception, hints_used, duration_ms, context, process, cognitive_level, failed_cycle_step, created_at` |
| `tests_<kode>.csv` | `student_code, test_type (pretest/posttest/literasi_pre/literasi_post), question_id, answer, correct, essay_text, created_at` |
| `reflections_<kode>.csv` | `student_code, module_id, difficulty, confusing_note, created_at` |

Pemisah koma, encoding UTF-8, tanggal dalam format ISO 8601. Jawaban uraian tes literasi diekspor di `essay_text` untuk dinilai peneliti dengan rubrik, lalu skornya dimasukkan ke `data/mentah/skor_rubrik_literasi.csv`.

## 8. Mesin Matematika (JavaScript)

- `largestPerfectSquareFactor(n)`: iterasi k dari ⌊√n⌋ turun ke 1; kembalikan k² pertama yang membagi n.
- `simplifyRadical(a, n)` → `{ coef: a·k, radicand: n / k² }`.
- `rationalize(p / √b)` → `p√b / b`. `rationalize(p / (a + √b))` → kalikan sekawan, penyebut `a² − b`.
- `areEquivalent(x, y)`: bandingkan nilai numerik (toleransi 1e-9) dan bentuk kanonik.
- `approximate(radical, d)`, `estimateBounds(n)`.
- Papan ketik matematika menghasilkan token terstruktur agar parsing andal.

**Uji wajib**
| Masukan | Harapan |
|---|---|
| simplify(√72) | 6√2 |
| simplify(√200) | 10√2 |
| simplify(3√50) | 15√2 |
| simplify(√17) | √17 |
| rationalize(6/√3) | 2√3 |
| rationalize(4/(3−√5)) | 3 + √5 |
| check("2√18", √72, simplest) | correct: false, misconception: 'not-simplest' |
| check("√13", √4+√9) | misconception: 'sum-under-root' |
| approximate(5√2, 2) | 7.07 |
| estimateBounds(50) | [7, 8] |
| approximate(4√5, 2) | 8.94 |

## 9. PWA (Instal Tanpa Toko Aplikasi)

- `vite-plugin-pwa`: `registerType: 'prompt'` agar siswa diberi tahu jika ada versi baru ("Versi baru tersedia, muat ulang?"). Semua konten modul di-*precache*.
- `manifest.webmanifest`: `name: "AkarKu"`, `short_name: "AkarKu"`, `display: "standalone"`, `start_url: "/"`, `theme_color` mengikuti token `primary`, ikon 192/512 dan *maskable*.
- `useInstallPrompt.js` menangkap event `beforeinstallprompt` (Android/Chrome/Edge) untuk menampilkan tombol **"Pasang Aplikasi"**. Di iPhone (Safari) tidak ada event ini, jadi tampilkan panduan "Bagikan → Tambahkan ke Layar Utama".
- Syarat agar dapat diinstal: HTTPS, manifest valid, service worker aktif.

## 10. APK Unduhan Langsung (Opsional)

- Capacitor membungkus hasil build web menjadi APK. `appId: "id.akarku.app"`, `webDir: "dist"`, `minSdkVersion 26`.
- APK rilis ditandatangani dengan keystore sendiri, lalu diletakkan di `public/apk/akarku.apk` atau GitHub Releases.
- Siswa mengunduh APK dan mengizinkan "Instal dari sumber tidak dikenal". Detail: [10-instalasi-tanpa-playstore.md](10-instalasi-tanpa-playstore.md).
- iPhone **tidak bisa** memasang file APK/IPA di luar App Store, jadi pengguna iPhone memakai PWA.

## 11. Kinerja dan Kualitas

- *Code-splitting* per halaman (`React.lazy`).
- Font sistem atau 1 font web (subset Latin).
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, PWA *installable* lulus.
- CI opsional (GitHub Actions): lint, test, build, deploy ke GitHub Pages.
