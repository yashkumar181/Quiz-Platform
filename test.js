let ques = [];
let correct;
let id = 0;

const inp = () => {
    let sawal = ques[id].question;
    correct = ques[id].correct_answer;
    let inc1 = ques[id].incorrect_answers[0];
    let inc2 = ques[id].incorrect_answers[1];
    let inc3 = ques[id].incorrect_answers[2];

    let final = [correct, inc1, inc2, inc3];
    final.sort(() => Math.random() - 0.5);

    document.querySelector(".ques").innerText = sawal;
    document.querySelector(".op1").innerText = final[0];
    document.querySelector(".op2").innerText = final[1];
    document.querySelector(".op3").innerText = final[2];
    document.querySelector(".op4").innerText = final[3];

    id++;
};

const demo = async () => {
    const url = "https://opentdb.com/api.php?amount=10";

    const response = await fetch(url);
    const data = await response.json();
    ques = data.results;
    id = 0; // Reset question index when fetching new data
    inp();
};

const x = document.querySelector(".btn");
x.addEventListener("click", () => {
    if (ques.length === 0) {
        demo();
        x.innerText = "Next Ques";
    } else {
        inp();
    }
});

document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", (event) => {
        resetColors();
        let answer = event.target.innerText;
        if (answer === correct) {
            event.target.style.backgroundColor = "green";
        } else {
            event.target.style.backgroundColor = "red";
        }
    });
});
const resetColors = () => {
    document.querySelectorAll(".box").forEach((box) => {
        box.style.backgroundColor = "";
    });
};

document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("box")) {
        resetColors();
    }
});
