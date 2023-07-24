document.addEventListener("DOMContentLoaded", (event) => {
  let resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", () => {
    resetScores();
    board.setupPieces();
  });
});
