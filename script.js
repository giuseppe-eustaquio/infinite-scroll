// get elements

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "dTJne2IABAzwAk6B-8N7SayVWdIQKhmxRR-L0BWu-Is";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// functions

// create elements for links and photos, add to DOM

// helper function to set attribute on DOM elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
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
    console.log(photosArray);

    displayPhotos();
  } catch (error) {
    // catch error here
    console.log(error);
  }
}

// On load
getPhotos();
