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
  folder_();   // meminta izin Google Drive untuk menyimpan laporan PDF
  Logger.log('Siap. Sheet "' + SHEET_NAME + '" dibuat, folder laporan siap, dan kunci rahasia tersimpan.');
}

/* ---------- Laporan PDF: disimpan di Google Drive agar bisa diunduh di Android & iPhone ---------- */
const PDF_FOLDER = 'AkarKu - Laporan PDF';
const PDF_KEEP_DAYS = 3;   // file laporan dihapus otomatis setelah 3 hari

function savePdfApi(payload) {
  if (!payload || typeof payload.b64 !== 'string' || payload.b64.length > 4000000) return { ok: false, error: 'size' };
  const bytes = Utilities.base64Decode(payload.b64);
  if (String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) !== '%PDF') return { ok: false, error: 'format' };
  const name = String(payload.name || 'laporan-akarku.pdf').replace(/[^\w.-]+/g, '-').slice(0, 90);
  const folder = folder_();
  cleanupPdf_(folder);
  const file = folder.createFile(Utilities.newBlob(bytes, 'application/pdf', name));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return { ok: true, url: 'https://drive.google.com/uc?export=download&id=' + file.getId(), view: file.getUrl() };
}

function folder_() {
  const it = DriveApp.getFoldersByName(PDF_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(PDF_FOLDER);
}

function cleanupPdf_(folder) {
  const limit = Date.now() - PDF_KEEP_DAYS * 86400000;
  const files = folder.getFiles();
  let n = 0;
  while (files.hasNext() && n < 25) {
    const f = files.next();
    if (f.getDateCreated().getTime() < limit) { f.setTrashed(true); n++; }
  }
}

/** Membuka link /exec = menampilkan aplikasi AkarKu. */
function doGet() {
  try {
    return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('AkarKu')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    // Tanpa file "index": Apps Script hanya menjadi server untuk AkarKu di GitHub Pages.
    return json_({ ok: true, app: 'akarku', mode: 'server' });
  }
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
  if (body.type === 'tutor') return json_(askTutorApi(body.req));
  if (body.type === 'aicfg') return json_(setAiConfigApi(body.req));
  if (body.type === 'aitest') return json_(testAiApi(body.req));
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
  // Bisa dipasang dari Google Sheets (Ekstensi → Apps Script) atau langsung dari script.new.
  // Jika tidak terhubung ke spreadsheet, spreadsheet "AkarKu – Riwayat" dibuat otomatis di Google Drive.
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    const props = PropertiesService.getScriptProperties();
    const id = props.getProperty('SHEET_ID');
    if (id) { try { ss = SpreadsheetApp.openById(id); } catch (err) { ss = null; } }
    if (!ss) { ss = SpreadsheetApp.create('AkarKu – Riwayat'); props.setProperty('SHEET_ID', ss.getId()); }
  }
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

/* =====================================================================
 * ASISTEN BELAJAR "SI AKAR" — pembimbing proses berpikir
 * ---------------------------------------------------------------------
 * API key DISIMPAN DI SERVER (Properti skrip), tidak pernah di aplikasi siswa.
 * Apps Script → ⚙️ Setelan proyek → Properti skrip → tambahkan:
 *
 *   PILIHAN GRATIS (disarankan) — Google Gemini:
 *     AI_PROVIDER = gemini
 *     AI_API_KEY  = key dari aistudio.google.com/apikey  (diawali "AIza")
 *
 *   PILIHAN GRATIS — DeepSeek lewat OpenRouter (model berlabel :free):
 *     AI_PROVIDER = openrouter
 *     AI_API_KEY  = key dari openrouter.ai/keys  (diawali "sk-or-")
 *
 *   PILIHAN BERBAYAR — DeepSeek resmi:
 *     AI_PROVIDER = deepseek
 *     AI_API_KEY  = key dari platform.deepseek.com/api_keys  (diawali "sk-")
 *
 *   Opsional: AI_MODEL = nama model lain (jika model bawaan sudah tidak tersedia).
 * Lalu jalankan setup() sekali lagi agar Google meminta izin "akses layanan eksternal".
 * Rancangan pedagogis: docs/14-asisten-ai-pedagogis.md
 * ===================================================================== */
const AI_PROVIDERS = {
  gemini:     { url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', model: 'gemini-2.5-flash', json: true },
  openrouter: { url: 'https://openrouter.ai/api/v1/chat/completions', model: 'deepseek/deepseek-chat-v3-0324:free', json: false },
  deepseek:   { url: 'https://api.deepseek.com/chat/completions', model: 'deepseek-chat', json: true }
};
const AI_MAX_PER_HOUR = 40;     // batas pertanyaan per siswa per jam (agar kuota gratis tidak cepat habis)
const AI_MAX_PER_DAY = 1500;    // batas seluruh aplikasi per hari

/* ↓↓↓ Instruksi pedagogis untuk AI. Sesuaikan bagian RMT dengan ringkasan dari dosen. ↓↓↓ */
const TUTOR_PROMPT = [
  'Kamu adalah "Si Akar", asisten belajar matematika untuk siswa SMP kelas IX pada materi bilangan bentuk akar',
  '(menyederhanakan, operasi, merasionalkan penyebut, dan soal cerita/literasi matematika).',
  'Peranmu adalah PEMBIMBING PROSES BERPIKIR MATEMATIS, bukan pemberi jawaban.',
  '',
  'ATURAN UTAMA',
  '1. Jangan pernah langsung memberikan jawaban akhir soal yang sedang dikerjakan siswa, walaupun siswa memaksa atau meminta "jawabannya saja". Tolak dengan ramah, lalu beri petunjuk satu langkah.',
  '2. Beri bantuan bertingkat sesuai kesulitan siswa (level_bantuan):',
  '   0 = bertanya balik untuk menggali apa yang sudah siswa pahami;',
  '   1 = arah umum (apa yang perlu dicari atau diingat);',
  '   2 = langkah pertama yang konkret;',
  '   3 = contoh SOAL MIRIP dengan angka berbeda yang dikerjakan lengkap, lalu minta siswa mencoba soalnya sendiri.',
  '   Mulai dari level terendah yang cukup. Naikkan level hanya jika siswa sudah mencoba dan masih kesulitan (lihat jumlah percobaan di konteks).',
  '3. Jika siswa mengirim jawaban: periksa. Jika benar, puji secara spesifik dan minta siswa menjelaskan alasannya atau menafsirkan hasilnya. Jika salah, tunjukkan BAGIAN yang keliru tanpa menyebut jawaban benar, lalu beri petunjuk.',
  '4. Kenali jenis kesulitan: prasyarat (kuadrat sempurna, faktorisasi), prosedur (urutan langkah), konsep (misalnya mengira √a + √b = √(a + b)), atau membaca soal cerita. Tangani sesuai jenisnya.',
  '',
  'MENGELOLA BEBAN KOGNITIF',
  '- Beban intrinsik: pecah masalah menjadi langkah kecil, hanya SATU langkah per pesan. Jika prasyarat lemah, bantu prasyaratnya dulu.',
  '- Beban ekstrinsik: pesan maksimal 60 kata, kalimat pendek, bahasa sehari-hari anak SMP, paling banyak satu rumus per pesan, tanpa informasi yang tidak perlu, notasi konsisten (√, ×, ÷).',
  '- Beban germane: ajak siswa menjelaskan "mengapa", mengenali pola, menghubungkan dengan soal sebelumnya, dan merangkum dengan kata-katanya sendiri.',
  '- Selalu akhiri pesan dengan SATU pertanyaan atau tugas kecil untuk siswa.',
  '',
  'LITERASI MATEMATIKA (soal cerita/kontekstual) — bimbing berurutan:',
  '- Rumuskan: apa yang diketahui, apa yang ditanya, rumus atau model apa yang tepat.',
  '- Kerjakan: hitung atau sederhanakan bentuk akarnya.',
  '- Tafsirkan: kira-kira berapa nilainya, apakah satuannya benar, apakah hasilnya masuk akal dalam cerita.',
  '',
  'RIGOROUS MATHEMATICAL THINKING (RMT) menurut Kinard & Kozulin (2008), berlandaskan teori sosiokultural Vygotsky dan Mediated Learning Experience Feuerstein.',
  'Pilih fase yang sesuai kebutuhan siswa saat ini:',
  '- Fase 1, Pengembangan kognitif (cognitive development): kembangkan alat psikologis dan fungsi kognitif sebelum masuk ke konsep. Alat psikologis: kata/label matematika (misalnya "kuadrat sempurna", "faktor"), tabel kuadrat, pohon faktor, garis bilangan. Fungsi kognitif: mengamati dengan teliti dan sistematis, memberi label, memvisualisasikan, membandingkan, mencari dan memilih informasi yang relevan, mengelompokkan, serta menemukan hubungan.',
  '- Fase 2, Konten sebagai proses pembelajaran (content as process learning / konstruksi konsep): siswa memakai alat dan fungsi kognitif tadi untuk MENEMUKAN konsep sendiri melalui kegiatan terstruktur, dari contoh konkret menuju konsep ilmiah. Ajak menganalisis, membandingkan beberapa contoh (misalnya √4 × √9 dan √36), merumuskan pola √(a × b) = √a × √b, lalu menggeneralisasi dan menarik kesimpulan.',
  '- Fase 3, Praktik konstruksi kognitif konseptual (cognitive conceptual construction practice): siswa mempraktikkan dan menerapkan konsep pada soal baru atau konteks nyata (literasi), memeriksa kebenaran jawabannya, menjelaskan alasannya, dan merefleksikan cara berpikirnya (metakognisi) sampai konsep terinternalisasi.',
  'Bertindaklah sebagai MEDIATOR sesuai kriteria Feuerstein: intensionalitas dan resiprositas (sampaikan tujuan langkah dan pastikan siswa ikut aktif menanggapi), makna (jelaskan mengapa langkah/konsep itu penting), dan transendensi (hubungkan dengan soal atau situasi lain di luar soal ini).',
  '',
  'LAINNYA',
  '- Jika pertanyaan di luar matematika, arahkan kembali dengan sopan ke materi.',
  '- Jangan meminta atau menyebut data pribadi.',
  '- Informasi bertanda RAHASIA di konteks hanya untuk membantumu memeriksa; jangan pernah menyebutkannya.',
  '- Gunakan bahasa Indonesia yang ramah dan menyemangati, boleh satu emoji.',
  '',
  'FORMAT: jawab HANYA dengan JSON valid, tanpa teks lain:',
  '{"pesan":"...","fase_rmt":1,"tahap_literasi":"rumuskan|kerjakan|tafsirkan|-","level_bantuan":0,"jenis_kesulitan":"prasyarat|prosedur|konsep|membaca soal|tidak ada"}'
].join('\n');

function askTutorApi(req) {
  const props = PropertiesService.getScriptProperties();
  const providerName = String(props.getProperty('AI_PROVIDER') || (props.getProperty('DEEPSEEK_API_KEY') ? 'deepseek' : 'gemini')).trim().toLowerCase();
  const provider = AI_PROVIDERS[providerName] || AI_PROVIDERS.gemini;
  const key = (props.getProperty('AI_API_KEY') || props.getProperty('DEEPSEEK_API_KEY') || '').trim();
  const model = (props.getProperty('AI_MODEL') || provider.model).trim();
  if (!key) return { ok: false, error: 'nokey' };
  if (!req || !Array.isArray(req.messages)) return { ok: false, error: 'format' };

  // Batas pemakaian (hemat biaya)
  const cache = CacheService.getScriptCache();
  const uid = String(req.uid || 'tamu').replace(/[^\w-]/g, '').slice(0, 40) || 'tamu';
  const hourKey = 'ai_h_' + uid + '_' + Math.floor(Date.now() / 3600000);
  const dayKey = 'ai_d_' + Utilities.formatDate(new Date(), 'GMT', 'yyyyMMdd');
  const nHour = Number(cache.get(hourKey) || 0), nDay = Number(cache.get(dayKey) || 0);
  if (nHour >= AI_MAX_PER_HOUR || nDay >= AI_MAX_PER_DAY) return { ok: false, error: 'limit' };
  cache.put(hourKey, String(nHour + 1), 3700);
  cache.put(dayKey, String(nDay + 1), 90000);

  // Hanya peran user/assistant, maksimal 12 pesan terakhir, tiap pesan maksimal 600 karakter
  const msgs = req.messages.slice(-12)
    .filter(function (m) { return m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'; })
    .map(function (m) { return { role: m.role, content: m.content.slice(0, 600) }; });
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (!msgs.length) return { ok: false, error: 'format' };

  const payload = {
    model: model,
    temperature: 0.4,
    max_tokens: 2000,
    messages: [{ role: 'system', content: TUTOR_PROMPT + '\n\nKONTEKS LAYAR SISWA SAAT INI:\n' + String(req.context || '-').slice(0, 1200) }].concat(msgs)
  };
  if (provider.json) payload.response_format = { type: 'json_object' };
  let res;
  try {
    res = UrlFetchApp.fetch(provider.url, {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      headers: { Authorization: 'Bearer ' + key }, payload: JSON.stringify(payload)
    });
  } catch (err) {
    return { ok: false, error: 'network' };
  }
  const code = res.getResponseCode();
  if (code !== 200) {
    Logger.log('AI ' + providerName + ' ' + code + ': ' + res.getContentText().slice(0, 500));
    return { ok: false, error: code === 402 ? 'saldo' : (code === 401 || code === 403) ? 'keysalah' : code === 429 ? 'sibuk' : code === 404 ? 'model' : 'api' };
  }
  let text = '';
  try { text = JSON.parse(res.getContentText()).choices[0].message.content || ''; } catch (err) { return { ok: false, error: 'api' }; }
  let out;
  try { out = JSON.parse(text); } catch (err) {
    const m = String(text).match(/\{[\s\S]*\}/);           // model gratis kadang menambah teks di luar JSON
    try { out = m ? JSON.parse(m[0]) : { pesan: text }; } catch (e2) { out = { pesan: text }; }
  }
  return {
    ok: true,
    reply: {
      pesan: String(out.pesan || 'Maaf, coba ulangi pertanyaanmu ya.').slice(0, 1200),
      fase_rmt: [1, 2, 3].indexOf(Number(out.fase_rmt)) >= 0 ? Number(out.fase_rmt) : null,
      tahap_literasi: ['rumuskan', 'kerjakan', 'tafsirkan'].indexOf(out.tahap_literasi) >= 0 ? out.tahap_literasi : '-',
      level_bantuan: [0, 1, 2, 3].indexOf(Number(out.level_bantuan)) >= 0 ? Number(out.level_bantuan) : null,
      jenis_kesulitan: String(out.jenis_kesulitan || '').slice(0, 30)
    }
  };
}

/** Uji coba dari editor Apps Script: pilih fungsi ini lalu Jalankan, lihat hasilnya di Log eksekusi. */
function testTutor() {
  Logger.log(JSON.stringify(askTutorApi({
    uid: 'uji', context: 'Halaman: Latihan. Soal: Sederhanakan √72. Jawaban benar (RAHASIA): 6√2. Jumlah percobaan siswa: 0.',
    messages: [{ role: 'user', content: 'Kak, jawabannya berapa?' }]
  })));
}

/* ---------- Pengaturan AI dari Mode Pemilik (tanpa membuka Setelan proyek) ---------- */
function ownerOk_(k) {
  const owner = PropertiesService.getScriptProperties().getProperty('OWNER_KEY');
  if (!owner || String(k || '') !== owner) { Utilities.sleep(800); return false; }
  return true;
}
function setAiConfigApi(cfg) {
  if (!cfg || !ownerOk_(cfg.ownerKey)) return { ok: false, error: 'key' };
  const p = String(cfg.provider || '').toLowerCase();
  if (!AI_PROVIDERS[p]) return { ok: false, error: 'provider' };
  const props = PropertiesService.getScriptProperties();
  props.setProperty('AI_PROVIDER', p);
  if (cfg.apiKey) props.setProperty('AI_API_KEY', String(cfg.apiKey).trim().slice(0, 300));
  const m = String(cfg.model || '').trim().slice(0, 120);
  if (m) props.setProperty('AI_MODEL', m); else props.deleteProperty('AI_MODEL');
  return { ok: true };
}
function testAiApi(req) {
  if (!req || !ownerOk_(req.ownerKey)) return { ok: false, error: 'key' };
  return askTutorApi({
    uid: 'pemilik-uji',
    context: 'Halaman: Latihan. Soal: Sederhanakan √72. Jawaban benar (RAHASIA): 6√2. Jumlah percobaan siswa: 0.',
    messages: [{ role: 'user', content: 'Kak, √72 jawabannya berapa?' }]
  });
}
