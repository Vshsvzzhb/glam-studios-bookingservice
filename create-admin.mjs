
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoDHrv397jsdz3n_r6uW-jO4ffXHdVVf8",
  authDomain: "glam-studio-pos.firebaseapp.com",
  projectId: "glam-studio-pos",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdmin() {
  try {
    const cred = await createUserWithEmailAndPassword(auth, "admin@glamstudios.id", "glamadmin123");
    console.log("Auth User created:", cred.user.uid);
    try {
        await setDoc(doc(db, "users", cred.user.uid), {
            name: "Admin Staff",
            email: "admin@glamstudios.id",
            role: "owner"
        });
        console.log("User doc created as owner");
        await setDoc(doc(db, "app_meta", "stats"), { initialized: true });
    } catch(e) {
        console.log("Could not set as owner, trying as kasir...", e.message);
        await setDoc(doc(db, "users", cred.user.uid), {
            name: "Admin Staff",
            email: "admin@glamstudios.id",
            role: "kasir"
        });
        console.log("User doc created as kasir");
    }
    console.log("SUCCESS!");
    process.exit(0);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
        console.log("User already exists! You can just use it.");
        process.exit(0);
    } else {
        console.error("Error:", error);
    }
    process.exit(1);
  }
}

createAdmin();

