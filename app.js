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
let copyBtn = document.querySelector(".copyBtn");

formBtn.addEventListener("click", (e) => {
    const originLink = input.value;
    let API_URL = `https://api.shrtco.de/v2/shorten?url=${originLink}`;

    if (myform.checkValidity() === true) {
        shortenLinks.classList.add("active");
        feature.style.paddingTop = "100px";
        userLink.innerHTML = input.value;
        e.preventDefault();
        shorterLink();
    }

    async function shorterLink() {
        const request = new Request(API_URL);
        const response = await fetch(request);
        const links = await response.json();

        let result = links["result"]["full_short_link2"];

        outputLink.innerHTML = result;

        outputLink.innerHTML;

        // copy button function

        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(result);
            copyBtn.style.backgroundColor = "var(--Dark-Violet)";
            copyBtn.innerHTML = "Copied!";
        });
    }

    input.value = "";
    let copyBtn = document.querySelector(".copyBtn");

    copyBtn.style.backgroundColor = "var(--Cyan)";
    copyBtn.innerHTML = "Copy";
});
