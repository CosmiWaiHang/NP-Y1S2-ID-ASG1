(function () {
  let canvas = document.getElementById("canvas-loading");
  let context = canvas.getContext("2d");
  let blockWidth = 200;
  let background = "#000";
  let PI = Math.PI * 2;

  canvas.width = blockWidth * 3;
  canvas.height = blockWidth * 3;

  function drawBlock(pos, bgColor, draw) {
    context.save();
    context.translate(pos.x * blockWidth, pos.y * blockWidth);
    context.fillStyle = bgColor;
    context.fillRect(0, 0, blockWidth, blockWidth);
    context.translate(100, 100);
    draw();
    context.restore();
  }

  let time = 0;
  function draw() {
    time++;
    drawBlock({ x: 1, y: 1 }, background, () => {
      context.beginPath();
      context.arc(Math.sin(time / 10) * 30, 0, 6, 0, PI);
      context.fillStyle = `rgba(14,203,230, 1)`;
      context.fill();
    });
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
