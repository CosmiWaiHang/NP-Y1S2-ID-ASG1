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
  console.log(600 * currentImageMinusOne);
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
}, 3000);
