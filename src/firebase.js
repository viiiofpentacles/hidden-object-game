import { initializeApp } from "firebase/app";
import getConfig from "./getConfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const config = getConfig();
const app = initializeApp(config);
const storage = getStorage(app);
const db = getFirestore(app);

function retrieveImage() {
    getDownloadURL(ref(storage, 'gs://hidden-object-game-3372e.appspot.com/930px-Last_Judgement_(Michelangelo).jpg'))
  .then((url) => {
    const img = document.getElementById('loaded-image');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    throw error;
  });
}

export { retrieveImage };