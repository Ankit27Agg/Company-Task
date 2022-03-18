//*********************** IMPORT STATMENTS ********************* */
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



//************************  GET EVENTS FROM HTML  *********************************** */
const phoneNo = document.getElementById('phone-no');
const register = document.getElementsByClassName('register-btn')
const logIn = document.getElementsByClassName('login-btn');

//****************************  VALIDATION FOR PHONE NUMBER ********************************* */
const validation = () => {
  // let phoneVal = /^\d{10}$/;
  let phoneVal = /^[0-9]+$/;

  if(!phoneVal.test(phoneNo.value)){
    alert('Wrong Input OR field is empty');
    window.location='index.html';
    return false;
  }
  return true;
}





//*********************** REGISTER USER TO THE FIREBASE ************************ */
const registerUser = () => {

  if(!validation()){
    return;
  }

  const dbRef = ref(db)
  get(child(dbRef, "List"+ phoneNo.value))
  .then((user)=>{
    
    if(user.exists()){
      alert('User Already Registered.')
    }

    else{
      set(ref(db, 'List'+ phoneNo.value),
      {
        phoneNumber: phoneNo.value
      }
      )
      .then(()=>{
        alert(`${phoneNo.value} Registered successfully. Login to view your Dashboard.`)
        phoneNo.value='';
      })
      .catch((error)=>{
        alert('error '+ error)
      })
    }
  })
}



register[0].addEventListener('click', registerUser);




//**********************  LOGIN PART  ************************** */

const loginUser = (user) => {
  console.log('hi login')
  sessionStorage.setItem('user',JSON.stringify(user));
  console.log(user)
  window.location='../Dashboard/dashboard.html'; //it tells after login where page should go.
}

const checkLoginUser = () => {

  const dbRef = ref(db)

  get(child(dbRef, "List"+ phoneNo.value))
  .then((user)=>{
    
    if(user.exists()){
      loginUser(user.val());
    }

    else{
      alert('User is not registered')
      phoneNo.value='';
    }
  })

}

logIn[0].addEventListener('click',checkLoginUser)