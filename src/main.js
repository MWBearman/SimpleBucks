import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNMSI88MhyYFTu0tg1kjBgIy3Wr8IIn1s",
  authDomain: "simplebucks-80557.firebaseapp.com",
  projectId: "simplebucks-80557",
  storageBucket: "simplebucks-80557.firebasestorage.app",
  messagingSenderId: "214393414619",
  appId: "1:214393414619:web:940b6b3a61dbe1e4403dfe",
  measurementId: "G-Q520HJQKGW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("user-info");

loginBtn.onclick = () => signInWithPopup(auth, provider);

logoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.innerHTML = `
      <p>Hello, ${user.displayName}</p>
      <p>User ID: ${user.uid}</p>
    `;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    userInfo.innerHTML = "";
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
});