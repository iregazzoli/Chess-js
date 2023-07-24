document.addEventListener("DOMContentLoaded", (event) => {
  let resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", () => {
    resetScores();
    board.setupPieces();
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  let resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", () => {
    resetScores();
    board.setupPieces();
  });

  var navbar = document.getElementById("navbar");
  var menuIcon = document.getElementById("menu-icon");
  var main = document.querySelector(".main");
  var inner = document.querySelector(".inner");

  menuIcon.addEventListener("click", function () {
    if (navbar.style.left === "0px") {
      navbar.style.left = "-300px";
      main.style.width = "calc(100% - 300px)";
      inner.style.width = "calc(100% - 300px)";
    } else {
      navbar.style.left = "0px";
      main.style.width = "100%";
      inner.style.width = "100%";
    }
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  var themeButton = document.getElementById("themeButton");
  themeButton.addEventListener("click", function (event) {
    event.preventDefault();
    changeBoardTheme();
  });
});
