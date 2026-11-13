# 07 — Rencana Evaluasi (Implementation dan Evaluation ADDIE)

## 1. Kriteria Kualitas Produk

| Kriteria | Pertanyaan | Instrumen | Responden |
|---|---|---|---|
| **Kevalidan** | Apakah materi dan media layak? | Lembar validasi ahli | 2 ahli materi, 2 ahli media |
| **Kepraktisan** | Apakah aplikasi mudah digunakan? | Angket respons siswa dan guru, observasi | Siswa uji coba, guru |
| **Keefektifan** | Apakah hasil belajar meningkat dan beban ekstrinsik berkurang? | Pretest-posttest, skala beban kognitif | Siswa uji lapangan |
| **Keefektifan (literasi)** | Apakah literasi matematika siswa berkembang? | Tes literasi pre-post dengan rubrik 3 proses ([09 §8](09-literasi-matematika.md)) | Siswa uji lapangan |

## 2. Lembar Validasi Ahli Materi (Skala 1–5)

| Aspek | Indikator |
|---|---|
| Kesesuaian kurikulum | TP sesuai CP Fase D. Cakupan materi lengkap |
| Kebenaran konsep | Konsep, rumus, dan langkah benar. Tidak menimbulkan miskonsepsi |
| Penyajian | Urutan sederhana → kompleks. Contoh bertahap dan relevan |
| Soal dan evaluasi | Soal sesuai indikator, tingkat kesulitan bervariasi, kunci benar |
| Bahasa | Sesuai EYD, sederhana, dan sesuai usia siswa |
| Prinsip CLT | Satu konsep per layar, langkah memuat alasan, petunjuk bertahap |
| Literasi matematika | Stimulus kontekstual realistis dan beragam (personal, sosial budaya, saintifik). Soal melatih merumuskan, menerapkan, dan menafsirkan. Ada soal penalaran |

## 3. Lembar Validasi Ahli Media (Skala 1–5)

| Aspek | Indikator |
|---|---|
| Tampilan | Tata letak bersih, warna tidak mencolok, huruf terbaca, rumus rapi |
| Navigasi | Mudah dipahami, konsisten, selalu ada jalan kembali |
| Interaktivitas | Umpan balik jelas, petunjuk berfungsi, input matematika mudah |
| Teknis | Berjalan di browser, dapat diinstal tanpa toko aplikasi, offline, tidak *crash*, cepat |
| **Kinerja di smartphone** | Lancar di HP kelas bawah, tata letak rapi di layar kecil, tombol Kembali Android benar, progres tidak hilang saat berpindah aplikasi, papan ketik matematika nyaman ([12](12-optimasi-smartphone.md)) |
| Aksesibilitas | Ukuran tombol, kontras, opsi huruf besar, dan kompatibilitas pembaca layar |

## 4. Angket Respons Siswa (Skala 1–4)

1. Tampilan aplikasi tidak membuat saya pusing.
2. Penjelasan di setiap layar singkat dan mudah dipahami.
3. Contoh soal langkah demi langkah membantu saya memahami materi.
4. Saya bisa belajar sesuai kecepatan saya sendiri.
5. Petunjuk membantu saya saat kesulitan.
6. Umpan balik membuat saya tahu letak kesalahan saya.
7. Kartu rumus dan tabel kuadrat membantu saya mengingat.
8. Pemandu soal cerita membantu saya menentukan angka yang digunakan.
9. Saya mudah berpindah antara materi dan latihan.
10. Saya ingin menggunakan aplikasi ini lagi.
11. Soal-soal di aplikasi membuat saya sadar bentuk akar berguna dalam kehidupan sehari-hari.
12. Langkah "Tafsirkan" membantu saya memeriksa apakah jawaban saya masuk akal.
13. Aplikasi berjalan lancar di HP saya (tidak lambat atau macet).
14. Tombol dan tulisan di layar HP mudah disentuh dan dibaca.

**Formulir perangkat (diisi saat uji coba):** merek/model HP, versi Android/iOS, browser, cara pakai (browser/PWA/APK), dan kendala teknis. Disimpan di `data/mentah/perangkat_siswa.csv` ([12 §6](12-optimasi-smartphone.md)).

## 5. Skala Beban Kognitif

**Opsi A — Skala Paas (1 butir, 9 poin)**, ditampilkan di aplikasi setiap akhir modul:
> "Seberapa besar usaha mental yang kamu keluarkan untuk memahami materi ini?"
> 1 = sangat sangat rendah … 9 = sangat sangat tinggi

**Opsi B — Angket 3 dimensi** (adaptasi Leppink dkk., 2013; skala 0–10), diberikan setelah uji lapangan:

| Dimensi | Contoh butir |
|---|---|
| Intrinsic (IL) | "Materi bentuk akar dalam aplikasi ini sangat kompleks." |
| Extraneous (EL) | "Penjelasan dan tampilan di aplikasi ini membingungkan." |
| Germane (GL) | "Aplikasi ini benar-benar membantu saya memahami cara menyederhanakan dan merasionalkan bentuk akar." |

> Gunakan adaptasi yang sudah divalidasi dalam bahasa Indonesia jika tersedia, atau lakukan uji validitas dan reliabilitas sendiri.

## 6. Analisis Data

Seluruh analisis berikut dikerjakan dengan **Python** (pandas, scipy, pingouin, matplotlib). Skrip, format data masukan, dan contoh kode ada di [11-analisis-statistik-python.md](11-analisis-statistik-python.md).

| Data | Teknik | Kriteria |
|---|---|---|
| Validasi ahli | Persentase = skor/skor maks × 100% | 81–100% sangat layak, 61–80% layak, 41–60% cukup, ≤ 40% kurang |
| Angket kepraktisan | Persentase | ≥ 61% praktis |
| Pretest-posttest | **N-gain** = (post − pre)/(maks − pre) | > 0,7 tinggi, 0,3–0,7 sedang, < 0,3 rendah |
| Beban kognitif | Statistik deskriptif per dimensi. Jika ada kelas pembanding, uji-t/Mann-Whitney | EL rendah, GL tinggi |
| Tes literasi | Skor rubrik → persentase, N-gain total dan per proses | N-gain ≥ 0,3 |
| Log aplikasi (attempts) | Frekuensi miskonsepsi, petunjuk yang dipakai, waktu per modul | Bahan revisi konten |

## 7. Tahapan Uji Coba

| Tahap | Peserta | Fokus | Data |
|---|---|---|---|
| One-to-one | 3 siswa | Keterbacaan, kejelasan alur, bug | *Think-aloud*, catatan observasi |
| Kelompok kecil | 6–9 siswa | Kepraktisan | Angket respons, log aplikasi |
| Lapangan | 1 kelas (±30 siswa) | Keefektifan | Pretest, posttest, tes literasi pre/post, skala CL, angket |

## 8. Etika Penelitian

- Izin sekolah dan persetujuan orang tua/siswa.
- Data anonim (kode S01, S02, …). Aplikasi tidak mengirim data ke internet.
- Ekspor data dilakukan oleh peneliti dari perangkat siswa dengan sepengetahuan siswa.
