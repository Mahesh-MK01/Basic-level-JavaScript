const base_url =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns =document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let collect of dropdowns){
    for (codes in countryList){
        let options = document.createElement("option");
        options.value = codes;
        options.innerText = codes;
        if (collect.name === "from" && codes === "INR"){
            options.selected="select";
        }else if (collect.name === "to" && codes === "USD"){
            options.selected="select";
        }    
        collect.append(options);
    
    }
    collect.addEventListener("change" ,(even) => {
        updateFlag(even.target);
    })
};

const updateFlag = (elemt) => {
    let codes = elemt.value ;
    let currntCodes = countryList[codes];
    let newSrc = `https://flagsapi.com/${currntCodes}/flat/64.png` ;
    let newimg = elemt.parentElement.querySelector("img");
    newimg.src= newSrc;
};


const updateExchageRange = async() => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval <1){
        amtval = 1 ;
        amount.value = "1";
    }

    const from = fromcurr.value.toLowerCase();
    const to = tocurr.value.toLowerCase();
    const url = `${base_url}/${from}.json`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let rate = data[from][to];
        let converted = (amtval * rate).toFixed(2);

        msg.innerHTML = `${amtval} ${fromcurr.value} <span class="bright">=></span> ${converted} ${tocurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching data. Try again later.";
       
    }};


btn.addEventListener("click", (evnt) =>{
    evnt.preventDefault();
    updateExchageRange();
});

addEventListener ("load", () =>{
    updateExchageRange();
});
