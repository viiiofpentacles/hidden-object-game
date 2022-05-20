import { initializeApp } from "firebase/app";
import { getConfig } from "./getConfig";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const config = getConfig();
const app = initializeApp(config);
const storage = getStorage(app);
const db = getFirestore(app);
