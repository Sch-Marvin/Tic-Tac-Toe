function renderWinnerHTML(winner) {
    return `
            <p style="font-size: 20px; font-weight: bold; color: ${winner === "circle" ? "#00B0EF" : "#FFC000"}">🏆 Winner: ${winner}</p>
            <button onclick="restartGame()" style="padding: 10px; font-size: 16px; cursor: pointer;">Erneut spielen</button
        `;
}

function renderWinnerSymbolHTML(winnerSymbol) {
    return `
            <p style="font-size: 20px; font-weight: bold; color:
                ${winnerSymbol === "circle" ? "#00B0EF" : "#FFC000"}">🏆 Winner: ${winnerSymbol}
            <p>
           `;
    
}

function renderDrawHTML() {
    return `
            <p style="font-size: 20px; font-weight: bold; color: white">
                🤝 It's a Draw!
            </p>
            <button onclick="restartGame()" style="padding: 10px; font-size: 16px; cursor: pointer;">Erneut spielen</button>
        `;
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
              <line x1="30" y1="30" x2="70" y2="70" stroke="#FFC000" stroke-width="8" stroke-linecap="round">
                  <animate attributeName="stroke-dasharray" from="0, 56.57" to="56.57, 0" dur="0.5s" fill="freeze"/>
              </line>
              <line x1="70" y1="30" x2="30" y2="70" stroke="#FFC000" stroke-width="8" stroke-linecap="round">
                  <animate attributeName="stroke-dasharray" from="0, 56.57" to="56.57, 0" dur="0.5s" fill="freeze" begin="0.5s"/>
              </line>
          </svg>
      `;
  }


