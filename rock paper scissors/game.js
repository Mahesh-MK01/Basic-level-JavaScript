let userscore = 0;
let computerscore = 0;

let choices =document.querySelectorAll(".choice");
let msg =document.querySelector("#msg");
let userscoreNum=document.querySelector("#user-score");
let compscoreNum=document.querySelector("#comp-score");


let winner = (userwin,Uchoice,compgen) => {
    if (userwin){
        userscore++;
        userscoreNum.innerText=(userscore);
        msg.innerText = `YOU WON! [Your ${Uchoice} beats ${compgen} ]`;
        msg.style.backgroundColor="green";
    }else {
        computerscore++;
        compscoreNum.innerText=(computerscore);
        msg.innerText = `You Lose [Computer's ${compgen} Beats Your ${Uchoice}]`;
        msg.style.backgroundColor="red";
    }
}

const comgeration = () => {
    let choiceList = ["rock","paper","scissors"];
    let comchoice = Math.floor(Math.random() * 3);
    return choiceList[comchoice];

}
const Drawgame = () => {
    msg.innerText = "Game was drawn . Play again";
    msg.style.backgroundColor="#081b31"; 
}

let playgame = (Uchoice) => {
    console.log ("user Choice = ", Uchoice );
    let compgen= comgeration();
    console.log ("com choice = ", compgen);
    if (Uchoice === compgen) {
        Drawgame();
    }else {
        let userwin = true;
        if (Uchoice === 'rock') {
            userwin = compgen === 'paper' ? false : true ; 
        }else if (Uchoice === 'paper'){
            userwin = compgen === 'scissors'? false : true ;
        }else {
            userwin = compgen === 'scissors' ? false : true ;
        }
        winner (userwin,compgen,Uchoice);    
    }

}


choices.forEach((choice) => {
    choice.addEventListener("click",() =>{
        const Userchoice = choice.getAttribute("id");
        playgame(Userchoice);
    });
});