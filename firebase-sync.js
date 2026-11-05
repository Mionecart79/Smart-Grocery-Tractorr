/**
 * FIREBASE CLOUD FIRESTORE REALTIME SYNC
 * Smart Grocery & Budget Safety Tracker Widihh
 * 
 * Multi-device Realtime Architecture (HP ⇄ PC Sync via onSnapshot)
 * With LocalStorage & IndexedDB offline fallback
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  onSnapshot, 
  serverTimestamp,
  collection,
  query,
  orderBy,
  enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Konfigurasi Firebase dari Pengguna
const firebaseConfig = {
  apiKey: "AIzaSyBgFd4fAMq91QWFzI6tK7A1Qfvg8CmVVls",
  authDomain: "smart-grocery-tractor-dt2.firebaseapp.com",
  projectId: "smart-grocery-tractor-dt2",
  storageBucket: "smart-grocery-tractor-dt2.firebasestorage.app",
  messagingSenderId: "70855179090",
  appId: "1:70855179090:web:d00246d4cbe8b615d8188b"
};

// Inisialisasi Firebase App & Firestore
let app = null;
let db = null;
let isInitialized = false;
let activeSessionUnsubscribe = null;
let historyUnsubscribe = null;

// Deteksi perangkat (HP vs PC) untuk pelacakan update
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const deviceId = isMobileDevice ? 'HP (Troli)' : 'PC (Desktop)';

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isInitialized = true;

  // Aktifkan Firestore IndexedDB offline persistence jika didukung browser
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('[Firebase] Multi-tab persistence dibatasi ke satu tab aktif');
    } else if (err.code === 'unimplemented') {
      console.warn('[Firebase] Browser tidak mendukung persistence IndexedDB');
    }
  });

  console.log('[Firebase] Cloud Firestore berhasil diinisialisasi untuk perangkat:', deviceId);
} catch (err) {
  console.error('[Firebase] Gagal menginisialisasi Firebase:', err);
}

// Default session ID untuk troli bersama (HP & PC berbagi troli yang sama)
const DEFAULT_SESSION_ID = 'active_trolley_session';

/**
 * Service API Realtime Sync untuk diakses oleh app.js
 */
window.FirebaseSync = {
  isInitialized: () => isInitialized,
  getDeviceId: () => deviceId,
  getDefaultSessionId: () => DEFAULT_SESSION_ID,

  /**
   * PENTING: Menggunakan onSnapshot() Realtime Listener.
   * TIDAK menggunakan getDoc() / getDocs() agar setiap perubahan di HP
   * langsung ter-update di PC secara detik itu juga tanpa refresh!
   */
  subscribeToSession: (sessionId, onUpdateCallback, onErrorCallback) => {
    if (!isInitialized || !db) {
      if (onErrorCallback) onErrorCallback(new Error('Firebase belum siap'));
      return null;
    }

    try {
      if (activeSessionUnsubscribe) {
        activeSessionUnsubscribe();
      }

      const sessionDocRef = doc(db, 'grocery_sessions', sessionId || DEFAULT_SESSION_ID);
      
      console.log(`[Firebase] Memulai listener onSnapshot() untuk sesi: ${sessionId || DEFAULT_SESSION_ID}`);

      activeSessionUnsubscribe = onSnapshot(
        sessionDocRef,
        { includeMetadataChanges: true },
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const source = docSnap.metadata.hasPendingWrites ? 'Lokal (Pending)' : 'Server Cloud';
            console.log(`[Firebase onSnapshot] Data troli diperbarui (${source}):`, data);
            if (onUpdateCallback) {
              onUpdateCallback(data, docSnap.metadata);
            }
          } else {
            console.log('[Firebase onSnapshot] Dokumen belum ada, menunggu data pertama...');
            if (onUpdateCallback) {
              onUpdateCallback(null, docSnap.metadata);
            }
          }
        },
        (error) => {
          console.warn('[Firebase onSnapshot] Error pada listener realtime:', error);
          if (onErrorCallback) onErrorCallback(error);
        }
      );

      return activeSessionUnsubscribe;
    } catch (err) {
      console.error('[Firebase] Error saat memasang subscribeToSession:', err);
      if (onErrorCallback) onErrorCallback(err);
      return null;
    }
  },

  /**
   * Menyimpan/memperbarui data sesi aktif ke Cloud Firestore.
   * Menyertakan variabel wajib:
   * - storeLocation
   * - shoppingDate
   * - walletLimit
   * - items
   * - totalSpent
   * - remainingBudget
   * - status
   * - lastUpdatedBy
   */
  updateSession: async (sessionId, sessionData) => {
    if (!isInitialized || !db) return false;

    try {
      const sessionDocRef = doc(db, 'grocery_sessions', sessionId || DEFAULT_SESSION_ID);
      const payload = {
        storeLocation: sessionData.storeLocation || null,
        shoppingDate: sessionData.shoppingDate || new Date().toISOString(),
        walletLimit: Number(sessionData.walletLimit || 0),
        items: Array.isArray(sessionData.items) ? sessionData.items : [],
        totalSpent: Number(sessionData.totalSpent || 0),
        remainingBudget: Number(sessionData.remainingBudget || 0),
        status: sessionData.status || 'shopping',
        lastUpdatedBy: deviceId,
        updatedAt: serverTimestamp(),
        clientTimestamp: Date.now()
      };

      await setDoc(sessionDocRef, payload, { merge: true });
      return true;
    } catch (err) {
      console.warn('[Firebase] Gagal menyimpan sesi ke Cloud Firestore:', err);
      return false;
    }
  },

  /**
   * Listener Realtime onSnapshot() untuk Riwayat Belanja (History)
   */
  subscribeToHistory: (onHistoryUpdate, onError) => {
    if (!isInitialized || !db) return null;

    try {
      if (historyUnsubscribe) {
        historyUnsubscribe();
      }

      const historyColRef = collection(db, 'grocery_history');
      const q = query(historyColRef, orderBy('createdAt', 'desc'));

      historyUnsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
          if (onHistoryUpdate) onHistoryUpdate(list);
        },
        (error) => {
          console.warn('[Firebase onSnapshot History] Error:', error);
          if (onError) onError(error);
        }
      );

      return historyUnsubscribe;
    } catch (err) {
      console.warn('[Firebase] Error saat pasang history listener:', err);
      return null;
    }
  },

  /**
   * Menyimpan struk checkout ke koleksi history di Cloud Firestore
   */
  saveCheckoutReceipt: async (receipt) => {
    if (!isInitialized || !db) return false;

    try {
      const receiptDocRef = doc(db, 'grocery_history', receipt.id);
      await setDoc(receiptDocRef, {
        ...receipt,
        createdAt: serverTimestamp(),
        savedBy: deviceId
      });
      return true;
    } catch (err) {
      console.warn('[Firebase] Gagal menyimpan struk ke history Firestore:', err);
      return false;
    }
  },

  /**
   * Reset data sesi aktif di Firestore saat logout
   */
  resetSession: async (sessionId) => {
    if (!isInitialized || !db) return false;

    try {
      const sessionDocRef = doc(db, 'grocery_sessions', sessionId || DEFAULT_SESSION_ID);
      await setDoc(sessionDocRef, {
        status: 'setup',
        items: [],
        totalSpent: 0,
        walletLimit: 0,
        remainingBudget: 0,
        storeLocation: null,
        lastUpdatedBy: deviceId,
        updatedAt: serverTimestamp(),
        clientTimestamp: Date.now()
      });
      return true;
    } catch (err) {
      console.warn('[Firebase] Gagal reset sesi di Firestore:', err);
      return false;
    }
  }
};

// Dispatch custom event agar app.js tahu FirebaseSync sudah siap
window.dispatchEvent(new CustomEvent('firebaseSyncReady'));

