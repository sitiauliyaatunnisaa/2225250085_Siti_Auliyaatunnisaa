# 12 — Optimasi untuk Smartphone

Sebagian besar siswa akan memakai AkarKu di **HP Android kelas menengah ke bawah** dengan kuota terbatas. Dokumen ini menetapkan target, aturan teknis, dan cara pengujian agar aplikasi **berfungsi dengan baik di smartphone**, baik di browser maupun setelah dipasang (PWA/APK).

## 1. Perangkat Sasaran

| Kategori | Spesifikasi acuan | Contoh kondisi |
|---|---|---|
| **Minimum (wajib lancar)** | Android 8.0+, RAM 2–3 GB, CPU 8 inti kelas bawah, layar 5"–6,5" | HP lama milik siswa atau orang tua |
| **Umum** | Android 11–14, RAM 4–6 GB | Mayoritas HP siswa |
| **iPhone** | iOS 16.4+ (Safari) | Sebagian kecil siswa |
| **Lebar layar** | **320 px – 430 px** (potret), sampai 932 px (lanskap) | 320 px = layar terkecil yang didukung |
| **Browser** | Chrome Android 100+, Safari iOS 16.4+, Samsung Internet 20+ | Browser bawaan HP lain: tetap berfungsi, instal disarankan lewat Chrome |
| **Jaringan** | 3G/4G lambat, sering terputus, atau offline total | Kuota terbatas di rumah |

> Data perangkat siswa yang sebenarnya dikumpulkan lewat angket analisis kebutuhan ([01 §8](01-analisis-kebutuhan.md)) dan formulir perangkat saat uji coba ([07](07-rencana-evaluasi.md)). Sesuaikan target jika ternyata berbeda.

## 2. Target Kinerja (Diukur di Mode Mobile)

| Metrik | Target | Cara ukur |
|---|---|---|
| Lighthouse **Mobile** – Performance | ≥ 90 | Chrome DevTools, mode mobile |
| Largest Contentful Paint (LCP) | ≤ 2,5 detik (4G), ≤ 4 detik (3G lambat) | Lighthouse / Web Vitals |
| Interaction to Next Paint (INP) | ≤ 200 ms | Web Vitals |
| Cumulative Layout Shift (CLS) | ≤ 0,1 | Web Vitals |
| JavaScript awal | ≤ 250 KB (gzip) | `vite build` + `rollup-plugin-visualizer` |
| Total unduhan pertama (semua modul untuk offline) | ≤ 3 MB | DevTools → Network |
| Buka ulang (dari cache/PWA) | ≤ 1,5 detik | Uji di HP minimum |
| Memori saat berjalan | ≤ 150 MB | Chrome DevTools → Memory (remote debugging) |
| Respons tombol | Umpan balik visual ≤ 100 ms | Uji manual |

## 3. Kebutuhan Fungsional Smartphone (PRD F11)

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F11.1 | Tata letak responsif **mobile-first**, rapi pada lebar 320–430 px, **tanpa gulir horizontal** pada halaman | P0 |
| F11.2 | **Tombol Kembali Android** (tombol fisik/gestur) menutup panel atau kembali ke layar sebelumnya, tidak langsung keluar dari aplikasi. Di Beranda, konfirmasi "Keluar dari AkarKu?" | P0 |
| F11.3 | **Simpan otomatis** setiap kali siswa berpindah layar/menjawab soal. Jika aplikasi tertutup (ada telepon, pindah aplikasi, baterai habis), siswa kembali ke layar terakhir | P0 |
| F11.4 | **Papan ketik matematika** khusus. Keyboard bawaan HP tidak muncul saat mengisi jawaban bentuk akar. Kolom input tidak tertutup keyboard | P0 |
| F11.5 | Mendukung **lanskap dan potret**. Potret sebagai tata letak utama | P1 |
| F11.6 | Aman untuk **layar berponi/berlubang kamera** dan bilah gestur (*safe area*) | P0 |
| F11.7 | Mengikuti **ukuran huruf sistem** HP (huruf besar) tanpa tata letak rusak | P0 |
| F11.8 | **Hemat kuota**: setelah unduhan pertama, aplikasi tidak memakai internet kecuali ada pembaruan | P0 |
| F11.9 | **Hemat baterai**: tanpa animasi terus-menerus, video, atau proses latar belakang | P0 |
| F11.10 | Meminta **penyimpanan persisten** (`navigator.storage.persist()`) agar data progres tidak mudah dihapus browser | P0 |
| F11.11 | Getar ringan (opsional, Android) saat jawaban benar/salah. Bisa dimatikan di Pengaturan | P2 |
| F11.12 | Mendukung pembaca layar **TalkBack** (Android) dan **VoiceOver** (iPhone) untuk navigasi dan rumus | P1 |

## 4. Aturan Teknis (Wajib)

### 4.1 Tata Letak dan Layar
- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. **Jangan** menonaktifkan zoom (`user-scalable=no` dilarang demi aksesibilitas).
- Gunakan `100dvh`, bukan `100vh`, agar tinggi layar benar saat bilah alamat browser muncul/hilang.
- *Safe area*: `padding: env(safe-area-inset-top) … env(safe-area-inset-bottom)`, terutama untuk TopBar dan tombol utama di bawah.
- Ukuran huruf dan jarak memakai `rem` agar mengikuti pengaturan huruf sistem. Uji pada skala huruf 130% dan 200%.
- **Rumus panjang** (misalnya langkah merasionalkan): dibungkus kontainer `overflow-x: auto` sendiri, atau dipecah per langkah, sehingga hanya rumus yang bisa digeser, bukan seluruh halaman.
- Gambar/visual stimulus memakai SVG atau gambar WebP ≤ 50 KB, dengan `width`/`height` tetap agar tidak terjadi pergeseran tata letak.

### 4.2 Sentuhan dan Interaksi
- Target sentuh **≥ 48×48 px** dengan jarak antar target ≥ 8 px.
- Tombol utama di **zona jempol** (bawah layar). Tombol berbahaya (Atur ulang progres) tidak diletakkan di dekat tombol utama.
- `touch-action: manipulation` pada tombol untuk menghilangkan jeda ketuk ganda.
- **Tidak ada fungsi yang bergantung pada *hover***. Semua info tersedia lewat ketuk.
- Gestur geser (swipe) untuk pindah layar **tidak dipakai** sebagai satu-satunya cara agar tidak terjadi perpindahan tak sengaja (sejalan dengan aturan CLT no. 2). Tombol Lanjut/Kembali tetap utama.
- Tampilkan status tekan (*pressed state*) seketika pada setiap tombol.

### 4.3 Input dan Keyboard
- Kolom jawaban bentuk akar: `inputmode="none"` dan `readonly` terhadap keyboard bawaan. Input hanya lewat `MathKeyboard`.
- Kolom angka biasa: `inputmode="decimal"`. Kolom teks (nama panggilan, uraian literasi): keyboard bawaan.
- Ukuran huruf input **≥ 16 px** agar Safari iPhone tidak memperbesar layar otomatis.
- Gunakan `visualViewport` API dan `scrollIntoView({ block: 'center' })` agar kolom aktif tidak tertutup keyboard.
- Tanda desimal mendukung **koma** (format Indonesia: 7,07) dan titik.

### 4.4 Navigasi dan Siklus Hidup Aplikasi
- Navigasi memakai History API (React Router). Setiap BottomSheet/panel petunjuk menambah entri riwayat, sehingga tombol Kembali Android menutupnya terlebih dahulu.
- Di APK (Capacitor): tangani event `backButton` dari `@capacitor/app` dengan perilaku yang sama.
- Simpan progres pada event `visibilitychange` (saat aplikasi masuk latar belakang) dan setiap perpindahan layar.
- Saat dibuka kembali: pulihkan modul, layar, langkah yang sudah terbuka, dan jawaban yang belum dikirim.

### 4.5 Kinerja dan Ukuran
- *Code-splitting* per halaman dan per modul konten (`React.lazy`, `import()` dinamis).
- KaTeX: muat CSS dan font sekali, gunakan subset font yang dibutuhkan, `font-display: swap`.
- Tanpa library animasi berat. Transisi CSS ≤ 200 ms, menghormati `prefers-reduced-motion`.
- Hindari render ulang berlebihan: gunakan selector Zustand yang sempit dan `React.memo` untuk komponen rumus.
- Daftar panjang (riwayat jawaban) ditampilkan bertahap (paginasi), tidak sekaligus.

### 4.6 Offline, Penyimpanan, dan Kuota
- Service worker mem-*precache* aplikasi dan **semua konten modul** pada kunjungan pertama, dengan indikator "Menyiapkan mode offline… 80%".
- Pembaruan hanya mengunduh file yang berubah.
- Panggil `navigator.storage.persist()` setelah onboarding. Tangani error kuota penuh dengan pesan ramah dan saran ekspor/cadangan.
- iPhone: data PWA yang **dipasang di layar utama** lebih aman dari penghapusan otomatis dibanding membuka di Safari biasa. Sarankan siswa iPhone memasang aplikasi.

### 4.7 Khusus iPhone (Safari/PWA)
- Sediakan `apple-touch-icon` (180×180) dan `<meta name="apple-mobile-web-app-capable" content="yes">`, serta `apple-mobile-web-app-status-bar-style`.
- Tidak ada event `beforeinstallprompt`, jadi tampilkan panduan "Bagikan → Tambahkan ke Layar Utama" (F9.2).
- `navigator.vibrate` tidak tersedia, jadi fitur getar disembunyikan otomatis.

## 5. Strategi Pengujian di Smartphone

### 5.1 Matriks Perangkat Uji (minimal)
| No | Perangkat | Tujuan |
|---|---|---|
| 1 | HP Android **kelas bawah** (RAM 2–3 GB, Android 8–10) | Kinerja minimum |
| 2 | HP Android kelas menengah (Android 12–14) | Kondisi umum siswa |
| 3 | iPhone (iOS 16.4+) | Safari dan PWA iOS |
| 4 | Emulasi layar 320 px (Chrome DevTools) | Layar terkecil |
| 5 | Tablet/lanskap | Tata letak lebar |

> Pinjam HP siswa/guru saat uji one-to-one untuk mendapatkan perangkat nyata kelas bawah.

### 5.2 Alat Uji
- **Chrome DevTools → Device Mode** dengan *CPU throttling 4×* dan *Slow 4G*.
- **Lighthouse (Mobile)** dan **PageSpeed Insights** pada versi yang sudah dideploy.
- **Remote debugging**: HP Android disambungkan ke laptop via USB, lalu buka `chrome://inspect`.
- **Playwright** (opsional) dengan profil perangkat mobile untuk uji alur otomatis: onboarding → belajar M2 → latihan → kuis.

### 5.3 Daftar Uji Smartphone
- [ ] Tampilan rapi di 320, 360, 390, dan 430 px. Tidak ada gulir horizontal pada halaman
- [ ] Rumus terpanjang di M5 terbaca (dipecah per langkah atau dapat digeser di dalam kotak)
- [ ] Tombol Kembali Android menutup panel/petunjuk terlebih dahulu, lalu kembali ke layar sebelumnya
- [ ] Papan ketik matematika muncul, keyboard bawaan tidak muncul, dan kolom tidak tertutup
- [ ] Ukuran huruf sistem 200%: tidak ada teks terpotong atau tombol bertumpuk
- [ ] Layar berponi: TopBar dan tombol bawah tidak tertutup
- [ ] Putar layar ke lanskap dan kembali ke potret: progres tetap, tata letak benar
- [ ] Simulasi telepon masuk/pindah aplikasi, lalu kembali: siswa kembali ke layar dan langkah yang sama
- [ ] Mode pesawat setelah kunjungan pertama: semua modul, latihan, kuis, dan progres berfungsi
- [ ] HP kelas bawah: buka ulang ≤ 1,5 detik, ketuk tombol responsif, tidak ada patah-patah saat membuka langkah
- [ ] Lighthouse Mobile Performance ≥ 90, Accessibility ≥ 95
- [ ] TalkBack/VoiceOver dapat membacakan tombol dan rumus (aria-label)
- [ ] Ekspor CSV berhasil di Android (unduh/bagikan) dan iPhone
- [ ] Penggunaan 30 menit: HP tidak panas berlebihan, baterai turun wajar

## 6. Pemantauan Saat Uji Coba

Catat untuk setiap siswa uji coba: merek/model HP, versi Android/iOS, browser, cara pakai (browser/PWA/APK), serta kendala teknis yang muncul. Data ini masuk ke `data/mentah/perangkat_siswa.csv` dan dianalisis secara deskriptif dengan Python (`06_log_aplikasi.py`), sebagai bukti kepraktisan aplikasi di smartphone.
