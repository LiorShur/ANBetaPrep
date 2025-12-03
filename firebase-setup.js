import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
import { 
  getFirestore, 
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  CACHE_SIZE_UNLIMITED
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmsm916Lzp0MUXANq3SECO4ec7q1H0Vu4",
  authDomain: "accessnaturebeta-821a2.firebaseapp.com",
  projectId: "accessnaturebeta-821a2",
  storageBucket: "accessnaturebeta-821a2.appspot.com",
  messagingSenderId: "670888101781",
  appId: "1:670888101781:web:b4cf57f58e86182466589c",
  measurementId: "G-QL82J92CP7"
};

// Check if app already initialized
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialize Firestore with settings to prevent Target ID conflicts
let db;
try {
  // Try to get existing Firestore instance first
  db = getFirestore(app);
  console.log('🔥 Using existing Firestore instance');
} catch (e) {
  console.log('🔥 Initializing Firestore with custom settings...');
  // If that fails, initialize with custom settings
  try {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager({
          forceOwnership: true  // This prevents Target ID conflicts across tabs
        }),
        cacheSizeBytes: CACHE_SIZE_UNLIMITED
      })
    });
  } catch (initError) {
    // Fallback: try basic getFirestore again
    console.warn('⚠️ Custom Firestore init failed, using default:', initError.message);
    db = getFirestore(app);
  }
}

export const auth = getAuth(app);
export { db };
export const storage = getStorage(app);

console.log('🔥 Firebase initialized successfully');
