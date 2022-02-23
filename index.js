const fetchBtn = document.querySelector("#fetch")
const startBtn = document.querySelector("#startBtn");
const infoBox = document.querySelector(".info-box")
const quitBtn = document.querySelector("#quit");
const restartBtn = document.querySelector("#restart")
const quizBox = document.querySelector(".quiz-box")
const nextBtn = document.querySelector(".next-btn")
const question = document.querySelector("#question")
const ansOne = document.querySelector("#ansOne")
const ansTwo = document.querySelector("#ansTwo")
const ansThree = document.querySelector("#ansThree")
const quesNum = document.querySelector("#quesNum")
const quizForm = document.querySelector(".quiz-form")
const selectOne = document.querySelector("#selectOne")
const selectTwo = document.querySelector("#selectTwo")
const selectThree = document.querySelector("#selectThree")
const resultBox = document.querySelector(".result-box")
const finalScore = document.querySelector("#final-score")
const replay = document.querySelector("#replay")
const quitQuiz = document.querySelector("#quit-quiz")
const timer = document.querySelector(".timer-sec")
let questionData = []
let score = 0
let index = 0
// correct and array
const correctAns = ["Hypertext Markup Language", "Cascading Style Sheets",  "function myFunction()","body{color: black}", "immediate if", "Declaration statements", "/* comment */", "The local element","Mutable variable", "background-color"]
// fetch data from API
const fetchQuestionAPI = () => {
    questionData = []
    selectOne.checked = false;
    selectTwo.checked = false;
    selectThree.checked = false;
    console.log("clicked")
    const url = "http://localhost:3000/questions"
    fetch(url)
    .then(
        res => res.json()
    )
    .then(
        (data) => {
            console.log(data)
            data.map(
                (quest) => {
                    questionData.push(quest) 
                }
            )
            question.innerText = questionData[0].question;
            ansOne.innerText = questionData[0].answer[0].ansOne
            ansTwo.innerText = questionData[0].answer[0].ansTwo
            ansThree.innerText = questionData[0].answer[0].ansTheree
            selectOne.value = questionData[0].answer[0].ansOne
            selectTwo.value = questionData[0].answer[0].ansTwo
            selectThree.value = questionData[0].answer[0].ansTheree

        }

    )
}



// start btn
startBtn.addEventListener('click', () => {
    console.log("cliked")
    score = 0
    index = 0
    infoBox.style.display = "block"
    infoBox.style.pointerEvent = "all"
})

// quit btn
quitBtn.addEventListener('click', () => {
    console.log("exit")
    infoBox.style.display = "none"
    resultBox.style.display = "none"
})

restartBtn.addEventListener('click', () => {
    startTimer()
    resultBox.style.display = "none"
    timer.innerText = "01.00"
    score = 0
    index = 0
    infoBox.style.display = "none"
    quizBox.style.display = "block"
    fetchQuestionAPI()
    quesNum.innerText = index+1

})

// next question 
const nextQuestion = () => {
    clearInterval(timeLeft);
    resetTimer()
    startTimer()
    selectOne.checked = false;
    selectTwo.checked = false;
    selectThree.checked = false;
    question.innerText = questionData[index].question;
    ansOne.innerText = questionData[index].answer[0].ansOne
    ansTwo.innerText = questionData[index].answer[0].ansTwo
    ansThree.innerText = questionData[index].answer[0].ansTheree
    selectOne.value = questionData[index].answer[0].ansOne
    selectTwo.value = questionData[index].answer[0].ansTwo
    selectThree.value = questionData[index].answer[0].ansTheree
}

const calculateScore = () => {
    if(index < 9){
        seconds = 59
        let formResult = new FormData(quizForm)
        for (let value of formResult.values()){
        if(value === correctAns[index]){
            score = score+1
        }else{
            score = score
        }
        console.log("score",score)
        index = index + 1;
        quesNum.innerText = index+1
    }

    nextQuestion()
    }else{
        quizBox.style.display = "none"
        resultBox.style.display = "flex"
        finalScore.innerText = score
    }
}

nextBtn.addEventListener('click', calculateScore)

replay.addEventListener('click', () => {
    console.log("restart")
    resultBox.style.display = "none"
    score = 0
    index = 0
    console.log("restart")
    infoBox.style.display = "none"
    quizBox.style.display = "block"
    fetchQuestionAPI()
    quesNum.innerText = index+1
})

quitQuiz.addEventListener('click', ()=> {
    console.log("quit quiz")
    score = 0
    index = 0
    resultBox.style.display = "none"
    infoBox.style.display = "none"
    quizBox.style.display = "none"
})

// reset timer 
const resetTimer = () => {
    seconds = 59;
    timeLeft = 0;
}
const oneMinuteTimer = () => {
  if (seconds < 60) {
    timer.innerText = seconds;
  }
  if (seconds >= 0) {
    seconds--;
  } else {
    clearInterval(timeLeft);

  }
};

// start timer
const startTimer = () => {
    console.log(timeLeft)
    if (!timeLeft) {
        timeLeft = window.setInterval(function () {
          oneMinuteTimer();
        }, 1000);
      }
}