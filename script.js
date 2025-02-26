let fields = [
  null, // 0
  null, // 1
  null, // 2
  null, // 3
  null, // 4
  null, // 5
  null, // 6
  null, // 7
  null, // 8
];

let currentPlayer = "circle"; // "circle" beginnt, dann "cross"
let gameOver = false; // Flag, um den Spielstatus zu überwachen

function init() {
    render();
}

function render() {
    let contentRef = document.getElementById("content");
    let html = "<table>";

    for (let i = 0; i < 3; i++) {
        html += "<tr>";
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol =
                fields[index] === "circle" ? generateCircleSVG() :
                fields[index] === "cross" ? generateCrossSVG() : "";

            html += `<td onclick="handleClick(${index})" ${gameOver ? 'style="pointer-events: none;"' : ""}>${symbol}</td>`;
        }
        html += "</tr>";
    }

    html += "</table>";

    // Wenn das Spiel vorbei ist, fügen wir den Pokal und den Gewinner hinzu
    if (gameOver) {
        let winnerSymbol = currentPlayer === "circle" ? "cross" : "circle"; // Der Verlierer ist der aktuelle Spieler
        html += `
            <div id="winner">
                <p>🏆 Winner: <span style="font-weight: bold; color: ${winnerSymbol === "circle" ? "#00B0EF" : "#FFC000"}">${winnerSymbol}</span></p>
            </div>
        `;
    }

    contentRef.innerHTML = html;
}

function handleClick(index) {
    if (fields[index] === null && !gameOver) {
        // Setze das Symbol im Array, abwechselnd zwischen "circle" und "cross"
        fields[index] = currentPlayer;

        // Setze das entsprechende SVG in das angeklickte <td>
        let contentRef = document.getElementById("content");
        let td = contentRef.getElementsByTagName("td")[index];

        if (currentPlayer === "circle") {
            td.innerHTML = generateCircleSVG();
            currentPlayer = "cross"; // Nächster Zug ist "cross"
        } else {
            td.innerHTML = generateCrossSVG();
            currentPlayer = "circle"; // Nächster Zug ist "circle"
        }

        // Überprüfe, ob ein Gewinner vorliegt
        checkWinner();

        // Entferne das onclick-Attribut von dem angeklickten <td>
        td.removeAttribute("onclick");
    }
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="#00B0EF" stroke-width="8" fill="none" 
                stroke-dasharray="188.4" stroke-dashoffset="188.4">
                <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="1s" fill="freeze"/>
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Erste Linie -->
            <line x1="30" y1="30" x2="70" y2="70" stroke="#FFC000" stroke-width="8" stroke-linecap="round">
                <animate attributeName="stroke-dasharray" from="0, 56.57" to="56.57, 0" dur="0.5s" fill="freeze"/>
            </line>
            <!-- Zweite Linie -->
            <line x1="70" y1="30" x2="30" y2="70" stroke="#FFC000" stroke-width="8" stroke-linecap="round">
                <animate attributeName="stroke-dasharray" from="0, 56.57" to="56.57, 0" dur="0.5s" fill="freeze" begin="0.5s"/>
            </line>
        </svg>
    `;
}

function checkWinner() {
    // Gewinnerüberprüfung: horizontale, vertikale und diagonale Reihen
    let winningCombinations = [
        // Horizontale Reihen
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertikale Reihen
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonale Reihen
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            // Es gibt einen Gewinner
            highlightWinner(combo);  // Highlight the winning combination
            gameOver = true;
            return;
        }
    }

    // Überprüfe, ob das Spielfeld voll ist (Unentschieden)
    if (!fields.includes(null)) {
        gameOver = true;  // Das Spiel endet im Unentschieden
    }
}

function highlightWinner(combo) {
    let contentRef = document.getElementById("content");
    for (let index of combo) {
        let td = contentRef.getElementsByTagName("td")[index];
        td.style.backgroundColor = "#FFD700"; // Highlight winner fields with gold color
    }
}
