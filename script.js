function render() {
  let contentRef = document.getElementById("content");
  let winnerRef = document.getElementById("winner-container");
  let html = "<table>";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let symbol =
        fields[index] === "circle"
          ? generateCircleSVG()
          : fields[index] === "cross"
          ? generateCrossSVG()
          : "";
      html += `<td onclick="handleClick(${index})" ${gameOver ? 'style="pointer-events: none;"' : ""}>${symbol}</td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  contentRef.innerHTML = html;
  if (gameOver) {
    let winnerSymbol = currentPlayer === "circle" ? "cross" : "circle";
    winnerRef.innerHTML = renderWinnerSymbolHTML(winnerSymbol);
  } else {
    winnerRef.innerHTML = "";
  }
}

function handleClick(index) {
  if (fields[index] === null && !gameOver) {
    fields[index] = currentPlayer;

    let contentRef = document.getElementById("content");
    let td = contentRef.getElementsByTagName("td")[index];

    if (currentPlayer === "circle") {
      td.innerHTML = generateCircleSVG();
      currentPlayer = "cross"; 
    } else {
      td.innerHTML = generateCrossSVG();
      currentPlayer = "circle"; 
    }
    checkWinner();
    td.removeAttribute("onclick");
  }
}
function checkWinner() {
  let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner = null;

  for (let combo of winningCombinations) {
    let [a, b, c] = combo;
    if (
      fields[a] === fields[b] &&
      fields[b] === fields[c] &&
      fields[a] !== null
    ) {
      winner = fields[a];       
      highlightWinner(combo);   
      gameOver = true;
      break;
    }
  }

  let winnerRef = document.getElementById("winner-container");

  if (winner) {  
    winnerRef.innerHTML = renderWinnerHTML(winner);
  } else if (!fields.includes(null)) { 
    gameOver = true;
    winnerRef.innerHTML = renderDrawHTML();
  }
}

function highlightWinner(combo) {
  let contentRef = document.getElementById("content");
  let tds = contentRef.getElementsByTagName("td");

  for (let index of combo) {
    tds[index].style.backgroundColor = "#FFD700"; 
    let svg = tds[index].querySelector("svg");
    if (svg) {
      let glow = false;
      setInterval(() => {
        svg.style.filter = glow
          ? "drop-shadow(0 0 5px yellow)"
          : "drop-shadow(0 0 15px yellow)";
        glow = !glow;
      }, 500);
    }
  }
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle";
  gameOver = false;
  document.querySelector(".win-line")?.remove();
  render();
}
