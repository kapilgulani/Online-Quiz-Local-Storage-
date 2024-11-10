// Initialize scores globally (persistent across pages)
let scores = JSON.parse(localStorage.getItem('scores')) || {
    math: 0,
    cosine: 0,
    english: 0,
    video: 0
};

// Function to load the scorecard and display scores
function loadScorecard() {
    const storedScores = JSON.parse(localStorage.getItem('scores'));
    if (storedScores) {
        document.getElementById('mathScore').innerText = storedScores.math || 0;
        document.getElementById('cosineScore').innerText = storedScores.cosine || 0;
        document.getElementById('englishScore').innerText = storedScores.english || 0;
        document.getElementById('videoScore').innerText = storedScores.video || 0;
    } else {
        document.getElementById('mathScore').innerText = 0;
        document.getElementById('cosineScore').innerText = 0;
        document.getElementById('englishScore').innerText = 0;
        document.getElementById('videoScore').innerText = 0;
    }
}

// Function to finish the quiz and calculate total score
function finishQuiz() {
    const totalScore = scores.math + scores.cosine + scores.english + scores.video;
    alert(`Quiz finished! Your total score is: ${totalScore}`);
    localStorage.removeItem('scores');
}

// Fill in the blanks for the English question
function fillBlanks(name, verb) {
    document.getElementById('blank1').innerText = name;
    document.getElementById('blank2').innerText = verb;
}

// Check English answer for fill-in-the-blank question
function checkEnglishAnswer() {
    const blank1 = document.getElementById('blank1').innerText;
    const blank2 = document.getElementById('blank2').innerText;
    if (blank1 === 'Either' && blank2 === 'or') {
        scores.english = 100;
    } else {
        scores.english = 0;
    }
    alert(`Answer submitted: ${blank1}, ${blank2}`);
    saveScores();
    window.location.href = 'video.html';
}

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Submit answer function for handling form submission
function submitAnswer(questionType) {
    event.preventDefault();
    const selectedOption = document.querySelector(`input[name="${questionType}"]:checked`);
    if (selectedOption) {
        if (questionType === 'formula' && selectedOption.value === 'y − y1 = m(x − x1)') {
            scores.math = 100;
        } else if (questionType === 'cosine' && selectedOption.value === 'Formula1') {
            scores.cosine = 100;
        } else if (questionType === 'video' && selectedOption.value === 'NASA') {
            scores.video = 100;
        }
        saveScores();
        alert(`Answer submitted: ${selectedOption.value}`);
        if (questionType === 'formula') {
            window.location.href = 'cosine.html';
        } else if (questionType === 'cosine') {
            window.location.href = 'english.html';
        } else if (questionType === 'english') {
            window.location.href = 'video.html';
        } else if (questionType === 'video') {
            window.location.href = 'scorecard.html';
        }
    } else {
        alert('Please select an answer.');
    }
    return false;
}

// Register function for register.html
function register() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    if (username && password) {
        const user = { username, password };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Registration successful! You can now login.');
        window.location.href = 'index.html';
    } else {
        alert('Please fill out both fields.');
    }
    return false;
}

// Login function for index.html (login page)
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
            alert('Login successful!');
            window.location.href = 'math.html';
        } else {
            alert('Incorrect password. Please try again.');
        }
    } else {
        alert('User not found. Please register first.');
    }
    return false;
}