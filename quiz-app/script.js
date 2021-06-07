const quizData = [
    {
        question: 'How old is Diogo?',
        a: '10',
        b: '17',
        c: '26',
        d: '110',
        correct: 'b'
    }, {
        question: 'What is the most used programming language in 2021?',
        a: 'C#',
        b: 'Java',
        c: 'Python',
        d: 'JavaScript',
        correct: 'd'
    }, {
        question: 'What does HTML stand for?',
        a: 'HyperText Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Json Object Notation',
        d: 'Helicopters Terminals Motorboats Lamborginis',
        correct: 'a'
    }, {
        question: 'What year was JavaScript launched?',
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    }
]
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_textEl = document.getElementById('a_text');
const b_textEl = document.getElementById('b_text');
const c_textEl = document.getElementById('c_text');
const d_textEl = document.getElementById('d_text');
const submitBtn = document.getElementById('submit')

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_textEl.innerText = currentQuizData.a;
    b_textEl.innerText = currentQuizData.b;
    c_textEl.innerText = currentQuizData.c;
    d_textEl.innerText = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {
    // check to see the answer
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) score++;

        currentQuiz++;
        if (currentQuiz < quizData.length) loadQuiz();
        else quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions.</h2> 
                <button onClick="location.reload()">Reload</button>
            `
    }
});