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


// const content = document.getElementById("content");

// Get blog posts
// const markerWindow = [];

const newInfoWindow = [];

// const closeInfoWindows = () => {
// 	for (let i = 0; i < newInfoWindow.length; i++) {
// 		const newInfoWindow = newInfoWindow[i];
// 		newInfoWindow.close();
// 	}
// };

db.collection("posts").get()
  .then((posts) => {
    posts.forEach((post) => {
      const json = post.data();
      const positionLong = json.longitude;
      // console.log(positionLong);
      const positionLati = json.latitude;
      // console.log(positionLati);
      const marker = new google.maps.Marker({
        position: {
          lat: positionLati,
          lng: positionLong
        },
        map: map,
      });
      const html = createPostHtml(json);
      const div = document.createElement("div");
      div.innerHTML = html;
      const weatherElement = div.querySelector("#weather");
      const cityName = posts.city;
      fetchWeather(weatherElement, cityName);
      const contentWindow = new google.maps.InfoWindow({
        content: createPostHtml(json)
      });
      marker.addListener('click', () => {
        for (let i = 0; i < newInfoWindow.length; i++) {
          const newInfoWindowClose = newInfoWindow[i];
          newInfoWindowClose.close();
        };
        contentWindow.open(map, marker);
      });
      newInfoWindow.push(contentWindow);
      console.log(newInfoWindow)
    })
  });



// const json = posts.data();
// // json
// const html = createPostHtml(json);
// const div = document.createElement("div");
// div.innerHTML = html;
// // const weatherElement = div.querySelector("#weather");
// const cityName = posts.city;
// // fetchWeather(weatherElement, cityName);
// const infowindow = new google.maps.InfoWindow({
//   content: createPostHtml(posts)
// });
//
// marker.addListener('click', () => {
//   infowindow.open(map, marker);
// });
//   });
// });

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
    console.log ("Wetter", weather);
    element.innerHTML = weather;
})
  .catch(error => {
    console.error(error)
  })
}

// Create new blog post

// const createNewBlogPost = (e) => {
//   e.preventDefault();
//
//   // get values from form
//   const title = document.getElementById("title").value;
//   const text = document.getElementById("text").value;
//   const city = document.getElementById("city").value;
//   const country = document.getElementById("country").value;
//   console.log(title, text, city, country);
//   const date = new Date();
//
//   // send to Firestore
//   db.collection("posts").add({
//     title: title,
//     text: text,
//     location: {
//       city: city,
//       country: country
//     },
//     date: date,
//     author: "Teresa Holfeld",
//     author_image: "img/teresa-holfeld.jpg"
//   })
//   .then(docRef => {
//       console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(error => {
//       console.error("Error adding document: ", error);
//   });
//
// }

// document.getElementById("newPostForm").addEventListener("submit", createNewBlogPost);

var map;

var dasStyleArray = [
  {
      "stylers": [{
          "hue": "#fbb6ce"
        }]
      },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
              "lightness": 100
            },
            {
              "visibility": "simplified"
            }]}
          ]


      function initMap() {
        var mapOptions = {
          zoom: 8,
          center: {
            lat: 53.5753200,
            lng: 10.0153400
          }
        };
        map = new google.maps.Map(document.getElementById('map'),
          mapOptions);

        var marker = new google.maps.Marker({
          // The below line is equivalent to writing:
          // position: new google.maps.LatLng(-34.397, 150.644)
          position: {
            lat: -34.397,
            lng: 150.644
          },
          map: map
        });
        map.setOptions({
          styles: dasStyleArray
        });
      }
