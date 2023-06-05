import { GameSelection } from "../gameSelection";
import { appEl } from "../main";

export function getTime(t: number) {
    let timeSplit = t.toFixed(2).toString().split('.')
    return `${timeSplit[0].length < 2 ? '0' : ''}${timeSplit[0]}.${timeSplit[1]
        }`
}

export function gameSet(appEl: HTMLElement | null, selectedLevel: string) {
    const card: { [index: number]: any } = {
        0: './static/img/spades/A.svg',
        1: './static/img/spades/K.svg',
        2: './static/img/spades/Q.svg',
        3: './static/img/spades/J.svg',
        4: './static/img/spades/10.svg',
        5: './static/img/spades/9.svg',
        6: './static/img/spades/8.svg',
        7: './static/img/spades/7.svg',
        8: './static/img/spades/6.svg',
        9: './static/img/hearts/A.svg',
        10: './static/img/hearts/K.svg',
        11: './static/img/hearts/Q.svg',
        12: './static/img/hearts/J.svg',
        13: './static/img/hearts/10.svg',
        14: './static/img/hearts/9.svg',
        15: './static/img/hearts/8.svg',
        16: './static/img/hearts/7.svg',
        17: './static/img/hearts/6.svg',
        18: './static/img/clubs/A.svg',
        19: './static/img/clubs/K.svg',
        20: './static/img/clubs/Q.svg',
        21: './static/img/clubs/J.svg',
        22: './static/img/clubs/10.svg',
        23: './static/img/clubs/9.svg',
        24: './static/img/clubs/8.svg',
        25: './static/img/clubs/7.svg',
        26: './static/img/clubs/6.svg',
        27: './static/img/diamonds/A.svg',
        28: './static/img/diamonds/K.svg',
        29: './static/img/diamonds/Q.svg',
        30: './static/img/diamonds/J.svg',
        31: './static/img/diamonds/10.svg',
        32: './static/img/diamonds/9.svg',
        33: './static/img/diamonds/8.svg',
        34: './static/img/diamonds/7.svg',
        35: './static/img/diamonds/6.svg',
    } as const;

    let interval: number

    let time = 0



    let shirt = ''
    type Card = {
        url: string;
        num: number;
        id: number;
    }
    const cardList: Card[] = []

    function getRandomCard() {
        return Math.floor(Math.random() * 36)
    }

    let cardsCount: number

    if (selectedLevel == 'radio1') {
        cardsCount = 3
    } else if (selectedLevel == 'radio2') {
        cardsCount = 6
    } else {
        cardsCount = 9
    }

    for (let i = 0; i < cardsCount; i++) {
        let n: number
        while (true) {
            n = getRandomCard()
            const isExist = cardList.find((item) => item.url === card[n])
            if (!isExist) break
        }

        let p = Math.floor(Math.random() * 10)
        let z = Math.floor(Math.random() * 10)

        cardList.push({ url: card[n], num: p, id: i })
        cardList.push({ url: card[n], num: z, id: i })
    }

    const cardsListSort = cardList.sort((a, b) => (a.num <= b.num ? -1 : 1))

    for (let i = 0; i < cardList.length; i++) {
        shirt += `<div class="gamebox-field-card-image flip" data-id="${cardsListSort[i].id}">
        <img class="front-face" id="${i}" src="${cardsListSort[i].url}"/>
        <img class="back-face" src="./static/img/shirt.svg"/>
          </div>`
    }

    const appHtml = ` <div class="container">
  
    <div>
        <div class="game">
            <div class="game-time">
                <div class="game-time-name">
                    <p>min</p>
                    <p>sek</p>
                </div>
                <div class="game-time-number">
                    <p id="timer" >00.00</p>
                </div>
            </div>
            <button class="button-start" id="button-restart" type="submit">Начать заново</button>
        </div>
          <div class="card">
           ${shirt} 
          </div>
    </div>

    
</div>
<div class="modal" id = "modal" >
    <div class="content">
    <img class="img-modal" id="img-modal" src=""/>
        <p class="text-modal" id="text-modal"> </p>
        <p class="time-modal"> Затраченное время:</p>
        <p class="time-modal-timer" id = "modal-time">${getTime(time)}</p>
        <button class="button-start" id="button-restart__modal" type="submit">Играть снова</button>
    </div>
     
  </div>`

    appEl!.innerHTML = appHtml

    const modalElement = document.getElementById('modal')

    const cards = document.querySelectorAll('.gamebox-field-card-image')

    const timer = () => {
        setTimeout(() => {
            cards.forEach((element) => {
                element.classList.remove('flip')
            })
        }, 5000)
    }

    timer()

    let firstCard: HTMLElement | null, secondCard: HTMLElement | null
    let hasFlippedCard = false

    const imgModalEl = document.getElementById('img-modal')
    const imgTextEl = document.getElementById('text-modal')

    function flipCard(this: HTMLElement) {
        this.classList.add('flip')

        if (!hasFlippedCard) {
            hasFlippedCard = true
            firstCard = this
        } else {
            hasFlippedCard = false
            secondCard = this
        }

        if (time === 0) {
            timerGameStart()
        }

        if (firstCard && secondCard) {


            // setTimeout(() => {

            if (firstCard?.dataset?.id === secondCard?.dataset?.id) {
                firstCard?.classList.add('check')
                secondCard?.classList.add('check')
                const checkCard = document.getElementsByClassName('gamebox-field-card-image');
                let checkCount = 0
                for (let i = 0; i < cardsCount * 2; i++) {
                    const check = checkCard[i].classList.contains('check')
                    console.log('1', checkCount)
                    if (check) checkCount++
                    if (checkCount === cardsCount * 2) {
                        (imgModalEl as HTMLInputElement).src = './static/win.svg'
                        imgTextEl!.textContent = 'Вы выиграли!'
                        activeModal()
                        clearInterval(interval)
                    }
                }
                firstCard = null;
                secondCard = null;

            } else {
                (imgModalEl as HTMLInputElement).src = './static/loos.svg'
                imgTextEl!.textContent = 'Вы проиграли!'
                activeModal()
                clearInterval(interval)
            }
            // }, 500)


        }
    }

    function activeModal() {
        let timerElement = document.getElementById('modal-time')
        timerElement!.textContent = getTime(time)
        modalElement!.style.visibility = 'visible'
    }

    let timerElement = document.getElementById('timer')

    const timerGameStart = () => {
        interval = window.setInterval(() => {
            time += 0.01
            timerElement!.textContent = getTime(time)
        }, 100)
    }


    const restartEl = document.getElementById('button-restart')
    const modalRestartEl = document.getElementById('button-restart__modal')

    restartEl?.addEventListener('click', () => {
        GameSelection(appEl);
    })
    modalRestartEl?.addEventListener('click', () => {
        GameSelection(appEl);
    })


    cards.forEach((card) => card.addEventListener('click', flipCard))
}
