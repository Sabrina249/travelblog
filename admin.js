// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    const div = document.createElement("div")
    div.innerHTML = `<button onclick="logout()" class="inline-block text-sm px-4 py-2 leading-none border rounded text-pink-900 border-white hover:border-transparent hover:text-pink-900 hover:bg-pink mt-4 lg:mt-0" type="submit">
            Log Out</button>`
    logoutButton.append(div.firstChild)
  } else {
    // No user is signed in.
    window.location.href = "file:///C:/Users/sschr/Desktop/Hamburgcodingschool/Projekt1/login.html"
  }
});

const logout = () => {
firebase.auth().signOut().then(function() {
// Sign-out successful.
console.log("logout successfull")
window.location.href = "file:///C:/Users/sschr/Desktop/Hamburgcodingschool/Projekt1/login.html"
}).catch(function(error) {
// An error happened.
console.log("logout not successfull")

});
}

  db.collection("posts").get()
  .then((posts) => {
    posts.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const json = doc.data();
        const html = newBlogPost(json);
        const newDiv = document.createElement("div")
        newDiv.innerHTML = html
        const weatherElement = newDiv.querySelector("#weather")
        const cityName = json.location.city
        weatherLocation(weatherElement, cityName)
        content.append(newDiv.firstChild)
    });
});

const newBlogPost = (posts, weather) =>
  `<div class="container mx-auto max-w-sm rounded overflow-hidden shadow-lg justify-center bg-white m-6">
    <img class="w-full" src="${posts.image ? posts.image.src: ""}" alt="${posts.image ? posts.imageAlt: ""}">
       <div class="px-6 py-4">
         <div class="font-bold text-xl mb-2">${posts.title}</div>
         <p class="text-gray-700 text-base">${posts.description}</p>
       </div>
        <div class="px-6 py-4 flex items-center">
          <img class="w-10 h-10 rounded-full mr-4" src="${posts.authorImage ? posts.authorImage.src: ""}" alt="${posts.author}">
          <div class="text-sm">
          <p class="text-gray-900 leading-none">${posts.author}</p>
          <p class="text-gray-600">${posts.date.toDate ? posts.date.toDate().toDateString() : posts.date}</p>
          </div>
        </div>
        <div class="px-6 py-4">${posts.location.city}, ${posts.location.country}</div>
        <div class="px-6 py-4">Current weather: <span id="weather"></span> </div>
      </div>
    </div>`;

const weatherLocation = (element, city) => {
fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5aa80dd64429a526f1f80921fc784bb7`)
  .then (res => res.json())
  .then (json => {
    const weather = json.weather[0].main;
    console.log ("Weather", weather);
    element.innerHTML = weather;
})
  .catch(error => {
    console.error(error)
  })
}

//create newBlogPost
// e für Event bei Nutzung EventListener


const createNewBlogPost = (e) => {
  e.preventDefault();
  // console.log("Triggered")
  //get values from newPostForm
  const city = document.getElementById("grid-city").value
  console.log(city)
  const country = document.getElementById("grid-country").value
  console.log(country)
  const author = document.getElementById("grid-author").value
  console.log(author)
  const title = document.getElementById("grid-title").value
  console.log(title)
  const description = document.getElementById("grid-description").value
  console.log(description)
  const date = new Date ()
  console.log(long)
  console.log(lat)
  //send to firestore
  db.collection("posts").add({
      title: title,
      description: description,
      location: {
        city: city,
        country: country
      },
      date: date,
      author: "Sabrina Schramme",
      author_image: "authorImage.jpg",
      longitude: long,
      latitude: lat
  })
  .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
        location.reload(true);
      // empty (newLong);
  })
  .catch(error => {
      console.error("Error adding document: ", error);
  })
  ;
}

document.getElementById("newPostForm").addEventListener("submit", createNewBlogPost)

let long = "";

const coordinates = (city, country) => {
  const cityCoordinates = document.getElementById("grid-city").value
  console.log(cityCoordinates)
  const countryCoordinates = document.getElementById("grid-country").value
  console.log(countryCoordinates)
fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${cityCoordinates},${countryCoordinates}&key=...`)
  .then (res => res.json())
  .then (json => {
    long = json.results[0].geometry.location.lng;
    lat = json.results[0].geometry.location.lat;
    // const newDivLong = document.createElement("div")
    // newDivLong.innerHTML = long
    // longitude.append(long)
    // console.log(long)
  })
  .catch(error => {
    console.error(error);
  })
}

let lat = "";

// const coordinatesLat = (city, country) => {
//   const cityCoordinates = document.getElementById("grid-city").value
//   console.log(cityCoordinates)
//   const countryCoordinates = document.getElementById("grid-country").value
//   console.log(countryCoordinates)
// fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${cityCoordinates},${countryCoordinates}&key=...`)
//   .then (res => res.json())
//   .then (json => {
//     long = json.results[0].geometry.location.lat;
//     // const newDivLong = document.createElement("div")
//     // newDivLong.innerHTML = long
//     // longitude.append(long)
//     // console.log(long)
//   })
//   .catch(error => {
//     console.error(error);
//   })
// }


// const coordinatesLong = (city, country) => {
//   const cityCoordinates = document.getElementById("grid-city").value
//   console.log(cityCoordinates)
//   const countryCoordinates = document.getElementById("grid-country").value
//   console.log(countryCoordinates)
// fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${cityCoordinates},${countryCoordinates}&key=...`)
//   .then (res => res.json())
//   .then (json => {
//     long = json.results[0].geometry.location.lng;
//     // console.log ("longitude", long);
//     // element.innerHTML = weather;
//     lat = json.results[0].geometry.location.lat;
//         // console.log ("Latitude", lat);
//         return(long.value,lat.value)
// })
//   .catch(error => {
//     console.error(error)
//   })
// }

//
document.getElementById("search").addEventListener("click", coordinates)

// coordinates (location)

// const changed = false
// const countryArea = document.getElementById("grid-country")
// countryArea.onchange = function() {
//   // const city = getElementById("grid-city")
//   // const country = getElementById("grid")
//   fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=${grid-city},${grid-country}&key=...`)
//     .then (res => res.json())
//     .then (json => {
//       const long = json.results[0].geometry.location.lng;
//       console.log ("longitude", long);
//       // element.innerHTML = weather;
//       const lat = json.results[0].geometry.location.lat;
//           console.log ("Latitude", lat);
//           changed = true
//   })
//     .catch(error => {
//       console.error(error)
//     })
//   }

// document.getElementById("search").addEventListener("button", coordinates)
