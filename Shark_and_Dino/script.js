let btn = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let game = document.querySelector(".game");
let op = document.querySelector(".output");
let res = document.createElement("h2");
let newGM = document.createElement("button");
newGM.innerText = "New Game";
newGM.style.margin = "14px";
newGM.style.padding = "14px";
newGM.style.borderRadius = "20px";
newGM.style.color = "white";
newGM.style.backgroundColor = "black";
newGM.style.borderColor = "white";
newGM.style.fontSize = "25px";
let btnClick = 0;
let match = false;
let input;
let names;

start();
function start() {


    let choosePlayer = prompt("Enter S for single player.\nEnter M for multiplayer.");
    if (choosePlayer[0] === 'S' || choosePlayer[0] === 's') {
        input = prompt("Enter player name:");
        if (input === "Dino" || input === "dino") {
            alert("Enter a different name!");
            start();
        }
        let name1 = 0, dino = 0;

        // let player1 = true;
        // let player2 = false;

        btn.forEach((box) => {
            box.addEventListener("click", () => {

                box.innerText = "🦈";
                box.disabled = true;
                btnClick++;
                // console.log(btnClick);
                // check();
                if (btnClick < 5)
                    dinomove();
                check();
            });
        });
        const dinomove = () => {
            let x;
            let foundEnabledBox = false;

            while (!foundEnabledBox) {
                x = Math.floor(Math.random() * 9);

                // Check if any of the boxes at the generated indices are enabled
                if (!btn[x].disabled) {
                    foundEnabledBox = true;
                }
            }
            btn[x].innerText = "🦖";
            btn[x].disabled = true;
        };

        const check = () => {
            for (pattern of win) {
                // console.log(pattern[0], pattern[1], pattern[2]);
                let c1 = btn[pattern[0]].innerText;
                let c2 = btn[pattern[1]].innerText;
                let c3 = btn[pattern[2]].innerText;
                if (c1 !== '' && c2 !== '' && c3 !== '') {
                    if (c1 === c2 && c2 === c3) {
                        match = true;
                        output(c1);
                        return;
                    }
                }
            }
            if (btnClick >= 5 && match === false) {
                output();
            }
        };

        const output = (c1) => {
            if (match) {
                if (c1 === '🦈') {
                    res.innerText = `Congratulations🎉 \nThe winner is ${input}`;
                    name1++;
                }
                else {
                    res.innerText = `OOPS! \nThe winner is Dino`;
                    dino++;
                }
            }
            else {
                res.innerText = "Game Over! It's a draw.";
            }
            res.style.fontSize = "30px";
            op.append(res);
            btn.forEach((box) => {
                box.disabled = true;
            });

            reset.classList.add("hid");
            res.after(newGM);
            newGM.classList.remove("hid");
        };

        newGM.onclick = (() => {
            btn.forEach((box) => {
                box.innerText = "";
                box.disabled = false;
                // player1 = true;
                // player2 = false;
            });
            res.innerText = "";
            reset.classList.remove("hid");
            newGM.classList.add("hid");
            score.classList.remove("hid");
            p1.innerText = `${input} = ${name1}`;
            p2.innerText = `Dino = ${dino}`;
            btnClick = 0;
            match = false;
        });
    }

    else if (choosePlayer[0] === 'M' || choosePlayer[0] === 'm') {
        input = prompt("Enter two names (name1 name2):");
        // Split the input into two names
        names = input.split(" ");
        // Trim whitespace from each name (optional)
        names = names.map(name => name.trim());
        if (names[0] === names[1]) {
            alert("Enter 2 different names!");
            start();
        }

        let name1 = 0, name2 = 0;

        const check = () => {
            for (pattern of win) {
                // console.log(pattern[0], pattern[1], pattern[2]);
                let c1 = btn[pattern[0]].innerText;
                let c2 = btn[pattern[1]].innerText;
                let c3 = btn[pattern[2]].innerText;
                if (c1 !== '' && c2 !== '' && c3 !== '') {
                    if (c1 === c2 && c2 === c3) {
                        match = true;
                        output(c1);
                        return;
                    }
                }
            }
            if (btnClick >= 9 && match === false) {
                output();
            }
        };

        const output = (c1) => {
            if (match) {
                if (c1 === '🦈') {
                    res.innerText = `Congratulations🎉 \nThe winner is ${names[0]}`;
                    name1++;
                }
                else {
                    res.innerText = `Congratulations🎉 \nThe winner is ${names[1]}`;
                    name2++;
                }
            }
            else {
                res.innerText = "Game Over! It's a draw.";
            }
            res.style.fontSize = "30px";
            op.append(res);
            btn.forEach((box) => {
                box.disabled = true;
            });

            reset.classList.add("hid");
            res.after(newGM);
            newGM.classList.remove("hid");
        };

        let player1 = true;
        let player2 = false;

        btn.forEach((box) => {
            box.addEventListener("click", () => {
                if (player1) {
                    box.innerText = "🦈";
                    player1 = false;
                    player2 = true;
                }
                else {
                    box.innerText = "🦖";
                    player1 = true;
                    player2 = false;
                }
                box.disabled = true;
                btnClick++;
                // console.log(btnClick);
                check();
            });
        });

        newGM.onclick = (() => {
            btn.forEach((box) => {
                box.innerText = "";
                box.disabled = false;
                player1 = true;
                player2 = false;
            });
            res.innerText = "";
            reset.classList.remove("hid");
            newGM.classList.add("hid");
            score.classList.remove("hid");
            p1.innerText = `${names[0]} = ${name1}`;
            p2.innerText = `${names[1]} = ${name2}`;
            btnClick = 0;
            match = false;
        });
    }
    else {
        alert("OOPS! INVALID INPUT! 😕");
        start();
    }
};

const win = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];







reset.onclick = (() => {
    btn.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    player1 = true;
    player2 = false;
    btnClick = 0;
    match = false;
});

let score = document.querySelector(".score");
let p1 = document.querySelector("#pl1");
let p2 = document.querySelector("#pl2");
score.classList.add("hid");

