import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwxf-hvEtcmifqt-JbWugmF3mw15SW0Wg",
  authDomain: "safephone-ng.firebaseapp.com",
  projectId: "safephone-ng",
  storageBucket: "safephone-ng.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;