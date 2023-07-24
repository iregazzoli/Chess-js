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

document.addEventListener("DOMContentLoaded", (event) => {
  var themes = [
    "black-white",
    "red-black",
    "blue-black",
    "green-black",
    "yellow-black",
  ];

  themes.forEach((theme, index) => {
    var themeButton = document.getElementById(theme + "-theme");
    themeButton.addEventListener("click", function (event) {
      event.stopPropagation(); // This line is added to prevent the event from propagating to parent elements
      changeBoardTheme(index + 1);
    });
  });
});
