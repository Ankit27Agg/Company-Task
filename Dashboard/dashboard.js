//*********************** IMPORT STATMENTS ********************* */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getDatabase,ref as databaseRef, set, get, child, update} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"; 
import { getStorage, ref, listAll, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";

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
let dataName = document.getElementsByClassName('data');

function signOut(){
  // console.log('hi signout')
  sessionStorage.removeItem('user')
  window.location='../index.html'
}


//Heading
if(currentUser==null){
  alert('Please click Sign Out and login again.')
  // console.log('bye')
}
else{
  heading[0].innerHTML=`Hello ${currentUser.phoneNumber}`;

  let storage = getStorage(); //get storage reference
    let storageRef = ref(storage, `${currentUser.phoneNumber}/`);
    console.log(storageRef.child)
  
    listAll(storageRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        console.log(itemRef);
        dataName[0].innerHTML+=`${itemRef._location.path_}<br>`
        // storageRef.getDownloadURL().then((URL)=>{
        //   console.log(URL)
        // })
      });
      
    })

    // storageRef.getDownloadURL().then((URL)=>{
    //     console.log(URL)
    //   })

  console.log(currentUser)
}


//PDF files

let reader = new FileReader();


function uploadUrl(URL){

  update(databaseRef(db, 'List'+ currentUser.phoneNumber),
      {
        url: URL
      }
      )
      // .then(()=>{
      //   console.log(URL)
      //   alert('realtime database updated')
      // })
      // .catch((error)=>{
      //   alert('error '+ error)
      // })
}


async function uploadFile(file){
  let storage = getStorage(); //get storage reference
  let storageRef = ref(storage, `${currentUser.phoneNumber}/`+file.name);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state-changed',()=>{

    getDownloadURL(uploadTask.snapshot.ref)
    .then((URL)=>{
      console.log(URL);
      dataName[0].href = `${URL}`
      
      uploadUrl(URL)
    })

  })

  // set(ref(db, 'List'+ currentUser.phoneNumber),
  //     {
  //       phoneNumber: phoneNo.value,
  //       url: URL
  //     }
  //     )
  //     .then(()=>{
  //       alert('url added in firebase')
  //     })


  alert('file uploaded')
}


inputFile.addEventListener('click',()=>{
  selectFile.click();
})


selectFile.onchange = e => {

  let file = e.target.files[0]
  
  if(file.type==='application/pdf'){
    console.log(file)
    let fileName = file.name;
    // uploadFile(file);

    let storage = getStorage(); //get storage reference
    let storageRef = ref(storage, `${currentUser.phoneNumber}/`);

  
    listAll(storageRef)
    .then((res) => {
      // console.log(res.items)
      if(res.items.length<3){
        dataName[0].innerHTML+=`${fileName}<br>`
        uploadFile(file);
      }
      else{
        alert('can not upload more than 3 files')
      }
      res.items.forEach((itemRef) => {
        console.log(itemRef._location.path_)
      });
    })

  }
  else{
    // e.target=null;
    alert('please choose pdf files only')
    // console.log(file)
  }  
}




signout[0].addEventListener('click', signOut);