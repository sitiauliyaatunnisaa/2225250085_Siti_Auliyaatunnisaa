# PRD — AkarKu: Aplikasi Belajar Bilangan Bentuk Akar untuk SMP

| Item | Keterangan |
|---|---|
| Nama produk | **AkarKu** (nama kerja, dapat diganti) |
| Versi dokumen | 1.0 |
| Tanggal | 12 November 2026 |
| Penyusun | Siti Auliyaatunnisaa (NIM 2225250085) — S1 Pendidikan Matematika |
| Model pengembangan | ADDIE (Analysis, Design, Development, Implementation, Evaluation) |
| Landasan teori | Cognitive Load Theory (CLT) — intrinsic, extraneous, germane load; **Literasi Matematika** (kerangka PISA dan Numerasi AKM) |
| Platform | **Dibuka di browser** (web) dan **dapat diinstal tanpa Play Store/App Store** sebagai PWA di Android, iPhone, dan laptop. APK unduhan langsung sebagai opsi |
| Bahasa pemrograman | **JavaScript** untuk aplikasi (data umum) dan **Python** untuk analisis data statistik penelitian |
| Sasaran pengguna | Siswa SMP kelas IX (materi Bilangan Berpangkat dan Bentuk Akar) |

---

## 1. Latar Belakang

Hasil wawancara semi-terstruktur (35 menit) dengan siswa kelas IX (kode **S01**, 6 November 2026) tentang beban kognitif dalam mempelajari **bilangan bentuk akar** menghasilkan temuan berikut. Rincian lengkap ada di [docs/01-analisis-kebutuhan.md](AkarKu/docs/01-analisis-kebutuhan.md).

| Kode | Temuan utama | Jenis beban |
|---|---|---|
| IL01, IL04 | Bagian tersulit adalah menyederhanakan bentuk akar dan merasionalkan penyebut, apalagi jika angkanya besar atau berbentuk pecahan | Intrinsic |
| IL02, IL05 | Siswa harus mengingat rumus sekaligus urutan langkah. Kesalahan muncul karena kurang teliti atau salah menentukan faktor kuadrat sempurna | Intrinsic (interaktivitas unsur tinggi) |
| IL03 | Prasyarat: bilangan kuadrat sempurna dan faktorisasi | Konteks/prasyarat |
| EL01, EL02 | Penjelasan di buku terlalu panjang. Contoh soal lebih mudah dipahami daripada rumus saja | Extraneous |
| EL03–EL05 | Rumus dan warna yang terlalu banyak mengganggu fokus. Guru menjelaskan terlalu cepat. Siswa bingung memilih angka dalam soal cerita | Extraneous |
| GL01, GL03 | Siswa terbantu oleh contoh bertahap, petunjuk langkah demi langkah, dan soal yang mirip | Germane |
| GL02, GL04, GL05 | Siswa memeriksa ulang jawaban, mengoreksi bersama teman, menjelaskan ke teman, dan melihat pola dari soal sebelumnya | Germane |
| DS01–DS03 | Aplikasi sebaiknya punya contoh soal, latihan, dan petunjuk. Materi dijelaskan perlahan, latihan dikerjakan mandiri. Hindari tulisan berlebih, rumus menumpuk, dan warna mencolok | Arah desain |

### 1.1 Kebutuhan Literasi Matematika

Selain penguasaan prosedur, siswa perlu mampu **menggunakan bentuk akar dalam situasi nyata**: merumuskan masalah menjadi model matematika, menyelesaikannya, lalu menafsirkan apakah hasilnya masuk akal. Kemampuan ini diukur dalam **PISA** (literasi matematika) dan **Asesmen Nasional – AKM Numerasi**. Hasil kedua asesmen tersebut menunjukkan kemampuan literasi matematika siswa Indonesia masih perlu ditingkatkan.

Temuan wawancara mendukung kebutuhan ini. Siswa **bingung menentukan angka yang dipakai dalam soal cerita (EL05)**, yang merupakan kesulitan pada proses *merumuskan*. Siswa juga terbiasa memeriksa ulang jawaban (GL02), yang menjadi modal untuk proses *menafsirkan dan mengevaluasi*. Rincian rancangan: [docs/09-literasi-matematika.md](AkarKu/docs/09-literasi-matematika.md).

## 2. Rumusan Masalah

Siswa SMP kesulitan memahami bentuk akar. Penyebabnya: (1) kompleksitas materi yang tinggi (*intrinsic*), (2) penyajian yang panjang, ramai, dan cepat (*extraneous*), dan (3) kurangnya dukungan bertahap untuk membangun skema (*germane*). Selain itu, siswa **jarang dilatih menerapkan bentuk akar dalam konteks nyata** sehingga literasi matematikanya belum berkembang. Belum ada media belajar mandiri yang mengelola beban kognitif sekaligus menumbuhkan literasi matematika.

## 3. Tujuan Produk

1. **Mengelola beban intrinsik** dengan memecah materi menjadi langkah kecil yang berurutan dari sederhana ke kompleks, disertai modul prasyarat.
2. **Mengurangi beban ekstrinsik** dengan antarmuka minimalis, teks singkat, satu konsep per layar, dan tempo belajar yang diatur siswa sendiri.
3. **Mengoptimalkan beban germane** melalui *worked example*, *faded example*, petunjuk bertahap, umpan balik langsung, dan refleksi.
4. **Menumbuhkembangkan literasi matematika** dengan melatih siswa merumuskan situasi nyata menjadi model matematika, menerapkan konsep bentuk akar, serta menafsirkan dan mengevaluasi hasilnya dalam konteks personal, sosial budaya, dan saintifik.
5. **Mudah diakses**: cukup dibuka lewat tautan/QR di browser, dapat diinstal langsung dari browser **tanpa Play Store/App Store**, dan tetap berjalan **saat offline**.

## 4. Indikator Keberhasilan

| Indikator | Target |
|---|---|
| Rata-rata skor *posttest* naik dibanding *pretest* | N-gain ≥ 0,3 (kategori sedang) |
| Skor kelayakan dari ahli materi dan ahli media | ≥ 80% (kategori "layak/sangat layak") |
| Respons kepraktisan siswa (angket) | ≥ 80% |
| Skor beban kognitif yang dirasakan (skala Paas / angket CLT) | Beban ekstrinsik turun dibanding pembelajaran biasa |
| Kemampuan literasi matematika (tes literasi pre-post, rubrik 3 proses) | N-gain ≥ 0,3 dan peningkatan skor pada proses *merumuskan* serta *menafsirkan* |
| Penyelesaian modul | ≥ 70% siswa uji coba menyelesaikan semua modul inti |
| Kinerja aplikasi di smartphone | Lighthouse Mobile ≥ 90. Lulus seluruh daftar uji smartphone ([docs/12 §5.3](AkarKu/docs/12-optimasi-smartphone.md)) di HP Android kelas bawah, menengah, dan iPhone |

## 5. Persona Pengguna

### 5.1 Siswa (pengguna utama)
- **Nama:** Nisa, 14 tahun, kelas IX.
- **Perangkat:** HP Android dengan RAM 3–4 GB, kuota internet terbatas.
- **Kebiasaan:** Lebih paham lewat contoh soal. Mudah tertinggal kalau penjelasan terlalu cepat. Suka mencocokkan jawaban dengan teman.
- **Kebutuhan:** Penjelasan singkat, langkah jelas, bisa diulang, dan ada latihan yang langsung dinilai.
- **Masalah:** Sering salah menentukan faktor kuadrat sempurna (misalnya √72 = √(4·18), bukan √(36·2)), bingung merasionalkan penyebut, dan bingung dengan soal cerita.

### 5.2 Guru (pengguna sekunder, fase lanjutan)
- Butuh gambaran perkembangan siswa dan bank soal yang sesuai kurikulum.

## 6. Ruang Lingkup

### 6.1 Termasuk (MVP)
Materi **Bilangan Bentuk Akar** kelas IX (Kurikulum Merdeka, Fase D):

| Modul | Topik | Asal kebutuhan |
|---|---|---|
| M0 | **Pemanasan prasyarat**: kuadrat sempurna (1–400) dan faktorisasi prima | IL03 |
| M1 | Pengertian bentuk akar dan hubungannya dengan pangkat pecahan | — |
| M2 | **Menyederhanakan bentuk akar** | IL01, IL05 |
| M3 | Penjumlahan dan pengurangan bentuk akar | IL02 |
| M4 | Perkalian dan pembagian bentuk akar | IL02 |
| M5 | **Merasionalkan penyebut** (a/√b, a/(b±√c)) | IL01, IL04 |
| M6 | **Literasi: Bentuk Akar dalam Kehidupan** (soal kontekstual personal, sosial budaya, dan saintifik dengan siklus Rumuskan–Kerjakan–Tafsirkan) | EL05, literasi |
| Lintas modul | **Pojok Literasi** di setiap modul M1–M5 (1 stimulus kontekstual dan 2–3 soal) | Literasi |

### 6.2 Tidak termasuk (MVP)
- Login dengan server/akun online (data disimpan di perangkat).
- Forum diskusi atau obrolan.
- Materi selain bentuk akar (dapat ditambahkan pada versi berikutnya).
- Dasbor guru online (dijadwalkan untuk fase 2).

## 7. Kebutuhan Fungsional

Prioritas: **P0** = wajib ada di MVP, **P1** = sebaiknya ada, **P2** = versi berikutnya.

### F1 — Beranda dan Navigasi
| ID | Kebutuhan | Prioritas |
|---|---|---|
| F1.1 | Beranda menampilkan 3 menu utama yang terpisah jelas: **Belajar**, **Latihan**, dan **Kartu Rumus** (DS03) | P0 |
| F1.2 | Peta modul berurutan (M0 → M6) dengan status: belum, sedang, atau selesai | P0 |
| F1.3 | Siswa dapat membuka modul mana saja, tetapi diberi saran mengerjakan M0 dulu jika skor tes prasyarat < 70% | P1 |
| F1.4 | Input nama panggilan saat pertama kali membuka aplikasi (tanpa akun online) | P0 |

### F2 — Mode Belajar (Materi dan Contoh)
| ID | Kebutuhan | Prioritas | Prinsip CLT |
|---|---|---|---|
| F2.1 | Materi dibagi menjadi **kartu-kartu kecil**: satu konsep per layar, maksimal ±40 kata | P0 | Segmenting (EL01) |
| F2.2 | Siswa menekan tombol **Lanjut** untuk pindah layar; tidak ada perpindahan otomatis | P0 | Learner pacing (EL04) |
| F2.3 | Tombol **Kembali** dan **Ulangi langkah** selalu tersedia | P0 | Learner pacing (EL04) |
| F2.4 | **Worked example bertahap**: langkah penyelesaian muncul satu per satu dengan tombol "Langkah berikutnya" | P0 | Worked example (EL02, GL01) |
| F2.5 | Setiap langkah disertai **alasan singkat** (misalnya "karena 36 adalah kuadrat sempurna terbesar yang membagi 72") | P0 | Mengurangi beban mengingat (IL02) |
| F2.6 | Bagian yang berubah di setiap langkah ditandai dengan **satu warna aksen** saja | P0 | Signaling, bukan dekorasi (EL03) |
| F2.7 | **Faded example**: contoh berikutnya meminta siswa mengisi 1 langkah, lalu 2 langkah, dan seterusnya | P0 | Guidance fading (GL01) |
| F2.8 | Pertanyaan **self-explanation** singkat (pilihan ganda) setelah contoh: "Mengapa langkah ini dilakukan?" | P1 | Self-explanation (GL04) |
| F2.9 | Ringkasan pola di akhir modul (misalnya "Pola: cari kuadrat sempurna terbesar → pisahkan → tarik keluar") | P0 | Schema building (GL05) |

### F3 — Mode Latihan (Mandiri)
| ID | Kebutuhan | Prioritas | Prinsip CLT |
|---|---|---|---|
| F3.1 | Latihan **terpisah** dari materi dan dikerjakan mandiri (DS02) | P0 | — |
| F3.2 | Soal diurutkan dari **mudah → sedang → sulit** (angka kecil → angka besar → pecahan) | P0 | Simple-to-complex (IL01) |
| F3.3 | Jenis soal: pilihan ganda, isian bentuk akar (dengan papan ketik matematika sederhana), dan menyusun urutan langkah | P0 | — |
| F3.4 | **Petunjuk bertahap** (maksimal 3 tingkat): petunjuk 1 berupa arah umum, petunjuk 2 berupa langkah pertama, petunjuk 3 berupa contoh mirip yang sudah dikerjakan | P0 | Scaffolding (GL03) |
| F3.5 | **Umpan balik langsung** setelah menjawab: benar/salah, penjelasan singkat, dan, jika salah, deteksi pola kesalahan umum | P0 | Feedback (IL05) |
| F3.6 | Tombol **"Cek langkahku"** untuk memeriksa ulang jawaban langkah demi langkah | P1 | Self-check (GL02) |
| F3.7 | Setelah salah, siswa diberi **soal kembar** (struktur sama, angka berbeda) | P1 | Similar problems (GL03, GL05) |
| F3.8 | Kumpulan soal dibuat secara acak/generatif agar latihan bisa diulang tanpa menghafal jawaban | P1 | — |
| F3.9 | Tidak ada penghitung waktu pada mode latihan biasa | P0 | Mengurangi tekanan (EL04) |

### F4 — Kartu Rumus dan Alat Bantu
| ID | Kebutuhan | Prioritas | Prinsip CLT |
|---|---|---|---|
| F4.1 | **Kartu Rumus** yang bisa dibuka kapan saja (panel bawah), satu rumus per kartu dengan satu contoh | P0 | Mengurangi beban memori (IL02) |
| F4.2 | **Tabel kuadrat yang bisa diatur sendiri**: siswa memilih rentang angka "dari … sampai …" (1–1.000, maksimal 50 angka sekaligus), tombol cepat (1–10, 1–20, 21–40, 41–60), dan kolom "Hitung sendiri" untuk mengkuadratkan satu angka. Bisa dibuka saat belajar dan latihan | P0 | Prasyarat (IL03, IL05) |
| F4.3 | **Pencari faktor kuadrat sempurna**: siswa memasukkan angka, lalu aplikasi menampilkan pasangan faktornya secara visual (alat bantu belajar, bisa dinonaktifkan pada kuis) | P1 | Scaffolding |

### F5 — Pemandu Soal Cerita
| ID | Kebutuhan | Prioritas | Prinsip CLT |
|---|---|---|---|
| F5.1 | Kerangka 4 langkah: **Diketahui → Ditanya → Model/Rumus → Hitung** | P0 | EL05 |
| F5.2 | Siswa mengetuk angka/informasi penting pada teks soal untuk menandainya sebagai "diketahui" | P1 | Mengurangi beban mencari |
| F5.3 | Soal cerita ditulis dengan kalimat pendek dan konteks yang dekat dengan siswa (kebun, layar HP, tangga, lapangan) | P0 | EL05 |

### F6 — Evaluasi dan Progres
| ID | Kebutuhan | Prioritas |
|---|---|---|
| F6.1 | **Pretest** dan **posttest** (soal setara, 10–15 butir) untuk keperluan penelitian | P0 |
| F6.2 | Kuis akhir modul (5 soal) dengan ambang tuntas 70% | P0 |
| F6.3 | Halaman progres: modul selesai, skor kuis, dan jenis kesalahan yang paling sering | P0 |
| F6.4 | **Refleksi singkat** setelah modul: "Seberapa sulit materi ini?" (skala 1–9 ala Paas) dan "Bagian mana yang masih membingungkan?" | P0 |
| F6.5 | Ekspor hasil (pretest, posttest, skor beban kognitif, waktu belajar) ke file CSV/JSON untuk analisis peneliti | P0 |
| F6.6 | Mode **"Jelaskan ke teman"**: siswa membuat ringkasan langkah dengan kata-katanya sendiri, lalu membagikannya (salin/bagikan teks) | P2 (GL04) |

### F7 — Pengaturan
| ID | Kebutuhan | Prioritas |
|---|---|---|
| F7.1 | Ukuran huruf: normal/besar | P1 |
| F7.2 | Mode gelap | P2 |
| F7.3 | Atur ulang progres | P0 |
| F7.4 | Cadangkan/pulihkan progres ke file (agar progres tidak hilang jika data browser terhapus) | P1 |

### F8 — Literasi Matematika
Rincian kerangka, contoh stimulus, dan rubrik ada di [docs/09-literasi-matematika.md](AkarKu/docs/09-literasi-matematika.md).

| ID | Kebutuhan | Prioritas | Proses literasi / prinsip CLT |
|---|---|---|---|
| F8.1 | **Pembuka kontekstual** di setiap modul: satu situasi nyata singkat sebagai pemantik ("Ubin berluas 50 cm², berapa panjang sisinya?"), dijawab di akhir modul | P0 | Konteks bermakna |
| F8.2 | **Pojok Literasi** di menu Latihan setiap modul: 1 stimulus (teks ≤ 60 kata dan maksimal 1 tabel/gambar) dengan 2–3 soal bertingkat (pemahaman → penerapan → penalaran) | P0 | Semua proses; segmenting |
| F8.3 | **Siklus literasi terpandu** 3 langkah: **Rumuskan** (pilih informasi dan model), **Kerjakan** (hitung bentuk akar), **Tafsirkan** (cek satuan, nilai pendekatan, dan apakah masuk akal). Memperluas F5 | P0 | Merumuskan, menerapkan, menafsirkan (EL05, GL02) |
| F8.4 | **Pemudaran bantuan siklus**: soal awal dipandu penuh, soal berikutnya hanya diberi judul langkah, soal terakhir mandiri | P0 | Guidance fading |
| F8.5 | **Estimasi dan nilai pendekatan**: "Berapa kira-kira √50?" (antara 7 dan 8 ≈ 7,07), dengan garis bilangan sederhana. Dipakai untuk menafsirkan hasil nyata (misalnya panjang dalam cm) | P0 | Menafsirkan; *number sense* |
| F8.6 | **Soal penalaran/argumentasi**: "Benar atau salah? Pilih alasannya" (misalnya pernyataan seseorang tentang √(9+16)) | P1 | Bernalar dan mengevaluasi (GL04) |
| F8.7 | **Bentuk soal ala AKM**: pilihan ganda, pilihan ganda kompleks, menjodohkan, isian singkat, dan uraian singkat | P1 | Familiarisasi asesmen |
| F8.8 | **Konteks dekat siswa Indonesia**: ubin, kebun, lapangan voli, tangga, peta jarak rumah–sekolah, layar HP, benda jatuh, jarak pandang dari menara | P0 | Konteks personal, sosial budaya, saintifik |
| F8.9 | Setiap soal literasi diberi **label** (konteks, proses, level kognitif). Halaman Progres menampilkan capaian per proses literasi | P1 | Pemantauan |
| F8.10 | **Tes literasi matematika** (pre dan post, 5–6 butir uraian/AKM) untuk penelitian, dinilai dengan rubrik | P0 | Evaluasi |
| F8.11 | **"Buat soalmu sendiri"** (*problem posing*): siswa memilih konteks dan angka, lalu aplikasi memeriksa jawabannya | P2 | Elaborasi (GL04) |

**Aturan keselarasan dengan CLT:** stimulus literasi tetap pendek (≤ 60 kata, 1 visual). Informasi pengecoh hanya muncul di tingkat sulit. Siswa dapat mengetuk informasi penting untuk menandainya. Literasi ditempatkan **setelah** konsep dikuasai (di Pojok Literasi dan M6) agar beban intrinsik tidak menumpuk.

### F9 — Akses dan Instalasi Tanpa Toko Aplikasi
Rincian: [docs/10-instalasi-tanpa-playstore.md](AkarKu/docs/10-instalasi-tanpa-playstore.md).

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F9.1 | Tombol **"📲 Pasang Aplikasi"** di Beranda jika perangkat mendukung. Tombol disembunyikan jika aplikasi sudah terpasang | P0 |
| F9.2 | Halaman **"Cara Memasang"** yang mendeteksi perangkat (Android, iPhone, laptop) dan menampilkan langkah yang sesuai | P0 |
| F9.3 | Tautan **unduh APK** langsung (Android) beserta versi, ukuran, dan panduan izin instal | P1 |
| F9.4 | **Kode QR** menuju tautan aplikasi untuk dicetak di brosur/poster | P0 |
| F9.5 | Pemberitahuan **"Versi baru tersedia"**. Progres siswa tidak hilang saat diperbarui | P0 |
| F9.6 | Indikator kecil **mode offline** | P1 |

### F10 — Ekspor Data untuk Analisis Statistik (Python)
Rincian: [docs/11-analisis-statistik-python.md](AkarKu/docs/11-analisis-statistik-python.md).

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F10.1 | Ekspor CSV (`attempts`, `tests`, `reflections`) dengan kontrak kolom tetap ([docs/03 §7](AkarKu/docs/03-arsitektur-teknis.md)) | P0 |
| F10.2 | Menu ekspor dilindungi **PIN peneliti** agar tidak tertekan siswa secara tidak sengaja | P1 |
| F10.3 | Skrip Python untuk validasi ahli (persentase dan Aiken's V), kepraktisan, N-gain dan uji beda, beban kognitif (Cronbach's alpha), literasi per proses, dan analisis log | P0 |
| F10.4 | Grafik dan tabel hasil siap tempel ke laporan skripsi (PNG 300 dpi, Excel) | P1 |

### F11 — Berfungsi Baik di Smartphone
Rincian aturan teknis dan pengujian: [docs/12-optimasi-smartphone.md](AkarKu/docs/12-optimasi-smartphone.md).

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F11.1 | Tata letak mobile-first, rapi di lebar 320–430 px, tanpa gulir horizontal | P0 |
| F11.2 | Tombol Kembali Android menutup panel/kembali ke layar sebelumnya, tidak langsung keluar | P0 |
| F11.3 | Simpan otomatis setiap langkah. Setelah ada telepon/pindah aplikasi, siswa kembali ke layar terakhir | P0 |
| F11.4 | Papan ketik matematika khusus. Keyboard bawaan tidak muncul dan kolom tidak tertutup keyboard | P0 |
| F11.5 | Mendukung potret (utama) dan lanskap | P1 |
| F11.6 | Aman untuk layar berponi dan bilah gestur (*safe area*) | P0 |
| F11.7 | Mengikuti ukuran huruf sistem HP tanpa tata letak rusak | P0 |
| F11.8 | Hemat kuota: setelah unduhan pertama, internet hanya untuk pembaruan | P0 |
| F11.9 | Hemat baterai: tanpa animasi terus-menerus atau proses latar belakang | P0 |
| F11.10 | Meminta penyimpanan persisten agar progres tidak mudah terhapus | P0 |
| F11.11 | Getar ringan saat umpan balik (opsional, dapat dimatikan) | P2 |
| F11.12 | Kompatibel dengan TalkBack dan VoiceOver | P1 |

### F12 — Kalkulator Akar
Alat bantu belajar, **bukan** pengganti latihan. Kalkulator **tidak tersedia** saat kuis, pretest, posttest, dan tes literasi (sejalan dengan aturan CLT no. 10).

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F12.1 | **Sederhanakan akar dengan indeks bebas** (akar kuadrat, pangkat 3, sampai pangkat 10), ada angka di depan akar, angka di dalam akar hingga 10.000.000 | P0 |
| F12.2 | **Langkah-langkah** penyelesaian: faktorisasi prima → kelompokkan sesuai indeks akar (diberi warna aksen) → keluarkan dari akar → kalikan dengan angka di depan | P0 |
| F12.3 | Informasi tambahan: nilai desimal, letak di antara dua bilangan bulat, cek bilangan kuadrat/pangkat-n sempurna, bentuk pangkat pecahan, "cara cepat" (faktor pangkat-n sempurna terbesar), dan cek balik | P0 |
| F12.4 | **Operasi** dua bentuk akar kuadrat (+, −, ×, ÷) beserta langkah, termasuk peringatan √a + √b ≠ √(a + b) | P1 |
| F12.5 | **Rasionalkan penyebut**: bentuk a/(c√d) dan a/(b ± t√c) dengan sekawan, beserta langkah | P1 |
| F12.6 | Pratinjau bentuk soal langsung saat siswa mengetik. Pesan kesalahan input yang jelas | P0 |
| F12.7 | Setiap pemakaian kalkulator dicatat di riwayat (F13) | P1 |

### F13 — Riwayat Pengunjung, Jawaban, dan Nilai (Mode Pemilik)

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F13.1 | Setiap siswa masuk dengan nama panggilan dan kode siswa. Satu HP bisa dipakai beberapa siswa (tombol "Ganti pengguna") | P0 |
| F13.2 | Semua aktivitas dicatat: kunjungan, jawaban contoh rumpang, kuis, latihan (dengan jumlah petunjuk), literasi, refleksi, dan kalkulator, lengkap dengan waktu dan hasil benar/salah | P0 |
| F13.3 | **Mode Pemilik** dilindungi PIN: ringkasan (jumlah pengunjung, kunjungan, rata-rata kuis, persentase latihan benar), daftar pengunjung dengan nilai, pencarian nama/kode, dan tabel riwayat jawaban tiap siswa | P0 |
| F13.4 | Unduh **laporan PDF** semua pengunjung (rekap + detail jawaban tiap siswa, mudah dibaca di HP) serta CSV **riwayat jawaban** dan **ringkasan nilai** untuk Excel/Python (docs/11) | P0 |
| F13.8 | Siswa dapat mengunduh **laporan hasil belajarnya sendiri dalam PDF** (ringkasan nilai + riwayat jawaban) | P0 |
| F13.5 | Hapus semua data dengan konfirmasi dua langkah | P1 |
| F13.6 | **Rekap online dari semua HP** dalam satu dasbor pemilik: setiap aktivitas dikirim otomatis ke **Google Sheets** lewat Google Apps Script, dengan antrean offline. Mode Pemilik → "🌐 Semua perangkat" membaca data dengan kunci rahasia pemilik. Panduan: [docs/13](AkarKu/docs/13-rekap-online-google-sheets.md) | P0 |
| F13.7 | Pemberitahuan di halaman awal bahwa nama, kunjungan, jawaban, dan nilai tercatat dan dapat dilihat pemilik aplikasi | P0 |

### F15 — Asisten Belajar AI "Si Akar" (Gemini gratis / DeepSeek)
Rancangan lengkap: [docs/14](AkarKu/docs/14-asisten-ai-pedagogis.md).

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F15.1 | Chatbot pembimbing proses berpikir, bisa dibuka dari Beranda, Belajar, Latihan, dan Pojok Literasi. **Tidak tersedia** saat kuis, paket soal, dan refleksi | P0 |
| F15.2 | Tidak memberi jawaban akhir. Bantuan bertingkat 0–3 sesuai jumlah percobaan dan jenis kesulitan siswa | P0 |
| F15.3 | Mengelola beban kognitif: pesan ≤ 60 kata, satu langkah per pesan, satu pertanyaan balik, ajakan menjelaskan alasan | P0 |
| F15.4 | Membimbing siklus literasi (Rumuskan–Kerjakan–Tafsirkan) dan fase RMT Kinard & Kozulin (pengembangan kognitif, konten sebagai proses pembelajaran, praktik konstruksi kognitif konseptual) | P0 |
| F15.5 | Mendukung Google Gemini (gratis, disarankan), DeepSeek lewat OpenRouter (gratis), atau DeepSeek resmi (berbayar). API key disimpan di server (Properti skrip Apps Script), tidak pernah di aplikasi. Batas 40 pertanyaan/siswa/jam | P0 |
| F15.6 | Setiap percakapan tercatat (fase RMT, tahap literasi, level bantuan, jenis kesulitan) untuk analisis penelitian | P0 |

### F14 — Paket Soal Bertingkat (Mudah, Sedang, Sulit)
Bank soal lengkap: [docs/05-spesifikasi-konten.md](AkarKu/docs/05-spesifikasi-konten.md) bagian "Paket Soal".

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F14.1 | Tiga paket: **Mudah**, **Sedang**, **Sulit**, masing-masing **10 soal tetap** (sama untuk semua siswa agar hasilnya bisa dibandingkan) | P0 |
| F14.2 | Bentuk soal: isian bentuk akar (papan ketik matematika) dan pilihan ganda | P0 |
| F14.3 | Siswa bebas pindah soal dan mengganti jawaban (tombol nomor 1–10), tanpa batas waktu. Peringatan jika ada soal belum dijawab sebelum selesai | P0 |
| F14.4 | **Nilai di akhir**: nilai 0–100 (10 poin per soal), jumlah benar, kategori (≥ 90 sangat baik, ≥ 70 baik/tuntas, ≥ 50 cukup, < 50 perlu belajar lagi) | P0 |
| F14.5 | Pembahasan setiap soal setelah selesai: jawaban siswa, jawaban benar, dan langkah penyelesaian | P0 |
| F14.6 | Kartu rumus, tabel kuadrat, dan kalkulator **tidak tersedia** selama mengerjakan | P0 |
| F14.7 | Semua jawaban dan nilai tercatat di riwayat Mode Pemilik serta CSV ringkasan (nilai terakhir dan terbaik per tingkat) | P0 |

## 8. Kebutuhan Non-Fungsional

| Kategori | Kebutuhan |
|---|---|
| Platform | Dibuka di browser modern (Chrome, Edge, Safari, Firefox). Dapat diinstal sebagai PWA tanpa toko aplikasi. APK opsional untuk Android 8+ (API 26) |
| Bahasa pemrograman | JavaScript (aplikasi, JSDoc untuk pemeriksaan tipe) dan Python 3.11+ (analisis statistik, tidak berjalan di aplikasi siswa) |
| Hosting | Hosting statis gratis ber-HTTPS (GitHub Pages/Netlify/Vercel) |
| Offline | Semua materi, latihan, dan progres berfungsi tanpa internet setelah pertama kali dibuka |
| **Smartphone** | Berfungsi baik di HP Android 8+ dengan RAM 2–3 GB dan iPhone iOS 16.4+, lebar layar 320–430 px. Rincian: [docs/12-optimasi-smartphone.md](AkarKu/docs/12-optimasi-smartphone.md) |
| Kinerja (mode mobile) | JavaScript awal ≤ 250 KB (gzip), total unduhan offline ≤ 3 MB, LCP ≤ 2,5 detik (4G), INP ≤ 200 ms, buka ulang ≤ 1,5 detik, Lighthouse Mobile ≥ 90 |
| Penyimpanan | Data disimpan lokal (IndexedDB/localStorage). Tidak ada data pribadi yang dikirim ke server |
| Aksesibilitas | Kontras teks minimal WCAG AA (4,5:1), target sentuh ≥ 48×48 px, huruf dasar ≥ 16 px |
| Bahasa | Bahasa Indonesia baku yang sederhana dan sesuai usia SMP |
| Matematika | Notasi ditampilkan rapi dengan KaTeX, tanpa gambar rumus |
| Privasi | Hanya nama panggilan. Sesuai etika penelitian: data anonim dengan kode siswa |
| Pemeliharaan | Konten materi dan soal disimpan dalam file data (JavaScript/JSON) yang terpisah dari kode tampilan |

## 9. Prinsip Desain (dari Wawancara)

1. **Satu layar, satu ide.** Tidak ada rumus yang menumpuk (DS03, EL03).
2. **Contoh dulu, rumus kemudian.** Konsep diperkenalkan lewat contoh konkret (EL02).
3. **Siswa yang memegang kendali tempo.** Tidak ada animasi otomatis yang tidak bisa dihentikan (EL04).
4. **Warna punya makna.** Hanya satu warna aksen untuk menandai bagian yang sedang dibahas; warna lain netral (EL03).
5. **Bantuan selalu ada, tetapi tidak memaksa.** Petunjuk dibuka atas permintaan siswa (GL03).
6. **Materi dan latihan terpisah jelas** (DS02).
7. **Kesalahan adalah bahan belajar.** Umpan balik menjelaskan *mengapa*, bukan sekadar "Salah" (IL05).
8. **Matematika untuk kehidupan.** Setiap modul dibuka dengan situasi nyata dan ditutup dengan menafsirkan hasil di situasi tersebut (literasi).

Detail panduan antarmuka: [docs/04-panduan-ui-ux.md](AkarKu/docs/04-panduan-ui-ux.md).

## 10. Alur Pengguna Utama

```
Pindai QR di brosur / buka tautan di browser
  └─ (opsional) Pasang Aplikasi → ikon di layar utama
  └─ (pertama kali) Isi nama panggilan → Pretest (opsional, untuk penelitian)
       └─ Beranda
            ├─ Belajar → Pilih modul → Pembuka kontekstual → Kartu materi → Worked example
            │            → Faded example → Ringkasan pola → Jawab pembuka kontekstual
            │            → Kuis modul (5 soal) → Refleksi → Kembali ke peta modul
            ├─ Latihan ┬ Prosedural → Pilih topik/tingkat → Soal → [Petunjuk 1/2/3] → Jawab
            │          │              → Umpan balik → (salah) Soal kembar / (benar) Soal berikutnya
            │          └ Pojok Literasi → Stimulus → Rumuskan → Kerjakan → Tafsirkan → Umpan balik
            ├─ Kartu Rumus → Daftar rumus / Tabel kuadrat sempurna
            └─ Progres → Statistik → Posttest → Ekspor data (PIN peneliti) → CSV → Python
```

## 11. Teknologi (Ringkas)

| Bagian | Bahasa | Teknologi |
|---|---|---|
| Aplikasi siswa (data umum) | **JavaScript** | React + Vite, Tailwind CSS, KaTeX, Zustand, Dexie (IndexedDB), vite-plugin-pwa (PWA), Capacitor (APK opsional) |
| Analisis penelitian (data statistik) | **Python** | pandas, scipy, pingouin, matplotlib, openpyxl, qrcode |

Detail: [docs/03-arsitektur-teknis.md](AkarKu/docs/03-arsitektur-teknis.md).

## 12. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Input bentuk akar di HP sulit diketik | Siswa frustrasi (menambah EL) | Papan ketik matematika khusus dengan tombol √, angka, dan pecahan |
| Validasi jawaban setara (misalnya 6√2 vs √72) | Jawaban benar dinilai salah | Mesin pemeriksa jawaban berbasis normalisasi bentuk akar dan pengujian unit |
| Konten terlalu banyak, tidak selesai tepat waktu | Jadwal mundur | Prioritaskan M0, M2, dan M5 (paling sulit menurut siswa), lalu modul lain |
| Hanya 1 responden wawancara | Generalisasi terbatas | Validasi dengan angket analisis kebutuhan ke ±30 siswa dan wawancara guru |
| Perangkat siswa lemah | Aplikasi lambat | Tanpa animasi berat, *lazy loading* per modul |
| Browser bawaan HP tidak mendukung instal PWA | Siswa tidak bisa memasang | Halaman "Cara Memasang" menyarankan Chrome/Safari. Aplikasi tetap bisa dipakai di browser |
| iPhone tidak bisa memasang APK | Siswa iPhone tidak terlayani APK | iPhone memakai PWA (Safari → Tambahkan ke Layar Utama) |
| Data progres hilang karena data browser dihapus | Data penelitian hilang | Ekspor segera setelah sesi uji coba, dan fitur cadangan progres (F7.4) |
| Riwayat tersimpan per HP, belum terkumpul otomatis (F13.6) | Pemilik harus mengunduh CSV dari tiap HP | Pilihan: (a) kumpulkan CSV tiap HP; (b) tambah penyimpanan online gratis, misalnya Google Sheets lewat Apps Script, Supabase, atau Firebase. Opsi (b) mengirim data siswa ke internet, jadi perlu izin sekolah/orang tua, data anonim (kode siswa), dan persetujuan dosen pembimbing |
| PIN pemilik hanya penghalang ringan | Siswa yang paham teknis bisa melihat kode | Untuk penelitian sudah memadai. Data asli tetap dikumpulkan peneliti lewat ekspor |

## 13. Tahapan dan Jadwal

Lihat [docs/06-roadmap-dan-tugas.md](AkarKu/docs/06-roadmap-dan-tugas.md).

| Fase ADDIE | Keluaran | Perkiraan |
|---|---|---|
| Analysis | Analisis kebutuhan, karakteristik siswa, analisis materi | Minggu 1–2 |
| Design | PRD, storyboard, desain UI, kisi-kisi soal, instrumen | Minggu 3–4 |
| Development | Aplikasi MVP, validasi ahli, revisi | Minggu 5–10 |
| Implementation | Uji coba perorangan, kelompok kecil, dan lapangan | Minggu 11–13 |
| Evaluation | Analisis kelayakan, kepraktisan, dan efektivitas | Minggu 14–15 |

## 14. Dokumen Terkait

| Dokumen | Isi |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Instruksi untuk asisten AI (Claude Code) saat membangun aplikasi |
| [README.md](README.md) | Ringkasan proyek dan cara menjalankan |
| [docs/01-analisis-kebutuhan.md](AkarKu/docs/01-analisis-kebutuhan.md) | Fase Analysis ADDIE |
| [docs/02-desain-pembelajaran.md](AkarKu/docs/02-desain-pembelajaran.md) | Fase Design: CP/TP, strategi CLT, alur modul |
| [docs/03-arsitektur-teknis.md](AkarKu/docs/03-arsitektur-teknis.md) | Stack, struktur folder, model data |
| [docs/04-panduan-ui-ux.md](AkarKu/docs/04-panduan-ui-ux.md) | Sistem desain dan aturan antarmuka |
| [docs/05-spesifikasi-konten.md](AkarKu/docs/05-spesifikasi-konten.md) | Isi materi, contoh, dan bank soal per modul |
| [docs/06-roadmap-dan-tugas.md](AkarKu/docs/06-roadmap-dan-tugas.md) | Tahapan pengerjaan dan daftar tugas |
| [docs/07-rencana-evaluasi.md](AkarKu/docs/07-rencana-evaluasi.md) | Validasi ahli, uji coba, dan instrumen penelitian |
| [docs/08-storyboard.md](AkarKu/docs/08-storyboard.md) | Storyboard layar per layar |
| [docs/09-literasi-matematika.md](AkarKu/docs/09-literasi-matematika.md) | Kerangka, desain fitur, bank stimulus, dan rubrik literasi matematika |
| [docs/10-instalasi-tanpa-playstore.md](AkarKu/docs/10-instalasi-tanpa-playstore.md) | Akses lewat browser, instal PWA/APK tanpa toko aplikasi, dan template brosur |
| [docs/11-analisis-statistik-python.md](AkarKu/docs/11-analisis-statistik-python.md) | Analisis data statistik penelitian dengan Python |
| [docs/12-optimasi-smartphone.md](AkarKu/docs/12-optimasi-smartphone.md) | Target kinerja, aturan teknis, dan pengujian di smartphone |
