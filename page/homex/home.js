function updateGenre(genre) {
  const list = document.getElementById("selector");
  const itemArr = list.children;

  //* Only get the first one the rest ignore
  for (const item of itemArr) {
    if (item.textContent.toLowerCase() == genre) {
      item.className = "active";
      updateImage();
    } else {
      item.className = "";
    }
  }
}

function updateImage() {
  const linkArr = [
      "https://cdn.myanimelist.net/images/anime/10/47347.jpg", 
      "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", 
      "https://cdn.myanimelist.net/images/anime/13/17405.jpg", 
      "https://cdn.myanimelist.net/images/anime/11/39717.jpg", 
      "https://cdn.myanimelist.net/images/anime/11/65185.jpg"
  ];

  const random = Math.floor(Math.random() * linkArr.length);

  const imageArr = document.querySelectorAll("#anime img");
  for (let i = 0, max = imageArr.length; i < max; i++) {
    image = imageArr[i];

    image.src = linkArr[random];
  }
}
