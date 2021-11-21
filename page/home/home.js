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
  imagesAreaActiveImage.style.marginLeft = `-${
    window.innerWidth * currentImageMinusOne
  }px`;
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

function updateSliderArrowsStatus() {
  let cardsContainer = $("#anime-cards-ctn");
  let containerWidth = $(".anime-card-ctn").width();
  if (
    $(cardsContainer).scrollLeft() + containerWidth <
    document.querySelector(".anime-cards").scrollWidth
  ) {
    $("#anime-card-slide-right-ctn").addClass("active");
  } else {
    $("#anime-card-slide-right-ctn").removeClass("active");
  }
  if ($(cardsContainer).scrollLeft() > 0) {
    $("#anime-card-slide-left-container").addClass("active");
  } else {
    $("#anime-card-slide-left-container").removeClass("active");
  }
}

$(function () {
  // Scroll products' slider left/right
  let div = $("#anime-cards-ctn");
  let cardCount = 50; //$(div).find(".anime-cards").children(".anime-card").length
  let speed = 350;
  let containerWidth = $(".anime-card-ctn").width();
  let cardWidth = window.innerWidth * 0.1 + 235;

  updateSliderArrowsStatus();

  //Remove scrollbars
  $("#anime-card-slide-right-ctn").click(function () {
    if ($(div).scrollLeft() + containerWidth < cardCount * cardWidth) {
      $(div).animate(
        {
          scrollLeft: $(div).scrollLeft() + window.innerWidth * 0.75,
        },
        {
          duration: speed,
          complete: function () {
            setTimeout(updateSliderArrowsStatus(), 1005);
          },
        }
      );
    }
    updateSliderArrowsStatus();
  });
  $("#anime-card-slide-left-container").click(function () {
    if ($(div).scrollLeft() + containerWidth > containerWidth) {
      $(div).animate(
        {
          scrollLeft: "-=" + (cardWidth + window.innerWidth * 0.75),
        },
        {
          duration: speed,
          complete: function () {
            setTimeout(updateSliderArrowsStatus(), 1005);
          },
        }
      );
    }
    updateSliderArrowsStatus();
  });

  // If resize action ocurred then update the container width value
  $(window).resize(function () {
    try {
      containerWidth = $("#anime-cards-ctn").width();
      updateSliderArrowsStatus();
    } catch (error) {
      console.log(
        `Error occured while trying to get updated slider container width: 
              ${error}`
      );
    }
  });
});

/************************************************************************
 *                                                                       *
 *                             AnimeCard End                             *
 *                                                                       *
 ************************************************************************/

function addAnimeCard(title, id, imageUrl) {
  const card = document.createElement("div");
  card.className = "anime-card";

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = title;
  image.style = "width: 100%";
  card.appendChild(image);

  const introduction = document.createElement("div");
  introduction.className = "anime-card-ctn";
  introduction.innerHTML = `<h4><b>${title}</b></h4>`;

  card.appendChild(introduction);
  document.querySelector(".anime-cards").appendChild(card);
}

(function () {
  var request = new XMLHttpRequest();

  request.open("GET", "https://api.jikan.moe/v3/top/anime");

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      const response = JSON.parse(this.responseText)["top"];

      for (let i = 0; i < response.length; i++) {
        const anime = response[i];

        addAnimeCard(anime["title"], anime["mal_id"], anime["image_url"]);
      }
      updateSliderArrowsStatus();
    }
  };

  request.send();
})();
