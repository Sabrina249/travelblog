// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDmM6JK1c-fx6xRvUkbDTu6rRG7cp74-40",
    authDomain: "micro-blog-ce470.firebaseapp.com",
    databaseURL: "https://micro-blog-ce470.firebaseio.com",
    projectId: "micro-blog-ce470",
    storageBucket: "micro-blog-ce470.appspot.com",
    messagingSenderId: "909040320024",
    appId: "1:909040320024:web:2bbebfc183df0307344d6d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const errorFrontend = () =>
    `<div class="container mx-auto max-w-sm rounded overflow-hidden shadow-lg justify-center bg-red-500 m-12">
      <p class="text-black text-xs italic">Username and password do not match!</p>
    </div>`


  const login = (e) =>{
    e.preventDefault();
    const email = document.getElementById("username").value
    const password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(()=>{
        window.location.href = "file:///C:/Users/sschr/Desktop/Hamburgcodingschool/Projekt1/mapadmin.html"
      })
      .catch((error) => {
    // Handle Errors here.
        const html = errorFrontend ()
        content.innerHTML = html
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage)
    // ...
  });
  }

document.getElementById("loginForm").addEventListener("submit", login);
