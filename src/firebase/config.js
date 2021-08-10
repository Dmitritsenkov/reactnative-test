import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnX02v3tpGOUgrWtTHskZdUFh_bbiIs04",
  authDomain: "reactnative-test-735b6.firebaseapp.com",
  databaseURL: "https://reactnative-test-735b6.firebaseio.com",
  projectId: "reactnative-test-735b6",
  storageBucket: "reactnative-test-735b6.appspot.com",
  messagingSenderId: "592626394698",
  appId: "1:592626394698:web:7d020b2c69c8c281eca8b3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
