const questions = [
    {
        question: "Hvad er hovedstaden i Danmark?",
        options: ["Oslo", "København", "Stockholm", "Berlin"],
        answer: 1
    },
    {
        question: "Hvad er 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "Hvilket år blev Danmark besat?",
        options: ["1940", "1939", "1914", "1945"],
        answer: 0
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const progressElement = document.getElementById("progress");
    const nextButton = document.getElementById("nextButton");

    questionElement.innerText = questions[currentQuestion].question;
    optionsElement.innerHTML = '';

    questions[currentQuestion].options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.onclick = () => checkAnswer(index);
        optionElement.innerHTML = `<div class="circle"></div>${option}`;
        optionsElement.appendChild(optionElement);
    });

    nextButton.style.display = 'none';
    progressElement.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

function checkAnswer(selectedIndex) {
    const options = document.querySelectorAll(".option");
    const correctIndex = questions[currentQuestion].answer;

    options.forEach((option, index) => {
        const circle = option.querySelector(".circle");
        if (index === correctIndex) {
            circle.classList.add("correct");
        } else {
            circle.classList.add("incorrect");
        }
    });

    const nextButton = document.getElementById("nextButton");
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert("Quiz færdig! Tak for at deltage.");
    }
}

loadQuestion();