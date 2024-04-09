//Global variables
let totalPoints = 0;
let roundPoints = 0;
let noOfRounds = 0;
let highScores = [];
let userName = "";

//I could get rid of most of these and instead declare them when i need them but 
//im declaring them here for readability
const topH2 = document.getElementById("topH2");
const nameForm = document.getElementById("nameForm");
const diceBtn = document.getElementById("diceBtn");
const saveBtn = document.getElementById("saveBtn")
const diceNumberEl = document.getElementById("diceNumber");
const roundPointsEl = document.getElementById("roundPoints");
const noOfRoundsEl = document.getElementById("noOfRounds");
const totalPointsEl = document.getElementById("totalPoints");
const messageH3 = document.getElementById("messageH3");
const die1 = document.getElementsByClassName("die one")
const highScoreEl = document.getElementById("highScore");
const allDice = document.querySelectorAll('.die');

//Could technicaly use arrowfunctions but declaring them as "methods" feels safer
nameForm.addEventListener("submit", insertName);
diceBtn.addEventListener("click", rollDice);
saveBtn.addEventListener("click", saveRound);

//Parsing an looping in the array of JSON-objects from localStorage
window.addEventListener("load", () => {
    allDice.forEach(die => {
        die.style.visibility = "hidden";
    });
    const storedHighScores = localStorage.getItem("highScores");
    //Checking so that localStorage isnt empty before parsing and looping through it
    if (storedHighScores) {
        highScores = JSON.parse(storedHighScores);
        //Putting my parsed objects in a list-element and populating an ol-element with them
        highScores.forEach(highScoreList => {
            const listItem = document.createElement("li");
            listItem.textContent = `${highScoreList.name}: ${highScoreList.score}`;
            highScoreEl.append(listItem);
        });
    }
});

function insertName(event){
    event.preventDefault();
    userName = nameForm.querySelector("input").value;
    topH2.innerText = userName;
    console.log(userName)
    nameForm.style.visibility = "hidden";
}

function rollDice(event){
    event.preventDefault();
    let dice = Math.round(Math.random()*(6-1)+1);
    diceNumberEl.innerText = "Your rolled a: " + dice;
    messageH3.innerText = "";
    allDice.forEach(die => {
        die.style.visibility = "hidden";
    });

    //Show the corresponding die-div
    const rolledDie = document.querySelector(`.die.die-${dice}`);
    if (rolledDie) {
        rolledDie.style.visibility = "visible";
    }
    if(dice == 1){
        rolledNnumberOne();
    }
    roundPoints = roundPoints + dice;
    roundPointsEl.innerText = "Your points for this round: " + roundPoints;
}

function saveRound(event){
    event.preventDefault();
    noOfRounds++;
    totalPoints = totalPoints + roundPoints;
    totalPointsEl.innerText = "Total points: " + totalPoints;
    noOfRoundsEl.innerText = "Number of rounds: " + noOfRounds;
    //If totalPoints is 100 or more it ends the round and saves score and userName to the "highScores" array
    if(totalPoints>=100){
        messageH3.innerText = "You won! Update the page to start again!"
        diceBtn.disabled=true;
        saveBtn.disabled=true;
        //Populates the array with new value pair
        highScores.push({ name: userName, score: noOfRounds });
        //Sorts the array based on score
        highScores.sort((a, b) => a.score - b.score);
        //Slices to make the array a top 5
        highScores = highScores.slice(0, 5);
        //Storing the array with JSON-objects in localStorage with the key "highScores"
        console.log(highScores);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    roundPoints = 0;
}

function rolledNnumberOne(){
    messageH3.innerText = "Your rolled 1, resetting score for this round!"
    noOfRounds++;
    noOfRoundsEl.innerText = "Number of rounds: " + noOfRounds;
    roundPoints = 0;
}
