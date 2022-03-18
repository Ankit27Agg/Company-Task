//*********************** IMPORT STATMENTS ********************* */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getDatabase, set, get, child} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";

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

let signout = document.getElementsByClassName('signOut')
let heading = document.getElementsByClassName('dashboard-heading');
let currentUser = JSON.parse(sessionStorage.getItem('user'));
let inputFile = document.querySelector('.input-file')
// console.log(inputFile)
let selectFile = inputFile.querySelector('.select-file')

function signOut(){
  // console.log('hi signout')
  sessionStorage.removeItem('user')
  window.location='../index.html'
}


//Heading
if(currentUser==null){
  alert('Please Sign Out and login again.')
  // console.log('bye')
}
else{
  heading[0].innerHTML=`Hello ${currentUser.phoneNumber}`;
  console.log(currentUser)
}


//PDF files

let reader = new FileReader();
let dataName = document.getElementsByClassName('data');

async function uploadFile(file){
  const storage = getStorage(); //get storage reference
  const storageRef = ref(storage, `${currentUser.phoneNumber}/`+file.name);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state-changed',()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((URL)=>{
      console.log(URL);
      dataName[0].href = `${URL}`
    })
  })

  set(ref(db, 'List'+ currentUser.phoneNumber),
      {
        phoneNumber: phoneNo.value,
        url: URL
      }
      )
      .then(()=>{
        alert('url added in firebase')
      })
  // getDownloadURL(storageRef)
  // .then((url) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = (event) => {
  //     const blob = xhr.response;
  //   };
  //   xhr.open('GET', url);
  //   xhr.send();

  //   console.log(url)
  // });

  alert('file uploaded')
}


inputFile.addEventListener('click',()=>{
  selectFile.click();
})


selectFile.onchange = e => {
  
  let file = e.target.files[0]
  if(file.type==='application/pdf'){
    console.log(file.type)
    let fileName = file.name;

    dataName[0].innerHTML+=`${fileName}<br>`;
    // reader.readAsDataURL(file);
    // console.log(reader)
    uploadFile(file);
  }
  else{
    // e.target=null;
    alert('please choose pdf files only')
    // console.log(file)
  }
  
  // if(file){
  //   let fileName = file.name;
  //   dataName[0].innerHTML=fileName;
  //   reader.readAsDataURL(file);
  //   console.log(reader)
  //   uploadFile(file);
  // }
  
}




signout[0].addEventListener('click', signOut);