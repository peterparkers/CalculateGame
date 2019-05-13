var question = document.getElementById("question");
var userAnswer = document.getElementById("userAnswer");
var submitBtn = document.getElementById("ok");
var responseText = document.getElementById("response-text");
var score = document.getElementById("score");
var totalQuiz = document.getElementById("total-quiz");
var resultBox = document.getElementsByClassName("result-box")[0];
var playBox = document.getElementsByClassName("play-box")[0];
var playAgainBtn = document.getElementById("play-again");
userAnswer.focus();

var isTimeOut = false;
let setOperation = ["+", "-", "x", "/"];

// Create canvas
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 20;
var dx = -1;
var x = canvas.width;

// Class Quiz
function Quiz() {
    this.point = 0;
    this.section = 0;
    let number1, number2, operation;

    this.showQuiz = function() {
        number1 = Math.floor(Math.random() * 99) + 1;
        number2 = Math.floor(Math.random() * 99) + 1;
        operation = setOperation[Math.floor(Math.random() * setOperation.length)];
        number2 = filterDivision(number1, number2, operation);
        question.innerHTML = number1 + " &nbsp" + operation + " &nbsp" + number2;
    }
    this.getAnswer = function() {
        let answer = 0;
        switch(operation){
            case '+' : answer = number1 + number2; break;
            case '-' : answer = number1 - number2; break;
            case 'x' : answer = number1 * number2; break;
            case '/' : answer = number1 / number2;
        }
        return answer;
    }
}

// Algorithm filter division
function filterDivision(number1, number2, operation) {
    if(operation == '/') {
        while(number1 < number2) {
            number2 -= Math.floor(Math.random() * 10);
        }
        while(!Number.isInteger(number1 / number2)){
            number2--;
        }
    }
    return number2;
}

// Progress bar
function animate() { 
    c.fillStyle = "#2b2a2a";
    c.beginPath();
    c.fillRect(x, 0, 10, 30);
    c.fill();
    x += dx;
    checkTimeOut();
}
setInterval(animate, 30);

// Check Time out
function checkTimeOut() {
    if(x <= -10) {
        isTimeOut = true;
        resultBox.style.display = "block";
        playBox.style.display = "none";
        score.innerHTML = "Score : " + quiz1.point;
        totalQuiz.innerHTML = "Total quiz : " + quiz1.section;
    }
}

//Creating an object
var quiz1 = new Quiz();
quiz1.showQuiz();


// Check Answer after user click ok button or enter
userAnswer.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        checkAnswer();
    }
});
submitBtn.addEventListener('click', checkAnswer);
function checkAnswer() {
    if(!isTimeOut && userAnswer.value.length > 0) {
        if(userAnswer.value == quiz1.getAnswer()) {
            quiz1.point += 1;
            quiz1.section += 1;
            responseText.innerHTML = "Score : " + quiz1.point;
            responseText.style.color = "#0be06b";
        }
        else{
            responseText.innerHTML = "Score : " + quiz1.point;
            responseText.style.color = "#DE5B49";
            quiz1.section += 1;
        }
        quiz1.showQuiz();
        userAnswer.value = "";
    }
}

// Play Again
playAgainBtn.addEventListener('click', playAgain);
function playAgain() {
    location.reload();
}