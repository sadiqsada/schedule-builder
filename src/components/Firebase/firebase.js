import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCwl0ovb07UN7JfJLzC-iANDgZQhcVCPAc",
  authDomain: "cse316-hw4-cadac.firebaseapp.com",
  databaseURL: "https://cse316-hw4-cadac.firebaseio.com",
  projectId: "cse316-hw4-cadac",
  storageBucket: "cse316-hw4-cadac.appspot.com",
  messagingSenderId: "598968152261",
  appId: "1:598968152261:web:2dd483802ee8ff7f6a80ac",
  measurementId: "G-WFTB9GMXC5"
};

firebase.initializeApp(firebaseConfig);

export default firebase;