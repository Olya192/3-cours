export function levelOne(appEl) {
  let shirt = "";

  for (let i = 0; i < 36; i++) {
    console.log("12345");
    shirt += `<img class="gamebox__field-card-image" src="./static/img/shirt.svg"/>`;
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
