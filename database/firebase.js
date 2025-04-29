import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";

// Revisar si las variables de entorno están definidas
if (!FIREBASE_API_KEY || !FIREBASE_AUTH_DOMAIN || !FIREBASE_PROJECT_ID) {
  throw new Error("Faltan variables de entorno para Firebase.");
}

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Verifica si Firebase ya fue inicializado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// Solo inicializar analytics si es compatible
isSupported()
  .then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.log("Analytics no es compatible en este entorno.");
    }
  })
  .catch((error) => {
    console.log("Error al verificar soporte de analytics:", error);
  });

export { db, app, storage };
