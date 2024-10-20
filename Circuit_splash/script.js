let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const genCompChoice = () => {
    const options = ["Electricity", "Water", "Metal"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Draw! Play again.";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        msg.style.border = "2px solid black";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lost. ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

};

const playGame = (userChoice) => {

    //Generate computer choice
    const compChoice = genCompChoice();
    showSystemOP(compChoice);
    showUserOP(userChoice);
    if (userChoice === compChoice) {
        //Draw Game
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "Electricity") {
            //Metal, Water
            userWin = compChoice === "Water" ? true : false;
        } else if (userChoice === "Water") {
            //Electricity, Metal
            userWin = compChoice === "Metal" ? true : false;
        } else {
            //Electricity, Water
            userWin = compChoice === "Electricity" ? true : false;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const yourChoice = document.querySelector(".your");
const systemChoice = document.querySelector(".system");
const result = document.querySelector(".result");
const op = result.querySelectorAll("h2");
const uc1 = document.getElementById("yc1");
const uc2 = document.getElementById("yc2");
const uc3 = document.getElementById("yc3");
const sc1 = document.getElementById("sc1");
const sc2 = document.getElementById("sc2");
const sc3 = document.getElementById("sc3");
const alluserChoices = result.querySelectorAll('.show_choice_user');
const allSystemChoices = result.querySelectorAll('.show_choice');



window.onload = function () {
    op.forEach(heading => {
        heading.classList.add('hidden');
    });
    erase(2);
    const drop = document.querySelector(".drop");
    drop.classList.add("visibility");
};

const erase = (x) => {
    if (x === 0) {
        alluserChoices.forEach(choice => {
            choice.classList.add('hidden');
        });
    }
    else if (x === 1) {
        allSystemChoices.forEach(choice => {
            choice.classList.add('hidden');
        });
    }
    else {
        alluserChoices.forEach(choice => {
            choice.classList.add('hidden');
        });
        allSystemChoices.forEach(choice => {
            choice.classList.add('hidden');
        });
    }
};

// show system generated op
const showSystemOP = (compChoice) => {
    op.forEach(heading => {
        heading.classList.remove('hidden');
    });
    result.style.border = "2px solid rgb(0, 0, 100)";
    erase(1);
    if (compChoice === "Electricity") {
        sc1.classList.remove("hidden");
    }
    else if (compChoice === "Water") {
        sc2.classList.remove("hidden");
    }
    else {
        sc3.classList.remove("hidden");
    }
};
// show user choosen op
const showUserOP = (userChoice) => {
    erase(0);
    if (userChoice === "Electricity") {
        uc1.classList.remove("hidden");
    }
    else if (userChoice === "Water") {
        uc2.classList.remove("hidden");
    }
    else {
        uc3.classList.remove("hidden");
    }
};

// rules 
let dropDown = () => {
    let dropDown = document.querySelector(".drop");
    if (dropDown.classList[1])
        dropDown.classList.remove("visibility");
    // console.log(dropDown.classList[1]);
    else
        dropDown.classList.add("visibility");
};