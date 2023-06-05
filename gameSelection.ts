import { gameSet } from './levels/level2'

declare global {
    interface Window {
        application: any;
    }
}

export function GameSelection(appEl: HTMLElement | null) {
    const renderGameSelection = (appEl: HTMLElement | null) => {
        const appHtml = `<div class="container">
    <div class="content">
        <p class="title"> Выбери сложность</p>
        <form class="form" id="form-select">
            <ul class="button-select">
                <li class="button-select-button">
                    <input class="radio" type="radio" name="radio" id="radio1" value="radio1" />
                    <label class="radio-label" id = "radio-label" for="radio1">1</label>
                </li>
                <li class="button-select-button">
                    <input class="radio" type="radio" name="radio" id="radio2" value="radio2"/>
                    <label class="radio-label" id = "radio-label" for="radio2">2</label>
                </li>
                <li class="button-select-button">
                    <input class="radio" type="radio" name="radio" id="radio3" value="radio3"/>
                    <label class="radio-label" id = "radio-label" for="radio3">3</label>
                </li>
            </ul>

            <button class="button-start" id= "button-start" type="submit">Старт</button>

        </form>



    </div>

</div>`

        appEl!.innerHTML = appHtml

    }

    renderGameSelection(appEl)
    const labelEl = document.getElementById('radio-label')
    labelEl?.addEventListener('click', (e) => {
        labelEl?.classList.toggle('act')
    })


    const startButtonEl = document.getElementById('form-select')
    console.log(startButtonEl)
    startButtonEl?.addEventListener('submit', (e) => {
        e.preventDefault()




        let radioInputs = document.querySelectorAll('.radio')

        radioInputs.forEach((radioInput) => {
            if ((radioInput as HTMLInputElement).checked) {
                window.application = {
                    level: (radioInput as HTMLInputElement).value,
                }
                gameSet(appEl, window.application.level)
            }
        })
    })
}
