// navbar
const menu = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".navLinks");

menu.onclick = () => {
    navLinks.classList.toggle("active");
    menu.classList.toggle("move");
};

//links
const myform = document.getElementById("myform");
const items = JSON.parse(localStorage.getItem("items")) || [];

window.addEventListener("load", () => {
    items.map((item) => {
        const { originLink, result } = item;
        displayLinks(originLink, result);
    });
});

myform.addEventListener("submit", addLinks);

function addLinks(e) {
    // if (myform.checkValidity() === true) {
    //     e.preventDefault();
    //     shorterLink();
    // }
    e.preventDefault();
    shorterLink();
    this.reset();
}

const shorterLink = async () => {
    const originLink = document.getElementById("userInput").value;
    let result = await getData(originLink);
    addToLocalStorage(originLink, result);
    displayLinks(originLink, result);
    return originLink;
};

async function getData(originLink) {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${originLink}`);
    const links = await response.json();
    const result = links["result"]["full_short_link2"];

    console.log(result);
    return result;
}

const addToLocalStorage = (originLink, result) => {
    const item = {
        originLink,
        result,
    };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
};

const itemsList = document.querySelector(".linksList");

// function displayLinks(originLink, result) {
//     itemsList.innerHTML = "";
//     items.forEach((item) => {
//         // for (let i = 0; i < Object.keys(JSON.parse(localStorage.getItem("items"))).length; i++) {

//         const linksShow = document.createElement("li");
//         const shortenLinks = document.createElement("div");
//         const allLinks = document.createElement("div");
//         const userLink = document.createElement("div");
//         const outputLink = document.createElement("div");
//         const copyBtn = document.createElement("button");

//         linksShow.classList.add("linksShow");
//         shortenLinks.classList.add("shortenLinks");
//         allLinks.classList.add("allLinks");
//         userLink.classList.add("userLink");
//         outputLink.classList.add("outputLink");
//         copyBtn.classList.add("copyBtn");

//         userLink.innerHTML = `${originLink}`;
//         outputLink.innerText = `${result}`;

//         allLinks.appendChild(userLink);
//         allLinks.appendChild(outputLink);
//         shortenLinks.appendChild(allLinks);
//         shortenLinks.appendChild(copyBtn);
//         linksShow.appendChild(shortenLinks);
//         itemsList.appendChild(linksShow);

//         // copy button function
//         copyBtn.style.backgroundColor = "var(--Cyan)";
//         copyBtn.innerHTML = "Copy";
//         copyBtn.addEventListener("click", () => {
//             navigator.clipboard.writeText(result);
//             copyBtn.style.backgroundColor = "var(--Dark-Violet)";
//             copyBtn.innerHTML = "Copied!";
//         });
//     });
// }

function displayLinks(originLink, result) {
   const setItem = `
    <li class="linksShow">
            <div class="shortenLinks">
                <div class="allLinks">
                    <div class="userLink">${originLink}</div>
                    <div class="outputLink">${result}</div>
                </div>
                <button class="copyBtn">Copy</button>
            </div>
            </li>
        `;
    itemsList.innerHTML = setItem;
    const copyBtn = itemsList.querySelector(".copyBtn");
    const copyBtn = linksShow.querySelector(".copyBtn");
    copyBtn.style.backgroundColor = "var(--Cyan)";
    copyBtn.innerHTML = "Copy";
    // copy button function

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(result);
        copyBtn.style.backgroundColor = "var(--Dark-Violet)";
        copyBtn.innerHTML = "Copied!";
    });
}
