export function gameSet(appEl, selectedLevel) {
    const card = {
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
    }
    let interval

    let time = 0
    let imgModal = ''
    let textModal = ''

    function getTime(t) {
        let timeSplit = t.toFixed(2).toString().split('.')
        return `${timeSplit[0].length < 2 ? '0' : ''}${timeSplit[0]}.${
            timeSplit[1]
        }`
    }

    let shirt = ''
    const cardList = []

    function getRandomCard() {
        return Math.floor(Math.random() * 36)
    }

    let cardsCount

    if (selectedLevel == 'radio1') {
        cardsCount = 3
    } else if (selectedLevel == 'radio2') {
        cardsCount = 6
    } else {
        cardsCount = 9
    }

    for (let i = 0; i < cardsCount; i++) {
        let n
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
        shirt += `<div class="gamebox__field-card-image flip" data-id="${cardsListSort[i].id}">
        <img class="front-face" id="${i}" src="${cardsListSort[i].url}"/>
        <img class="back-face" src="./static/img/shirt.svg"/>
          </div>`
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
    <img class="front-face"  src="${imgModal}"/>
        <p class="title"> ${textModal}</p>
        <p class="title"> Затраченное время:</p>
        <p class="title" id = "modal-time">${getTime(time)}</p>
        <button class="button-start" id="button-restart" type="submit">Играть снова</button>
    </div>
     
  </div>`

    appEl.innerHTML = appHtml

    const restartEl = document.getElementById('button-restart')

    restartEl.addEventListener('click', () => {
        clearInterval(timerGameStart)
    })

    const modalElement = document.getElementById('modal')
    
    function activeModal() {
        let timerElement = document.getElementById('modal-time')
        timerElement.textContent = getTime(time)
        modalElement.style.visibility = 'visible'
    }

    const cards = document.querySelectorAll('.gamebox__field-card-image')

    const timer = () => {
        setTimeout(() => {
            cards.forEach((element) => {
                element.classList.remove('flip')
            })
        }, 5000)
    }

    timer()

    let firstCard, secondCard
    let hasFlippedCard = false

    function flipCard() {
        this.classList.add('flip')

        if (!hasFlippedCard) {
            hasFlippedCard = true
            firstCard = this
        } else {
            hasFlippedCard = false
            secondCard = this
        }

        console.log(firstCard?.dataset)
        console.log(secondCard?.dataset)

        if (time === 0) {
            timerGameStart()
        }

        if (firstCard && secondCard) {
            clearInterval(interval)
            setTimeout(() => {
                if (firstCard?.dataset?.id === secondCard?.dataset?.id) {
                    imgModal = './static/img/win.svg"/'
                    textModal = 'Вы выиграли!'
                    activeModal()
                } else {
                    imgModal = './static/img/win.svg"/'
                    textModal = 'Вы проиграли!'
                    activeModal()
                }
            }, 500)
        }
    }

    let timerElement = document.getElementById('timer')

    const timerGameStart = () => {
        interval = setInterval(() => {
            time += 0.01
            timerElement.textContent = getTime(time)
        }, 100)
    }

    cards.forEach((card) => card.addEventListener('click', flipCard))
}
