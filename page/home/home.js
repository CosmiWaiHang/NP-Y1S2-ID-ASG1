// Images Area Images
let imagesAreaImages = document.querySelectorAll(".ph-img-area img");
// Images Area First Image
let imagesAreaActiveImage = document.querySelector(".ph-img-area .activeImg");

// Pagination Area
let paginationArea = document.querySelector(".ph-pg-area");

// Current Image Count
let currentImageCount = 1;

// Slider Controler Function
let sliderController;
// Create Pagination Spans Function
let createPaginationSpans;

// Create Pagination Spans [Circls] Function
(function createPaginationSpans() {
  // Loop On All The Images Slider
  for (var i = 0; i < imagesAreaImages.length; i++) {
    // Create Span
    let paginationSpan = document.createElement("span");
    // Append The Span
    paginationArea.appendChild(paginationSpan);
  }
})();

// Slider Controler Function
(sliderController = function () {
  // Get All The pagination Spans
  let paginationCircls = document.querySelectorAll(".ph-pg-area span");

  // Call Remore All Active Class Function
  removeAllActive(paginationCircls);

  // The currentImageCount Minus One
  let currentImageMinusOne = currentImageCount - 1;

  // Set Active Class On Current Pagination
  paginationCircls[currentImageMinusOne].classList.add("active");

  // Move The images Area First Image
  imagesAreaActiveImage.style.marginLeft = `-${window.innerWidth * currentImageMinusOne}px`;
})();

// Remove All Active Class Function
function removeAllActive(targetElement) {
  for (var i = 0; i < targetElement.length; i++) {
    targetElement[i].classList.remove("active");
  }
}

// Move Slider Image Every 3 Second
setInterval(() => {
  // If The Current Image Count Not Equle imagesAreaImages.length
  if (currentImageCount != imagesAreaImages.length) {
    // Plus One
    currentImageCount++;
    // Call Function sliderController();
    sliderController();
  } else {
    // else
    // Make currentImageCount Equle 1
    currentImageCount = 1;
    // Call Function sliderController();
    sliderController();
  }
}, 10000);

/************************************************************************
 *                                                                       *
 *                             Slideshow End                             *
 *                                                                       *
 ************************************************************************/

function updateSliderArrowsStatus(elementPart) {
  let cardsContainer = $(`#${elementPart}-anime-cards-ctn`);
  let containerWidth = $(`#${elementPart}-anime-cards-ctn .anime-card-ctn`).width();

  let currLocation = $(cardsContainer).scrollLeft() + containerWidth;
  let max = document.querySelector(`#${elementPart}-anime-cards-ctn > div.anime-cards`).scrollWidth * 0.8;

  console.log(currLocation);
  console.log(max);
  if (currLocation < max) {
    $(`#${elementPart}-anime-card-slide-right-ctn`).addClass("active");
  } else {
    $(`#${elementPart}-anime-card-slide-right-ctn`).removeClass("active");
  }
  if ($(cardsContainer).scrollLeft() > 0) {
    $(`#${elementPart}-anime-card-slide-left-container`).addClass("active");
  } else {
    $(`#${elementPart}-anime-card-slide-left-container`).removeClass("active");
  }
}

/**********************************
 *
 *      Top Anime Card Slider
 *
 **********************************/

$(function () {
  // Scroll products' slider left/right
  let div = $("#top-anime-cards-ctn");
  let speed = 350;
  let containerWidth = $(".anime-card-ctn").width();
  let cardWidth = window.innerWidth * 0.1 + 235;

  updateSliderArrowsStatus("top");

  //Remove scrollbars
  $("#top-anime-card-slide-right-ctn").click(function () {
    if ($(div).scrollLeft() + containerWidth < $(div).find(".anime-cards").children(".anime-card").length * cardWidth) {
      $(div).animate(
        {
          scrollLeft: $(div).scrollLeft() + window.innerWidth * 0.75,
        },
        {
          duration: speed,
          complete: function () {
            setTimeout(updateSliderArrowsStatus("top"), 1005);
          },
        }
      );
    }
    updateSliderArrowsStatus("top");
  });
  $("#top-anime-card-slide-left-container").click(function () {
    if ($(div).scrollLeft() + containerWidth > containerWidth) {
      $(div).animate(
        {
          scrollLeft: "-=" + (cardWidth + window.innerWidth * 0.75),
        },
        {
          duration: speed,
          complete: function () {
            setTimeout(updateSliderArrowsStatus("top"), 1005);
          },
        }
      );
    }
    updateSliderArrowsStatus("top");
  });

  // If resize action ocurred then update the container width value
  $(window).resize(function () {
    updateSliderArrowsStatus("top");
  });
});

/**********************************
 *
 *      Genre Anime Card Slider
 *
 **********************************/

$(function () {
  // Scroll products' slider left/right
  let div = $("#genre-anime-cards-ctn");
  let speed = 350;
  let containerWidth = $(".anime-card-ctn").width();
  let cardWidth = window.innerWidth * 0.1 + 235;

  updateSliderArrowsStatus("genre");

  //Remove scrollbars
  $("#genre-anime-card-slide-right-ctn").click(function () {
    if ($(div).scrollLeft() + containerWidth < $(div).find(".anime-cards").children(".anime-card").length * cardWidth) {
      $(div).animate(
        {
          scrollLeft: $(div).scrollLeft() + window.innerWidth * 0.75,
        },
        {
          duration: speed,
          complete: function () {
            setTimeout(updateSliderArrowsStatus("genre"), 1005);
          },
        }
      );
    }
    updateSliderArrowsStatus("genre");
  });
  $("#genre-anime-card-slide-left-container").click(function () {
    if ($(div).scrollLeft() + containerWidth > containerWidth) {
      $(div).animate(
        {
          scrollLeft: "-=" + (cardWidth + window.innerWidth * 0.75),
        },
        {
          duration: speed,
          complete: function () {
            setTimeout(updateSliderArrowsStatus("genre"), 1005);
          },
        }
      );
    }
    updateSliderArrowsStatus("genre");
  });

  // If resize action ocurred then update the container width value
  $(window).resize(function () {
    updateSliderArrowsStatus("genre");
  });
});

/************************************************************************
 *                                                                       *
 *                        Init AnimeCard End                             *
 *                                                                       *
 ************************************************************************/

function addAnimeCard(title, id, imageUrl, selector) {
  const card = document.createElement("div");
  card.className = "anime-card";

  const phImage = document.createElement("a");
  phImage.href = `../wiki/wiki.html?id=${id}`;

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = title;
  image.style = "width: 100%";
  image.setAttribute("value", id);

  phImage.appendChild(image);
  card.appendChild(phImage);

  const introduction = document.createElement("div");
  introduction.className = "anime-card-ctn";
  introduction.innerHTML = `<h4><b>${title}</b></h4>`;

  card.appendChild(introduction);
  document.querySelector(selector).appendChild(card);
}

/**********************************
 *
 *      Top Anime Request
 *
 **********************************/
(function () {
  var request = new XMLHttpRequest();

  request.open("GET", "https://api.jikan.moe/v3/top/anime");

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      const response = JSON.parse(this.responseText)["top"];

      for (let i = 0; i < response.length; i++) {
        const anime = response[i];

        addAnimeCard(anime["title"], anime["mal_id"], anime["image_url"], "#top-anime-card-ctn .anime-cards");
      }
      updateSliderArrowsStatus("top");
    }
  };

  request.send();
})();

/**********************************
 *
 *      Genre Anime Request
 *
 **********************************/
(function () {
  requestGenreAnime(1); // init when first run
  const itemList = document.querySelectorAll("#genre-anime-card-ctn .subcategory ul li");

  for (let i = 0; i < itemList.length; i++) {
    const item = itemList[i];

    item.onclick = function () {
      const activeCSubCat = document.querySelector("#genre-anime-card-ctn #active-subcat p");

      activeCSubCat.setAttribute("value", item.value);
      activeCSubCat.textContent = item.textContent;

      requestGenreAnime(item.value);
    };
  }
})();

function requestGenreAnime(id) {
  var request = new XMLHttpRequest();

  request.open("GET", `https://api.jikan.moe/v3/genre/anime/${id}`);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      // Clear all existing item
      document.querySelector("#genre-anime-card-ctn .anime-cards").innerHTML = "";
      const response = JSON.parse(this.responseText)["anime"];

      for (let i = 0; i < response.length; i++) {
        const anime = response[i];

        addAnimeCard(anime["title"], anime["mal_id"], anime["image_url"], "#genre-anime-card-ctn .anime-cards");
      }
      updateSliderArrowsStatus("genre");
    }
  };

  request.send();
}
