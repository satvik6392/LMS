/// not is use as of now --------- Firebase Configurations






// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyBXIuHOGAeAe4shhaLkt1B1x8SrurlCK8c",
//   authDomain: "library-management-syste-92cd2.firebaseapp.com",
//   projectId: "library-management-syste-92cd2",
//   storageBucket: "library-management-syste-92cd2.appspot.com",
//   messagingSenderId: "213786472887",
//   appId: "1:213786472887:web:27b04e44bdd4122ad67832"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);


 
  import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAuth, googleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBXIuHOGAeAe4shhaLkt1B1x8SrurlCK8c",
    authDomain: "library-management-syste-92cd2.firebaseapp.com",
    projectId: "library-management-syste-92cd2",
    storageBucket: "library-management-syste-92cd2.appspot.com",
    messagingSenderId: "213786472887",
    appId: "1:213786472887:web:27b04e44bdd4122ad67832"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById('google-sing-in');
googleLogin.addEventListener("click",()=>{
    alert("ggg");
});

// // Function to handle sign-in
// function signInWithGoogle() {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // The signed-in user info.
//         const user = result.user;
//         console.log('User Info:', user);
//         // You can redirect or update your UI here.
//       })
//       .catch((error) => {
//         console.error('Error during sign-in:', error.message);
//       });
//   }
  
//   // Function to handle sign-out
//   function handleSignOut() {
//     signOut(auth)
//       .then(() => {
//         console.log('User signed out.');
//         // You can redirect or update your UI here.
//       })
//       .catch((error) => {
//         console.error('Error during sign-out:', error.message);
//       });
//   }
  