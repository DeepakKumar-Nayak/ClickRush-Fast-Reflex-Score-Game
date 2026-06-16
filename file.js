
const startButton = document.querySelector('.start') 
const stopButton = document.querySelector('.stop')
const gameArea  = document.querySelector('.game-area')
const box = document.querySelector('.box')
const mainScoreCard = document.querySelector('.main-score-card')
const gameContainer = document.querySelector('.game-container')

const score = document.querySelector('.score')
const time = document.querySelector('.time')

const playersInfoContainer = document.querySelector('.players-info')

const playersStats = JSON.parse(localStorage.getItem('playerstats') || "[]")

let Score = 0;
let Time = 0;
let playarId = 1;


let interval = null; 

startButton.addEventListener('click', function(){


    stopButton.disabled = false;
    if(mainScoreCard.style.display  === "flex"){
        mainScoreCard.style.display = "none"
        gameArea.style.backdropFilter = "blur(0px)"

        Time = 0;
        Score = 0; 

    }

    
    
    let mHeight = gameArea.clientHeight
    let mWidth = gameArea.clientWidth

    interval = setInterval(function(){
        Time+=1;
        time.innerHTML = `<h3 class="time">Time: ${Time}</h3>`
        let boxHeight = box.clientHeight
        let boxWidth = box.clientWidth
    
        let topValue = Math.floor(Math.random()*(mHeight-boxHeight))
        let leftValue = Math.floor(Math.random()*(mWidth-boxWidth))
    
        const redColor = Math.floor(Math.random()*256)
        const greenColor =  Math.floor(Math.random()*256)
        const blueColor =  Math.floor(Math.random()*256)
    
    
        box.style.top = `${topValue}px`
        box.style.left = `${leftValue}px`
    
        box.style.backgroundColor = `rgb(${redColor}, ${greenColor}, ${blueColor})`
    },1500)
   
    
})

function playersInfo(scoree,timee){
    console.log(playersStats)
    playersStats.push({
        player: `Player${playarId}`,
        score: scoree,
        time: timee
    })
    playarId++


    localStorage.setItem('playerstats', JSON.stringify(playersStats))
}

const gameOverAudio = new Audio('GameOver.mp3')
const clickAudio = new Audio('Click.mp3')


stopButton.addEventListener('click', function(){

    playersInfoContainer.innerHTML = "";

    clearInterval(interval)
    console.log('stop')
    box.style.top = 0
    box.style.left = 0
    mainScoreCard.style.display = "flex"
    //finalScore.textContent = `Score: ${Score}`
    gameArea.style.backdropFilter = "blur(15px)"

     
    playersInfo(Score,Time)

    Time = 0;
    Score = 0; 

    score.innerHTML = `<h3 class="score">Score: ${Score}</h3>`;
    time.innerHTML = `<h3 class="time">Time: ${Time}</h3>`

    gameOverAudio.play()
    stopButton.disabled = true

    playersStats.forEach(function(elem){
        playersInfoContainer.innerHTML+=`<div class="player-info-area">
                    <h5>Player Name :${elem.player}</h5>
                    <h5>Score : ${elem.score}</h5>
                    <h5>Time : ${elem.time}</h5>
                </div>`
    })

})



let flag = true;
box.addEventListener('click', function(){
    if(flag === true){

        clickAudio.currentTime = 0;
        clickAudio.play()

        Score+=1
        score.innerHTML= `<h3 class="scrore">Score:${Score}</h3>`
        flag = false

        console.log(false)
        setTimeout(function(){
            flag=true;
        },3000)
    }
    
    
    
})