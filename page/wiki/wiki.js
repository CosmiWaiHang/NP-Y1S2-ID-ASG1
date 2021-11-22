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

      //TODO: delete this console.log
      console.log(response);
    }
  };

  request.send();
}

/**
 * Get the anime detail by the given id,
 * Then execute the given function when the operation is done.
 *
 * @param {string} id - Id of the anime
 * @param {function} executable - Use to execute when the ready state change to 4 (note: 4 represent the request operation have completed)
 */
function getAnimeById(id, executable) {
  const link = `https://api.jikan.moe/v3/anime/${id}`;

  setupRequest(link, executable);
}

/**
 * Get the anime news by the give id,
 * Then execute the given fucntino when the opration is done.
 *
 * @param {string} id - Id of the anime
 * @param {function} executable - Use to execute when the ready state change to 4 (note: 4 represent the request operation have completed)
 */
function getAnimeNewsById(id, executable) {
  const link = `https://api.jikan.moe/v3/anime/${id}/news`;

  setupRequest(link, executable);
}

function getAnimeCharactersById(id, executable) {
  const link = `https://api.jikan.moe/v3/anime/${id}/characters_staff`;

  setupRequest(link, executable);
}

/**
 * Add the external link to the wikipage.
 *
 * @param {object} linkList - A list of external link and name.
 */
function addExternalLinkButton(linkList) {
  const wordList = ["Seize", "Go", "Click", "Snag", "Grip"];
  const placeholder = document.querySelector("#nav-anime-external-link");

  for (let i = 0; i < linkList.length; i++) {
    const link = linkList[i];
    const randomNumber = Math.floor(Math.random() * 5);

    const outerDiv = document.createElement("div");
    outerDiv.className = "ph-btn";

    const innerDiv = document.createElement("div");
    innerDiv.className = "ph-btn-ctn";

    const anchor = document.createElement("a");
    anchor.href = link["url"];
    anchor.className = "btn btn-efct-cln";
    anchor.setAttribute("data-sm-link-text", `${wordList[randomNumber]}! ;\`)`);
    anchor.target = "_anime_external_link";

    const span = document.createElement("span");
    span.textContent = link["name"];

    anchor.appendChild(span);
    innerDiv.appendChild(anchor);
    outerDiv.appendChild(innerDiv);
    placeholder.appendChild(outerDiv);
  }
}

function addNewsCard(newsList) {
  let count = 0;
  const placeholder = document.querySelector("#ph-news-and-character #section-news");

  //! Only add maximium 3 news article
  for (let i = 0; i < newsList.length && count < 3; i++) {
    const news = newsList[i];

    //! Don't add the news when there is no image
    if (null == news["image_url"]) {
      return;
    }

    const article = document.createElement("article");

    //! Handle figure image
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = news["image_url"];
    image.alt = news["title"];

    figure.appendChild(image);
    article.appendChild(figure);

    //! Handle news
    const header = document.createElement("header");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    h3.textContent = news["title"];
    p.textContent = news["intro"];

    header.appendChild(h3);
    header.appendChild(p);
    article.appendChild(header);

    //! Finalized
    placeholder.appendChild(article);
    count++;
  }
}

/*********************************************************************************************************************************
 *                                                                                                                               *
 *                                             Region: Run as soon as browser found                                              *
 *                                                                                                                               *
 *********************************************************************************************************************************/
(function () {
  const url = document.URL;
  const id = getLinkParamValue(url, "id");

  getAnimeById(id, (response) => {
    const section = document.querySelector("#section-anime-synopsis");

    //! Handle figure image
    const figure = section.querySelector("#figure-anime");
    const image = figure.querySelector("#image-anime");

    image.src = response["image_url"];
    image.alt = response["title_japanese"];

    //! Handle Article
    const article = section.querySelector("#article-anime");
    const header = article.querySelector("header > h1");
    const paragraph = article.querySelector("p");

    header.textContent = response["title_japanese"];
    paragraph.textContent = response["synopsis"];

    //! Handle External Link
    addExternalLinkButton(response["external_links"]);
  });
})();

//* Handle News
(function () {
  const url = document.URL;
  const id = getLinkParamValue(url, "id");

  getAnimeNewsById(id, (response) => {
    addNewsCard(response["articles"]);
  });
})();

//* Handle Characters
(function () {
  const url = document.URL;
  const id = getLinkParamValue(url, "id");

  getAnimeCharactersById(id, (response) => {});
})();