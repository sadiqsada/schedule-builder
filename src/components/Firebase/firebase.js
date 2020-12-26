import { Portal } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/database';

// const firebaseConfig = {
//   apiKey: "AIzaSyCwl0ovb07UN7JfJLzC-iANDgZQhcVCPAc",
//   authDomain: "cse316-hw4-cadac.firebaseapp.com",
//   databaseURL: "https://cse316-hw4-cadac.firebaseio.com",
//   projectId: "cse316-hw4-cadac",
//   storageBucket: "cse316-hw4-cadac.appspot.com",
//   messagingSenderId: "598968152261",
//   appId: "1:598968152261:web:2dd483802ee8ff7f6a80ac",
//   measurementId: "G-WFTB9GMXC5"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
