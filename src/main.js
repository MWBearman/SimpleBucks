import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("user-info");
const offerwallContainer = document.getElementById("offerwall-container");

loginBtn.onclick = () => signInWithPopup(auth, provider);
logoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";

    userInfo.innerHTML = `
      <p>Hello, ${user.displayName}</p>
      <p>User ID: ${user.uid}</p>
    `;

    // Embed the Tapjoy offerwall iframe
    const sdkKey = "vpHDtnfqR2m-Z6FDElUFNwEBiaumjP5tv66LSRKQxXwdh1DqYTTz6Uo4F5yo";
    const offerwallUrl = `https://ws.tapjoyads.com/offerwall?appid=${sdkKey}&user_id=${user.uid}&placement=AppLaunch`;

    const iframe = document.createElement("iframe");
    iframe.src = offerwallUrl;
    iframe.width = "100%";
    iframe.height = "600";
    iframe.style.border = "none";

    offerwallContainer.innerHTML = ""; // Clear previous iframes if any
    offerwallContainer.appendChild(iframe);
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    userInfo.innerHTML = "";
    offerwallContainer.innerHTML = "";
  }
});