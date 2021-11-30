/**
 * Extract the value of the parameter from the given link.
 *
 * @param {string} link - Link
 * @param {string} key - Name of the parameter
 */
function getLinkParamValue(link, key) {
  const url = new URL(link);
  const value = url.searchParams.get(key);

  return value;
}

/**
 * Sent request then execute the given function when the operation is done.
 *
 * @param {string} link - Url
 * @param {function} executable - Use to executable when the ready state change to 4 (note: 4 represent the request operation have completed)
 */
function setupRequest(link, executable) {
  const REQUEST_READY_STATE_DONE = 4;
  const HTTP_STATUS_OK = 200;

  const request = new XMLHttpRequest();

  request.open("GET", link);
  request.onreadystatechange = function () {
    //* Only continue when the operation is done
    if (REQUEST_READY_STATE_DONE === this.readyState) {
      //! Stop when server request is not ok
      if (HTTP_STATUS_OK != this.status) {
        alert(`HTTP Request error with code: [${this.status}]`);
        return;
      }

      //* Parse the response text into json object
      const response = JSON.parse(this.responseText);
      //* Call the given function and pass the response to the given function
      executable(response);
    }
  };

  request.send();
}

/**
 * Get the all relevant genre anime by the given genre id,
 * Then execute the given function when the operation is done.
 *
 * @param {string} id - Id of the anime
 * @param {function} executable - Use to execute when the ready state change to 4 (note: 4 represent the request operation have completed)
 */
function getGenreAnimeById(id, executable) {
  const link = `https://api.jikan.moe/v3/genre/anime/${id}`;

  setupRequest(link, executable);
}

/*********************************************************************************************************************************
 *                                                                                                                               *
 *                                                     Document Object Model                                                     *
 *                                                                                                                               *
 *********************************************************************************************************************************/

/**
 * TL;DR; Make the slider run
 */
function InitSlider() {
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("anime-img-slider");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 10_000); // Change image every 2 seconds
  }
}

function addGenreAnime(animeList) {
  const placeholder = document.getElementById("anime");

  //! Convert 1D array to 2D array (matrix)
  const animeMatrix = [];
  while (animeList.length > 0) {
    animeMatrix.push(animeList.splice(0, 20));
  }
  console.log(animeMatrix);

  let count = 1;

  for (const animeList of animeMatrix) {
    const div = document.createElement("div");

    //! Handle Heading
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.textContent = `Top ${count * 20}`;
    header.appendChild(h1);
    div.appendChild(header);

    //! Handle Figure & Image
    const figure = document.createElement("figure");
    for (const anime of animeList) {
      const article = document.createElement("article");
      const a = document.createElement("a");
      const image = document.createElement("img");

      a.href = `../wiki/wiki.html?id=${anime["mal_id"]}`;
      image.src = anime["image_url"];
      image.alt = anime["title"];
      a.appendChild(image);
      article.appendChild(a);

      const title = document.createElement("h3");
      title.textContent = anime["title"];
      article.appendChild(title);
      figure.appendChild(article);
    }

    count += 1;
    div.appendChild(figure);
    placeholder.appendChild(div);
  }
}

/*********************************************************************************************************************************
 *                                                                                                                               *
 *                                             Region: Run as soon as browser found                                              *
 *                                                                                                                               *
 *********************************************************************************************************************************/

/** If internet not requiest, static webpage */
(function () {
  const isInternetAllow = confirm("Request data from server? TEACHER CLICK CANCEL TO VISIT STATIC WEBSITE!");

  if (!isInternetAllow) {
    window.location.href = "../homex/home.html";
  }
})();

/**
 * Add the image to the background slider and initialize the slider
 */
(function () {
  const filenameArr = ["AttackOnTitan.jpg", "FullMetalAlchemist.jpg", "Gintama.jpg", "Steins;Gate.jpg", "TheEveningSun.jpg"];
  const container = document.getElementById("anime-slider");

  for (const filename of filenameArr) {
    const slider = document.createElement("figure");
    slider.className = "anime-img-slider fade";

    const image = document.createElement("img");
    image.src = `../../asset/image/${filename}`;
    image.alt = filename;

    slider.appendChild(image);
    container.appendChild(slider);
  }

  InitSlider();
})();

/**
 * Get a list of anime by the genre id
 */
(function () {
  const url = document.URL;
  const genre = getLinkParamValue(url, "genre") ? getLinkParamValue(url, "genre").toLowerCase() : null;
  let genreId = 0;

  console.log(genre);

  //! If the genre not found in url
  if (null === genre) {
    const list = document.getElementById("selector");
    const actionGenre = list.children[0];

    actionGenre.className = "active";
  }
  //! IF the genre found in url
  else {
    console.log(genre);
    const list = document.getElementById("selector");
    const itemArr = list.children;

    //* Only get the first one the rest ignore
    for (const item of itemArr) {
      if (item.textContent.toLowerCase() == genre) {
        item.className = "active";
        break;
      }
    }
  }

  //TODO COMBINE THE LOGIC BELOW AND ABOVE
  //! Get the genre id
  const list = document.getElementById("selector");
  const itemArr = list.children;

  //* Only get the first one the rest ignore
  for (const item of itemArr) {
    if (item.classList.contains("active")) {
      genreId = item.getAttribute("value");
      break;
    }
  }

  //!
  getGenreAnimeById(genreId, (response) => {
    addGenreAnime(response["anime"]);
  });
})();

function updateGenre(genre) {
  window.location.href = `./home.html?genre=${genre}`;
}
