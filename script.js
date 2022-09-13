// get elements

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// Unsplash API
let count = 5;
const apiKey = "dTJne2IABAzwAk6B-8N7SayVWdIQKhmxRR-L0BWu-Is";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// functions

// check if all images were loaded

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    imagesLoaded = 0;
    loader.hidden = true;

    // update count AND apiUrl after the initial load
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// create elements for links and photos, add to DOM

// helper function to set attribute on DOM elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  totalImages = photosArray.length;
  // run function for each object in photosArray

  photosArray.forEach((photo) => {
    // create <a> to link to unsplash

    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    // using helper function

    setAttributes(item, {
      href: photo.links.html,
      target: "blank",
    });

    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    // using helper function

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // event listener when each is finished loading
    img.addEventListener("load", imageLoaded);

    // put <img> inside <a> and put both inside imageContainer

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    // catch error here
    console.log(error);
  }
}

// add event listeners

// check to see if scrolling near bottom of the page

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
