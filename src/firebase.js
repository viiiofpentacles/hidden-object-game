import { initializeApp } from "firebase/app";
import getConfig from "./getConfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";

const config = getConfig ();
const app = initializeApp(config);
const storage = getStorage(app);
const db = getFirestore(app);

function retrieveImage () {
  getDownloadURL(ref(storage, 'gs://hidden-object-game-3372e.appspot.com/930px-Last_Judgement_(Michelangelo).jpg'))
  .then((url) => {
    const img = document.getElementById('loaded-image');
    if (img) {
    img.setAttribute('src', url);
  };
  })
  .catch((error) => {
    return error;
  });
}

async function findCoords (person) {
  const docRef = doc(db, 'coords', person);
  const coords = await getDoc(docRef);
  const retrieveCoords = coords.data();
  return retrieveCoords;
}

async function retrieveScoreboard () {
  const getScoreboard = await getDocs(collection(db, 'scoreboard'));
  let scoresList = [];
  getScoreboard.forEach((doc) => {
    scoresList.push(doc.data());
  })
  return scoresList;
}

export { retrieveImage, findCoords, retrieveScoreboard };