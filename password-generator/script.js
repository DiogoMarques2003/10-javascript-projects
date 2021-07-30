const pwEL = document.getElementById('pw');
const copyEL = document.getElementById('copy');
const lenEL = document.getElementById('len');
const upperEL = document.getElementById('upper');
const lowerEL = document.getElementById('lower');
const numberEL = document.getElementById('number');
const symbolEL = document.getElementById('symbol');
const generateEL = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|\\;:\'",./<>?';

function getLowerCase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUperCase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymnol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateX() {
    const xs = [];
    if (upperEL.checked) xs.push(getUperCase());
    if (lowerEL.checked) xs.push(getLowerCase());
    if (numberEL.checked) xs.push(getNumber());
    if (symbolEL.checked) xs.push(getSymnol());
    
    return xs[Math.floor(Math.random() * xs.length)];
}

function generatePassword() {
    let password = '';
    const len = lenEL.value;

    if (!upperEL.checked && !lowerEL.checked && !numberEL.checked && !symbolEL.checked) return alert('Please select at least one option!');

    if (len < 8) return alert('Password length must be at least 8!');
    if (len > 40) return alert('Password length must be less than 40!');

    for (let i = 0; i < len; i++) {
        const x = generateX();
        password += x ? x : '';
    }

    pwEL.innerText = password;
}

generateEL.addEventListener('click', generatePassword);

copyEL.addEventListener('click', () => {
    const textarea = document.createElement("textarea");
    const password = pwEL.innerText;

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});