# 14 — Asisten Belajar AI "Si Akar" (Gemini gratis / DeepSeek)

Si Akar adalah chatbot yang berperan sebagai **pembimbing proses berpikir matematis**, bukan pemberi jawaban. Si Akar dirancang untuk:

1. membimbing siswa menyelesaikan masalah **literasi matematika** secara bertahap;
2. **mengelola beban kognitif** (intrinsik, ekstrinsik, germane);
3. memberi **petunjuk sesuai kesulitan siswa**, tidak langsung memberi jawaban akhir;
4. menerapkan tahapan **Rigorous Mathematical Thinking (RMT)**.

> Bagian RMT mengikuti **Kinard & Kozulin (2008)**, *Rigorous Mathematical Thinking: Conceptual Formation in the Mathematics Classroom*. Jika istilah di ringkasan dosen berbeda, ubah teksnya di `backend/Code.gs` pada konstanta `TUTOR_PROMPT`, bagian "RIGOROUS MATHEMATICAL THINKING".

---

## 1. Arsitektur dan keamanan API key

```
HP siswa ──(pertanyaan + konteks layar)──► Google Apps Script ──(API key rahasia)──► DeepSeek
         ◄──────────(jawaban terstruktur)───┘
```

- **API key DeepSeek tidak pernah ada di kode aplikasi.** Key disimpan di *Properti skrip* Google Apps Script, sehingga siswa atau pengunjung tidak bisa melihat atau mencurinya.
- Instruksi pedagogis (`TUTOR_PROMPT`) juga ada di server, sehingga tidak bisa diubah siswa.
- **Batas pemakaian:** 40 pertanyaan per siswa per jam dan 1.500 per hari untuk seluruh aplikasi (ubah di `AI_MAX_PER_HOUR` dan `AI_MAX_PER_DAY`).
- Yang dikirim ke DeepSeek hanya **pertanyaan siswa dan konteks soal**. Nama dan kode siswa **tidak** dikirim.
- Chat **tidak tersedia** saat Kuis modul, Paket Soal, dan refleksi, agar penilaian tetap valid.

## 2. Cara memasang

**Pilih layanan AI:**

| Layanan | Biaya | Cara mendapatkan key | `AI_PROVIDER` |
|---|---|---|---|
| **Google Gemini** ⭐ disarankan | **Gratis** (ada batas per menit/per hari) | **aistudio.google.com/apikey** → *Create API key* (key diawali `AIza`) | `gemini` |
| **DeepSeek lewat OpenRouter** | **Gratis** untuk model berlabel `:free` (kuota kecil, model bisa berganti) | **openrouter.ai/keys** → *Create Key* (diawali `sk-or-`) | `openrouter` |
| DeepSeek resmi | Berbayar per pemakaian (perlu *Top up*) | platform.deepseek.com → *API keys* (diawali `sk-`) | `deepseek` |

> Catatan layanan gratis: kuotanya terbatas, sehingga saat banyak siswa bertanya bersamaan Si Akar bisa meminta menunggu sebentar. Pada layanan gratis, data percakapan dapat dipakai penyedia untuk meningkatkan layanannya. Cantumkan hal ini di izin penelitian.

> **Cara termudah (tanpa Setelan proyek):** buka AkarKu dari link `/exec` → **Mode pemilik** → **🌐 Semua perangkat** → isi kunci rahasia → kartu **🤖 Pengaturan Asisten AI** → pilih layanan, tempel API key, isi nama model → **Simpan** → **Uji Si Akar**. Langkah 2 di bawah tidak perlu dilakukan jika memakai cara ini.

1. Buat API key di layanan yang dipilih (tabel di atas), lalu salin key-nya. **Jangan bagikan key ke siapa pun.**
2. Buka proyek Apps Script AkarKu → ikon ⚙️ **Setelan proyek** → **Properti skrip** → **Tambahkan properti skrip**. Tambahkan dua properti:
   - `AI_PROVIDER` = `gemini` (atau `openrouter` / `deepseek`)
   - `AI_API_KEY` = key dari langkah 1
   - (Opsional) `AI_MODEL` = nama model lain, jika model bawaan sudah tidak tersedia. Bawaan: `gemini-2.5-flash` (Gemini) dan `deepseek/deepseek-chat-v3-0324:free` (OpenRouter). Untuk OpenRouter, cari model gratis terbaru di openrouter.ai/models dengan kata kunci "free".
3. Tempel `backend/Code.gs` dan `app/index.html` versi terbaru → **Simpan**.
4. Jalankan fungsi **`setup`** sekali lagi → izinkan akses **"Hubungkan ke layanan eksternal"**.
5. Uji: pilih fungsi **`testTutor`** → **Jalankan** → buka **Log eksekusi**. Harus muncul jawaban Si Akar yang **menolak memberi jawaban** dan memberi petunjuk.
6. **Terapkan → Kelola deployment → Edit → Versi baru → Terapkan.**

Di link demo claude.ai, chat hanya menampilkan keterangan "belum aktif", karena claude.ai tidak mengizinkan halaman menghubungi layanan luar.

## 3. Rancangan pedagogis

### 3.1 Bantuan bertingkat (tidak memberi jawaban akhir)

| Level | Bentuk bantuan | Contoh untuk "Sederhanakan √72" |
|---|---|---|
| 0 | Bertanya balik untuk menggali pemahaman | "Menurutmu, angka 72 bisa dipecah jadi perkalian apa saja?" |
| 1 | Arah umum | "Cari bilangan kuadrat sempurna terbesar yang membagi 72." |
| 2 | Langkah pertama konkret | "Coba cek: apakah 36 membagi 72? 36 = 6 × 6." |
| 3 | Contoh **soal mirip** dengan angka berbeda, lalu siswa mencoba sendiri | "Lihat contoh: √50 = √(25 × 2) = 5√2. Sekarang coba √72!" |

- Level dinaikkan **hanya jika siswa sudah mencoba** dan masih kesulitan. Aplikasi mengirim **jumlah percobaan**, **jawaban terakhir**, dan **petunjuk yang sudah dibuka** sebagai konteks.
- Jika siswa meminta "jawabannya saja", Si Akar menolak dengan ramah lalu memberi petunjuk satu langkah.
- Jika siswa mengirim jawaban yang **benar**, Si Akar memuji secara spesifik lalu meminta **alasan** atau **tafsiran** (germane load).
- Jika **salah**, Si Akar menunjukkan bagian yang keliru tanpa menyebut jawaban benar.
- Jawaban benar dikirim ke AI dengan tanda **RAHASIA**, hanya agar AI bisa memeriksa dengan tepat.

### 3.2 Pengelolaan beban kognitif

| Jenis beban | Strategi Si Akar |
|---|---|
| **Intrinsik** | Memecah masalah menjadi langkah kecil, satu langkah per pesan. Jika prasyarat lemah (kuadrat sempurna, faktorisasi), prasyarat dibantu dulu |
| **Ekstrinsik** | Pesan ≤ 60 kata, kalimat pendek, bahasa anak SMP, maksimal satu rumus per pesan, notasi konsisten, tanpa informasi yang tidak perlu |
| **Germane** | Meminta siswa menjelaskan "mengapa", mengenali pola, menghubungkan dengan soal sebelumnya, dan merangkum dengan kata-kata sendiri |

Setiap pesan diakhiri **satu pertanyaan atau tugas kecil**, sehingga siswa tetap aktif berpikir.

### 3.3 Literasi matematika

Untuk soal cerita, Si Akar membimbing berurutan: **Rumuskan** (diketahui, ditanya, model) → **Kerjakan** (hitung bentuk akar) → **Tafsirkan** (nilai pendekatan, satuan, kewajaran dalam cerita). Ini sama dengan siklus di Pojok Literasi (docs/09).

### 3.4 Rigorous Mathematical Thinking (RMT) — Kinard & Kozulin (2008)

RMT berlandaskan **teori sosiokultural Vygotsky** (alat psikologis, konsep spontan menuju konsep ilmiah) dan **Mediated Learning Experience (MLE) Feuerstein** (guru/mediator mengembangkan fungsi kognitif siswa). Pembelajaran berlangsung dalam tiga fase:

| Fase | Fokus | Peran Si Akar | Contoh pada materi bentuk akar |
|---|---|---|---|
| **1. Pengembangan kognitif** *(cognitive development)* | Membangun **alat psikologis** dan **fungsi kognitif** sebelum masuk ke konsep | Mengajak siswa memakai label matematika, tabel kuadrat, pohon faktor, garis bilangan; melatih mengamati, memberi label, membandingkan, memilih informasi relevan, mengelompokkan, menemukan hubungan | "Coba lihat tabel kuadrat. Angka mana saja yang termasuk kuadrat sempurna?" |
| **2. Konten sebagai proses pembelajaran** *(content as process learning)* | Siswa **mengonstruksi konsep sendiri** dari contoh konkret menuju konsep ilmiah | Memberi kegiatan terstruktur: membandingkan beberapa contoh, menganalisis, merumuskan pola, menggeneralisasi | "Hitung √4 × √9, lalu √36. Apa yang kamu temukan dari keduanya?" |
| **3. Praktik konstruksi kognitif konseptual** *(cognitive conceptual construction practice)* | **Mempraktikkan dan menerapkan** konsep sampai terinternalisasi | Memberi soal baru atau soal cerita, meminta siswa memeriksa jawaban, menjelaskan alasan, dan merefleksikan cara berpikirnya | "Sekarang pakai polamu untuk ubin seluas 72 cm². Bagaimana kamu tahu jawabanmu benar?" |

**Fungsi kognitif** yang dilatih Si Akar: mengamati secara sistematis, memberi label, memvisualisasikan, membandingkan, mencari dan memilih informasi relevan, mengelompokkan, menemukan hubungan, menganalisis, menggeneralisasi, dan memeriksa kembali.

**Kriteria mediasi Feuerstein** yang diterapkan Si Akar:
- **Intensionalitas dan resiprositas**: menyampaikan tujuan setiap langkah dan memastikan siswa ikut aktif menanggapi (setiap pesan diakhiri pertanyaan).
- **Makna**: menjelaskan mengapa langkah atau konsep itu penting.
- **Transendensi**: menghubungkan konsep dengan soal lain dan situasi di luar soal yang sedang dikerjakan.

Label fase di bawah setiap balasan: *Fase 1 · Pengembangan kognitif*, *Fase 2 · Konten sebagai proses*, *Fase 3 · Praktik konseptual*.

## 4. Data untuk penelitian

Setiap respons AI berbentuk data terstruktur:

```json
{"pesan":"...","fase_rmt":2,"tahap_literasi":"kerjakan","level_bantuan":1,"jenis_kesulitan":"prasyarat"}
```

- Di bawah setiap balasan, siswa melihat keterangan kecil, misalnya *"Fase 2 · Membangun konsep · Kerjakan · Bantuan 1/3"*.
- Setiap percakapan tercatat dengan kegiatan **"Asisten AI"** di Google Sheets dan Mode Pemilik: pertanyaan siswa, balasan Si Akar, fase RMT, tahap literasi, level bantuan, dan jenis kesulitan.
- Data ini bisa dianalisis dengan Python (docs/11), misalnya untuk melihat sebaran fase RMT, jenis kesulitan yang paling sering, atau hubungan level bantuan dengan nilai paket soal.

## 5. Etika dan batasan

- Percakapan siswa dikirim ke layanan DeepSeek. Cantumkan hal ini dalam **izin sekolah, persetujuan orang tua**, dan persetujuan dosen pembimbing.
- Jawaban AI bisa saja keliru. Si Akar adalah pendamping, bukan sumber kebenaran tunggal. Uji coba dulu dengan berbagai pertanyaan sebelum dipakai di kelas.
- Instruksi pedagogis sebaiknya **divalidasi ahli materi dan ahli media** bersama instrumen lainnya (docs/07).
