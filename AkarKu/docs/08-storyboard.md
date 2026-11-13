# 08 — Storyboard

Storyboard berupa wireframe teks untuk layar kunci. Lebar acuan: 360 px (HP).

---

### S1 — Onboarding
```
┌──────────────────────────────┐
│                              │
│          √ AkarKu            │
│  Belajar bentuk akar,        │
│  langkah demi langkah.       │
│                              │
│  Nama panggilanmu:           │
│  [ Nisa                    ] │
│  Kode siswa (dari guru):     │
│  [ S01                     ] │
│                              │
│  [        Mulai  →         ] │
└──────────────────────────────┘
```
Aksi: simpan profil → tawarkan pretest (jika mode penelitian aktif) → Beranda.

### S2 — Beranda
```
┌──────────────────────────────┐
│ Halo, Nisa 👋                │
│ Lanjutkan: M2 Menyederhanakan│
│ [ ▓▓▓▓░░░░  Lanjut belajar ] │
│                              │
│ ┌────────┐ ┌────────┐        │
│ │ 📖     │ │ ✏️      │        │
│ │Belajar │ │Latihan │        │
│ └────────┘ └────────┘        │
│ ┌────────┐ ┌────────┐        │
│ │ 📘     │ │ 📊     │        │
│ │ Rumus  │ │Progres │        │
│ └────────┘ └────────┘        │
└──────────────────────────────┘
```
F1.1. Menu Belajar dan Latihan dipisahkan dengan jelas (DS02).

### S3 — Peta Modul
```
┌──────────────────────────────┐
│ ← Belajar                    │
│ ✓ M0 Pemanasan prasyarat     │
│ ✓ M1 Mengenal bentuk akar    │
│ ● M2 Menyederhanakan   3/8   │
│ ○ M3 Tambah & kurang         │
│ ○ M4 Kali & bagi             │
│ ○ M5 Merasionalkan penyebut  │
│ ○ M6 Soal cerita             │
└──────────────────────────────┘
```

### S4 — Kartu Konsep
```
┌──────────────────────────────┐
│ ←  Menyederhanakan  ▓▓░░░ 2/8 │
│                              │
│  Langkah pertama:            │
│  cari bilangan **kuadrat     │
│  sempurna terbesar** yang    │
│  membagi angka di dalam akar.│
│                              │
│        √72 = √(36 × 2)       │  ← "36" berwarna aksen
│                              │
│ [📘 Rumus] [🔢 Tabel]          │
│ [ ← ]      [   Lanjut  →   ] │
└──────────────────────────────┘
```
F2.1, F2.2, F2.6, F4.

### S5 — Contoh Lengkap (StepReveal)
```
┌──────────────────────────────┐
│ ←  Contoh 1        ▓▓▓░░ 4/8 │
│  Sederhanakan √72            │
│                              │
│  √72 = √(36 × 2)             │  (redup)
│   36 kuadrat sempurna terbesar│
│  = √36 × √2                  │  (redup)
│   sifat √(a×b) = √a × √b     │
│  = 6√2                       │  ← aktif, "6" berwarna aksen
│   karena √36 = 6             │
│                              │
│ [ ↺ Ulangi ]  [ Lanjut → ]   │
└──────────────────────────────┘
```
Sebelum semua langkah terbuka, tombolnya berbunyi "Langkah berikutnya ↓" (F2.4).

### S6 — Coba Lengkapi (Faded)
```
┌──────────────────────────────┐
│  Sederhanakan √75            │
│  √75 = √(25 × 3)             │
│      = √25 × √3              │
│      = [ ____ ]  ← ketuk     │
│                              │
│  ┌ keyboard matematika ────┐ │
│  │ 7 8 9 √ ⌫ / 4 5 6 ...   │ │
│  └─────────────────────────┘ │
│ [         Periksa          ] │
└──────────────────────────────┘
```

### S7 — Latihan dengan Petunjuk
```
┌──────────────────────────────┐
│ ← Latihan M2 · Sedang   3/10 │
│                              │
│  Sederhanakan:  √128         │
│                              │
│  Jawaban: [ 8√2         ]    │
│                              │
│  💡 Butuh petunjuk? (0/3)    │
│ ┌ Petunjuk 1 ──────────────┐ │
│ │ Cari kuadrat sempurna    │ │
│ │ terbesar yang membagi 128│ │
│ └──────────────────────────┘ │
│ [📘] [🔢]   [   Periksa   ]   │
└──────────────────────────────┘
```

### S8 — Umpan Balik
```
┌──────────────────────────────┐
│ ┃ ✗ Hampir!                  │  (garis kiri merah)
│ ┃ 4√8 nilainya benar, tetapi │
│ ┃ 8 masih punya faktor 4.    │
│ ┃ √128 = √(64 × 2) = 8√2     │
│                              │
│ [ Coba soal mirip ]          │
│ [   Soal berikutnya →      ] │
└──────────────────────────────┘
```
F3.5, F3.7.

### S9 — Pemandu Soal Cerita
```
┌──────────────────────────────┐
│ Layar HP panjangnya [8 cm]   │  ← angka yang sudah diketuk
│ dan lebarnya [4 cm]. Berapa  │
│ panjang diagonalnya?         │
│ ──────────────────────────── │
│ ① Diketahui  ✓ p = 8, l = 4  │
│ ② Ditanya    ✓ diagonal      │
│ ③ Rumus      ○ pilih:        │
│    ( ) d = p + l             │
│    (•) d = √(p² + l²)        │
│    ( ) d = p × l             │
│ ④ Hitung     (terkunci)      │
│ [          Lanjut          ] │
└──────────────────────────────┘
```

### S9b — Pojok Literasi: Langkah Tafsirkan
```
┌──────────────────────────────┐
│ ← Pojok Literasi M2   ③ / ③  │
│ ┌ Stimulus ────────────────┐ │
│ │ Ubin persegi luasnya     │ │
│ │ 50 cm². Kotak persegi    │ │
│ │ bersisi 7 cm. Apakah ubin│ │
│ │ bisa masuk ke kotak?     │ │
│ └──────────────────────────┘ │
│ ① Rumuskan ✓  s = √50        │
│ ② Kerjakan ✓  s = 5√2 cm     │
│ ③ Tafsirkan                  │
│   5√2 ≈ [ 7,07 ] cm          │
│   6 ──── 7 ─●── 8            │  ← garis bilangan (EstimateLine)
│ ( ) Bisa masuk               │
│ (•) Tidak bisa masuk         │
│ [         Periksa          ] │
└──────────────────────────────┘
```
F8.2–F8.5.

### S10 — Refleksi Akhir Modul
```
┌──────────────────────────────┐
│ 🎉 Modul M2 selesai!         │
│ Skor kuis: 4/5               │
│                              │
│ Seberapa berat usaha mentalmu?│
│ 1 2 3 4 5 6 7 8 9            │
│ ringan            sangat berat│
│                              │
│ Bagian yang masih            │
│ membingungkan? (opsional)    │
│ [                         ]  │
│ [        Simpan  →         ] │
└──────────────────────────────┘
```
F6.4.

### S11 — Progres
```
┌──────────────────────────────┐
│ ← Progres Nisa               │
│ Modul selesai: 3/7           │
│ Rata-rata kuis: 82%          │
│                              │
│ Literasi:                    │
│  Merumuskan  ▓▓▓▓░  80%      │
│  Menerapkan  ▓▓▓▓▓  90%      │
│  Menafsirkan ▓▓▓░░  60%      │
│                              │
│ Kesalahan paling sering:     │
│ • Belum paling sederhana (5) │
│ • Salah sekawan (2)          │
│   [ Latih bagian ini → ]     │
│                              │
│ [ Posttest ] [ Ekspor data ] │
└──────────────────────────────┘
```
