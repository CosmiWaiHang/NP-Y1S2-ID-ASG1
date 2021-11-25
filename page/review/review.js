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
      console.log(response);
      console.log(link);
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
function getAnimeEpisodesById(id, executable) {
  const link = `https://api.jikan.moe/v3/anime/${id}/episodes`;

  setupRequest(link, executable);
}

/**
 * Get the anime picture by the given id,
 * Then execute the given function when the operation is done.
 *
 * @param {string} id = Id of the anime
 * @param {function} executable - Use to execute when the ready state change to 4 (note: 4 represent the request operation have completed)
 */
function getAnimePictureById(id, executable) {
  const link = `https://api.jikan.moe/v3/anime/${id}/pictures`;

  setupRequest(link, executable);
}

/**
 * Get the anime review by the given anime id,
 * Then execute the given function when the operation is done.
 *
 * @param {string} id - Id of the anime
 * @param {function} executable - Use to execute when the ready state change to 4 (note: 4 represent the request operation have completed)
 */
function getAnimeReviewById(id, executable) {
  const link = `https://api.jikan.moe/v3/anime/${id}/reviews`;

  setupRequest(link, executable);
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
 * Get the anime detail by the given id,
 * Then execute the given function when operation is done.
 *
 * @param {string} id - Id of the anime
 * @param {function} executable - Use to execute when the ready state change to 4 (note: 4 represent the request operation have completed)
 */
function getAnimeRecommendationsById(id, executable) {
  const link = `https://api.jikan.moe/v3/anime/${id}/recommendations`;

  setupRequest(link, executable);
}

/**
 * Generate random number within the array length
 * Then get and return the emoticon from the array
 *
 * @returns Random emoticon
 */
function getEmoticon() {
  const emoticonArr = ["ヾ(≧▽≦*)o", "o(*≧▽≦)ツ", "～(￣▽￣～)(～￣▽￣)～", "<(￣︶￣)>", "︿(￣︶￣)︿", "o(￣▽￣)ｄ", "*´∀`)´∀`)*´∀`)*´∀`)", "(｡･∀･)ﾉﾞ", "(๑•̀ㅂ•́)و✧", "ヾ(≧∇≦*)ゝ", "(u‿ฺu✿ฺ)", "（゜▽＾*））", "(*^▽^*)", "ヽ(✿ﾟ▽ﾟ)ノ", "♪(^∇^*)", "(≧∀≦)ゞ", "(๑¯∀¯๑)", "φ(≧ω≦*)♪", "(　ﾟ∀ﾟ) ﾉ♡"];
  const random = Math.floor(Math.random() * emoticonArr.length);

  return emoticonArr[random];
}

/*********************************************************************************************************************************
 *                                                                                                                               *
 *                                                     Document Object Model                                                     *
 *                                                                                                                               *
 *********************************************************************************************************************************/

function addAnimeImageElement(pictureArr) {
  const imageGallery = document.getElementById("image-gallery");
  let picture;

  for (let i = 0; i < pictureArr.length; i++) {
    picture = pictureArr[i];

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const blurImage = document.createElement("img");

    image.src = picture["large"];
    image.alt = "";

    blurImage.src = picture["large"];
    blurImage.alt = "";

    figure.className = "background-blur";
    figure.appendChild(image);
    figure.appendChild(blurImage);

    imageGallery.appendChild(figure);
  }
}

function addEpisodeButton(episodeArr) {
  const placeholder = document.getElementById("epsiode");
  let button;

  for (let i = 0; i < episodeArr.length; i++) {
    const episode = episodeArr[i];

    const hasOutline = false;
    const navTo = episode["video_url"];
    const hoverText = getEmoticon();
    const text = episode["episode_id"];
    const isBlink = false;

    button = new Button(hasOutline, navTo, hoverText, text, isBlink);

    placeholder.appendChild(button.me);
  }
}

function addReview(reviewArr) {
  const placeholder = document.getElementById("review");

  for (const review of reviewArr) {
    const article = document.createElement("article");

    //! Handle profile picture of the user
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const a = document.createElement("a");

    image.src = review["reviewer"]["image_url"];
    image.alt = review["reviewer"]["username"];
    a.href = review["reviewer"]["url"];

    figure.appendChild(image);
    a.appendChild(figure);
    article.appendChild(a);

    //! Handle review given by the user
    const section = document.createElement("section");

    //* Handle the username and review posted time
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    const time = document.createElement("time");

    h1.textContent = review["reviewer"]["username"];
    time.textContent = review["date"];

    header.appendChild(h1);
    header.appendChild(time);
    section.appendChild(header);

    //* Handle the review
    const detail = document.createElement("details");
    const summary = document.createElement("summary");
    const p = document.createElement("p");

    summary.textContent = "Says: ";
    p.textContent = review["content"];

    detail.append(summary);
    detail.append(p);
    detail["open"] = true;

    section.appendChild(detail);
    article.append(section);

    //! Add the html
    placeholder.appendChild(article);
  }
}

function addRecommendations(recommendationArr) {
  const placeholder = document.getElementById("section-recommendation");

  for (const recommendation of recommendationArr) {
    const aside = document.createElement("aside");

    //! Image
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const a = document.createElement("a");

    //! Redirection
    a.href = recommendation["url"];

    image.src = recommendation["image_url"];
    image.alt = recommendation["title"];
    figure.appendChild(image);
    a.appendChild(figure);
    aside.appendChild(a);

    //! Title
    const header = document.createElement("header");
    const h3 = document.createElement("h3");
    h3.textContent = recommendation["title"];
    header.appendChild(h3);
    aside.appendChild(header);

    placeholder.appendChild(aside);
  }
}

/*********************************************************************************************************************************
 *                                                                                                                               *
 *                                              Function based object (I mean CLASS)                                             *
 *                                                                                                                               *
 *********************************************************************************************************************************/

class Button {
  constructor(hasOutline, navTo, hoverText, text, isBlink) {
    this.hasOutline = hasOutline;
    this.navTo = navTo;
    this.hoverText = hoverText;
    this.text = text;
    this.isBlink = isBlink;
  }

  get me() {
    const outer = this.#getOuterDiv();
    const inner = this.#getInnerDiv();
    const anchor = this.#getAnchor();
    const span = this.#getSpan();

    anchor.appendChild(span);
    inner.appendChild(anchor);
    outer.appendChild(inner);

    return outer;
  }

  #getOuterDiv = () => {
    const div = document.createElement("div");
    div.className = "ph-btn";

    return div;
  };

  #getInnerDiv = () => {
    const div = document.createElement("div");
    div.className = "ph-btn-ctn";

    return div;
  };

  #getAnchor = () => {
    const anchor = document.createElement("a");
    anchor.href = this.navTo;
    anchor.className = `btn btn-efct-cln ${this.hasOutline ? "btn-outline" : ""} ${this.isBlink ? "btn-blink" : ""}`;
    anchor.setAttribute("data-sm-link-text", this.hoverText);
    anchor.target = "blank";

    return anchor;
  };

  #getSpan = () => {
    const span = document.createElement("span");
    span.textContent = this.text;

    return span;
  };
}

/*********************************************************************************************************************************
 *                                                                                                                               *
 *                                             Region: Run as soon as browser found                                              *
 *                                                                                                                               *
 *********************************************************************************************************************************/

(function () {
  const url = document.URL;
  const id = getLinkParamValue(url, "id");

  getAnimePictureById(id, (response) => {
    const pictureArr = response["pictures"];

    addAnimeImageElement(pictureArr);
  });
})();

(function () {
  const url = document.URL;
  const id = getLinkParamValue(url, "id");

  getAnimeEpisodesById(id, (response) => {
    const episodesArr = response["episodes"];

    addEpisodeButton(episodesArr);
  });
})();

(function () {
  const url = document.URL;
  const id = getLinkParamValue(url, "id");

  getAnimeReviewById(id, (response) => {
    const reviewArr = response["reviews"];

    addReview(reviewArr);
  });
})();

(function () {
  const url = document.URL;
  const id = getLinkParamValue(url, "id");

  getAnimeById(id, (response) => (document.querySelector("#anime-name-and-epsiode header h1").textContent = response["title_japanese"]));
})();

(function () {
  const url = document.URL;
  const id = getLinkParamValue(url, "id");

  getAnimeRecommendationsById(id, (response) => {
    const recommendationArr = response["recommendations"];

    addRecommendations(recommendationArr);
  });
})();
