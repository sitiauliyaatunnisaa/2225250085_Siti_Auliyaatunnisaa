# 04 — Panduan UI/UX

Panduan ini menerjemahkan temuan **EL03** ("terlalu banyak rumus dan warna membuat kurang fokus") dan **DS03** ("tidak terlalu banyak tulisan, rumus menumpuk, warna mencolok") menjadi aturan desain yang terukur.

## 1. Prinsip

| # | Prinsip | Aturan terukur |
|---|---|---|
| 1 | Tenang dan bersih | Latar putih/abu sangat muda. Maksimal 1 warna aksen per layar |
| 2 | Satu fokus | 1 konsep dan ≤ 1 rumus utama per layar. Teks ≤ 40 kata |
| 3 | Warna bermakna | Aksen = "perhatikan ini". Hijau = benar. Merah = salah. Selain itu netral |
| 4 | Tombol jelas | Tombol utama selalu di bawah (zona jempol), lebar penuh, tinggi ≥ 48 px |
| 5 | Siswa memegang kendali | Tidak ada auto-advance. Kembali dan ulangi selalu terlihat |
| 6 | Konsisten | Pola layar yang sama di semua modul |

## 2. Token Warna

| Token | Terang | Gelap | Kegunaan |
|---|---|---|---|
| `bg` | `#FAFAF9` | `#1C1B1A` | Latar halaman |
| `surface` | `#FFFFFF` | `#262523` | Kartu |
| `text` | `#1F2937` | `#ECEAE6` | Teks utama |
| `muted` | `#6B7280` | `#A3A09A` | Teks sekunder, alasan langkah |
| `border` | `#E5E7EB` | `#3A3835` | Garis kartu |
| `primary` | `#2F5D8A` | `#7FA9D6` | Tombol utama, tautan |
| `accent` | `#C2410C` | `#FB923C` | **Satu-satunya** penanda bagian yang berubah/penting |
| `success` | `#15803D` | `#4ADE80` | Umpan balik benar |
| `danger` | `#B91C1C` | `#F87171` | Umpan balik salah |
| `hint` | `#FEF9C3` | `#3F3A1E` | Latar panel petunjuk |

Semua pasangan teks/latar harus memenuhi kontras **≥ 4,5:1**. Jangan menggunakan gradien, pola latar, atau lebih dari dua ilustrasi per modul.

## 3. Tipografi

| Peran | Ukuran | Ketebalan |
|---|---|---|
| Judul layar | 22 px | 600 |
| Teks isi | 17 px (mode besar: 20 px) | 400 |
| Alasan langkah | 15 px, warna `muted` | 400 |
| Rumus (KaTeX) | 1,25× teks isi | — |
| Tombol | 17 px | 600 |

Font: sistem (`system-ui`) atau **Inter**/**Nunito** (satu saja). Tinggi baris 1,5. Lebar baris maksimal ±60 karakter di desktop.

## 4. Tata Letak

```
┌──────────────────────────────┐
│ ←  Menyederhanakan   ▓▓▓░░ 3/8 │  ← TopBar: kembali, judul modul, progres langkah
├──────────────────────────────┤
│                              │
│   [Kartu konten: 1 ide]      │  ← area utama, ruang putih lega
│                              │
│                              │
├──────────────────────────────┤
│ [📘 Rumus] [🔢 Tabel]          │  ← alat bantu (bottom sheet)
│ [        Lanjut  →         ] │  ← tombol utama, zona jempol
└──────────────────────────────┘
```

- Mobile-first 360 px, wajib rapi di 320 px (lihat [12-optimasi-smartphone.md](12-optimasi-smartphone.md)). Di desktop, konten di tengah dengan lebar maksimal 640 px.
- Jarak dasar 8 px (gunakan 8/16/24/32).
- Sudut kartu 12 px, bayangan sangat halus atau garis `border` saja.

## 5. Komponen Kunci

### 5.1 StepReveal (Worked Example)
```
  √72
  = √(36 × 2)          ← bagian "36" berwarna accent
    36 adalah kuadrat sempurna terbesar yang membagi 72   (muted, tepat di bawah)

  [ Langkah berikutnya ↓ ]   [ ↺ Ulangi ]
```
- Langkah sebelumnya tetap terlihat (redup 70%), langkah aktif normal.
- Hanya bagian yang **berubah** pada langkah aktif yang diberi warna aksen.

### 5.2 HintPanel
- Tombol "💡 Butuh petunjuk?" berukuran kecil di bawah soal.
- Petunjuk dibuka satu tingkat setiap kali tombol ditekan ("Petunjuk 1 dari 3").
- Latar `hint`, tanpa warna lain.

### 5.3 FeedbackBox
- Benar: ikon ✓, garis kiri `success`, dan 1–2 kalimat penjelasan.
- Salah: ikon ✗ (bukan teks merah besar), garis kiri `danger`, penjelasan mengapa, lalu tombol "Lihat pembahasan" dan "Coba soal mirip".
- Nada positif: "Hampir!", "Coba lagi, kamu bisa", bukan "SALAH!".

### 5.4 MathKeyboard
```
┌───┬───┬───┬───┬────┐
│ 7 │ 8 │ 9 │ √ │ ⌫  │
│ 4 │ 5 │ 6 │ / │ ( )│
│ 1 │ 2 │ 3 │ + │ −  │
│ 0 │ . │ ← │ → │ OK │
└───┴───┴───┴───┴────┘
```
- Menggantikan keyboard bawaan HP. Pratinjau KaTeX tampil langsung di atasnya.

### 5.5 BottomSheet Alat Bantu
- Kartu Rumus: daftar rumus, ketuk untuk melihat 1 rumus + 1 contoh.
- Tabel kuadrat sempurna: grid 1²–20² dengan angka besar.

## 6. Bahasa dan Penulisan (UX Writing)

| Lakukan | Hindari |
|---|---|
| "Cari kuadrat sempurna terbesar yang membagi 72." | "Tentukanlah faktor-faktor dari radikan yang merupakan bilangan kuadrat sempurna dengan nilai maksimum." |
| Kalimat ≤ 15 kata | Paragraf panjang |
| Sapaan "kamu" | "Anda", "peserta didik" |
| Istilah baru ditebalkan dan dijelaskan sekali | Istilah tanpa penjelasan |
| "Hampir! …" | "Jawaban salah." |

## 7. Animasi dan Interaksi

- Animasi hanya untuk transisi (≤ 200 ms, *fade/slide* halus). Hormati `prefers-reduced-motion`.
- Tanpa suara otomatis. Tanpa konfeti berlebihan (cukup ikon ✓ dan getar ringan di Android, opsional).
- Tanpa pop-up yang memotong alur belajar.

## 8. Aksesibilitas

- Target sentuh ≥ 48×48 px dengan jarak ≥ 8 px.
- Semua rumus KaTeX diberi `aria-label` berbahasa Indonesia (misalnya "akar 72 sama dengan 6 akar 2").
- Warna tidak menjadi satu-satunya penanda (benar/salah juga memakai ikon dan teks).
- Mendukung ukuran huruf besar (F7.1).

## 9. Daftar Periksa Review Layar

- [ ] ≤ 40 kata dan ≤ 1 rumus utama?
- [ ] Hanya satu warna aksen, dan bermakna?
- [ ] Tombol utama di bawah dan mudah dijangkau jempol?
- [ ] Ada jalan kembali/ulangi?
- [ ] Tidak ada yang bergerak atau berpindah sendiri?
- [ ] Bahasa sederhana, tanpa istilah yang belum dijelaskan?
- [ ] Rapi di 320–430 px tanpa gulir horizontal, dan tombol ≥ 48 px?
- [ ] Tombol Kembali Android berperilaku benar di layar ini?
