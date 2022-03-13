//***********************IMPORT STATMENTS********************* */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getDatabase, ref, set, get, child} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 


const firebaseConfig = {
  apiKey: "AIzaSyAMqIwyT6kw54_FnT2GmyR5l8UYeDBZklU",
  authDomain: "company-b4fed.firebaseapp.com",
  databaseURL: "https://company-b4fed-default-rtdb.firebaseio.com",
  projectId: "company-b4fed",
  storageBucket: "company-b4fed.appspot.com",
  messagingSenderId: "873037321248",
  appId: "1:873037321248:web:9a43344c34894195291845",
  measurementId: "G-4NBKLZLBV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();



//************************GET EVENTS FROM HTML*********************************** */
const phoneNo = document.getElementById('phone-no');
const login = document.getElementsByClassName('login-btn')
const register = document.getElementsByClassName('register-btn')


//****************************VALIDATION FOR PHONE NUMBER********************************* */
const validation = () => {
  // let phoneVal = /^\d{10}$/;
  let phoneVal = /^[0-9]+$/;

  if(!phoneVal.test(phoneNo.value)){
    alert('Wrong Input OR field is empty');
    return false;
  }
  return true;
}





//***********************REGISTER USER TO THE FIREBASE************************ */
const registerUser = () => {
  
  if(!validation()){
    return;
  }

  const dbRef = ref(db)
  get(child(dbRef, "List"+ phoneNo.value))
  .then((user)=>{
    
    if(user.exists()){
      alert('User Already exists.')
    }

    else{
      set(ref(db, 'List'+ phoneNo.value),
      {
        phoneNumber: phoneNo.value
      }
      )
      .then(()=>{
        alert(`${phoneNo} added successfully`)
      })
      .catch((error)=>{
        alert('error '+ error)
      })
    }
  })
}



register[0].addEventListener('click', registerUser);