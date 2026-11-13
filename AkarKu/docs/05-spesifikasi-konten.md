# 05 — Spesifikasi Konten (Materi, Contoh, dan Bank Soal)

> Seluruh konten wajib divalidasi oleh **ahli materi** (dosen/guru matematika) sebelum uji coba. Semua jawaban di bawah sudah dihitung, tetapi tetap perlu diperiksa ulang.

## Ringkasan Modul

| Modul | Judul | Kartu konsep | Contoh lengkap | Faded | Kuis | Generator latihan |
|---|---|---|---|---|---|---|
| M0 | Pemanasan: Kuadrat Sempurna dan Faktorisasi | 3 | 2 | 2 | 5 | ✓ |
| M1 | Mengenal Bentuk Akar | 3 | 2 | 1 | 5 | ✓ |
| M2 | Menyederhanakan Bentuk Akar | 3 | 2 | 3 | 5 | ✓ |
| M3 | Penjumlahan dan Pengurangan | 3 | 2 | 2 | 5 | ✓ |
| M4 | Perkalian dan Pembagian | 3 | 2 | 2 | 5 | ✓ |
| M5 | Merasionalkan Penyebut | 4 | 3 | 3 | 5 | ✓ |
| M6 | Literasi: Bentuk Akar dalam Kehidupan | 2 | 2 | 1 | 5 | — (bank stimulus) |

**Literasi matematika:** setiap modul juga memiliki *pembuka kontekstual* dan *Pojok Literasi*. Bank stimulus (personal, sosial budaya, dan saintifik), soal penalaran, dan tes literasi ada di [09-literasi-matematika.md](09-literasi-matematika.md) §5–§8.

---

## M0 — Pemanasan: Kuadrat Sempurna dan Faktorisasi (TP0)

**Kartu konsep**
1. "**Bilangan kuadrat sempurna** adalah hasil kali bilangan dengan dirinya sendiri. Contoh: 6 × 6 = 36." — rumus: `6^2 = 36`
2. "Hafalkan 10 kuadrat pertama: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. Tabelnya bisa kamu buka kapan saja."
3. "**Faktorisasi** berarti memecah bilangan menjadi perkalian. Untuk bentuk akar, kita cari faktor yang kuadrat sempurna." — `72 = 36 \times 2`

**Contoh lengkap:** (a) Apakah 49 kuadrat sempurna? → 7 × 7 = 49, ya. (b) Faktor kuadrat sempurna terbesar dari 48 → 16 (48 = 16 × 3).

**Kuis:** 144 kuadrat sempurna? (ya, 12²) · 15² = ? (225) · Faktor kuadrat sempurna terbesar dari 50 (25) · dari 108 (36) · dari 98 (49)

## M1 — Mengenal Bentuk Akar (TP1)

**Kartu konsep**
1. "√9 = 3 karena 3² = 9. Akar adalah kebalikan dari kuadrat."
2. "Jika hasilnya bukan bilangan bulat, misalnya √2 ≈ 1,414…, kita biarkan dalam **bentuk akar**."
3. "Bentuk akar bisa ditulis sebagai pangkat pecahan." — `\sqrt{a} = a^{\frac{1}{2}}`

**Kuis:** Mana yang bentuk akar: √16, √7, √25, √49? (√7) · `\sqrt{81}` = ? (9) · `25^{1/2}` = ? (5) · `\sqrt{5}` dalam pangkat (5^{1/2}) · `49^{1/2}` = ? (7)

## M2 — Menyederhanakan Bentuk Akar (TP2) ⭐ prioritas

**Kartu konsep**
1. "Sifat penting:" — `\sqrt{a \times b} = \sqrt{a} \times \sqrt{b}`
2. "Langkah: cari kuadrat sempurna **terbesar** yang membagi angka di dalam akar."
3. "Lalu pisahkan dan tarik akarnya keluar." — `\sqrt{36 \times 2} = 6\sqrt{2}`

**Contoh lengkap (StepReveal)**
| Soal | Langkah (tex) | Alasan |
|---|---|---|
| √12 | `\sqrt{12} = \sqrt{4 \times 3}` | 4 kuadrat sempurna terbesar yang membagi 12 |
| | `= \sqrt{4} \times \sqrt{3}` | sifat √(a×b) = √a × √b |
| | `= 2\sqrt{3}` | √4 = 2 |
| √72 | `\sqrt{72} = \sqrt{36 \times 2}` | 36 kuadrat sempurna terbesar yang membagi 72 |
| | `= 6\sqrt{2}` | √36 = 6 |

**Faded:** √75 → 5√3 · √98 → 7√2 · 3√20 → 6√5

**Pola:** ① Cari kuadrat sempurna terbesar ② Tulis sebagai perkalian ③ Tarik keluar akarnya ④ Cek: angka di dalam akar tidak lagi punya faktor kuadrat sempurna.

**Tingkat soal latihan**
| Tingkat | Rentang | Contoh |
|---|---|---|
| Mudah | radikan ≤ 50 | √8 = 2√2, √27 = 3√3, √45 = 3√5 |
| Sedang | 50–200 | √72 = 6√2, √128 = 8√2, √180 = 6√5 |
| Sulit | > 200 atau berkoefisien/pecahan | √300 = 10√3, 2√252 = 12√7, √(18/25) = (3/5)√2 |

**Kuis:** √18 (3√2) · √48 (4√3) · √200 (10√2) · 2√45 (6√5) · √(8/9) ((2/3)√2)

## M3 — Penjumlahan dan Pengurangan (TP3)

**Kartu konsep**
1. "Bentuk akar **sejenis** memiliki angka di dalam akar yang sama, seperti 2√3 dan 5√3."
2. "Jumlahkan koefisiennya saja:" — `a\sqrt{c} + b\sqrt{c} = (a+b)\sqrt{c}`
3. "Hati-hati! √a + √b **tidak sama** dengan √(a+b). Contoh: √9 + √16 = 7, bukan √25 = 5."

**Contoh lengkap:** 2√3 + 5√3 = 7√3 · √12 + √27 = 2√3 + 3√3 = 5√3

**Faded:** √50 − √8 = 5√2 − 2√2 = 3√2 · √18 + √32 − √2 = 3√2 + 4√2 − √2 = 6√2

**Kuis:** 4√5 + 2√5 (6√5) · 7√2 − 3√2 (4√2) · √20 + √45 (5√5) · √75 − √12 (3√3) · 2√3 + √5 (tidak bisa disederhanakan; MCQ)

## M4 — Perkalian dan Pembagian (TP4)

**Kartu konsep**
1. `\sqrt{a} \times \sqrt{b} = \sqrt{ab}`
2. `a\sqrt{b} \times c\sqrt{d} = ac\sqrt{bd}` — "Kalikan angka di luar dengan di luar, di dalam dengan di dalam."
3. `\dfrac{\sqrt{a}}{\sqrt{b}} = \sqrt{\dfrac{a}{b}}`

**Contoh lengkap:** √3 × √12 = √36 = 6 · 2√3 × 4√6 = 8√18 = 8 · 3√2 = 24√2

**Faded:** √48 ÷ √3 = √16 = 4 · 3√10 × √5 = 3√50 = 15√2

**Kuis:** √2 × √8 (4) · 3√5 × 2√5 (30) · √6 × √15 (3√10) · √72 ÷ √2 (6) · 6√20 ÷ 3√5 (4)

## M5 — Merasionalkan Penyebut (TP5) ⭐ prioritas

**Kartu konsep**
1. "Bentuk akar di penyebut dianggap belum sederhana. Kita **rasionalkan** agar penyebutnya bilangan bulat."
2. "Kalikan dengan bentuk akar penyebut di atas dan di bawah (sama dengan mengalikan 1)." — `\dfrac{a}{\sqrt{b}} \times \dfrac{\sqrt{b}}{\sqrt{b}} = \dfrac{a\sqrt{b}}{b}`
3. "Untuk penyebut a + √b, gunakan **sekawan** a − √b." — `(a+\sqrt{b})(a-\sqrt{b}) = a^2 - b`
4. "Sekawan hanya **mengganti tanda** di tengah: 3 + √2 ↔ 3 − √2."

**Contoh lengkap**
| Soal | Langkah | Alasan |
|---|---|---|
| 6/√3 | `\frac{6}{\sqrt3}\times\frac{\sqrt3}{\sqrt3}` | kalikan dengan √3/√3 (nilainya 1) |
| | `= \frac{6\sqrt3}{3}` | √3 × √3 = 3 |
| | `= 2\sqrt3` | 6 ÷ 3 = 2 |
| 5/(2√5) | `\frac{5}{2\sqrt5}\times\frac{\sqrt5}{\sqrt5} = \frac{5\sqrt5}{10} = \frac{\sqrt5}{2}` | cukup kalikan dengan √5 |
| 4/(3−√5) | `\times\frac{3+\sqrt5}{3+\sqrt5}` | sekawan 3 − √5 adalah 3 + √5 |
| | `= \frac{4(3+\sqrt5)}{9-5}` | (a−√b)(a+√b) = a² − b |
| | `= 3+\sqrt5` | 4 ÷ 4 = 1 |

**Faded:** 10/√2 → 5√2 · 3/√6 → √6/2 · 2/(√3+1) → √3 − 1

**Tingkat:** Mudah: a/√b dengan hasil bulat · Sedang: a/(c√b) dan hasil pecahan · Sulit: penyebut sekawan a ± √b

**Kuis:** 8/√2 (4√2) · 12/√6 (2√6) · 1/√5 (√5/5) · 6/(2+√2) (6 − 3√2) · 1/(√5−2) (√5 + 2)

> Cek: 6(2−√2)/(4−2) = 3(2−√2) = 6 − 3√2 ✓ · (√5+2)/(5−4) = √5 + 2 ✓

## M6 — Literasi: Bentuk Akar dalam Kehidupan (TP6, TP7)

Setiap soal menggunakan **LiteracyCycle**: Rumuskan (Diketahui → Ditanya → Rumus) → Kerjakan (Hitung) → **Tafsirkan** (nilai pendekatan, satuan, dan kewajaran). Bantuan dipudarkan dari soal 1 (dipandu penuh) hingga soal 5 (mandiri). Stimulus tambahan: [09 §5](09-literasi-matematika.md).

| No | Konteks | Soal | Jawaban | Tafsirkan | Bantuan |
|---|---|---|---|---|---|
| 1 | Personal | Layar HP berbentuk persegi panjang dengan panjang 8 cm dan lebar 4 cm. Berapa panjang diagonalnya? | √80 = 4√5 cm | ≈ 8,94 cm, lebih panjang dari 8 cm (masuk akal) | Penuh |
| 2 | Sosial budaya | Luas kebun persegi milik desa adalah 72 m². Berapa panjang sisinya? Cukupkah kawat 34 m untuk memagari kelilingnya? | √72 = 6√2 m | Keliling 24√2 ≈ 33,94 m, jadi cukup | Penuh |
| 3 | Sosial budaya | Tangga sepanjang 6 m bersandar di tembok balai desa. Kaki tangga berjarak 2 m dari tembok. Berapa tinggi ujung tangga? | √(36−4) = √32 = 4√2 m | ≈ 5,66 m, kurang dari 6 m (masuk akal) | Sebagian |
| 4 | Saintifik | Waktu benda jatuh t = √(2h/g) dengan g = 10 m/s². Batu jatuh dari 30 m. Berapa waktunya? | √6 detik | ≈ 2,45 detik | Sebagian |
| 5 | Personal | Sebuah persegi panjang memiliki panjang 3√2 cm dan lebar √8 cm. Berapa luasnya? Mengapa hasilnya bilangan bulat? | 3√2 × 2√2 = 12 cm² | √2 × √2 = 2 | Mandiri |

Aturan penulisan soal cerita: ≤ 3 kalimat, konteks sehari-hari, angka tidak lebih dari 3 buah, dan tanpa informasi pengecoh pada tingkat mudah.

---

## Kartu Rumus (`formulas.js`)

| # | Rumus | Contoh |
|---|---|---|
| 1 | √(a × b) = √a × √b | √12 = √4 × √3 = 2√3 |
| 2 | a√c ± b√c = (a ± b)√c | 2√3 + 5√3 = 7√3 |
| 3 | √a × √b = √(ab) | √2 × √8 = 4 |
| 4 | √a / √b = √(a/b) | √48 / √3 = 4 |
| 5 | a/√b = a√b / b | 6/√3 = 2√3 |
| 6 | c/(a + √b) = c(a − √b)/(a² − b) | 4/(3 − √5) = 3 + √5 |
| 7 | √a = a^(1/2) | √25 = 25^(1/2) = 5 |

## Pretest dan Posttest — Kisi-kisi

Butir pretest dan posttest **setara** (struktur sama, angka berbeda).

| No | Indikator | TP | Tingkat | Bentuk | Pretest | Posttest |
|---|---|---|---|---|---|---|
| 1 | Menentukan kuadrat sempurna | TP0 | Mudah | PG | 169 = …² | 196 = …² |
| 2 | Mengubah akar ke pangkat | TP1 | Mudah | PG | √7 = … | √11 = … |
| 3 | Menyederhanakan (kecil) | TP2 | Mudah | Isian | √20 | √28 |
| 4 | Menyederhanakan (besar) | TP2 | Sedang | Isian | √162 | √147 |
| 5 | Menyederhanakan (berkoefisien) | TP2 | Sulit | Isian | 3√48 | 2√75 |
| 6 | Penjumlahan sejenis setelah disederhanakan | TP3 | Sedang | Isian | √18 + √50 | √12 + √75 |
| 7 | Miskonsepsi √a + √b | TP3 | Sedang | PG | √16 + √9 = ? | √36 + √64 = ? |
| 8 | Perkalian | TP4 | Sedang | Isian | 2√6 × 3√3 | 3√2 × 2√10 |
| 9 | Pembagian | TP4 | Sedang | Isian | √96 ÷ √6 | √150 ÷ √6 |
| 10 | Merasionalkan a/√b | TP5 | Sedang | Isian | 10/√5 | 14/√7 |
| 11 | Merasionalkan sekawan | TP5 | Sulit | Isian | 2/(√3 − 1) | 4/(√5 + 1) |
| 12 | Soal cerita (diagonal) | TP6 | Sulit | Uraian | persegi panjang 6 × 3 | persegi panjang 4 × 2 |

**Kunci jawaban (pretest | posttest)**

| No | Pretest | Posttest |
|---|---|---|
| 1 | 13 | 14 |
| 2 | 7^(1/2) | 11^(1/2) |
| 3 | 2√5 | 2√7 |
| 4 | 9√2 | 7√3 |
| 5 | 12√3 | 10√3 |
| 6 | 8√2 | 7√3 |
| 7 | 7 | 14 |
| 8 | 18√2 | 12√5 |
| 9 | 4 | 5 |
| 10 | 2√5 | 2√7 |
| 11 | √3 + 1 | √5 − 1 |
| 12 | √45 = 3√5 | √20 = 2√5 |

---

## Paket Soal Bertingkat (F14)

Setiap paket berisi 10 soal tetap. Nilai = jumlah benar × 10. Semua kunci sudah dihitung, tetapi **wajib divalidasi ahli materi**.

### Paket Mudah
| No | Bentuk | Soal | Kunci |
|---|---|---|---|
| 1 | Isian | Sederhanakan √8 | 2√2 |
| 2 | Isian | Sederhanakan √12 | 2√3 |
| 3 | Isian | Sederhanakan √18 | 3√2 |
| 4 | Isian | Sederhanakan √27 | 3√3 |
| 5 | Isian | Sederhanakan √20 | 2√5 |
| 6 | PG | Manakah bilangan kuadrat sempurna? (12, 18, 25, 32) | 25 |
| 7 | PG | √49 = … (7; 24,5; 14; 49) | 7 |
| 8 | Isian | Sederhanakan √45 | 3√5 |
| 9 | PG | Faktor kuadrat sempurna terbesar dari 32 (4, 8, 16, 2) | 16 |
| 10 | Isian | Sederhanakan √50 | 5√2 |

### Paket Sedang
| No | Bentuk | Soal | Kunci |
|---|---|---|---|
| 1 | Isian | Sederhanakan √72 | 6√2 |
| 2 | Isian | Sederhanakan √98 | 7√2 |
| 3 | Isian | Sederhanakan √108 | 6√3 |
| 4 | Isian | Sederhanakan √128 | 8√2 |
| 5 | Isian | Sederhanakan √150 | 5√6 |
| 6 | PG | Bentuk paling sederhana dari √180 (6√5, 3√20, 2√45, 9√5) | 6√5 |
| 7 | PG | √60 terletak di antara … (6–7, 7–8, 8–9, 30–31) | 7 dan 8 |
| 8 | Isian | Sederhanakan 2√18 | 6√2 |
| 9 | Isian | Sederhanakan 3√12 | 6√3 |
| 10 | PG | Rina menulis √48 = 2√12. Pernyataan yang benar? | Belum paling sederhana, seharusnya 4√3 |

### Paket Sulit
| No | Bentuk | Soal | Kunci |
|---|---|---|---|
| 1 | Isian | Sederhanakan √300 | 10√3 |
| 2 | Isian | Sederhanakan √252 | 6√7 |
| 3 | Isian | Sederhanakan √242 | 11√2 |
| 4 | Isian | Sederhanakan 4√75 | 20√3 |
| 5 | Isian | Sederhanakan 3√128 | 24√2 |
| 6 | PG | √9 + √16 = … (5, 7, √25, 25) | 7 |
| 7 | PG | Luas persegi 200 cm². Panjang sisinya … | 10√2 cm |
| 8 | PG | Urutan terkecil: 3√5, 5√2, 2√7 | 2√7, 3√5, 5√2 (√28 < √45 < √50) |
| 9 | Isian | Sederhanakan √392 | 14√2 |
| 10 | PG | Kebun persegi 72 m², kawat 34 m. Cukup untuk keliling? | Cukup, keliling 24√2 ≈ 33,94 m |

Isian dinilai benar hanya jika **paling sederhana** (misalnya 2√18 untuk √72 dinilai salah, dengan pembahasan).
