/**
 * AkarKu — aplikasi + penyimpan riwayat pengunjung real-time (Google Apps Script + Google Sheets)
 *
 * Cara memasang (lihat docs/13-rekap-online-google-sheets.md):
 *  1. Buat Google Sheets baru → Ekstensi → Apps Script → tempel file ini sebagai Code.gs.
 *  2. Tambah file HTML bernama  index  → tempel seluruh isi app/index.html.
 *  3. Ganti kunci rahasia di fungsi setup(), lalu jalankan setup() satu kali.
 *  4. Terapkan → Deployment baru → Aplikasi web
 *     (Jalankan sebagai: Saya · Yang memiliki akses: Siapa saja).
 *  5. URL aplikasi web (berakhiran /exec) = LINK AKARKU yang dibagikan ke siswa.
 */

const SHEET_NAME = 'riwayat';
const HEADERS = ['id', 'diterima', 'waktu', 'uid', 'nama', 'kode', 'kegiatan', 'soal', 'jawaban', 'hasil', 'petunjuk', 'catatan'];
const MAX_BATCH = 100;      // aktivitas maksimal per kiriman
const MAX_READ = 20000;     // baris terbaru yang dikirim ke Mode Pemilik

/** Jalankan SATU KALI setelah mengganti kunci rahasia di bawah. */
function setup() {
  const key = 'GANTI-DENGAN-KUNCI-RAHASIAMU';
  if (key.indexOf('GANTI') === 0 || key.length < 8) {
    throw new Error('Ganti dulu kunci rahasia di fungsi setup() (minimal 8 karakter), lalu jalankan lagi.');
  }
  PropertiesService.getScriptProperties().setProperty('OWNER_KEY', key);
  sheet_();
  Logger.log('Siap. Sheet "' + SHEET_NAME + '" dibuat dan kunci rahasia tersimpan.');
}

/** Membuka link /exec = menampilkan aplikasi AkarKu. */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('AkarKu')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ---------- Dipanggil aplikasi lewat google.script.run ---------- */
function saveEventsApi(events) { return saveEvents_(events); }
function readDataApi(key) { return readData_(key); }

/* ---------- Untuk aplikasi yang dipublikasikan di luar Google (opsional, mis. Netlify) ---------- */
function doPost(e) {
  let body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'format' });
  }
  if (body.type === 'events') return json_(saveEvents_(body.events));
  if (body.type === 'data') return json_(readData_(body.key));
  return json_({ ok: false, error: 'type' });
}

function saveEvents_(events) {
  if (!Array.isArray(events)) return { ok: false, error: 'format' };
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheet_();
    const cache = CacheService.getScriptCache();
    const rows = [];
    const ids = [];
    events.slice(0, MAX_BATCH).forEach(function (ev) {
      const id = clean_(ev && ev.id, 60);
      if (!id) return;
      ids.push(id);
      if (cache.get('id_' + id)) return;            // kiriman ulang: jangan dicatat dua kali
      cache.put('id_' + id, '1', 21600);
      rows.push([
        id,
        new Date(),
        new Date(Number(ev.t) || Date.now()),
        clean_(ev.uid, 40),
        clean_(ev.name, 20),
        clean_(ev.code, 12),
        clean_(ev.area, 20),
        clean_(ev.q, 300),
        clean_(ev.ans, 300),
        ev.ok === true ? 'benar' : ev.ok === false ? 'salah' : '',
        Number(ev.hint) || '',
        clean_(ev.note, 300)
      ]);
    });
    if (rows.length) sh.getRange(sh.getLastRow() + 1, 1, rows.length, HEADERS.length).setValues(rows);
    return { ok: true, ids: ids };
  } finally {
    lock.releaseLock();
  }
}

function readData_(key) {
  const owner = PropertiesService.getScriptProperties().getProperty('OWNER_KEY');
  if (!owner || String(key || '') !== owner) {
    Utilities.sleep(800);                          // memperlambat tebakan kunci
    return { ok: false, error: 'key' };
  }
  const sh = sheet_();
  const last = sh.getLastRow();
  if (last < 2) return { ok: true, events: [] };
  const start = Math.max(2, last - MAX_READ + 1);
  const values = sh.getRange(start, 1, last - start + 1, HEADERS.length).getValues();
  const events = values.map(function (r) {
    const o = {};
    HEADERS.forEach(function (h, i) { o[h] = r[i] instanceof Date ? r[i].toISOString() : String(r[i]); });
    return o;
  });
  return { ok: true, events: events };
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

/** Potong panjang teks dan cegah teks dibaca sebagai rumus spreadsheet. */
function clean_(v, n) {
  let s = String(v == null ? '' : v).slice(0, n);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
