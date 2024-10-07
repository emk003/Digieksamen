//https://medium.com/@codewithashutosh/how-to-make-multiple-choice-quiz-in-html-code-dc5f99c1b0d5 derfra kan man lave en quiz

function checkAnswer(option, isCorrect) {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
        circle.style.backgroundColor = '#FFF387'; // reset all circles
    });

    const circle = option.querySelector('.circle');

    if (isCorrect) {
        circle.style.backgroundColor = '#6FCF97'; // Grøn for rigtigt svar
    } else {
        circle.style.backgroundColor = '#EB5757'; // Rød for forkert svar
    }

}

