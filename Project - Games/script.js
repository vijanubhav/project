let userScore = 0;
let compScore = 0;
let drawScore = 0;
let u_score = document.getElementById('userresult');
let c_score = document.getElementById('compresult');
let d_score = document.getElementById('drawresult');
let userShowIcon = document.querySelector('.show i');
let computerShowIcon = document.querySelector('.comp i');
let text = document.getElementById('demo');
let text2 = document.getElementById('demo2');

let showicons = ["fas fa-hand-rock", "fas fa-hand-paper", "fas fa-hand-scissors"];

function compChoice() {
    let compChoices = ["r", "p", "s"];
    let randonNumber = Math.floor(Math.random() * 3);
    // console.log("Computer chose: " + compChoices[randonNumber])
    computerShowIcon.className = showicons[randonNumber];
    return compChoices[randonNumber];
}

function game(userChoice) {
    let computerChoice = compChoice();
    switch (userChoice + computerChoice) {
        case "rr":
        case "pp":
        case "ss":
            text.innerHTML = text2.innerHTML = "It's a Draw";
            text.style.color = text2.style.color = 'orange';
            drawScore++;
            d_score.innerHTML = drawScore;
            break;
        case "rs":
        case "sp":
        case "pr":
            text.innerHTML = text2.innerHTML = "User WINS";
            text.style.color = text2.style.color = 'green';
            userScore++;
            u_score.innerHTML = userScore;
            break;
        case "sr":
        case "ps":
        case "rp":
            text.innerHTML = text2.innerHTML = "Computer WINS";
            text.style.color = text2.style.color = 'red';
            compScore++;
            c_score.innerHTML = compScore;
            break;
    }
}

function main() {
    document.getElementById('rock').addEventListener('click', (e) => {
        // console.log("user clicked : rock");
        userShowIcon.className = "fas fa-hand-rock";
        game("r");
    })
    document.getElementById('paper').addEventListener('click', (e) => {
        // console.log("user clicked : paper");
        userShowIcon.className = "fas fa-hand-paper";
        game("p");
    })
    document.getElementById('scissors').addEventListener('click', (e) => {
        // console.log("user clicked : scissors");
        userShowIcon.className = "fas fa-hand-scissors";
        game("s");
    })
}

main();