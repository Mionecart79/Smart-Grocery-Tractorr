# 🛒 Smart Grocery & Budget Safety Tracker Widihh

<p align="center">
  <img src="icons/icon-192.png" width="96" height="96" alt="Widihh Grocery Logo" />
  <br>
  <strong>Aplikasi Web Mobile PWA Belanja Bulanan Anak Rantau Anti-Boncos di Supermarket</strong>
</p>

<p align="center">
  <a href="https://mionecart79.github.io/Smart-Grocery-Tractorr/">
    <img src="https://img.shields.io/badge/🌐_Buka_Web_Live-GitHub_Pages-2ea44f?style=for-the-badge&logo=github" alt="Live Demo" />
  </a>
  <a href="https://github.com/Mionecart79/Smart-Grocery-Tractorr/actions/workflows/deploy.yml">
    <img src="https://github.com/Mionecart79/Smart-Grocery-Tractorr/actions/workflows/deploy.yml/badge.svg" alt="PWA CI/CD" />
  </a>
</p>

---

## 🌐 Tautan Web Live Publik (Pengujian Guru / Penguji):

> ### 👉 **[https://mionecart79.github.io/Smart-Grocery-Tractorr/](https://mionecart79.github.io/Smart-Grocery-Tractorr/)**
>
> 💡 *Website aktif 24/7. Dapat langsung diuji melalui smartphone (tampilan native mobile UI) maupun browser laptop/PC.*

### 📱 Scan Barcode Langsung dari Layar HP:
<p align="center">
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://mionecart79.github.io/Smart-Grocery-Tractorr/" alt="QR Code Belanja" width="200" height="200" />
</p>

---

## ✨ Fitur Utama & Kesesuaian Rubrik

### 📱 1. Standar Arsitektur & Ergonomi Mobile
- **Format Layar**: Didesain khusus smartphone (Mobile UI) dengan lebar maksimal **430px** (rasio 9:16 / centered di browser desktop).
- **Floating Bottom Navigation Bar (4 Menu)**:
  - **Belanja (`Store`)**: Katalog supermarket dengan harga promo dan diskon.
  - **Rencana (`Plan`)**: Checklist kebutuhan belanja sebelum ke supermarket agar tidak impulsif.
  - **Keranjang (`List`)**: Troli belanja aktif dengan kontrol kuantitas dan kalkulasi subtotal.
  - **Riwayat (`History`)**: Catatan transaksi belanja tersimpan beserta struk resi.
- **Dukungan PWA**: Standalone Add to Home Screen, cache offline `sw.js`, dan manifest lengkap.

### 📝 2. Fitur Rencana Belanja (Anti-Impulsif)
- **Input Kebutuhan**: Nama makanan/barang, kategori (`Pokok`, `Kebersihan`, `Susu`, `Makanan & Minum`, `Bumbu Dapur`, `Camilan`, `Lainnya`), dan estimasi harga.
- **Checklist Interaktif**: Muncul sebagai checklist yang dapat dicentang atau dipilih massal (*Pilih Semua*).
- **Pindahkan ke Troli Sekali Klik**: Tombol *Pindahkan yang Dicentang ke Troli* memindahkan barang langsung ke troli belanja aktif dan halaman rencana otomatis kembali bersih/kosong.

### 🔝 3. Informasi Sesi Belanja di Bagian Atas
- **Selector Lokasi Toko**: Dropdown interaktif untuk memilih atau berpindah supermarket (Lotte Mart Grocery - Puri Indah, Grand Lucky - Mall SMS, AEON Mall, Kantin Mb2).
- **Date Picker**: Memilih tanggal transaksi sesi belanja secara fleksibel.

### ➕ 4. Form Input Produk Belanja ("Tambah Produk")
- **Input Fleksibel**: Nama produk, kategori, kemasan satuan (*karung/kg, pcs, kg, liter, pack, pouch, botol, kaleng, sachet, dus*).
- **Kuantitas & Harga**: Stepper `- [] +`, harga saat ini & pembanding harga bulan lalu.
- **Indikator Selisih Harga (Teks Merah)**: Perhitungan otomatis selisih harga (Rp) dan persentase kenaikan/penurunan harga dibanding bulan lalu.
- **Potongan Diskon Toko**: Input manual persentase atau tombol cepat (0%, 5%, 10%, 20%, 50%), menampilkan harga setelah diskon, total hemat, serta hemat per item jika kuantitas > 1.
- **Subtotal Real-time**: Kalkulasi otomatis tanpa perlu me-reload halaman.

### 🧾 5. Riwayat Belanja & Cetak Resi
- **Penyimpanan Multi-Toko**: Menyimpan lokasi toko, tanggal belanja, total pengeluaran, dan rincian produk ke LocalStorage dan Cloud Firestore.
- **Cetak Resi Belanja**: Format struk kasir (*thermal receipt*) yang siap dicetak langsung via tombol *Cetak Resi Belanja* (`window.print()`).

### ☁️ 6. Arsitektur Multi-Device Realtime (Cloud Firestore `onSnapshot`)
- **Realtime Listener**: Sinkronisasi instan antar HP di supermarket dan monitor PC di rumah tanpa refresh.
- **Offline Fallback**: Data keranjang tetap aman saat sinyal hilang di lantai bawah tanah (*basement*) supermarket.

### 🎨 2. Palet Warna & Transisi Dinamis
- **Warna Estetik**: Dominasi **hijau muda** (`#A7E9AF` / `#8EE4AF`) dan **kuning terang** (`#FFE66D` / `#FFF3B0`).
- **Border Khusus**: Border penutup berona putih krem `#F3E4C9`.
- **Transisi Warna Font Dinamis**: Di tab **List**, total harga memiliki warna font awal coklat (`#622B14`). Semakin mendekati batas budget yang ditentukan, warna mengalami **fading transisi mulus ke merah** (`#DC2626`) hingga full merah saat budget habis.

### 🏢 3. Alur Pemilihan Supermarket & Budget Terkunci
1. **Filter Berdasarkan Daerah**:
   - **Jakarta Barat** ➔ *Lotte Mart Grocery - Puri indah*, *Hypermart - Puri Indah Mall*, *Superindo - Meruya*.
   - **Tangerang & Gading Serpong** ➔ *Grand lucky - Mall Sms*, *Farmer Market - Summarecon Serpong*.
   - **BSD City** ➔ *Supermarket Mall AEON*, *Hero Supermarket - The Breeze BSD*.
   - **Sekitar Kampus / Kos** ➔ *Kantin Mb2*, *Indomaret Point Kampus*, *Alfamidi Super Grogol*.
2. **Budget Maksimal (Batas Belanja)**:
   - Input angka nominal besar dengan quick chip (*150rb, 300rb, 500rb, 1 Juta*).
   - **TERKUNCI**: Tidak dapat diubah setelah tombol Confirm ditekan dan masuk ke tab belanja.
3. **Tombol Confirm**:
   - Mensimulasikan pengambilan database harga dan promo diskon supermarket secara realtime dengan animasi loader estetik.

### 🛍️ 4. Tab Menu Utama
#### A. Header Utama
- Kiri: 3 Tab switcher (**Store**, **List**, **History**).
- Kanan: **Nominal live sisa budget** belanja.
- Tombol **Log out** di samping nominal budget untuk reset sesi jika ada kesalahan input.

#### B. Tab Store (Katalog Belanja)
- Tiles produk vertikal yang bisa di-scroll:
  - Foto produk
  - Nama barang
  - **Harga - Diskon - Harga2 - Emote**:
    - Rumus: `Harga2 = Harga - (Diskon * Harga)`.
    - Jika ada diskon: Harga asli dicoret & abu-abu, Harga2 muncul jelas.
    - Emote inflasi vs bulan lalu:
      - ⬆ (merah): harga produk naik dibanding bulan lalu
      - ⬇︎ (hijau): harga produk turun dibanding bulan lalu
      - = (kuning): harga stabil
  - Tombol **Add to list**.
  - **Perubahan Live ke Budget**: Tiap item yang ditambahkan langsung memotong budget secara realtime.
  - **Budget Safety Guard**: Jika budget tidak cukup, penambahan barang diblokir dengan getaran/audio peringatan.

#### C. Tab List (Keranjang Format Presisi)
Format tampilan per barang:
```text
X --------------------
|| Nama barang
| | 
| | Hargatotal quantity -[]+
---------------------
```
- `X`: Tombol hapus barang dari troli (mengembalikan dana ke budget).
- `[]`: Input kuantitas yang bisa diketik langsung maupun diatur via tombol `[-]` dan `[+]`.
- Bottom bar dengan border `#F3E4C9` dan font warna transisi Coklat `#622B14` ➔ Merah.
- Tombol **Checkout** di sebelah kanan total harga untuk mengunci list belanja.

#### D. Tab History (Riwayat Belanja Terkunci)
Format tiles riwayat:
```text
Today/Yesterday/Tanggal - Harga
--------------------
Nama barang
| |
| | Hargatotal [] quantity
---------------------
```
- Disimpan di `localStorage` peramban.

### ☁️ 5. Arsitektur Multi-Device Realtime (Cloud Firestore `onSnapshot`)
Aplikasi mendukung penggunaan bersamaan di **HP (di supermarket)** dan **PC (di rumah)** secara live tanpa perlu me-refresh halaman:
- **Realtime Listener `onSnapshot()`**: Menggunakan listener streaming realtime Cloud Firestore (`onSnapshot()`) sehingga saat pengguna menambah atau mengubah jumlah barang dari HP di lorong supermarket, tampilan di monitor PC langsung ter-update detik itu juga.
- **Mekanisme Fallback LocalStorage (Offline-First)**: Saat berada di lantai bawah tanah (*basement*) supermarket dengan sinyal lemah atau offline, data troli disimpan secara instan di LocalStorage. Menekan tombol **F5** atau me-reload halaman tidak akan menghilangkan belanjaan. Begitu sinyal internet pulih, perubahan otomatis tersinkronisasi ke Firestore.
- **Variabel Database yang Disinkronkan**:
  1. `storeLocation`: Wilayah dan nama supermarket yang dipilih (`region`, `supermarketId`, `supermarketName`).
  2. `shoppingDate`: Waktu sesi belanja dimulai (ISO Timestamp).
  3. `walletLimit`: Batas budget belanja awal yang terkunci.
  4. `items`: Daftar objek barang di troli (`id`, `name`, `effectivePrice`, `originalPrice`, `discount`, `unit`, `quantity`).
  5. `totalSpent`: Total pengeluaran aktual dari seluruh barang di troli.
  6. `remainingBudget`: Sisa budget belanja aktif (`walletLimit - totalSpent`).
  7. `status`: Status sesi (`'shopping'`, `'setup'`, atau `'checkout'`).
  8. `lastUpdatedBy`: Identitas perangkat pengubah terakhir (`'HP (Troli)'` atau `'PC (Desktop)'`).

---

## 🚀 Cara Menjalankan & Memasang di HP (PWA)

### Di Laptop / Komputer:
1. Buka file `index.html` langsung di browser favorit Anda, atau buka link live: [https://mionecart79.github.io/Smart-Grocery-Tractorr/](https://mionecart79.github.io/Smart-Grocery-Tractorr/).

### Di Smartphone (Android / iPhone):
1. Buka link web di peramban Chrome (Android) atau Safari (iOS).
2. Tekan menu browser lalu pilih **"Add to Home Screen"** / **"Tambahkan ke Layar Utama"**.
3. Aplikasi akan terpasang sebagai **Aplikasi Native Standalone** tanpa address bar browser!
