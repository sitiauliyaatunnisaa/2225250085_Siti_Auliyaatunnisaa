# 02 — Desain Pembelajaran (Fase *Design* ADDIE)

## 1. Tujuan Pembelajaran (TP)

Setelah menggunakan AkarKu, siswa dapat:

| Kode | Tujuan Pembelajaran | Modul | Level kognitif |
|---|---|---|---|
| TP0 | Menentukan bilangan kuadrat sempurna dan faktorisasi prima suatu bilangan | M0 | C1–C2 |
| TP1 | Menjelaskan hubungan bentuk akar dengan bilangan berpangkat pecahan | M1 | C2 |
| TP2 | Menyederhanakan bentuk akar | M2 | C3 |
| TP3 | Menentukan hasil penjumlahan dan pengurangan bentuk akar | M3 | C3 |
| TP4 | Menentukan hasil perkalian dan pembagian bentuk akar | M4 | C3 |
| TP5 | Merasionalkan penyebut pecahan bentuk akar | M5 | C3 |
| TP6 | Menyelesaikan masalah kontekstual yang berkaitan dengan bentuk akar | M6 | C4 |
| TP7 (literasi) | Merumuskan situasi nyata menjadi model bentuk akar, menyelesaikannya, serta menafsirkan dan mengevaluasi hasilnya dalam konteks personal, sosial budaya, dan saintifik | M1–M6 (Pojok Literasi), M6 | C3–C5 |

Rancangan lengkap literasi matematika: [09-literasi-matematika.md](09-literasi-matematika.md).

## 2. Pemetaan Prinsip CLT ke Fitur

| Prinsip (Mayer & Sweller) | Jenis beban yang dikelola | Penerapan di AkarKu | Dasar wawancara |
|---|---|---|---|
| **Pre-training** | Intrinsic | Modul M0 (kuadrat sempurna, faktorisasi) dan tabel referensi | IL03 |
| **Sequencing simple-to-complex** | Intrinsic | Tingkat soal: angka kecil → besar → pecahan → campuran | IL01, IL04 |
| **Segmenting** | Intrinsic/Extraneous | Kartu materi kecil, langkah dibuka satu per satu | EL01, IL02 |
| **Learner pacing** | Extraneous | Tombol Lanjut/Kembali/Ulangi, tanpa timer | EL04 |
| **Coherence** | Extraneous | Tanpa dekorasi, teks seperlunya | EL01, EL03, DS03 |
| **Signaling** | Extraneous | Satu warna aksen untuk bagian yang berubah | EL03 |
| **Spatial contiguity** | Extraneous | Alasan langkah ditempatkan tepat di bawah langkahnya | EL03 |
| **Worked example effect** | Germane | Contoh lengkap bertahap dengan alasan | EL02, GL01 |
| **Guidance fading** | Germane | Contoh lengkap → sebagian kosong → mandiri | GL01, GL03 |
| **Self-explanation** | Germane | Pertanyaan "Mengapa langkah ini?" | GL04 |
| **Variability of practice** | Germane | Soal kembar dengan konteks/angka berbeda | GL05 |
| **Expertise reversal** | Semua | Siswa yang sudah mahir dapat melewati contoh dan langsung berlatih | — |
| **Feedback elaboratif** | Germane | Penjelasan mengapa salah dan pola kesalahan | IL05, GL02 |

## 3. Struktur Setiap Modul (Pola Tetap)

Pola yang sama di semua modul membantu siswa membangun **skema navigasi**, sehingga beban ekstrinsik berkurang.

```
1. Pembuka        (1 kartu)  — masalah nyata pemantik (F8.1), misalnya "Ubin 50 cm², berapa sisinya?"
2. Ingat dulu     (1–2 kartu) — prasyarat singkat yang terkait (opsional, bisa dilewati)
3. Konsep         (2–4 kartu) — satu ide per kartu, contoh numerik dulu, baru rumus
4. Contoh Lengkap (2 contoh)  — worked example, langkah dibuka satu per satu
5. Coba Lengkapi  (2–3 contoh) — faded example: 1 langkah kosong → 2 langkah kosong
6. Pola           (1 kartu)  — ringkasan pola penyelesaian (3–4 poin)
7. Kembali ke Konteks (1 kartu) — jawab masalah pembuka + tafsirkan hasilnya (nilai pendekatan, satuan)
8. Kuis Modul     (5 soal)   — ambang tuntas 70%
9. Refleksi       (1 layar)  — skala kesulitan 1–9 + "bagian yang masih membingungkan"
```
Setelah modul selesai, **Pojok Literasi** modul tersebut terbuka di menu Latihan (F8.2).

## 4. Desain Scaffolding

### 4.1 Petunjuk Bertingkat (Latihan)
| Tingkat | Isi | Contoh untuk "Sederhanakan √72" |
|---|---|---|
| Petunjuk 1 | Arah umum | "Cari bilangan kuadrat sempurna terbesar yang membagi 72." |
| Petunjuk 2 | Langkah pertama | "72 = 36 × 2, dan 36 = 6²." |
| Petunjuk 3 | Contoh mirip yang sudah dikerjakan | "Contoh: √50 = √(25 × 2) = 5√2." |

Penggunaan petunjuk dicatat untuk keperluan analisis, tetapi **tidak mengurangi skor** di mode latihan, agar siswa tidak takut meminta bantuan.

### 4.2 Faded Worked Example
```
Contoh A (lengkap):   √48 = √(16 × 3) = √16 × √3 = 4√3
Contoh B (1 kosong):  √75 = √(25 × 3) = √25 × √3 = [  ]
Contoh C (2 kosong):  √98 = √([  ] × 2) = [  ] × √2 = 7√2
Latihan (mandiri):    √128 = ?
```

### 4.3 Umpan Balik Elaboratif
| Situasi | Contoh umpan balik |
|---|---|
| Benar dan paling sederhana | "Tepat! 72 = 36 × 2, jadi √72 = 6√2." |
| Benar tetapi belum paling sederhana | "Hampir! 2√18 sudah benar nilainya, tetapi 18 masih punya faktor 9. Coba sederhanakan lagi." |
| Salah faktor | "Hmm, 72 = 8 × 9. Ingat, kita mencari faktor **kuadrat sempurna terbesar**. Lihat tabel kuadrat." |
| Miskonsepsi √a + √b | "Hati-hati: √9 + √16 = 3 + 4 = 7, sedangkan √25 = 5. Jadi √a + √b ≠ √(a+b)." |

## 5. Desain Pemandu Soal Cerita (M6)

> Pemandu 4 langkah di bawah ini adalah bentuk **dipandu penuh** dari siklus literasi Rumuskan → Kerjakan → Tafsirkan ([09 §4](09-literasi-matematika.md)). Langkah 1–3 termasuk *Rumuskan*, langkah 4 termasuk *Kerjakan*, lalu ditambah langkah 5 *Tafsirkan*.

```
Soal: "Sebuah layar HP berbentuk persegi panjang dengan panjang 8 cm dan lebar 4 cm.
       Berapa panjang diagonalnya dalam bentuk akar paling sederhana?"

Langkah 1 — Diketahui  : panjang = 8 cm, lebar = 4 cm        (siswa mengetuk angka di teks)
Langkah 2 — Ditanya    : panjang diagonal
Langkah 3 — Rumus      : d = √(p² + l²)                      (pilih dari 3 pilihan rumus)
Langkah 4 — Hitung     : √(64 + 16) = √80 = √(16 × 5) = 4√5 cm
Langkah 5 — Tafsirkan  : 4√5 ≈ 8,94 cm. Masuk akal? Ya, diagonal lebih panjang dari sisi terpanjang (8 cm)
```

## 6. Strategi Penilaian

| Jenis | Tujuan | Waktu | Bentuk |
|---|---|---|---|
| Tes prasyarat | Diagnostik | Awal | 5 soal kuadrat sempurna/faktorisasi |
| Pretest | Kemampuan awal (penelitian) | Sebelum menggunakan aplikasi | 10–15 soal |
| Kuis modul | Formatif | Akhir setiap modul | 5 soal, tuntas ≥ 70% |
| Latihan | Formatif, tidak dinilai | Kapan saja | Tak terbatas, acak |
| Posttest | Sumatif (penelitian) | Setelah semua modul | 10–15 soal setara pretest |
| Tes literasi (pre & post) | Kemampuan literasi matematika (penelitian) | Awal dan akhir program | 5 butir uraian berstimulus, rubrik 3 proses ([09 §8](09-literasi-matematika.md)) |
| Skala beban kognitif | Persepsi beban | Akhir setiap modul dan akhir program | Skala Paas 1–9 / angket CLT |

Kisi-kisi soal tersedia di [05-spesifikasi-konten.md](05-spesifikasi-konten.md).

## 7. Peran Guru

- Mengenalkan aplikasi di kelas (±10 menit).
- Menggunakan aplikasi sebagai **pendamping** pembelajaran tatap muka atau tugas mandiri di rumah.
- Mendorong siswa berdiskusi tentang pola dan menjelaskan ke teman (GL04), misalnya lewat *think-pair-share* setelah satu modul selesai.
