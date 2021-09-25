import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyB-PmJSCaAEW19xoMKd9p_8nXZ3tsXO2bA",
  authDomain: "firstfirebase-2d5b1.firebaseapp.com",
  projectId: "firstfirebase-2d5b1",
  storageBucket: "firstfirebase-2d5b1.appspot.com",
  messagingSenderId: "454023719565",
  appId: "1:454023719565:web:32a31d6cea43665b79d0c4"

};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const g_auth = firebase.auth; // 스태틱 인스턴스에 접근하기 위하여 추가함
export const db = firebase.firestore()
