# 01 — Analisis Kebutuhan (Fase *Analysis* ADDIE)

## 1. Tujuan Analisis

Fase ini bertujuan mengidentifikasi kesenjangan antara kondisi belajar siswa saat ini dan kondisi yang diharapkan pada materi bilangan bentuk akar, ditinjau dari sudut pandang **beban kognitif** (Sweller, 1988; Sweller, van Merriënboer & Paas, 2019).

## 2. Metode

| Aspek | Keterangan |
|---|---|
| Teknik | Wawancara semi-terstruktur dengan pedoman *Cognitive Load* |
| Responden | 1 siswa kelas IX (kode **S01**) |
| Tanggal | 6 November 2026 |
| Durasi | 35 menit, direkam dengan persetujuan siswa |
| Materi yang pernah dipelajari | Bilangan bentuk akar |
| Bukti belajar | LKS dan buku catatan siswa (kelas VIII) |
| Artefak pemicu | Lembar kerja contoh soal menyederhanakan bentuk akar dan operasi hitung bentuk akar |
| Pengkodean | IL = intrinsic, EL = extraneous, GL = germane/strategi belajar, K = konteks/prasyarat, DS = arah desain |

> **Rekomendasi tindak lanjut:** Karena responden baru satu orang, temuan ini perlu diperkuat dengan (a) angket analisis kebutuhan untuk ±30 siswa, (b) wawancara guru matematika, dan (c) analisis hasil ulangan/LKS siswa. Template angket ada di bagian 8.

## 3. Hasil Pengkodean Wawancara

### 3.1 Beban Intrinsik (IL)
| Kode | Kutipan inti | Interpretasi | Implikasi desain |
|---|---|---|---|
| IL01, IL04 | "Paling sulit adalah menyederhanakan bentuk akar dan merasionalkan penyebut … ketika angka lebih besar dan bentuk pecahan." | Kompleksitas konsep tinggi pada manipulasi akar dan bilangan besar yang memerlukan faktorisasi | Urutkan soal dari angka kecil → besar → pecahan. Beri porsi terbesar untuk M2 dan M5 |
| IL02, IL05 | "Harus mengingat rumus dan urutan langkah … salah karena kurang teliti atau salah menentukan faktor kuadrat sempurna." | Interaktivitas unsur tinggi; *working memory* terbebani oleh rumus dan prosedur sekaligus | Kartu rumus selalu tersedia, langkah dipandu, tabel kuadrat sempurna, dan deteksi kesalahan faktor |

### 3.2 Konteks/Prasyarat (K)
| Kode | Kutipan inti | Implikasi desain |
|---|---|---|
| IL03 | "Perlu memahami bilangan kuadrat sempurna dan faktorisasi." | Modul **M0 Pemanasan Prasyarat** dan tes prasyarat singkat di awal |

### 3.3 Beban Ekstrinsik (EL)
| Kode | Kutipan inti | Sumber beban | Implikasi desain |
|---|---|---|---|
| EL01, EL02 | "Penjelasan di buku terlalu panjang … contoh soal lebih mudah dipahami daripada membaca rumus." | Teks naratif panjang | Kartu ±40 kata dan pendekatan contoh dulu |
| EL03 | "Terlalu banyak rumus dan warna … kurang fokus." | Visual ramai, *split attention* | Palet netral dengan 1 aksen, 1 rumus per layar |
| EL04 | "Guru menjelaskan terlalu cepat … tertinggal, perlu penjelasan ulang." | Tempo tidak sesuai kemampuan siswa | Tempo diatur siswa, tombol ulangi, tanpa timer |
| EL05 | "Soal cerita … bingung angka mana yang harus digunakan." | Bahasa soal abstrak, beban mencari informasi | Pemandu soal cerita 4 langkah dan fitur tandai informasi |

### 3.4 Beban Germane / Strategi Belajar (GL)
| Kode | Kutipan inti | Strategi yang sudah dimiliki | Implikasi desain |
|---|---|---|---|
| GL01, GL03 | "Lebih mudah jika ada contoh soal dan latihan bertahap … petunjuk langkah demi langkah dan contoh yang mirip." | Belajar dari contoh | *Worked example* → *faded example* → latihan; petunjuk bertahap; soal kembar |
| GL02 | "Memeriksa kembali jawaban dengan menghitung ulang." | Self-check | Tombol "Cek langkahku" |
| GL04 | "Mencoba menjelaskan cara mengerjakan ke teman." | Elaborasi verbal | Pertanyaan *self-explanation* dan fitur "Jelaskan ke teman" |
| GL05 | "Melihat pola pengerjaan dari soal sebelumnya." | Pengenalan pola/skema | Ringkasan pola di akhir modul dan soal dengan struktur serupa |

### 3.5 Arah Desain dari Siswa (DS)
| Kode | Kutipan inti | Fitur |
|---|---|---|
| DS01 | "Aplikasi sebaiknya memiliki contoh soal, latihan, dan petunjuk pengerjaan." | Menu Belajar, Latihan, dan Petunjuk |
| DS02 | "Rumus dan contoh dijelaskan perlahan, latihan bisa dikerjakan sendiri." | Pemisahan mode Belajar (dipandu) dan Latihan (mandiri) |
| DS03 | "Tidak terlalu banyak tulisan, rumus menumpuk, dan warna mencolok." | Panduan UI minimalis ([04-panduan-ui-ux.md](04-panduan-ui-ux.md)) |

## 4. Analisis Bukti Artefak (Catatan Siswa Kelas VIII)

Catatan siswa memuat: definisi bentuk akar, contoh menyederhanakan (√12, √18, dan sejenisnya), operasi penjumlahan/pengurangan akar sejenis (misalnya 2√3 + 5√3), serta perkalian/pembagian dengan rumus √a × √b = √(ab) dan √a/√b = √(a/b).

**Catatan analisis:**
- Rumus ditulis dalam kotak yang berdekatan dengan banyak contoh, sehingga padat dan terpaku pada rumus. Ini sejalan dengan EL03.
- Langkah-langkah tidak disertai alasan, sehingga siswa menghafal prosedur tanpa memahami *mengapa*. Ini sejalan dengan IL02.
- Materi merasionalkan penyebut tidak tampak lengkap di catatan, padahal menurut IL01 materi ini termasuk yang paling sulit.

## 5. Analisis Karakteristik Siswa

| Aspek | Temuan | Konsekuensi |
|---|---|---|
| Usia/tahap kognitif | 14–15 tahun, transisi operasional konkret → formal | Mulai dari contoh numerik konkret sebelum generalisasi simbolik |
| Gaya belajar yang disukai | Contoh soal, bertahap, dan pola | Pendekatan *example-based learning* |
| Kebiasaan positif | Cek ulang, diskusi dengan teman, menjelaskan ke teman | Fasilitasi refleksi dan elaborasi |
| Perangkat | HP Android (asumsi umum siswa SMP, perlu dikonfirmasi lewat angket) | Mobile-first, ringan, dan offline |

## 6. Analisis Materi (Kurikulum Merdeka, Fase D)

**Capaian Pembelajaran (ringkasan elemen Bilangan, Fase D):** Peserta didik dapat membaca, menulis, dan membandingkan bilangan, termasuk bilangan berpangkat bulat dan akar, serta menerapkan operasi aritmetika pada bilangan real.

> Sesuaikan redaksi CP dengan dokumen CP terbaru dari BSKAP/Kemendikbudristek yang berlaku di sekolah.

Peta konsep dan urutan prasyarat:
```
Kuadrat sempurna ──┐
Faktorisasi prima ─┼─► Pengertian bentuk akar ─► Menyederhanakan ─┬─► Penjumlahan/pengurangan
Pangkat pecahan ───┘                                              ├─► Perkalian/pembagian
                                                                  └─► Merasionalkan penyebut ─► Soal kontekstual
```

## 7. Rumusan Kebutuhan (Kesimpulan Fase Analysis)

1. Media belajar mandiri yang **memecah materi kompleks** menjadi langkah kecil dengan alasan di setiap langkah.
2. **Penguatan prasyarat** (kuadrat sempurna dan faktorisasi) sebelum masuk materi inti.
3. **Penyajian minimalis**: teks singkat, satu rumus per layar, dan warna terbatas.
4. **Kendali tempo** di tangan siswa.
5. **Scaffolding**: contoh bertahap, petunjuk bertingkat, soal mirip, dan umpan balik yang menjelaskan.
6. **Pemisahan** materi/contoh dan latihan mandiri.
7. Dukungan **refleksi** (cek ulang, menjelaskan kembali, dan mengenali pola).
8. Dapat diakses melalui **HP Android dan web**, juga offline.

## 8. Lampiran: Template Angket Analisis Kebutuhan (untuk ±30 siswa)

Skala: 1 = Sangat Tidak Setuju … 4 = Sangat Setuju

| No | Pernyataan | Konstruk |
|---|---|---|
| 1 | Saya kesulitan menyederhanakan bentuk akar | IL |
| 2 | Saya kesulitan merasionalkan penyebut | IL |
| 3 | Saya sulit mengingat urutan langkah pengerjaan | IL |
| 4 | Saya hafal bilangan kuadrat sempurna 1–400 | K |
| 5 | Penjelasan di buku terlalu panjang bagi saya | EL |
| 6 | Tampilan materi yang penuh warna dan rumus membuat saya tidak fokus | EL |
| 7 | Saya sering tertinggal ketika penjelasan terlalu cepat | EL |
| 8 | Saya bingung menentukan informasi penting dalam soal cerita | EL |
| 9 | Saya lebih paham jika ada contoh soal langkah demi langkah | GL |
| 10 | Saya terbantu dengan petunjuk saat mengerjakan soal | GL |
| 11 | Saya memeriksa kembali jawaban saya | GL |
| 12 | Saya memiliki HP Android yang bisa dipakai belajar | Konteks |
| 13 | Saya memiliki akses internet yang stabil | Konteks |

Pertanyaan terbuka: "Fitur apa yang kamu harapkan ada di aplikasi belajar matematika?"
