const questions = [
    {
        question: "In the JavaScript, which one of the following is not considered as an error:",
        list: ["Syntax error", "Missing of semicolons", "Division by zero", "Missing of Bracket"],
        answer: "Division by zero"
    },
    {
        question: "How can a datatype be declared to ba a constant type?",
        list: ["const", "var", "let", "constant"],
        answer: "const"
    },
    {
        question: "When an operator's value is NULL, the typeof returned by unary operator is:",
        list: ["Boolean", "Undefined", "Object", "Integer"],
        answer: "Object"
    },
    {
        question: "What does the JavaScript 'debugger' statement do?",
        list: ["It will debug all the errors in the program at runtime", "it acts as a breakpoint in a program", "It will debug error in the current statement if any", "All of the above"],
        answer: "it acts as a breakpoint in a program"
    },
    {
        question: "How to stop an interval timer in Javascript?",
        list: ["clearInterval", "clearTimer", "intervalOver", "None of the above"],
        answer: "clearInterval"
    },
    {
        question: "Which one of the following also known as Conditional Expression:",
        list: ["Alternative to if-else", "Switch statement", "If-then-else statement", "immediate if"],
        answer: "immediate if"
    },
    {
        question: "JavaScript is an _____ language",
        list: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
        answer: "Object-Oriented"
    },
    {
        question: "In JavaScript, what is a block of statement?",
        list: ["Conditional block", "block that combines a number of statements into a single compound statement", "both conditional block and a single statement", "block that contains a single statement"],
        answer: "block that combines a number of statements into a single compound statement"
    },
    {
        question: "The 'function' and ' var' are known as:",
        list: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
        answer: "Declaration statements"
    },
    {
        question: "Which of the following number object function returns the value of the number?",
        list: ["toString()", "valueOf()", "toLocaleString()", "toPrecision()"],
        answer: "valueOf()"
    }
]

questions.sort(() => 0.5 - Math.random());
questions.forEach(question => {
    question.list.sort(() => 0.5 - Math.random());
})

const questionNumber = document.querySelector(".question-number");
const totalQuestion = document.querySelector(".total-questions");
const question = document.querySelector(".question");
const radios = document.querySelectorAll(".input-radio")
const labels = document.querySelectorAll(".radio-label");
const back = document.querySelector("#back");
const next = document.querySelector("#next");
const submit = document.querySelector("#submit");
const formOne = document.querySelector(".form-1");
const formTwo = document.querySelector(".form-2");
const result = document.querySelector(".result");


totalQuestion.textContent = questions.length;
answerArr = [];
for(let i = 0; i < questions.length; i++) {
    answerArr.push(" ")
}
score = questions.length;

function displayBtns() {
    if(questionNumber.textContent == "1") {
        back.style.display = "none";
        next.style.display = "inline";
    } else if(questionNumber.textContent > "1") {
        back.style.display = "inline";
        next.style.display = "inline";
    }
    if(questionNumber.textContent < totalQuestion.textContent) {
        next.style.display = "inline";
    } else if(questionNumber.textContent == totalQuestion.textContent) {
        next.style.display = "none";
    }
}
displayBtns();

function increaseCount() {
    questionNumber.textContent = eval(`${questionNumber.textContent} + 1`);
}

function decreaseCount() {
    questionNumber.textContent = eval(`${questionNumber.textContent} - 1`);
}

createQuestion = () => {
    question.textContent = questions[questionNumber.textContent-1].question;
    for(let i = 0; i < labels.length; i++) {
        labels[i].textContent = questions[questionNumber.textContent-1].list[i]
    }
}
createQuestion();

function createValue() {
    for(let i = 0; i < radios.length; i++) {
        radios[i].setAttribute("value", labels[i].textContent);
    }
}
createValue()


function checkSelected() {
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked){
            answerArr[questionNumber.textContent-1] = radios[i].value;
            console.log(answerArr);
            return;
        }
    }
    
}

function retrieveSelected() {
    for(let j = 0; j < radios.length; j++) {
        let test = radios[j].value == answerArr[questionNumber.textContent-1];
        if(test == true) {
            radios[j].checked = true;
            return;
        }else if(test != true && answerArr[questionNumber.textContent-1] == " ") {
            radios[j].checked = false;
        }
    }
}

radios.forEach(radio => {
    radio.addEventListener('click', ()=> {
        checkSelected();
    })
})

next.addEventListener('click', () => {
    increaseCount();
    createQuestion();
    createValue();
    retrieveSelected();
    displayBtns();
})

back.addEventListener('click', () => {
    decreaseCount();
    createQuestion();
    createValue();
    retrieveSelected();
    displayBtns();
})

function checkScore() {
    for(let i = 0; i < questions.length;i++) {
        if(answerArr[i] == questions[i].answer) {
        } else {
            score--;
        }
    }
}

function displayResult() {
    formOne.classList.add("hidden");
    formTwo.classList.remove("hidden");
    result.textContent = `You got ${score} of ${questions.length} questions`;
}

submit.addEventListener('click', () => {
    if(confirm("Are you sure you want to submit!")) {
        checkSelected();
        checkScore();
        displayResult();
    } else {
        return;
    }
})