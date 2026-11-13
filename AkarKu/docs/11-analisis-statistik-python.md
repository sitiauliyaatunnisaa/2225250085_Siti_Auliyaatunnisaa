# 11 — Analisis Data Statistik dengan Python

Python dipakai **hanya untuk data statistik penelitian** (fase Evaluation ADDIE). Aplikasi siswa tetap menggunakan JavaScript.

## 1. Persiapan

```bash
cd analisis
python -m venv .venv
.venv\Scripts\activate          # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt
python jalankan_semua.py        # menjalankan skrip 01–06, hasil di data/hasil/
```

`analisis/requirements.txt`
```
pandas>=2.2
numpy>=1.26
scipy>=1.13
pingouin>=0.5.4
matplotlib>=3.8
openpyxl>=3.1
qrcode[pil]>=7.4
jupyter>=1.0
```

## 2. Sumber Data (`data/mentah/`)

| File | Asal | Kolom utama |
|---|---|---|
| `attempts_*.csv`, `tests_*.csv`, `reflections_*.csv` | Ekspor aplikasi (format di [03 §7](03-arsitektur-teknis.md)) | lihat 03 §7 |
| `validasi_ahli.csv` | Lembar validasi (diketik dari kertas/Google Form) | `validator, jenis (materi/media), aspek, butir, skor` |
| `angket_siswa.csv` | Angket kepraktisan | `student_code, butir_1 … butir_14` |
| `angket_beban_kognitif.csv` | Angket CL 3 dimensi | `student_code, IL1…IL3, EL1…EL3, GL1…GL4` |
| `skor_rubrik_literasi.csv` | Penilaian rubrik oleh peneliti | `student_code, test_type, butir, merumuskan, menerapkan, menafsirkan` |
| `perangkat_siswa.csv` | Formulir perangkat saat uji coba | `student_code, model_hp, os, versi_os, browser, cara_pakai, kendala` |

Folder `data/` **tidak diunggah** ke GitHub (privasi siswa). Gunakan kode siswa (S01, S02, …), bukan nama.

## 3. Skrip dan Analisis

| Skrip | Rumusan masalah | Analisis | Keluaran |
|---|---|---|---|
| `01_validasi_ahli.py` | Kevalidan | Persentase per aspek dan total, kategori kelayakan, **Aiken's V** per butir | `validasi.xlsx`, grafik batang per aspek |
| `02_kepraktisan.py` | Kepraktisan | Persentase per butir dan total, kategori | `kepraktisan.xlsx` |
| `03_ngain_hasil_belajar.py` | Keefektifan (hasil belajar) | Statistik deskriptif, **N-gain** per siswa dan rata-rata, Shapiro–Wilk, **uji-t berpasangan** atau **Wilcoxon** (jika tidak normal), *effect size* | `ngain.xlsx`, boxplot pre–post |
| `04_beban_kognitif.py` | Beban kognitif | Rata-rata IL/EL/GL, **Cronbach's alpha** per dimensi, skala Paas per modul | `beban_kognitif.xlsx`, grafik per modul |
| `05_literasi.py` | Keefektifan literasi | Skor rubrik → persentase, N-gain total dan per proses (merumuskan/menerapkan/menafsirkan), uji beda berpasangan | `literasi.xlsx`, grafik per proses |
| `06_log_aplikasi.py` | Bahan revisi produk | Frekuensi miskonsepsi, penggunaan petunjuk, langkah siklus literasi yang paling sering gagal, waktu per modul, **sebaran perangkat dan kendala smartphone** | `log.xlsx`, grafik |
| `07_buat_qr.py` | Distribusi | Membuat kode QR tautan aplikasi untuk brosur | `qr_akarku.png` |

## 4. Rumus dan Kriteria (`config.py`)

| Analisis | Rumus | Kriteria |
|---|---|---|
| Persentase kelayakan/kepraktisan | P = Σskor / Σskor maks × 100% | 81–100 sangat layak · 61–80 layak · 41–60 cukup · 21–40 kurang · ≤ 20 tidak layak |
| Aiken's V | V = Σ(r − lo) / [n(c − 1)] | V ≥ 0,8 valid (sesuaikan dengan tabel Aiken untuk n validator dan c kategori) |
| N-gain (Hake) | g = (post − pre) / (maks − pre) | g > 0,7 tinggi · 0,3 ≤ g ≤ 0,7 sedang · g < 0,3 rendah |
| N-gain % (tafsiran efektivitas) | g × 100 | < 40 tidak efektif · 40–55 kurang efektif · 56–75 cukup efektif · > 75 efektif |
| Cronbach's alpha | — (pingouin) | α ≥ 0,7 reliabel |
| Effect size (berpasangan) | d = rata-rata selisih / SD selisih | 0,2 kecil · 0,5 sedang · 0,8 besar |
| Taraf signifikansi | α = 0,05 | — |

> Sesuaikan kriteria dengan rujukan yang digunakan di skripsi/arahan dosen pembimbing.

## 5. Contoh Kode Inti

```python
# analisis/03_ngain_hasil_belajar.py (cuplikan)
import pandas as pd
from scipy import stats
from config import DATA, HASIL, SKOR_MAKS, ALPHA, kategori_ngain

tests = pd.concat(pd.read_csv(f) for f in sorted(DATA.glob("tests_*.csv")))
skor = (tests[tests.test_type.isin(["pretest", "posttest"])]
        .groupby(["student_code", "test_type"])["correct"].sum()
        .unstack() * (100 / SKOR_MAKS))

skor["ngain"] = (skor.posttest - skor.pretest) / (100 - skor.pretest)
skor["kategori"] = skor.ngain.apply(kategori_ngain)

selisih = skor.posttest - skor.pretest
normal = stats.shapiro(selisih).pvalue > ALPHA
uji = stats.ttest_rel(skor.posttest, skor.pretest) if normal \
      else stats.wilcoxon(skor.posttest, skor.pretest)
d = selisih.mean() / selisih.std(ddof=1)

print(f"Rata-rata N-gain: {skor.ngain.mean():.2f} ({kategori_ngain(skor.ngain.mean())})")
print(f"{'Uji-t berpasangan' if normal else 'Wilcoxon'}: p = {uji.pvalue:.4f}, d = {d:.2f}")
skor.to_excel(HASIL / "ngain.xlsx")
```

```python
# analisis/07_buat_qr.py
import qrcode
qrcode.make("https://akarku.netlify.app").save("data/hasil/qr_akarku.png")
```

## 6. Aturan untuk Asisten AI

- Skrip Python **hanya membaca** `data/mentah/` dan **hanya menulis** ke `data/hasil/`.
- Nama kolom mengikuti kontrak ekspor di [03 §7](03-arsitektur-teknis.md). Jika kontrak berubah, perbarui `config.py` dan `src/lib/exportCsv.js` bersamaan.
- Setiap skrip dapat dijalankan sendiri (`python 03_ngain_hasil_belajar.py`) dan mencetak ringkasan berbahasa Indonesia.
- Grafik: satu pesan per grafik, label dalam bahasa Indonesia, warna netral, dan disimpan sebagai PNG 300 dpi (siap ditempel ke skripsi).
- Sediakan file contoh `data/contoh/` berisi data dummy agar skrip dapat diuji sebelum data asli tersedia.
