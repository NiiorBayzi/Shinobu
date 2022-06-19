const FirebaseUtil = require("firebase-util.js");
const dbF = new FirebaseUtil({
  apiKey: "AIzaSyDPDNUfk1IIlcphWfcw-PhLzuNx1N0TQTI",
  authDomain: "ryomen-sukuna.firebaseapp.com",
  databaseURL: "https://ryomen-sukuna-default-rtdb.firebaseio.com",
  projectId: "ryomen-sukuna",
  storageBucket: "ryomen-sukuna.appspot.com",
  messagingSenderId: "314777611908",
  appId: "1:314777611908:web:a3c3dfa1ef15dac0075cd1",
  measurementId: "G-F2H4QN02GS"
});

let fb = {
  get: (path) => {
    (async () => {
      return await dbF.get(path);
    })();
  },
  all: () => {
    (async () => {
      return await dbF.all();
    })();
  },
  set: (path, value) => {
    db.set(path, value);
    return true;
  }
}

global.db = {...fb}
