export function levelTwo(appEl) {
  const card = {
    0: "./levels/img/spades/A.svg",
    1: "./levels/img/spades/K.svg",
    2: "./levels/img/spades/Q.svg",
    3: "./levels/img/spades/J.svg",
    4: "./levels/img/spades/10.svg",
    5: "./levels/img/spades/9.svg",
    6: "./levels/img/spades/8.svg",
    7: "./levels/img/spades/7.svg",
    8: "./levels/img/spades/6.svg",
    9: "./levels/img/hearts/A.svg",
    10: "./levels/img/hearts/K.svg",
    11: "./levels/img/hearts/Q.svg",
    12: "./levels/img/hearts/J.svg",
    13: "./levels/img/hearts/10.svg",
    14: "./levels/img/hearts/9.svg",
    15: "./levels/img/hearts/8.svg",
    16: "./levels/img/hearts/7.svg",
    17: "./levels/img/hearts/6.svg",
    18: "./levels/img/clubs/A.svg",
    19: "./levels/img/clubs/K.svg",
    20: "./levels/img/clubs/Q.svg",
    21: "./levels/img/clubs/J.svg",
    22: "./levels/img/clubs/10.svg",
    23: "./levels/img/clubs/9.svg",
    24: "./levels/img/clubs/8.svg",
    25: "./levels/img/clubs/7.svg",
    26: "./levels/img/clubs/6.svg",
    27: "./levels/img/diamonds/A.svg",
    28: "./levels/img/diamonds/K.svg",
    29: "./levels/img/diamonds/Q.svg",
    30: "./levels/img/diamonds/J.svg",
    31: "./levels/img/diamonds/10.svg",
    32: "./levels/img/diamonds/9.svg",
    33: "./levels/img/diamonds/8.svg",
    34: "./levels/img/diamonds/7.svg",
    35: "./levels/img/diamonds/6.svg",
  };

  let shirt = "";

  for (let i = 0; i < 36; i++) {
    console.log("12345");
    shirt += `<img class="gamebox__field-card-image" src="${card[i]}"/>`;
  }

  const appHtml = ` <div class="container">
  
    <div>
        <div class="game">
            <div class="game-time">
                <div class="game-time__name">
                    <p>min</p>
                    <p>sek</p>
                </div>
                <div class="game-time__number">
                    <p>00.00</p>
                </div>
            </div>
            <button class="button-start" id="button-start" type="submit">Начать заново</button>
        </div>
          <div class="card">
           ${shirt} 
          </div>
    </div>
     
  </div>`;

  appEl.innerHTML = appHtml;
}
