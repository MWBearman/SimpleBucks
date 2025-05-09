import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    document.body.innerHTML = `<p>Please log in first.</p>`;
    return;
  }

  const sdkKey = "vpHDtnfqR2m-Z6FDElUFNwEBiaumjP5tv66LSRKQxXwdh1DqYTTz6Uo4F5yo";
  const offerwallUrl = `https://ws.tapjoyads.com/offerwall?appid=${sdkKey}&user_id=${user.uid}`;

  const iframe = document.createElement("iframe");
  iframe.src = offerwallUrl;
  iframe.width = "100%";
  iframe.height = "600";
  iframe.style.border = "none";

  document.getElementById("offerwall-container").appendChild(iframe);
});