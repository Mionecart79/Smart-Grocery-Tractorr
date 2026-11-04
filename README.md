# 🛒 Smart Grocery & Budget Safety Tracker Widihh

Aplikasi web mobile PWA (**Progressive Web App**) bergaya native app yang dirancang khusus untuk seorang **siswa/mahasiswa rantau** yang belanja bulanan sambil mendorong troli di supermarket tanpa rasa was-was boncos di kasir.

---

## ✨ Fitur Utama & Kesesuaian Spesifikasi

### 📱 1. Standar Arsitektur & Ergonomi Mobile
- **Format Layar**: Didesain khusus tampilan smartphone (Mobile UI) dengan lebar maksimal **430px** (rasio 9:16 / centered di browser desktop dengan frame elegan).
- **Navigasi Melayang (Floating Bottom Navigation Bar)**: Menu navigasi di bagian bawah dengan ikon Lucide untuk tab menu utama (**Belanja/Store**, **Keranjang/List**, **Riwayat/History**).
- **Ergonomi Ramah Jempol (Thumb-Friendly)**: Area sentuh minimal 48px, input angka besar, kontrol stepper `- [qty] +` yang mudah dijangkau satu tangan sambil memegang troli.
- **Dukungan PWA Penuh**: Dilengkapi `manifest.json`, Service Worker `sw.js` (offline caching untuk lantai basement supermarket), meta tag viewport cover, Apple touch icon, dan status bar theme color.

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

---

## 🚀 Cara Menjalankan & Memasang di HP (PWA)

### Di Laptop / Komputer:
1. Buka file `index.html` langsung di browser favorit Anda (Google Chrome, Edge, Safari, atau Firefox).
2. Tampilan akan otomatis terpusat di tengah layar (*centered*) dalam rasio smartphone 430px.

### Di Smartphone (Android / iPhone):
1. Buka URL atau hosting aplikasi di Chrome (Android) atau Safari (iOS).
2. Tekan menu browser lalu pilih **"Add to Home Screen"** / **"Tambahkan ke Layar Utama"**.
3. Aplikasi akan terpasang sebagai **Aplikasi Native Standalone** tanpa address bar browser!
