import { levelOne } from "./levels/level1.js";

export function GameSelection(appEl) {

    const renderGameSelection = ((appEl) => {

        const appHtml = `<div class="container">
    <div class="content">
        <p class="title"> Выбери сложность</p>
        <form class="form" id="form-select">
            <ul class="button-select">
                <li class="button-select__button">
                    <input class="radio" type="radio" name="radio" id="radio1" value="radio1" />
                    <label for="radio1">1</label>
                </li>
                <li class="button-select__button">
                    <input class="radio" type="radio" name="radio" id="radio2" value="radio2"/>
                    <label for="radio2">2</label>
                </li>
                <li class="button-select__button">
                    <input class="radio" type="radio" name="radio" id="radio3" value="radio3"/>
                    <label for="radio3">3</label>
                </li>
            </ul>

            <button class="button-start" id= "button-start" type="submit">Старт</button>

        </form>



    </div>

</div>`

        appEl.innerHTML = appHtml;
    })

    renderGameSelection(appEl)


    const startButtonEl = document.getElementById('form-select');
    console.log(startButtonEl);
    startButtonEl.addEventListener("submit", (e) => {
        e.preventDefault();
        let radioInputs = document.querySelectorAll(".radio");

        radioInputs.forEach(radioInput => {
            if (radioInput.checked) {
                console.log(radioInput.value)
                levelOne(appEl);
            }
        });

    });


}