// navbar
let menu = document.querySelector(".menu-icon");
let navLinks = document.querySelector(".navLinks");

menu.onclick = () => {
    navLinks.classList.toggle("active");
    menu.classList.toggle("move");
};

//links
let formBtn = document.querySelector(".formBtn");
let shortenLinks = document.querySelector(".shortenLinks");
let feature = document.querySelector(".feature");
let product = document.querySelector(".product");
let input = document.getElementById("userInput");
let userLink = document.querySelector(".userLink");
let outputLink = document.querySelector(".outputLink");

const originLink = input.value;
const API_URL = `https://api.shrtco.de/v2/shorten?url=${originLink}/very/long/link.html`;

formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    shortenLinks.classList.add("active");
    feature.style.paddingTop = "100px";
    userLink.innerHTML = input.value;
    shorterLink();
});

async function shorterLink() {
    const requestURL = API_URL;
    const request = new Request(requestURL);

    const response = await fetch(request);
    const links = await response.json();
    let result = links["result"]["full_short_link2"];
    console.log(result);
    outputLink.innerHTML = result;
}
