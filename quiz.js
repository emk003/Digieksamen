
//fået hjælp af chat til at lave dette

function checkAnswer(option, isCorrect) {
    // Henter alle elementer med klassen 'circle' (alle cirkler i svarmulighederne)
    const circles = document.querySelectorAll('.circle');

    // Gennemgår alle cirkler og nulstiller deres baggrundsfarve til den oprindelige gule (#FFF387)
    circles.forEach(circle => {
        circle.style.backgroundColor = '#FFF387'; //Nulstil alle cirkler
    });

    // Henter cirklen inden i den valgte svarmulighed
    const circle = option.querySelector('.circle');

    // Hvis svaret er korrekt, ændrer cirklen til grøn (#6FCF97)
    if (isCorrect) {
        circle.style.backgroundColor = '#6FCF97'; // Grøn for rigtigt svar

        // Hvis svaret er forkert, ændrer cirklen til rød (#EB5757)
    } else {
        circle.style.backgroundColor = '#EB5757'; // Rød for forkert svar
    }

}

