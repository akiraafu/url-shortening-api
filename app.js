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
  try {
    const originLink = document.getElementById("userInput").value;
    let result = await getData(originLink);
    storeData(originLink, result);
    displayLinks(originLink, result);
    return originLink;
  } catch (err) {
    console.log(err.message);
  }
};

async function getData(originLink) {
  try {
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${originLink}`
    );
    const links = await response.json();
    const result = links["result"]["full_short_link2"];

    console.log(result);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

const storeData = (originLink, result) => {
  const item = {
    originLink,
    result,
  };
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
};

const itemsList = document.querySelector(".linksList");

function displayLinks(originLink, result) {
  const linksShow = document.createElement("li");
  linksShow.innerHTML = "";
  const setItem = `
            <div class="shortenLinks">
                <div class="allLinks">
                    <div class="userLink">${originLink}</div>
                    <div class="outputLink">${result}</div>
                </div>
                <button class="copyBtn">Copy</button>
            </div>    
        `;
  linksShow.innerHTML = setItem;
  linksShow.classList.add("linksShow");
  itemsList.appendChild(linksShow);

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

window.addEventListener("load", () => {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.map((item) => {
    const { originLink, result } = item;
    displayLinks(originLink, result);
  });
});
