/**
 * SMART GROCERY & BUDGET SAFETY TRACKER WIDIHH
 * Mobile PWA Logic & State Management
 * 
 * Specifically crafted for an Indonesian student (anak rantau) 
 * doing monthly grocery shopping while pushing a supermarket trolley.
 */

// =============================================================================
// 1. DATABASE SUPERMARKET SESUAI DAERAH & KATALOG PRODUK
// =============================================================================

const SUPERMARKET_REGIONS = {
  "Jakarta Barat": [
    { id: "lotte-puri", name: "Lotte Mart Grocery - Puri indah", tag: "Supermarket Grosir" },
    { id: "hypermart-puri", name: "Hypermart - Puri Indah Mall", tag: "Hypermarket" },
    { id: "superindo-meruya", name: "Superindo - Meruya Ilir", tag: "Supermarket Hemat" }
  ],
  "Tangerang & Gading Serpong": [
    { id: "grand-lucky-sms", name: "Grand lucky - Mall Sms", tag: "Supermarket Premium & Import" },
    { id: "farmer-market-sms", name: "Farmer Market - Summarecon Serpong", tag: "Fresh Market" }
  ],
  "BSD City": [
    { id: "aeon-bsd", name: "Supermarket Mall AEON", tag: "Japanese & Fresh Grocery" },
    { id: "hero-breeze", name: "Hero Supermarket - The Breeze BSD", tag: "Supermarket" }
  ],
  "Sekitar Kampus": [
    { id: "kantin-mb2", name: "Kantin Mb2", tag: "Kantin & Koperasi Kampus Hemat" },
    { id: "indomaret-kampus", name: "Indomaret Point Kampus", tag: "Minimarket 24 Jam" },
    { id: "alfamidi-grogol", name: "Alfamidi Super Grogol", tag: "Supermarket Mahasiswa" }
  ]
};

// Katalog Barang Relatable Anak Rantau (Sembako, Mie, Susu, Sabun, Camilan)
// Diskon & Tren Harga (up ⬆, down ⬇︎, equal =)
const BASE_CATALOG = [
  {
    id: "beras-5kg",
    name: "Beras Rojolele / Ramos 5 Kg",
    category: "sembako",
    price: 74000,
    discount: 0.10, // 10%
    trend: "up", // ⬆ naik dibanding bulan lalu
    photo: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80",
    unit: "5 Kg"
  },
  {
    id: "telur-1kg",
    name: "Telur Ayam Negeri Fresh 1 Kg",
    category: "sembako",
    price: 31000,
    discount: 0,
    trend: "down", // ⬇︎ turun
    photo: "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=300&auto=format&fit=crop&q=80",
    unit: "1 Kg / ~16 butir"
  },
  {
    id: "minyak-2l",
    name: "Minyak Goreng Sania / Bimoli 2L",
    category: "sembako",
    price: 38500,
    discount: 0.15, // 15%
    trend: "up", // ⬆
    photo: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80",
    unit: "Pouch 2 Liter"
  },
  {
    id: "indomie-goreng-box",
    name: "Indomie Goreng Spesial (Dus isi 40)",
    category: "instan",
    price: 118000,
    discount: 0.08, // 8%
    trend: "equal", // = stabil
    photo: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&auto=format&fit=crop&q=80",
    unit: "1 Dus (40 bks)"
  },
  {
    id: "indomie-ayam-bawang-pack",
    name: "Indomie Ayam Bawang (Isi 5 pcs)",
    category: "instan",
    price: 15500,
    discount: 0,
    trend: "equal", // =
    photo: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&auto=format&fit=crop&q=80",
    unit: "Multipack 5 pcs"
  },
  {
    id: "susu-uht-1l",
    name: "Ultra Milk UHT Full Cream 1000ml",
    category: "minuman",
    price: 21500,
    discount: 0.12, // 12%
    trend: "down", // ⬇︎
    photo: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80",
    unit: "Tetra Pak 1L"
  },
  {
    id: "air-galon-aqua",
    name: "Air Mineral Aqua Galon 19 Liter",
    category: "minuman",
    price: 22000,
    discount: 0,
    trend: "equal", // =
    photo: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=300&auto=format&fit=crop&q=80",
    unit: "Isi Ulang 19L"
  },
  {
    id: "kopi-goodday-box",
    name: "Good Day Cappuccino (Renceng isi 10)",
    category: "minuman",
    price: 18500,
    discount: 0.10, // 10%
    trend: "up", // ⬆
    photo: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80",
    unit: "Renceng 10 Sachet"
  },
  {
    id: "kornet-cip-340g",
    name: "Kornet Sapi Pronas / CIP 340g",
    category: "instan",
    price: 29500,
    discount: 0.20, // 20%
    trend: "down", // ⬇︎
    photo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80",
    unit: "Kaleng 340g"
  },
  {
    id: "sarden-abc-425g",
    name: "Sarden ABC Saus Tomat / Ekstra Pedas 425g",
    category: "instan",
    price: 24500,
    discount: 0,
    trend: "up", // ⬆
    photo: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=300&auto=format&fit=crop&q=80",
    unit: "Kaleng Besar"
  },
  {
    id: "deterjen-rinso-18kg",
    name: "Deterjen Rinso Molto Bubuk 1.8 Kg",
    category: "toiletries",
    price: 43500,
    discount: 0.15, // 15%
    trend: "down", // ⬇︎
    photo: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&auto=format&fit=crop&q=80",
    unit: "Bag 1.8 Kg"
  },
  {
    id: "sabun-lifebuoy-refill",
    name: "Lifebuoy Body Wash Refill 825ml",
    category: "toiletries",
    price: 36000,
    discount: 0.25, // 25% promo
    trend: "down", // ⬇︎
    photo: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&auto=format&fit=crop&q=80",
    unit: "Pouch 825ml"
  },
  {
    id: "shampoo-pantene-290ml",
    name: "Pantene Anti Dandruff Shampoo 290ml",
    category: "toiletries",
    price: 39000,
    discount: 0.10,
    trend: "up", // ⬆
    photo: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&auto=format&fit=crop&q=80",
    unit: "Botol 290ml"
  },
  {
    id: "pepsodent-jumbo-225g",
    name: "Pasta Gigi Pepsodent Jumbo 225g",
    category: "toiletries",
    price: 16500,
    discount: 0,
    trend: "equal", // =
    photo: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=300&auto=format&fit=crop&q=80",
    unit: "Tube 225g"
  },
  {
    id: "tisu-paseo-250",
    name: "Tisu Wajah Paseo Smart 250 Sheets",
    category: "toiletries",
    price: 14500,
    discount: 0.10,
    trend: "equal", // =
    photo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80",
    unit: "Pack 250s"
  },
  {
    id: "chitato-sapi-panggang",
    name: "Keripik Chitato Sapi Panggang 68g",
    category: "camilan",
    price: 11500,
    discount: 0,
    trend: "up", // ⬆
    photo: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80",
    unit: "Pack 68g"
  },
  {
    id: "biskuit-roma-kelapa",
    name: "Biskuit Roma Kelapa 300g",
    category: "camilan",
    price: 11000,
    discount: 0.15,
    trend: "down", // ⬇︎
    photo: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&auto=format&fit=crop&q=80",
    unit: "Pack 300g"
  },
  {
    id: "nugget-kanzler-crispy",
    name: "Kanzler Crispy Chicken Nugget 450g",
    category: "sembako",
    price: 49500,
    discount: 0.15, // 15%
    trend: "up", // ⬆
    photo: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&auto=format&fit=crop&q=80",
    unit: "Pack 450g"
  }
];

// =============================================================================
// 2. STATE MANAGEMENT APLIKASI
// =============================================================================

const APP_STATE = {
  currentScreen: 'setup', // 'setup' | 'main'
  currentTab: 'store',     // 'store' | 'list' | 'history'
  selectedRegion: '',
  selectedSupermarket: null,
  budget: 0,               // Nominal budget awal (terkunci saat shopping)
  cart: [],                // Array item yang sedang di trolley
  history: [],             // Array sesi belanja yang sudah di-checkout
  storeCatalog: [],        // Katalog toko aktif yang sudah di-fetch
  activeCategory: 'all',
  searchQuery: ''
};

// =============================================================================
// 3. AUDIO & HAPTIC SYNTHESIZER (Tanpa File Eksternal)
// =============================================================================

class AudioHapticFeedback {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  playTone(freq, type, duration, delay = 0) {
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + delay);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(this.audioCtx.currentTime + delay);
      osc.stop(this.audioCtx.currentTime + delay + duration);
    } catch (e) {
      console.warn('Audio tone play issue:', e);
    }
  }

  // Nada saat klik/tap
  tap() {
    this.playTone(600, 'sine', 0.04);
    this.vibrate(10);
  }

  // Nada saat item masuk troli (chime ceria)
  itemAdded() {
    this.playTone(523.25, 'sine', 0.08, 0);      // C5
    this.playTone(659.25, 'sine', 0.12, 0.08);   // E5
    this.playTone(783.99, 'triangle', 0.15, 0.16); // G5
    this.vibrate([20, 30, 20]);
  }

  // Peringatan budget tipis
  budgetWarning() {
    this.playTone(440, 'triangle', 0.15, 0);
    this.playTone(370, 'triangle', 0.25, 0.15);
    this.vibrate([40, 50, 40]);
  }

  // Alert budget habis / ditolak
  budgetExhausted() {
    this.playTone(220, 'sawtooth', 0.2, 0);
    this.playTone(180, 'sawtooth', 0.3, 0.15);
    this.vibrate([70, 40, 70]);
  }

  // Nada checkout sukses
  checkoutSuccess() {
    this.playTone(523.25, 'triangle', 0.1, 0);
    this.playTone(659.25, 'triangle', 0.1, 0.09);
    this.playTone(783.99, 'triangle', 0.12, 0.18);
    this.playTone(1046.50, 'sine', 0.35, 0.28);
    this.vibrate([40, 40, 80]);
  }

  vibrate(pattern) {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }
}

const feedback = new AudioHapticFeedback();

// =============================================================================
// 4. FORMATTERS & COLOR MATH
// =============================================================================

function formatRupiah(num) {
  if (isNaN(num)) return "Rp 0";
  return "Rp " + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseRupiahInput(val) {
  if (!val) return 0;
  const cleaned = val.toString().replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

/**
 * Dynamic Font Color Interpolation:
 * Dimulai dari coklat #622B14 (RGB: 98, 43, 20)
 * fading transisi menjadi merah #DC2626 (RGB: 220, 38, 38) saat mendekati budget
 * dan menjadi full merah saat budget sudah habis (ratio >= 1)
 */
function interpolateBrownToRed(ratio) {
  const clamped = Math.max(0, Math.min(1, ratio));
  
  // Start: #622B14 (98, 43, 20)
  const r1 = 98,  g1 = 43,  b1 = 20;
  // End:   #DC2626 (220, 38, 38)
  const r2 = 220, g2 = 38,  b2 = 38;

  const r = Math.round(r1 + (r2 - r1) * clamped);
  const g = Math.round(g1 + (g2 - g1) * clamped);
  const b = Math.round(b1 + (b2 - b1) * clamped);

  return `rgb(${r}, ${g}, ${b})`;
}

// =============================================================================
// 5. SETUP SCREEN LOGIC (Daerah, Supermarket, Budget Lock)
// =============================================================================

function handleRegionChange() {
  const regionSelect = document.getElementById('regionSelect');
  const supermarketSelect = document.getElementById('supermarketSelect');
  const supermarketHelper = document.getElementById('supermarketHelper');
  
  const region = regionSelect.value;
  APP_STATE.selectedRegion = region;

  supermarketSelect.innerHTML = '<option value="" disabled selected>Pilih Supermarket...</option>';

  if (region && SUPERMARKET_REGIONS[region]) {
    supermarketSelect.disabled = false;
    SUPERMARKET_REGIONS[region].forEach(sm => {
      const opt = document.createElement('option');
      opt.value = sm.id;
      opt.textContent = `${sm.name} (${sm.tag})`;
      supermarketSelect.appendChild(opt);
    });
    supermarketHelper.textContent = `${SUPERMARKET_REGIONS[region].length} supermarket ditemukan di ${region}.`;
    supermarketHelper.style.color = 'var(--green-brand)';
  } else {
    supermarketSelect.disabled = true;
    supermarketHelper.textContent = 'Pilih daerah di atas terlebih dahulu.';
    supermarketHelper.style.color = 'var(--text-muted)';
  }
}

function handleBudgetFormat(input) {
  const raw = parseRupiahInput(input.value);
  if (raw === 0) {
    input.value = '';
  } else {
    input.value = raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

function setPresetBudget(amount) {
  const input = document.getElementById('budgetInput');
  input.value = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  feedback.tap();
}

/**
 * Handle Confirm Setup:
 * Mengambil database harga & promo supermarket yang dipilih dengan loading modal estetik
 */
function handleConfirmSetup() {
  const region = document.getElementById('regionSelect').value;
  const supermarketId = document.getElementById('supermarketSelect').value;
  const budgetVal = parseRupiahInput(document.getElementById('budgetInput').value);

  if (!region) {
    showToast('Pilih wilayah/daerah supermarket terlebih dahulu!', 'warning');
    return;
  }
  if (!supermarketId) {
    showToast('Pilih supermarket tempat kamu belanja!', 'warning');
    return;
  }
  if (!budgetVal || budgetVal < 10000) {
    showToast('Masukkan budget belanja bulanan minimal Rp 10.000!', 'warning');
    return;
  }

  // Find supermarket details
  const smList = SUPERMARKET_REGIONS[region] || [];
  const selectedSm = smList.find(s => s.id === supermarketId);

  APP_STATE.selectedSupermarket = selectedSm || { id: supermarketId, name: "Supermarket Terpilih" };
  APP_STATE.budget = budgetVal;

  // Tampilkan loading modal simulator "Mengambil informasi dari database"
  const loadingModal = document.getElementById('loadingModal');
  const loadingTitle = document.getElementById('loadingTitle');
  const loadingSubtitle = document.getElementById('loadingSubtitle');
  const progressFill = document.getElementById('loadingProgressFill');

  loadingTitle.textContent = `Menghubungkan ke ${APP_STATE.selectedSupermarket.name}...`;
  loadingSubtitle.textContent = `Mengunduh katalog harga, diskon, dan tren inflasi terbaru...`;
  loadingModal.classList.add('active');
  progressFill.style.width = '20%';

  setTimeout(() => { progressFill.style.width = '65%'; }, 350);
  setTimeout(() => { progressFill.style.width = '100%'; }, 750);

  setTimeout(() => {
    // Generate supermarket-specific catalog with custom pricing modifier
    loadStoreDatabase(APP_STATE.selectedSupermarket.id);

    loadingModal.classList.remove('active');
    enterMainAppScreen();
  }, 950);
}

/**
 * Load Database & Calculate Harga2 = Harga - (Diskon * Harga)
 */
function loadStoreDatabase(supermarketId) {
  // Biarkan harga sedikit unik berdasarkan supermarket
  let priceMultiplier = 1.0;
  if (supermarketId === 'grand-lucky-sms') priceMultiplier = 1.05;
  if (supermarketId === 'kantin-mb2') priceMultiplier = 0.92;
  if (supermarketId === 'lotte-puri') priceMultiplier = 0.98;

  APP_STATE.storeCatalog = BASE_CATALOG.map(item => {
    const rawPrice = Math.round((item.price * priceMultiplier) / 500) * 500;
    const discount = item.discount;
    
    // Rumus sesuai prompt: Harga2 = Harga - (Diskon * Harga)
    const hasDiscount = discount > 0;
    const harga2 = hasDiscount ? Math.round(rawPrice - (discount * rawPrice)) : null;

    return {
      ...item,
      harga: rawPrice,
      hasDiscount: hasDiscount,
      harga2: harga2,
      effectivePrice: hasDiscount ? harga2 : rawPrice
    };
  });
}

function enterMainAppScreen() {
  document.getElementById('setupScreen').classList.remove('active-screen');
  document.getElementById('mainAppScreen').classList.add('active-screen');
  APP_STATE.currentScreen = 'main';

  // Update header info
  document.getElementById('currentSupermarketName').textContent = APP_STATE.selectedSupermarket.name;
  
  // Render views
  renderStoreCatalog();
  updateCartAndBudgetDisplays();
  switchTab('store');

  showToast(`Selamat belanja di ${APP_STATE.selectedSupermarket.name}! Budget terkunci.`, 'success');
  feedback.itemAdded();
}

// =============================================================================
// 6. MAIN APP NAVIGATION (Top Tab Chips & Bottom Floating Bar)
// =============================================================================

function switchTab(tabName) {
  APP_STATE.currentTab = tabName;
  feedback.tap();

  // Update Top Tab Chips
  ['chipStore', 'chipList', 'chipHistory'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  if (tabName === 'store') document.getElementById('chipStore')?.classList.add('active');
  if (tabName === 'list') document.getElementById('chipList')?.classList.add('active');
  if (tabName === 'history') document.getElementById('chipHistory')?.classList.add('active');

  // Update Bottom Nav Items
  ['navStore', 'navList', 'navHistory'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  if (tabName === 'store') document.getElementById('navStore')?.classList.add('active');
  if (tabName === 'list') document.getElementById('navList')?.classList.add('active');
  if (tabName === 'history') document.getElementById('navHistory')?.classList.add('active');

  // Switch Tab View Content
  ['tabContentStore', 'tabContentList', 'tabContentHistory'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active-view');
  });

  const contentArea = document.getElementById('contentArea');
  const listBottomBar = document.getElementById('listBottomBar');

  if (tabName === 'store') {
    document.getElementById('tabContentStore')?.classList.add('active-view');
    listBottomBar?.classList.remove('visible');
    contentArea?.classList.remove('with-list-bar');
  } else if (tabName === 'list') {
    document.getElementById('tabContentList')?.classList.add('active-view');
    renderCartList();
    listBottomBar?.classList.add('visible');
    contentArea?.classList.add('with-list-bar');
  } else if (tabName === 'history') {
    document.getElementById('tabContentHistory')?.classList.add('active-view');
    renderHistoryView();
    listBottomBar?.classList.remove('visible');
    contentArea?.classList.remove('with-list-bar');
  }

  // Refresh lucide icons on render
  if (window.lucide) {
    lucide.createIcons();
  }
}

// =============================================================================
// 7. TAB 1: STORE (Katalog Barang, Harga, Diskon, Harga2, Emote)
// =============================================================================

function handleSearch(query) {
  APP_STATE.searchQuery = query.toLowerCase().trim();
  renderStoreCatalog();
}

function filterCategory(cat, btn) {
  APP_STATE.activeCategory = cat;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  feedback.tap();
  renderStoreCatalog();
}

function renderStoreCatalog() {
  const container = document.getElementById('productTiles');
  if (!container) return;

  const filtered = APP_STATE.storeCatalog.filter(item => {
    const matchesCat = APP_STATE.activeCategory === 'all' || item.category === APP_STATE.activeCategory;
    const matchesSearch = !APP_STATE.searchQuery || item.name.toLowerCase().includes(APP_STATE.searchQuery);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Barang Tidak Ditemukan</h3>
        <p>Coba kata kunci lain atau pilih kategori Semua.</p>
      </div>
    `;
    return;
  }

  // Generate tiles matching prompt specifications
  container.innerHTML = filtered.map(item => {
    // Emote format:
    // a) ⬆ (berwarna merah): harga produk meningkat dibanding bulan lalu
    // b) ⬇︎ (berwarna hijau): harga produk menurun dibanding bulan lalu
    // c) = (warna kuning): harga produk masih sama dengan bulan lalu
    let emoteHtml = '';
    if (item.trend === 'up') {
      emoteHtml = `<span class="product-emote up" title="Harga naik dibanding bulan lalu">⬆</span>`;
    } else if (item.trend === 'down') {
      emoteHtml = `<span class="product-emote down" title="Harga turun dibanding bulan lalu">⬇︎</span>`;
    } else {
      emoteHtml = `<span class="product-emote equal" title="Harga sama dengan bulan lalu">=</span>`;
    }

    // Pricing format:
    // Bila ada harga2 maka harga akan dicoret dan warna tulisan berubah menjadi abu-abu
    // Harga2 = Harga - (Diskon * Harga)
    let priceHtml = '';
    if (item.hasDiscount) {
      const discountPercent = Math.round(item.discount * 100);
      priceHtml = `
        <div class="price-line">
          <span class="original-price has-discount">${formatRupiah(item.harga)}</span>
          <span class="discount-tag">-${discountPercent}%</span>
          <span class="final-price-2">${formatRupiah(item.harga2)}</span>
        </div>
      `;
    } else {
      priceHtml = `
        <div class="price-line">
          <span class="original-price">${formatRupiah(item.harga)}</span>
        </div>
      `;
    }

    return `
      <article class="product-tile" data-item-id="${item.id}">
        <div class="product-photo-wrap">
          <img src="${item.photo}" alt="${item.name}" class="product-photo" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&auto=format&fit=crop&q=80'">
          ${item.hasDiscount ? `<span class="discount-badge-photo">PROMO</span>` : ''}
        </div>
        <div class="product-body">
          <div class="product-title-row">
            <h4 class="product-name">${item.name}</h4>
            ${emoteHtml}
          </div>
          ${priceHtml}
          <button type="button" class="btn-add-to-list" onclick="addItemToCart('${item.id}')">
            <i data-lucide="plus"></i>
            <span>Add to list</span>
          </button>
        </div>
      </article>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Add Item to List:
 * Perubahan secara live ke budget saat berada di tab "store"
 * Safety check: Bila budget habis maka tidak akan ada barang lagi yang bisa ditambahkan
 */
function addItemToCart(itemId) {
  const item = APP_STATE.storeCatalog.find(i => i.id === itemId);
  if (!item) return;

  const currentTotal = getCartTotal();
  const addedCost = item.effectivePrice;
  const newTotal = currentTotal + addedCost;

  // Periksa apakah budget habis
  if (newTotal > APP_STATE.budget) {
    feedback.budgetExhausted();
    showToast(`⚠️ Budget tidak cukup! Sisa: ${formatRupiah(APP_STATE.budget - currentTotal)}, butuh: ${formatRupiah(addedCost)}. Kurangi barang di List!`, 'danger');
    highlightBudgetDanger();
    return;
  }

  // Tambahkan item ke keranjang
  const existing = APP_STATE.cart.find(c => c.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    APP_STATE.cart.push({
      id: item.id,
      name: item.name,
      effectivePrice: item.effectivePrice,
      originalPrice: item.harga,
      discount: item.discount,
      unit: item.unit,
      quantity: 1
    });
  }

  // Update live budget di tab Store & header
  updateCartAndBudgetDisplays();
  feedback.itemAdded();
  showToast(`+1 ${item.name} masuk ke List`, 'success');
}

// =============================================================================
// 8. TAB 2: LIST (Keranjang Belanja Format Spesifik & Dynamic Font Color)
// Format Item List:
// X --------------------
// || Nama barang
// | | 
// | | Hargatotal quantity -[]+
// ---------------------
// =============================================================================

function renderCartList() {
  const container = document.getElementById('cartItemsList');
  const emptyState = document.getElementById('emptyCartState');
  const itemsCountText = document.getElementById('listItemsCount');

  if (!container) return;

  const totalItemsCount = APP_STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  itemsCountText.textContent = `${totalItemsCount} barang di dalam troli`;

  if (APP_STATE.cart.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'flex';
    updateCartAndBudgetDisplays();
    return;
  }

  emptyState.style.display = 'none';

  container.innerHTML = APP_STATE.cart.map((cartItem, index) => {
    const itemTotal = cartItem.effectivePrice * cartItem.quantity;

    return `
      <div class="cart-card-spec" data-cart-index="${index}">
        <!-- Top X button and dashed divider -->
        <div class="cart-card-top-row">
          <button type="button" class="btn-delete-x" onclick="removeItemFromCart(${index})" title="Hapus dari troli">
            ✕
          </button>
          <div class="card-spec-divider"></div>
        </div>

        <!-- Body with vertical bar and product details -->
        <div class="cart-card-body">
          <div class="cart-card-vertical-bar"></div>
          <div class="cart-card-content">
            <span class="cart-item-name">${cartItem.name}</span>
            <span class="cart-item-unit-note">@ ${formatRupiah(cartItem.effectivePrice)} ${cartItem.unit ? `(${cartItem.unit})` : ''}</span>
          </div>
        </div>

        <!-- Bottom row: Hargatotal & -[]+ stepper -->
        <div class="cart-card-bottom-row">
          <span class="cart-item-hargatotal">${formatRupiah(itemTotal)}</span>
          
          <!-- Stepper: - [qty] + -->
          <div class="qty-stepper-box">
            <button type="button" class="btn-qty-step" onclick="changeItemQty(${index}, -1)" title="Kurangi">−</button>
            <input 
              type="text" 
              class="qty-input-box" 
              value="${cartItem.quantity}" 
              inputmode="numeric" 
              pattern="[0-9]*"
              onchange="handleManualQtyChange(${index}, this.value)"
              onfocus="this.select()"
            >
            <button type="button" class="btn-qty-step" onclick="changeItemQty(${index}, +1)" title="Tambah">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  updateCartAndBudgetDisplays();

  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Handle +/- Quantity Stepper
 */
function changeItemQty(index, delta) {
  const item = APP_STATE.cart[index];
  if (!item) return;

  if (delta > 0) {
    const currentTotal = getCartTotal();
    const addedCost = item.effectivePrice;
    if (currentTotal + addedCost > APP_STATE.budget) {
      feedback.budgetExhausted();
      showToast(`⚠️ Budget tidak mencukupi untuk menambah ${item.name}!`, 'danger');
      highlightBudgetDanger();
      return;
    }
    item.quantity += 1;
    feedback.tap();
  } else if (delta < 0) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      feedback.tap();
    } else {
      // Hapus jika turun ke 0
      removeItemFromCart(index);
      return;
    }
  }

  renderCartList();
}

/**
 * Handle Typing Quantity Directly in the [] Input Box
 */
function handleManualQtyChange(index, newQtyStr) {
  const item = APP_STATE.cart[index];
  if (!item) return;

  const parsed = parseInt(newQtyStr, 10);
  if (isNaN(parsed) || parsed <= 0) {
    renderCartList();
    return;
  }

  const currentTotal = getCartTotal();
  const diffQty = parsed - item.quantity;
  const diffCost = diffQty * item.effectivePrice;

  if (currentTotal + diffCost > APP_STATE.budget) {
    feedback.budgetExhausted();
    showToast(`⚠️ Budget tidak cukup untuk ${parsed} pcs! Dibatalkan.`, 'danger');
    renderCartList();
    return;
  }

  item.quantity = parsed;
  feedback.tap();
  renderCartList();
}

/**
 * Remove Item by pressing X
 */
function removeItemFromCart(index) {
  const item = APP_STATE.cart[index];
  if (!item) return;

  APP_STATE.cart.splice(index, 1);
  feedback.tap();
  showToast(`Uang ${formatRupiah(item.effectivePrice * item.quantity)} kembali ke sisa budget.`, 'warning');
  renderCartList();
}

function clearCartPrompt() {
  if (APP_STATE.cart.length === 0) return;
  if (confirm('Kosongkan semua barang belanjaan di dalam troli?')) {
    APP_STATE.cart = [];
    renderCartList();
    showToast('Troli dikosongkan.', 'warning');
  }
}

// =============================================================================
// 9. DYNAMIC BUDGET CALCULATOR & COLOR TRANSITION MATH
// =============================================================================

function getCartTotal() {
  return APP_STATE.cart.reduce((sum, item) => sum + (item.effectivePrice * item.quantity), 0);
}

function updateCartAndBudgetDisplays() {
  const total = getCartTotal();
  const budget = APP_STATE.budget || 1;
  const remaining = Math.max(0, budget - total);
  const ratio = Math.min(1.0, total / budget);
  const count = APP_STATE.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update Header Elements
  const headerRemaining = document.getElementById('headerBudgetRemaining');
  const headerCartCount = document.getElementById('headerCartCount');
  const bottomCartBadge = document.getElementById('bottomCartBadge');
  const ribbonSpent = document.getElementById('ribbonSpentAmount');

  if (headerRemaining) headerRemaining.textContent = formatRupiah(remaining);
  if (ribbonSpent) ribbonSpent.textContent = formatRupiah(total);

  if (headerCartCount) headerCartCount.textContent = count;
  if (bottomCartBadge) {
    bottomCartBadge.textContent = count;
    bottomCartBadge.style.display = count > 0 ? 'inline-block' : 'none';
  }

  // Update List Bottom Bar Elements
  const cartTotalPriceEl = document.getElementById('cartTotalPrice');
  const budgetRemainingNoteEl = document.getElementById('budgetRemainingNote');
  const btnCheckout = document.getElementById('btnCheckout');

  if (cartTotalPriceEl) {
    cartTotalPriceEl.textContent = formatRupiah(total);
    // DYNAMIC FONT COLOR TRANSITION:
    // "semakin dekat harga total dengan budget yang disetting di awal maka warna font yang awalnya coklat(622B14)
    //  fading transisi menjadi merah sebelum menjadi full merah saat budget sudah habis."
    const interpolatedColor = interpolateBrownToRed(ratio);
    cartTotalPriceEl.style.color = interpolatedColor;
  }

  if (budgetRemainingNoteEl) {
    if (remaining === 0 && total > 0) {
      budgetRemainingNoteEl.textContent = "⚠️ BUDGET HABIS! Maksimal tercapai";
      budgetRemainingNoteEl.style.color = "var(--danger-red)";
    } else {
      budgetRemainingNoteEl.textContent = `Sisa budget: ${formatRupiah(remaining)}`;
      budgetRemainingNoteEl.style.color = "var(--text-muted)";
    }
  }

  if (btnCheckout) {
    btnCheckout.disabled = APP_STATE.cart.length === 0;
  }

  // Safety Banner & Progress Bar
  const safetyBanner = document.getElementById('safetyBanner');
  const safetyIcon = document.getElementById('safetyIcon');
  const safetyText = document.getElementById('safetyText');
  const progressBar = document.getElementById('budgetProgressBar');

  if (progressBar) {
    progressBar.style.width = `${Math.min(100, Math.round(ratio * 100))}%`;
    if (ratio >= 0.95) {
      progressBar.style.backgroundColor = 'var(--danger-red)';
    } else if (ratio >= 0.75) {
      progressBar.style.backgroundColor = 'var(--warning-amber)';
    } else {
      progressBar.style.backgroundColor = 'var(--green-brand)';
    }
  }

  if (safetyBanner && safetyText) {
    if (ratio >= 1.0) {
      safetyBanner.classList.add('danger');
      safetyIcon.textContent = '🛑';
      safetyText.textContent = `Budget Rp ${formatRupiah(budget)} telah habis! Hapus barang jika ingin menukar.`;
    } else if (ratio >= 0.8) {
      safetyBanner.classList.add('danger');
      safetyIcon.textContent = '⚠️';
      const sisaPercent = Math.round((1 - ratio) * 100);
      safetyText.textContent = `Sisa budget tinggal ${sisaPercent}% (${formatRupiah(remaining)}). Waspada troli!`;
    } else {
      safetyBanner.classList.remove('danger');
      safetyIcon.textContent = '✅';
      safetyText.textContent = `Budget aman! Sisa: ${formatRupiah(remaining)} dari ${formatRupiah(budget)}.`;
    }
  }
}

function highlightBudgetDanger() {
  const el = document.getElementById('cartTotalPrice');
  if (el) {
    el.style.transform = 'scale(1.1)';
    setTimeout(() => { el.style.transform = 'scale(1.0)'; }, 200);
  }
}

// =============================================================================
// 10. CHECKOUT & LOCK LIST
// =============================================================================

function handleCheckout() {
  if (APP_STATE.cart.length === 0) {
    showToast('Troli masih kosong!', 'warning');
    return;
  }

  const total = getCartTotal();

  // Create immutable receipt snapshot
  const now = new Date();
  const receiptSession = {
    id: 'chk_' + Date.now(),
    date: now.toISOString(),
    displayDate: formatReceiptDate(now),
    supermarketName: APP_STATE.selectedSupermarket.name,
    budgetInitial: APP_STATE.budget,
    totalSpent: total,
    items: JSON.parse(JSON.stringify(APP_STATE.cart)) // Deep copy
  };

  // Push to history & persist in localStorage
  APP_STATE.history.unshift(receiptSession);
  saveHistoryToStorage();

  // Render receipt popup summary
  const summaryBox = document.getElementById('receiptSummaryBox');
  summaryBox.innerHTML = `
    <div class="receipt-summary-line">
      <span>Supermarket:</span>
      <strong>${receiptSession.supermarketName}</strong>
    </div>
    <div class="receipt-summary-line">
      <span>Waktu Belanja:</span>
      <span>${receiptSession.displayDate}</span>
    </div>
    <div class="receipt-summary-line">
      <span>Jumlah Barang:</span>
      <span>${receiptSession.items.reduce((s, i) => s + i.quantity, 0)} pcs</span>
    </div>
    <div class="receipt-summary-line total">
      <span>Total Terkunci:</span>
      <span style="color: var(--green-brand); font-size: 14px;">${formatRupiah(total)}</span>
    </div>
  `;

  // Kosongkan cart dan kunci list
  APP_STATE.cart = [];
  updateCartAndBudgetDisplays();

  // Show checkout modal
  feedback.checkoutSuccess();
  document.getElementById('checkoutSuccessModal').classList.add('active');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function finishCheckoutFlow() {
  closeModal('checkoutSuccessModal');
  switchTab('history');
}

// =============================================================================
// 11. TAB 3: HISTORY (Riwayat Belanja Format Spesifik)
// Format Tiles:
// Today/Yesterday/Tanggal - Harga
// --------------------
// Nama barang
// | |
// | | Hargatotal [] quantity
// ---------------------
// =============================================================================

function formatReceiptDate(dateObj) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(dateObj, today)) {
    return 'Today';
  } else if (isSameDay(dateObj, yesterday)) {
    return 'Yesterday';
  } else {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  }
}

function renderHistoryView() {
  const container = document.getElementById('historyContainer');
  const emptyState = document.getElementById('emptyHistoryState');
  if (!container) return;

  if (APP_STATE.history.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';

  // Format tiles matching specification:
  // Today/Yesterday/Tanggal - Harga
  // --------------------
  // Nama barang
  // | |
  // | | Hargatotal [] quantity
  // ---------------------
  container.innerHTML = APP_STATE.history.map(session => {
    const itemsHtml = session.items.map(item => {
      const itemTotal = item.effectivePrice * item.quantity;
      return `
        <div class="history-item-row">
          <span class="history-item-name">${item.name}</span>
          <div class="history-item-subrow">
            <span class="history-item-hargatotal">${formatRupiah(itemTotal)}</span>
            <span class="history-item-qty-tag">[${item.quantity}] quantity</span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="history-tile-card">
        <div class="history-header-line">
          <span>${session.displayDate} - ${formatRupiah(session.totalSpent)}</span>
          <span class="history-supermarket-tag">${session.supermarketName}</span>
        </div>
        <div class="history-items-list">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// LocalStorage helpers
function saveHistoryToStorage() {
  try {
    localStorage.setItem('widihh_grocery_history', JSON.stringify(APP_STATE.history));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
}

function loadHistoryFromStorage() {
  try {
    const stored = localStorage.getItem('widihh_grocery_history');
    if (stored) {
      APP_STATE.history = JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Storage read failed:', e);
  }
}

// =============================================================================
// 12. LOGOUT / RESET SESI
// =============================================================================

function confirmLogout() {
  feedback.tap();
  document.getElementById('logoutModal').classList.add('active');
  if (window.lucide) {
    lucide.createIcons();
  }
}

function executeLogout() {
  closeModal('logoutModal');
  feedback.tap();

  // Reset shopping cart and selection
  APP_STATE.cart = [];
  APP_STATE.budget = 0;
  APP_STATE.selectedSupermarket = null;
  APP_STATE.selectedRegion = '';
  
  // Return to Setup screen
  document.getElementById('mainAppScreen').classList.remove('active-screen');
  document.getElementById('setupScreen').classList.add('active-screen');
  APP_STATE.currentScreen = 'setup';

  // Reset inputs
  document.getElementById('budgetInput').value = '';
  document.getElementById('regionSelect').value = '';
  handleRegionChange();

  showToast('Sesi belanja direset. Silakan pilih supermarket baru.', 'warning');
}

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove('active');
}

// =============================================================================
// 13. TOAST NOTIFICATIONS
// =============================================================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'ℹ️';
  if (type === 'danger') icon = '🛑';
  if (type === 'warning') icon = '⚠️';
  if (type === 'success') icon = '✨';

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

// =============================================================================
// 14. APP INITIALIZATION & SERVICE WORKER
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Update simulated status bar clock
  function updateClock() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const timeEl = document.getElementById('statusTime');
    if (timeEl) timeEl.textContent = `${hrs}:${mins}`;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Load history from persistence
  loadHistoryFromStorage();

  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('SW registration note:', err);
      });
    });
  }

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
});

