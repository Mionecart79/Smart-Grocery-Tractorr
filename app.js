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
  currentTab: 'store',     // 'store' | 'plan' | 'list' | 'history'
  selectedRegion: '',
  selectedSupermarket: null,
  budget: 0,               // Nominal budget awal (terkunci saat shopping)
  cart: [],                // Array item yang sedang di trolley
  history: [],             // Array sesi belanja yang sudah di-checkout
  plans: [],               // Array checklist rencana belanja
  storeCatalog: [],        // Katalog toko aktif yang sudah di-fetch
  activeCategory: 'all',
  searchQuery: '',
  sessionId: 'active_trolley_session',
  shoppingDate: null,
  isOnline: navigator.onLine,
  lastUpdatedBy: ''
};

// =============================================================================
// 2B. MULTI-DEVICE REALTIME SYNC & LOCALSTORAGE FALLBACK
// =============================================================================

function updateDeviceBadge() {
  const badge = document.getElementById('deviceBadge');
  if (badge) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    badge.textContent = isMobile ? '📱 HP Troli' : '💻 PC Desktop';
  }
}

function updateSyncStatusPill(isOnline, text) {
  const pill = document.getElementById('syncStatusPill');
  const dot = document.getElementById('syncDot');
  const label = document.getElementById('syncStatusText');

  if (pill && dot && label) {
    if (isOnline) {
      pill.classList.remove('offline');
      dot.classList.remove('offline');
      dot.classList.add('live');
      label.textContent = text || 'Cloud Sync (HP ⇄ PC)';
    } else {
      pill.classList.add('offline');
      dot.classList.add('offline');
      dot.classList.remove('live');
      label.textContent = text || 'Offline (LocalStorage)';
    }
  }
}

/**
 * Menyimpan data sesi aktif ke LocalStorage (Fallback Offline).
 * Menjamin saat F5 ditekan atau sinyal hilang di basement, troli tetap 100% aman.
 */
function saveActiveSessionToStorage() {
  try {
    const sessionPayload = {
      storeLocation: {
        region: APP_STATE.selectedRegion,
        supermarket: APP_STATE.selectedSupermarket,
        supermarketId: APP_STATE.selectedSupermarket ? APP_STATE.selectedSupermarket.id : '',
        supermarketName: APP_STATE.selectedSupermarket ? APP_STATE.selectedSupermarket.name : ''
      },
      shoppingDate: APP_STATE.shoppingDate || new Date().toISOString(),
      walletLimit: Number(APP_STATE.budget || 0),
      items: APP_STATE.cart,
      totalSpent: getCartTotal(),
      remainingBudget: Math.max(0, (APP_STATE.budget || 0) - getCartTotal()),
      status: APP_STATE.currentScreen === 'main' ? 'shopping' : 'setup',
      savedAt: Date.now()
    };
    localStorage.setItem('widihh_grocery_active_session', JSON.stringify(sessionPayload));
  } catch (e) {
    console.warn('[LocalStorage] Gagal menyimpan sesi troli:', e);
  }
}

/**
 * Membaca data sesi aktif dari LocalStorage saat app pertama dibuka / reload F5.
 */
function loadActiveSessionFromStorage() {
  try {
    const stored = localStorage.getItem('widihh_grocery_active_session');
    if (!stored) return false;
    const data = JSON.parse(stored);
    if (data && data.status === 'shopping' && data.storeLocation && data.storeLocation.supermarket) {
      APP_STATE.selectedRegion = data.storeLocation.region || '';
      APP_STATE.selectedSupermarket = data.storeLocation.supermarket;
      APP_STATE.budget = Number(data.walletLimit || 0);
      APP_STATE.cart = Array.isArray(data.items) ? data.items : [];
      APP_STATE.shoppingDate = data.shoppingDate;
      
      loadStoreDatabase(APP_STATE.selectedSupermarket.id);
      return true;
    }
  } catch (e) {
    console.warn('[LocalStorage] Gagal membaca sesi troli lokal:', e);
  }
  return false;
}

function clearActiveSessionFromStorage() {
  try {
    localStorage.removeItem('widihh_grocery_active_session');
  } catch (e) {}
}

/**
 * Mendorong pembaruan ke Cloud Firestore (Realtime).
 * Dipanggil setiap ada aksi: tambah barang, ubah qty, hapus, confirm setup, checkout.
 */
function syncSessionToFirestore() {
  // Selalu amankan ke LocalStorage terlebih dahulu (Offline-First)
  saveActiveSessionToStorage();

  if (window.FirebaseSync && window.FirebaseSync.isInitialized()) {
    const payload = {
      storeLocation: {
        region: APP_STATE.selectedRegion,
        supermarket: APP_STATE.selectedSupermarket,
        supermarketId: APP_STATE.selectedSupermarket ? APP_STATE.selectedSupermarket.id : '',
        supermarketName: APP_STATE.selectedSupermarket ? APP_STATE.selectedSupermarket.name : ''
      },
      shoppingDate: APP_STATE.shoppingDate || new Date().toISOString(),
      walletLimit: Number(APP_STATE.budget || 0),
      items: APP_STATE.cart,
      totalSpent: getCartTotal(),
      remainingBudget: Math.max(0, (APP_STATE.budget || 0) - getCartTotal()),
      status: APP_STATE.currentScreen === 'main' ? 'shopping' : 'setup'
    };

    window.FirebaseSync.updateSession(APP_STATE.sessionId, payload);
  }
}

/**
 * Inisialisasi Realtime Listener onSnapshot() dari Cloud Firestore.
 * PENTING: Menggunakan onSnapshot() agar saat belanja di HP, layar PC
 * di rumah langsung ter-update otomatis detik itu juga tanpa refresh.
 */
function initRealtimeSync() {
  updateDeviceBadge();

  if (!window.FirebaseSync || !window.FirebaseSync.isInitialized()) {
    console.warn('[RealtimeSync] FirebaseSync belum siap, menunggu event...');
    updateSyncStatusPill(false, 'Offline (LocalStorage)');
    return;
  }

  updateSyncStatusPill(navigator.onLine, navigator.onLine ? 'Cloud Sync (HP ⇄ PC)' : 'Offline (LocalStorage)');

  // Pasang onSnapshot listener untuk sesi aktif troli
  window.FirebaseSync.subscribeToSession(
    APP_STATE.sessionId,
    (remoteData, metadata) => {
      if (!remoteData) return;

      const myDeviceId = window.FirebaseSync.getDeviceId();
      const isFromOtherDevice = remoteData.lastUpdatedBy && remoteData.lastUpdatedBy !== myDeviceId;

      // Jika update berasal dari perangkat lain (contoh: HP di supermarket ke PC di rumah)
      if (isFromOtherDevice) {
        console.log(`[Realtime Sync] Menerima update dari ${remoteData.lastUpdatedBy}:`, remoteData);
        
        if (remoteData.status === 'shopping') {
          const hadSession = APP_STATE.currentScreen === 'main';
          APP_STATE.selectedRegion = remoteData.storeLocation?.region || '';
          APP_STATE.selectedSupermarket = remoteData.storeLocation?.supermarket || {
            id: remoteData.storeLocation?.supermarketId || 'supermarket',
            name: remoteData.storeLocation?.supermarketName || 'Supermarket'
          };
          APP_STATE.budget = Number(remoteData.walletLimit || 0);
          APP_STATE.cart = Array.isArray(remoteData.items) ? remoteData.items : [];
          APP_STATE.shoppingDate = remoteData.shoppingDate;

          loadStoreDatabase(APP_STATE.selectedSupermarket.id);

          if (!hadSession) {
            enterMainAppScreen(true);
          } else {
            renderCartList();
            updateCartAndBudgetDisplays();
            renderStoreCatalog();
          }

          // Simpan snapshot terbaru ke LocalStorage sebagai backup
          saveActiveSessionToStorage();

          feedback.tap();
          showToast(`🔄 Ter-update dari ${remoteData.lastUpdatedBy}! Sisa: ${formatRupiah(remoteData.remainingBudget)}`, 'info');
        } else if (remoteData.status === 'setup' && APP_STATE.currentScreen === 'main') {
          // Perangkat lain melakukan logout/reset
          clearActiveSessionFromStorage();
          APP_STATE.cart = [];
          APP_STATE.budget = 0;
          APP_STATE.selectedSupermarket = null;
          APP_STATE.selectedRegion = '';
          document.getElementById('mainAppScreen').classList.remove('active-screen');
          document.getElementById('setupScreen').classList.add('active-screen');
          APP_STATE.currentScreen = 'setup';
          showToast(`Sesi direset oleh ${remoteData.lastUpdatedBy}.`, 'warning');
        } else if (remoteData.status === 'checkout' && APP_STATE.currentScreen === 'main') {
          clearActiveSessionFromStorage();
          APP_STATE.cart = [];
          updateCartAndBudgetDisplays();
          showToast(`🛒 Belanjaan telah di-checkout dari ${remoteData.lastUpdatedBy}!`, 'success');
          switchTab('history');
        }
      }
    },
    (err) => {
      console.warn('[Realtime Sync Error]', err);
      updateSyncStatusPill(false, 'Offline (LocalStorage)');
    }
  );

  // Pasang onSnapshot listener untuk riwayat belanja
  window.FirebaseSync.subscribeToHistory((remoteHistory) => {
    if (Array.isArray(remoteHistory) && remoteHistory.length > 0) {
      APP_STATE.history = remoteHistory;
      saveHistoryToStorage();
      if (APP_STATE.currentTab === 'history') {
        renderHistoryView();
      }
    }
  });
}

function openSyncInfoModal() {
  const modal = document.getElementById('syncInfoModal');
  const devEl = document.getElementById('modalDeviceName');
  if (devEl && window.FirebaseSync) {
    devEl.textContent = window.FirebaseSync.getDeviceId();
  }
  if (modal) modal.classList.add('active');
}

async function testWriteToFirestore() {
  if (!window.FirebaseSync || !window.FirebaseSync.isInitialized()) {
    showToast('Firebase belum terhubung!', 'danger');
    return;
  }
  showToast('Mengirim data test ke Cloud Firestore...', 'info');
  const ok = await window.FirebaseSync.updateSession(APP_STATE.sessionId, {
    storeLocation: {
      region: APP_STATE.selectedRegion || 'Jakarta Barat',
      supermarket: APP_STATE.selectedSupermarket || { id: 'lotte-puri', name: 'Lotte Mart Grocery - Puri indah' },
      supermarketId: APP_STATE.selectedSupermarket ? APP_STATE.selectedSupermarket.id : 'lotte-puri',
      supermarketName: APP_STATE.selectedSupermarket ? APP_STATE.selectedSupermarket.name : 'Lotte Mart Grocery - Puri indah'
    },
    shoppingDate: new Date().toISOString(),
    walletLimit: Number(APP_STATE.budget || 500000),
    items: APP_STATE.cart.length > 0 ? APP_STATE.cart : [
      { id: 'beras-5kg', name: 'Beras Rojolele / Ramos 5 Kg', effectivePrice: 66600, originalPrice: 74000, discount: 0.1, unit: '5 Kg', quantity: 1 },
      { id: 'telur-1kg', name: 'Telur Ayam Negeri Fresh 1 Kg', effectivePrice: 31000, originalPrice: 31000, discount: 0, unit: '1 Kg', quantity: 1 }
    ],
    totalSpent: getCartTotal() || 97600,
    remainingBudget: APP_STATE.budget ? Math.max(0, APP_STATE.budget - getCartTotal()) : 402400,
    status: 'shopping'
  });

  if (ok) {
    showToast('✨ Berhasil ditulis ke Cloud Firestore! Cek konsol Firebase sekarang.', 'success');
  } else {
    showToast('⚠️ Gagal menulis: Periksa Rules di Firebase Console!', 'danger');
  }
}

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
    const setupDate = document.getElementById('setupDateInput')?.value;
    APP_STATE.shoppingDate = setupDate || new Date().toISOString().split('T')[0];

    loadingModal.classList.remove('active');
    enterMainAppScreen();
    syncSessionToFirestore();
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

function enterMainAppScreen(silent = false) {
  document.getElementById('setupScreen').classList.remove('active-screen');
  document.getElementById('mainAppScreen').classList.add('active-screen');
  APP_STATE.currentScreen = 'main';

  // Update header info & in-session selectors
  populateSessionSupermarketDropdown();
  updateSessionDatePickerUI();
  
  // Render views
  renderStoreCatalog();
  updateCartAndBudgetDisplays();
  switchTab('store');

  if (!silent && APP_STATE.selectedSupermarket) {
    showToast(`Selamat belanja di ${APP_STATE.selectedSupermarket.name}! Budget terkunci.`, 'success');
    feedback.itemAdded();
  }
}

/**
 * Mengisi Dropdown Selector Lokasi Toko di Ribbon Atas
 */
function populateSessionSupermarketDropdown() {
  const select = document.getElementById('sessionSupermarketSelect');
  if (!select) return;

  select.innerHTML = '';
  Object.keys(SUPERMARKET_REGIONS).forEach(region => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = region;
    SUPERMARKET_REGIONS[region].forEach(sm => {
      const opt = document.createElement('option');
      opt.value = sm.id;
      opt.textContent = `${sm.name}`;
      if (APP_STATE.selectedSupermarket && APP_STATE.selectedSupermarket.id === sm.id) {
        opt.selected = true;
      }
      optgroup.appendChild(opt);
    });
    select.appendChild(optgroup);
  });
}

/**
 * Handle perubahan Lokasi Toko langsung dari Ribbon Sesi Belanja di Atas
 */
function handleSessionStoreChange(newSupermarketId) {
  let found = null;
  let foundRegion = '';

  for (const [region, list] of Object.entries(SUPERMARKET_REGIONS)) {
    const sm = list.find(s => s.id === newSupermarketId);
    if (sm) {
      found = sm;
      foundRegion = region;
      break;
    }
  }

  if (found) {
    APP_STATE.selectedSupermarket = found;
    APP_STATE.selectedRegion = foundRegion;

    loadStoreDatabase(found.id);
    renderStoreCatalog();
    syncSessionToFirestore();

    feedback.tap();
    showToast(`Lokasi toko dialihkan ke: ${found.name}`, 'info');
  }
}

/**
 * Handle perubahan Tanggal Sesi Belanja dari Date Picker di Ribbon Atas
 */
function handleSessionDateChange(newDateStr) {
  if (!newDateStr) return;
  APP_STATE.shoppingDate = newDateStr;
  syncSessionToFirestore();
  showToast(`Tanggal sesi belanja: ${newDateStr}`, 'info');
}

/**
 * Sinkronisasi Nilai Date Picker UI
 */
function updateSessionDatePickerUI() {
  const todayStr = new Date().toISOString().split('T')[0];
  const dateStr = APP_STATE.shoppingDate || todayStr;

  const setupDate = document.getElementById('setupDateInput');
  const sessionDate = document.getElementById('sessionShoppingDatePicker');

  if (setupDate && !setupDate.value) setupDate.value = dateStr;
  if (sessionDate) sessionDate.value = dateStr;
}

// =============================================================================
// 6. MAIN APP NAVIGATION (Top Tab Chips & Bottom Floating Bar)
// =============================================================================

function switchTab(tabName) {
  APP_STATE.currentTab = tabName;
  feedback.tap();

  // Update Top Tab Chips
  ['chipStore', 'chipPlan', 'chipList', 'chipHistory'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  if (tabName === 'store') document.getElementById('chipStore')?.classList.add('active');
  if (tabName === 'plan') document.getElementById('chipPlan')?.classList.add('active');
  if (tabName === 'list') document.getElementById('chipList')?.classList.add('active');
  if (tabName === 'history') document.getElementById('chipHistory')?.classList.add('active');

  // Update Bottom Nav Items (Belanja, Rencana, Keranjang, Riwayat)
  ['navStore', 'navPlan', 'navList', 'navHistory'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  if (tabName === 'store') document.getElementById('navStore')?.classList.add('active');
  if (tabName === 'plan') document.getElementById('navPlan')?.classList.add('active');
  if (tabName === 'list') document.getElementById('navList')?.classList.add('active');
  if (tabName === 'history') document.getElementById('navHistory')?.classList.add('active');

  // Switch Tab View Content
  ['tabContentStore', 'tabContentPlan', 'tabContentList', 'tabContentHistory'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active-view');
  });

  const contentArea = document.getElementById('contentArea');
  const listBottomBar = document.getElementById('listBottomBar');

  if (tabName === 'store') {
    document.getElementById('tabContentStore')?.classList.add('active-view');
    listBottomBar?.classList.remove('visible');
    contentArea?.classList.remove('with-list-bar');
  } else if (tabName === 'plan') {
    document.getElementById('tabContentPlan')?.classList.add('active-view');
    renderPlanView();
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
// 6B. TAB: RENCANA (Checklist Rencana Belanja Anti-Impulsif)
// =============================================================================

/**
 * Render Tampilan Checklist Rencana Belanja
 */
function renderPlanView() {
  const container = document.getElementById('planItemsList');
  const emptyState = document.getElementById('emptyPlanState');
  const moveWrap = document.getElementById('planMoveActionWrap');
  const counterEl = document.getElementById('planItemsCounter');
  const bottomBadge = document.getElementById('bottomPlanBadge');
  const headerBadge = document.getElementById('headerPlanCount');
  const checkedCountEl = document.getElementById('planCheckedCount');
  const toggleBtn = document.getElementById('btnToggleAllPlan');

  if (!container) return;

  const totalPlans = APP_STATE.plans.length;
  const checkedCount = APP_STATE.plans.filter(p => p.checked).length;

  // Update counters & badges
  if (counterEl) counterEl.textContent = `${totalPlans} barang`;
  if (checkedCountEl) checkedCountEl.textContent = checkedCount;

  if (bottomBadge) {
    bottomBadge.textContent = totalPlans;
    bottomBadge.style.display = totalPlans > 0 ? 'inline-block' : 'none';
  }
  if (headerBadge) {
    headerBadge.textContent = totalPlans;
    headerBadge.style.display = totalPlans > 0 ? 'inline-block' : 'none';
  }

  // Update toggle all button text
  if (toggleBtn) {
    toggleBtn.textContent = (checkedCount === totalPlans && totalPlans > 0) ? 'Batal Pilih' : 'Pilih Semua';
  }

  // Jika rencana kosong
  if (totalPlans === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    if (moveWrap) moveWrap.classList.remove('visible');
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (moveWrap) moveWrap.classList.add('visible');

  // Render checklist cards
  container.innerHTML = APP_STATE.plans.map(item => {
    return `
      <div class="plan-checklist-card ${item.checked ? 'checked' : ''}" onclick="togglePlanItemCheck('${item.id}', event)">
        <div class="plan-card-left">
          <div class="plan-checkbox-custom">
            ${item.checked ? '✓' : ''}
          </div>
          <div class="plan-item-info">
            <span class="plan-item-name">${item.name}</span>
            <span class="plan-item-cat">${item.category}</span>
          </div>
        </div>
        <div class="plan-card-right">
          <span class="plan-item-price-tag">${formatRupiah(item.estimatedPrice)}</span>
          <button type="button" class="btn-delete-plan-item" onclick="deletePlanItem('${item.id}', event)" title="Hapus dari rencana">✕</button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Tambah Item Baru ke Rencana Belanja
 */
function handleAddPlanItem() {
  const nameInput = document.getElementById('planItemName');
  const catSelect = document.getElementById('planItemCategory');
  const priceInput = document.getElementById('planItemPrice');

  const name = nameInput?.value.trim();
  if (!name) {
    showToast('Input nama makanan / barang terlebih dahulu!', 'warning');
    nameInput?.focus();
    return;
  }

  const category = catSelect?.value || 'Bahan Pokok';
  const estimatedPrice = parseRupiahInput(priceInput?.value || '');

  const newPlanItem = {
    id: 'plan-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    name: name,
    category: category,
    estimatedPrice: estimatedPrice,
    checked: true // Otomatis tercentang agar siap dipindahkan jika diinginkan
  };

  APP_STATE.plans.unshift(newPlanItem);
  savePlansToStorage();

  // Reset inputs
  if (nameInput) nameInput.value = '';
  if (priceInput) priceInput.value = '';
  nameInput?.focus();

  feedback.tap();
  renderPlanView();
  showToast(`✨ "${name}" ditambahkan ke checklist rencana!`, 'success');
}

/**
 * Toggle Centang Checklist Item Rencana
 */
function togglePlanItemCheck(id, event) {
  if (event && event.target.closest('.btn-delete-plan-item')) return;

  const item = APP_STATE.plans.find(p => p.id === id);
  if (!item) return;

  item.checked = !item.checked;
  savePlansToStorage();
  feedback.tap();
  renderPlanView();
}

/**
 * Pilih Semua / Batal Pilih Checklist Rencana
 */
function toggleSelectAllPlanItems() {
  const total = APP_STATE.plans.length;
  if (total === 0) return;

  const allChecked = APP_STATE.plans.every(p => p.checked);
  APP_STATE.plans.forEach(p => {
    p.checked = !allChecked;
  });

  savePlansToStorage();
  feedback.tap();
  renderPlanView();
}

/**
 * Hapus Item dari Rencana
 */
function deletePlanItem(id, event) {
  if (event) event.stopPropagation();

  const idx = APP_STATE.plans.findIndex(p => p.id === id);
  if (idx === -1) return;

  const deleted = APP_STATE.plans.splice(idx, 1)[0];
  savePlansToStorage();
  feedback.tap();
  renderPlanView();
  showToast(`Barang "${deleted.name}" dihapus dari rencana.`, 'warning');
}

/**
 * Pindahkan Barang yang Dicentang ke Troli Belanja Langsung
 * Sistem memindahkan barang yang dicentang ke troli, dan halaman rencana kembali kosong!
 */
function moveCheckedPlansToCart() {
  const checkedItems = APP_STATE.plans.filter(p => p.checked);

  if (checkedItems.length === 0) {
    showToast('Centang minimal 1 barang rencana yang ingin dipindahkan ke troli!', 'warning');
    return;
  }

  // Hitung total estimasi harga barang yang dipindahkan
  const addedTotal = checkedItems.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
  const currentTotal = getCartTotal();

  if (APP_STATE.budget > 0 && (currentTotal + addedTotal > APP_STATE.budget)) {
    const remaining = Math.max(0, APP_STATE.budget - currentTotal);
    if (!confirm(`⚠️ Total estimasi (${formatRupiah(addedTotal)}) melebihi sisa budget (${formatRupiah(remaining)}). Tetap pindahkan ke troli?`)) {
      return;
    }
  }

  // Pindahkan barang-barang yang dicentang ke Troli (APP_STATE.cart)
  checkedItems.forEach(item => {
    const cartItem = {
      id: 'cart-plan-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      name: item.name,
      category: item.category,
      unit: 'pcs',
      quantity: 1,
      originalPrice: item.estimatedPrice || 0,
      effectivePrice: item.estimatedPrice || 0,
      discount: 0,
      trend: 'equal',
      isFromPlan: true
    };
    APP_STATE.cart.push(cartItem);
  });

  // Hapus barang yang telah dipindahkan dari rencana (halaman rencana kembali kosong)
  APP_STATE.plans = APP_STATE.plans.filter(p => !p.checked);
  savePlansToStorage();

  // Sinkronisasi Sesi Aktif & Cloud Firestore
  saveActiveSessionToStorage();
  syncSessionToFirestore();

  // Render ulang UI
  renderPlanView();
  renderCartList();
  updateCartAndBudgetDisplays();

  feedback.checkoutSuccess();
  showToast(`🛒 ${checkedItems.length} barang rencana berhasil dipindahkan ke troli!`, 'success');
}

function savePlansToStorage() {
  try {
    localStorage.setItem('widihh_grocery_plans', JSON.stringify(APP_STATE.plans));
  } catch (e) {
    console.warn('[LocalStorage] Gagal menyimpan rencana belanja:', e);
  }
}

function loadPlansFromStorage() {
  try {
    const stored = localStorage.getItem('widihh_grocery_plans');
    if (stored) {
      APP_STATE.plans = JSON.parse(stored);
      if (!Array.isArray(APP_STATE.plans)) APP_STATE.plans = [];
    }
  } catch (e) {
    console.warn('[LocalStorage] Gagal membaca rencana belanja:', e);
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

  // Multi-device Realtime Sync ke Firestore & LocalStorage fallback
  syncSessionToFirestore();
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
  syncSessionToFirestore();
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
  syncSessionToFirestore();
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
  syncSessionToFirestore();
}

function clearCartPrompt() {
  if (APP_STATE.cart.length === 0) return;
  if (confirm('Kosongkan semua barang belanjaan di dalam troli?')) {
    APP_STATE.cart = [];
    renderCartList();
    showToast('Troli dikosongkan.', 'warning');
    syncSessionToFirestore();
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
  const totalSavings = APP_STATE.cart.reduce((sum, item) => {
    const orig = item.originalPrice || item.effectivePrice;
    return sum + Math.max(0, (orig - item.effectivePrice) * item.quantity);
  }, 0);

  // Create immutable receipt snapshot
  const now = new Date();
  const sessionDateObj = APP_STATE.shoppingDate ? new Date(APP_STATE.shoppingDate) : now;
  const receiptSession = {
    id: 'chk_' + Date.now(),
    date: APP_STATE.shoppingDate || now.toISOString(),
    displayDate: formatReceiptDate(sessionDateObj),
    supermarketName: APP_STATE.selectedSupermarket ? APP_STATE.selectedSupermarket.name : 'Supermarket',
    region: APP_STATE.selectedRegion || '',
    budgetInitial: APP_STATE.budget,
    totalSpent: total,
    totalSavings: totalSavings,
    items: JSON.parse(JSON.stringify(APP_STATE.cart)) // Deep copy
  };

  // Push to history & persist in localStorage
  APP_STATE.history.unshift(receiptSession);
  saveHistoryToStorage();
  clearActiveSessionFromStorage();

  // Simpan struk ke Cloud Firestore & reset sesi aktif
  if (window.FirebaseSync && window.FirebaseSync.isInitialized()) {
    window.FirebaseSync.saveCheckoutReceipt(receiptSession);
    window.FirebaseSync.updateSession(APP_STATE.sessionId, {
      status: 'checkout',
      items: [],
      totalSpent: 0,
      remainingBudget: 0
    });
  }

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
// 10B. FORM INPUT PRODUK BELANJA ("TAMBAH PRODUK")
// Sesuai Struktur & Elemen Persis Ke Bawah:
// - Label "Input Produk"
// - Nama Produk: Kotak teks (input manual)
// - Baris Kategori & Kemasan Satuan (Berjajar)
// - Kuantitas & Harga: Qty (- / +), Harga Satuan (Rp), Harga Bulan Lalu (Rp)
// - Indikator Selisih Harga (Teks Merah)
// - Potongan Diskon Toko (Manual / Pintasan + Hemat per item jika qty > 1)
// - Subtotal Baris Item (Perhitungan otomatis real-time)
// - Tombol Aksi: "Batal" & "Simpan ke Troli"
// =============================================================================

function openAddProductModal() {
  feedback.tap();
  resetAddProductForm();
  document.getElementById('addProductModal')?.classList.add('active');
  if (window.lucide) {
    lucide.createIcons();
  }
  setTimeout(() => {
    document.getElementById('customProdName')?.focus();
  }, 120);
}

function resetAddProductForm() {
  const nameInput = document.getElementById('customProdName');
  const catSelect = document.getElementById('customProdCategory');
  const unitSelect = document.getElementById('customProdUnit');
  const qtyInput = document.getElementById('customProdQty');
  const priceInput = document.getElementById('customProdPrice');
  const lastPriceInput = document.getElementById('customProdLastMonthPrice');
  const discountInput = document.getElementById('customProdDiscount');

  if (nameInput) nameInput.value = '';
  if (catSelect) catSelect.value = 'Bahan Pokok';
  if (unitSelect) unitSelect.value = 'pcs (buah)';
  if (qtyInput) qtyInput.value = '1';
  if (priceInput) priceInput.value = '';
  if (lastPriceInput) lastPriceInput.value = '';
  if (discountInput) discountInput.value = '0%';

  // Reset active chip
  document.querySelectorAll('.discount-chip').forEach((c, idx) => {
    if (idx === 0) c.classList.add('active');
    else c.classList.remove('active');
  });

  calculateAddProductForm();
}

function stepAddProductQty(delta) {
  const qtyInput = document.getElementById('customProdQty');
  if (!qtyInput) return;
  let val = parseInt(qtyInput.value, 10) || 1;
  val = Math.max(1, Math.min(999, val + delta));
  qtyInput.value = val;
  feedback.tap();
  calculateAddProductForm();
}

function handleNumericPriceInput(input) {
  const raw = parseRupiahInput(input.value);
  if (raw === 0 && input.value.trim() === '') {
    input.value = '';
  } else {
    input.value = raw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

function handleDiscountPercentInput(input) {
  let val = input.value.replace(/[^0-9.]/g, '');
  let num = parseFloat(val);
  if (isNaN(num)) num = 0;
  num = Math.max(0, Math.min(100, num));

  // Update active chip
  document.querySelectorAll('.discount-chip').forEach(c => {
    const chipVal = parseFloat(c.textContent.replace('%', ''));
    if (chipVal === num) c.classList.add('active');
    else c.classList.remove('active');
  });
}

function setAddProductDiscount(pct, btnEl) {
  const discountInput = document.getElementById('customProdDiscount');
  if (discountInput) {
    discountInput.value = pct + '%';
  }
  document.querySelectorAll('.discount-chip').forEach(c => c.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  feedback.tap();
  calculateAddProductForm();
}

/**
 * Kalkulasi Real-time Input Produk:
 * - Selisih harga satuan & persentase kenaikan/penurunan (Teks Merah)
 * - Harga setelah diskon & Total hemat (serta Hemat per item jika qty > 1)
 * - Subtotal baris item (effectivePrice * qty)
 */
function calculateAddProductForm() {
  const qtyInput = document.getElementById('customProdQty');
  const priceInput = document.getElementById('customProdPrice');
  const lastPriceInput = document.getElementById('customProdLastMonthPrice');
  const discountInput = document.getElementById('customProdDiscount');

  const qty = Math.max(1, parseInt(qtyInput?.value, 10) || 1);
  const rawPrice = parseRupiahInput(priceInput?.value || '');
  const lastMonthPrice = parseRupiahInput(lastPriceInput?.value || '');
  
  let discPct = 0;
  if (discountInput && discountInput.value) {
    const parsed = parseFloat(discountInput.value.replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed)) {
      discPct = Math.max(0, Math.min(100, parsed));
    }
  }

  // 1. Indikator Selisih Harga (Teks Merah Sesuai Spesifikasi)
  const diffBox = document.getElementById('customProdPriceDiffContainer');
  const diffText = document.getElementById('customProdPriceDiffText');
  if (diffBox && diffText) {
    if (rawPrice > 0 && lastMonthPrice > 0) {
      const diff = rawPrice - lastMonthPrice;
      const pct = lastMonthPrice > 0 ? ((diff / lastMonthPrice) * 100) : 0;
      diffBox.style.display = 'block';

      if (diff > 0) {
        diffText.textContent = `🔺 Selisih: +${formatRupiah(diff)} (+${pct.toFixed(1)}% vs bulan lalu)`;
      } else if (diff < 0) {
        diffText.textContent = `🔻 Selisih: -${formatRupiah(Math.abs(diff))} (${pct.toFixed(1)}% vs bulan lalu)`;
      } else {
        diffText.textContent = `➖ Selisih: Rp 0 (Harga stabil sama dengan bulan lalu)`;
      }
    } else {
      diffBox.style.display = 'none';
    }
  }

  // 2. Diskon & Hemat
  const hasDiscount = discPct > 0;
  const effectivePrice = hasDiscount ? Math.round(rawPrice * (1 - (discPct / 100))) : rawPrice;
  const savingsPerItem = Math.max(0, rawPrice - effectivePrice);
  const totalSavings = savingsPerItem * qty;

  const discountedPriceEl = document.getElementById('customProdDiscountedPrice');
  const totalSavingsEl = document.getElementById('customProdTotalSavings');
  const perItemRow = document.getElementById('customProdPerItemSavingsRow');
  const perItemText = document.getElementById('customProdPerItemSavingsText');

  if (discountedPriceEl) discountedPriceEl.textContent = formatRupiah(effectivePrice);
  if (totalSavingsEl) totalSavingsEl.textContent = formatRupiah(totalSavings);

  if (perItemRow && perItemText) {
    if (qty > 1 && savingsPerItem > 0) {
      perItemRow.style.display = 'block';
      perItemText.textContent = `Hemat ${formatRupiah(savingsPerItem)} per item`;
    } else {
      perItemRow.style.display = 'none';
    }
  }

  // 3. Subtotal Baris Item (Perhitungan otomatis)
  const subtotal = effectivePrice * qty;
  const subtotalEl = document.getElementById('customProdSubtotal');
  if (subtotalEl) {
    subtotalEl.textContent = formatRupiah(subtotal);
  }
}

/**
 * Simpan Produk Baru ke Troli Belanja Aktif
 */
function saveCustomProductToCart() {
  const nameInput = document.getElementById('customProdName');
  const catSelect = document.getElementById('customProdCategory');
  const unitSelect = document.getElementById('customProdUnit');
  const qtyInput = document.getElementById('customProdQty');
  const priceInput = document.getElementById('customProdPrice');
  const lastPriceInput = document.getElementById('customProdLastMonthPrice');
  const discountInput = document.getElementById('customProdDiscount');

  const prodName = nameInput?.value.trim();
  if (!prodName) {
    showToast('Nama produk wajib diisi!', 'warning');
    nameInput?.focus();
    return;
  }

  const rawPrice = parseRupiahInput(priceInput?.value || '');
  if (!rawPrice || rawPrice <= 0) {
    showToast('Harga satuan (Rp) wajib diisi dengan nominal yang valid!', 'warning');
    priceInput?.focus();
    return;
  }

  const qty = Math.max(1, parseInt(qtyInput?.value, 10) || 1);
  const lastMonthPrice = parseRupiahInput(lastPriceInput?.value || '');
  
  let discPct = 0;
  if (discountInput && discountInput.value) {
    const parsed = parseFloat(discountInput.value.replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed)) discPct = Math.max(0, Math.min(100, parsed));
  }

  const effectivePrice = discPct > 0 ? Math.round(rawPrice * (1 - (discPct / 100))) : rawPrice;
  const subtotal = effectivePrice * qty;

  // Cek apakah penambahan melebihi budget limit
  const currentTotal = getCartTotal();
  if (currentTotal + subtotal > APP_STATE.budget) {
    feedback.budgetExhausted();
    highlightBudgetDanger();
    const remaining = Math.max(0, APP_STATE.budget - currentTotal);
    showToast(`⚠️ Melebihi budget! Subtotal ${formatRupiah(subtotal)}, sisa budget hanya ${formatRupiah(remaining)}.`, 'danger');
    return;
  }

  // Tentukan tren harga vs bulan lalu
  let trend = 'equal';
  if (lastMonthPrice > 0) {
    if (rawPrice > lastMonthPrice) trend = 'up';
    else if (rawPrice < lastMonthPrice) trend = 'down';
  }

  const customItem = {
    id: 'prod-' + Date.now(),
    name: prodName,
    category: catSelect?.value || 'Lainnya',
    unit: unitSelect?.value || 'pcs (buah)',
    quantity: qty,
    originalPrice: rawPrice,
    lastMonthPrice: lastMonthPrice || rawPrice,
    discount: discPct / 100,
    effectivePrice: effectivePrice,
    trend: trend,
    isCustom: true
  };

  APP_STATE.cart.push(customItem);
  closeModal('addProductModal');

  renderCartList();
  updateCartAndBudgetDisplays();
  syncSessionToFirestore();

  feedback.itemAdded();
  showToast(`✨ ${prodName} (${qty} ${customItem.unit}) berhasil dimasukkan ke troli!`, 'success');
}

// =============================================================================
// 11. TAB 3: HISTORY & CETAK RESI BELANJA
// =============================================================================

function formatReceiptDate(dateObj) {
  if (!dateObj || isNaN(dateObj.getTime())) {
    dateObj = new Date();
  }
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

  container.innerHTML = APP_STATE.history.map((session, index) => {
    const itemsHtml = session.items.map(item => {
      const itemTotal = item.effectivePrice * item.quantity;
      return `
        <div class="history-item-row">
          <span class="history-item-name">${item.name}</span>
          <div class="history-item-subrow">
            <span class="history-item-hargatotal">${formatRupiah(itemTotal)}</span>
            <span class="history-item-qty-tag">[${item.quantity}] ${item.unit || 'quantity'}</span>
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
        <div class="history-action-row">
          <button type="button" class="btn-receipt-trigger" onclick="openReceiptModal(${index})" title="Lihat dan Cetak Resi">
            <i data-lucide="printer"></i>
            <span>Cetak / Lihat Resi</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Membuka Modal Struk / Resi Belanja untuk Dicetak
 */
function openReceiptModal(historyIndex) {
  const session = APP_STATE.history[historyIndex];
  if (!session) return;

  feedback.tap();
  const storeNameEl = document.getElementById('receiptSlipStoreName');
  const regionEl = document.getElementById('receiptSlipRegion');
  const dateEl = document.getElementById('receiptSlipDate');
  const itemsContainer = document.getElementById('receiptSlipItemsList');
  const subtotalEl = document.getElementById('receiptSlipSubtotal');
  const savingsEl = document.getElementById('receiptSlipSavings');
  const totalEl = document.getElementById('receiptSlipTotal');
  const budgetEl = document.getElementById('receiptSlipBudget');
  const remainingEl = document.getElementById('receiptSlipRemaining');
  const timestampEl = document.getElementById('receiptSlipTimestamp');

  if (storeNameEl) storeNameEl.textContent = session.supermarketName || 'Supermarket';
  if (regionEl) regionEl.textContent = session.region || 'Wilayah Belanja';
  if (dateEl) dateEl.textContent = session.displayDate || 'Today';

  let rawSubtotal = 0;
  let totalSavings = 0;

  if (itemsContainer) {
    itemsContainer.innerHTML = session.items.map(item => {
      const orig = item.originalPrice || item.effectivePrice;
      const itemSubtotal = item.effectivePrice * item.quantity;
      const itemOrigTotal = orig * item.quantity;
      const itemSaved = Math.max(0, itemOrigTotal - itemSubtotal);
      
      rawSubtotal += itemOrigTotal;
      totalSavings += itemSaved;

      return `
        <div class="receipt-item-row-print">
          <div class="item-main-line">
            <span>${item.name}</span>
            <span>${formatRupiah(itemSubtotal)}</span>
          </div>
          <div class="item-sub-line">
            <span>${item.quantity} ${item.unit || 'pcs'} x ${formatRupiah(item.effectivePrice)}</span>
            ${itemSaved > 0 ? `<span>(Hemat ${formatRupiah(itemSaved)})</span>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  const finalTotal = session.totalSpent || 0;
  const budgetVal = session.budgetInitial || 0;
  const remaining = Math.max(0, budgetVal - finalTotal);

  if (subtotalEl) subtotalEl.textContent = formatRupiah(rawSubtotal || finalTotal);
  if (savingsEl) savingsEl.textContent = `-${formatRupiah(totalSavings || session.totalSavings || 0)}`;
  if (totalEl) totalEl.textContent = formatRupiah(finalTotal);
  if (budgetEl) budgetEl.textContent = formatRupiah(budgetVal);
  if (remainingEl) remainingEl.textContent = formatRupiah(remaining);
  if (timestampEl) timestampEl.textContent = `ID Sesi: #${(session.id || 'WID-001').slice(-7).toUpperCase()}`;

  document.getElementById('receiptViewModal')?.classList.add('active');
  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Eksekusi Cetak Struk (window.print)
 */
function printReceiptSlip() {
  feedback.tap();
  window.print();
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

  clearActiveSessionFromStorage();
  if (window.FirebaseSync && window.FirebaseSync.isInitialized()) {
    window.FirebaseSync.resetSession(APP_STATE.sessionId);
  }

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

  // Inisialisasi default date picker ke hari ini (YYYY-MM-DD)
  const todayDateStr = new Date().toISOString().split('T')[0];
  if (!APP_STATE.shoppingDate) {
    APP_STATE.shoppingDate = todayDateStr;
  }
  const setupDate = document.getElementById('setupDateInput');
  if (setupDate) setupDate.value = APP_STATE.shoppingDate;
  const sessionDate = document.getElementById('sessionShoppingDatePicker');
  if (sessionDate) sessionDate.value = APP_STATE.shoppingDate;

  // 1. Fallback Offline: Muat data troli lokal terlebih dahulu (F5 / sinyal lemah)
  const hasLocalActiveSession = loadActiveSessionFromStorage();
  if (hasLocalActiveSession) {
    console.log('[LocalStorage Fallback] Memulihkan sesi belanja dari penyimpanan lokal.');
    enterMainAppScreen(true);
  }

  // Load history & plans from persistence
  loadHistoryFromStorage();
  loadPlansFromStorage();
  renderPlanView();

  // 2. Setup Network Online / Offline Detection
  window.addEventListener('online', () => {
    updateSyncStatusPill(true, 'Cloud Sync (HP ⇄ PC)');
    syncSessionToFirestore();
    showToast('🌐 Terhubung kembali ke Cloud Firestore! Sinkronisasi aktif.', 'success');
  });

  window.addEventListener('offline', () => {
    updateSyncStatusPill(false, 'Offline (LocalStorage)');
    showToast('📶 Sinyal lemah di supermarket: Troli tetap aman di HP!', 'warning');
  });

  // 3. Inisialisasi Realtime Sync via onSnapshot()
  if (window.FirebaseSync && window.FirebaseSync.isInitialized()) {
    initRealtimeSync();
  } else {
    window.addEventListener('firebaseSyncReady', () => {
      initRealtimeSync();
    });
  }

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

