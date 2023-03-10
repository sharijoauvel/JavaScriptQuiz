// List of quiz questions with correct answers
var questions = [
    {
      prompt: "Inside which HTML element do we put the JavaScript?",
      choices: [
          "<js>", 
          "<scripted>", 
          "<script>", 
          "<javascript>"
      ],
      answer: "<script>"
    },

    {
      prompt: "Where is the correct place to insert a JavaScript within the index.html file?",
      choices: [
        "<head> section", 
        "<body> section", 
        "<footer> section", 
        "None of the above"
      ],
      answer: "<body> section"
    },

    {
      prompt: "Which of the following is not a valid JavaScript variable name?",
      choices: [
          "2names",
          "_first_and_last_name",
          "FirstAndLast",
          "_2names"
      ],
      answer: "2names"
    },

    {
      prompt: "Which of the following function of String object returns the characters in a string between two indexes into the string?",
      choices: [
          "split()",
          "slice()",
          "substr()",
          "substring()"
      ],
      answer: "substring()"
    },


    {
      prompt: "Which is the correct way to write an IF statement in JavaScript?",
      choices: [
        "if i = 5",
        "if (i == 5)",
        "if i == 5 then",
        "if i = 5 then"
      ],
      answer: "if (i == 5)" 
    },

    {
      prompt: "How do you round the number 7.25, to the nearest integer?",
      choices: [
        "round(7.5)",
        "md(7.25)",
        "Math.round(7.25)",
        "Math.rnd(7.25)"
      ],
      answer: "Math.round(7.25)" 
    },

    {
      prompt: "Which event occurs when the user clicks on an HTML element?",
      choices: [
        "onclick",
        "onmouseclick",
        "onchange",
        "onmouseover"
      ],
      answer: "onclick" 
    },

    {
      prompt: "Which operator is used to assign a value to a variable?",
      choices: [
          "-",
          "x",
          "=",
          "=="
      ],
      answer: "=" 
    },

    {
      prompt: "Which one is a server-side Java Script object?",
      choices: [
            "Function",
            "File",
            "FileUpload",
            "FileUP"
      ],
      answer: "File" 
    },
  
    {
      prompt: "How can you add one line only comment in a JavaScript?",
      choices: [
          "//This is a comment",
          "<!--This is a comment-->",
          "/*This is a comment*/",
          "#This is a comment"
      ],
      answer: "//This is a comment"
    }];

// Declare all variables
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var goBackBtn = document.querySelector("#goback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Timer begins to countdown when player starts the quiz. The start page is the hidden
function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var startPageEl = document.getElementById("start-screen");
    startPageEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

//Questions are displayed for player to answer, answers are dispalyed as multiple choice in the form of a buttons
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-title")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

//If player selects an incorrect answer, time is deducted from timer and a message, including the correct answer, is displayed in red
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "red";
//If player selects a correct answer a message is displayed in green
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 4000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

//When timer ends players final score is displayed
function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;

//Questions are hidden was timer ends
    questionsEl.setAttribute("class", "hide");
}

// Quiz ends when timer finishes
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save score in local storage along with players initals
function saveHighscore() {
    var name = initialsEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save players scores
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
initialsEl.onkeyup = checkForEnter;
submitBtn.onclick = saveHighscore;

// Button for player to start the quiz
startBtn.onclick = quizStart;

