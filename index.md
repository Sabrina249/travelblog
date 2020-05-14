<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <title></title>
    <link href="tailwind.min.css" rel="stylesheet">
    <link href="homes.css" rel="stylesheet">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 70%;
        width: 50%;
        margin-right: 50px;
        margin-top: 50px;
        margin-left: 750px;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
        body {
        background-image: url("backgroundImage.jpg");
        background-size:100%;
      }
      .rosaBackground {
        background-color: rgb(251,182,206, 0.75);
      }
    </style>
  </head>
  <body>
    <nav class="flex items-center justify-between flex-wrap rosaBackground p-6">
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-white  border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a href="impressum.html" class="block mt-4 lg:inline-block lg:mt-0 text-pink-900 hover:text-white mr-4">
            Impressum
          </a>
          <a href="contact.html" class="block mt-4 lg:inline-block lg:mt-0 text-pink-900 hover:text-white">
            Contact
          </a>
        </div>
        <div class="invisible md:visible lg:flex-grow">
          <div class="flex items-center text-pink-900 mr-6">
          <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
          <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>
          </div>
        </div>
        <div>
          <a href="admin.html" class="inline-block text-sm px-4 py-2 leading-none border rounded text-pink-900 border-white hover:border-transparent hover:text-pink-900 hover:bg-pink mt-4 lg:mt-0">Admin</a>
        </div>
        <div class="logoutButton"></div>
        <img src="gs://micro-blog-ce470.appspot.com/userPhotos/gd2minAk0Xg9cKXdNOaR3TX0jOh1.jpg" alt="" style="100px">
    </nav>
    <div id="map"></div>
    <script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-firestore.js"></script>
    <script src="mapadmin.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=...&callback=initMap"
    async defer></script>
  </body>
</html>
