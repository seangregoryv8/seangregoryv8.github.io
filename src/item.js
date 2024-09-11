import { getRandomNumber, jsonColours } from "./main.js";

const jsonString = localStorage.getItem("portfolioItem") || "";
const data = JSON.parse(jsonString);
console.log(data);

const imageURL = localStorage.getItem("backgroundImageUrl");

if (imageURL)
{
    let content = document.getElementsByClassName("content")[0];
    content.style.backgroundImage = `url('${imageURL}')`;

    const img = new Image();
    img.src = imageURL;

    img.onload = () => { content.style.height = `${img.height}px` }
}

document.getElementsByClassName("contentTitle")[0].innerHTML = data.title;

let description = document.getElementsByClassName("contentDesc")[0];
description.innerHTML = "";

let linkNum = 0;
data.description.forEach(desc => 
{
    let p = document.createElement("p");
    p.innerHTML = desc;
    let links = data.descriptionLinks || [];
    console.log(links.length);
    for (let i = 0; i <= links.length; i++)
    {
        if (p.innerHTML.indexOf("LINK") != -1)
        {
            let occurance = p.innerHTML.indexOf("LINK");
            let first = p.innerHTML.substring(0, occurance);
            let second = p.innerHTML.substring(occurance + 4, p.length);
            let splitter = [first, second];
            // <a class='unstyledLink'>VikramSinghMTL</a>
            let a = document.createElement("a");
            a.classList.add("unstyledLink");
            let link = data.descriptionLinks[linkNum];
            a.href = link;
            let linkSplitter = link.split("/");
            a.innerHTML = linkSplitter[linkSplitter.length - 1];
            console.log(a.innerHTML)
            a.style.color = jsonColours.button;
            a.style.fontWeight = "1000";
            p.innerHTML = splitter[0];
            p.appendChild(a);
            p.innerHTML += splitter[1];
            linkNum++;
        }
    }
    console.log(p);
    description.appendChild(p);

    let br = document.createElement("br");
    description.appendChild(br);
});

let chosenBorder = `url('../../images/borders/border-${getRandomNumber(1, 4)}.svg')`;

function removeBorder()
{
    if (window.innerWidth < 600)
        document.getElementsByClassName("contentBox")[0].style.backgroundImage = "none";
    else
        document.getElementsByClassName("contentBox")[0].style.backgroundImage = chosenBorder;
}
removeBorder();
window.addEventListener('resize', removeBorder);

function formulateButton()
{
    let button = document.getElementsByTagName("button")[0];
    let p;
    switch(data.type)
    {
        case "film":
            button.innerHTML = "Watch now!"
            button.addEventListener("click", () => { window.location.href = data.source })
            let time = data.length;
            let minutes = Math.floor(time / 60);
            let seconds = (time % 60 < 10) ? "0" + time % 60 : time % 60;

            p = document.createElement("p");
            p.innerHTML = `Length: ${minutes}:${seconds}`
            p.style.color = jsonColours.buttonBorder;
            description.appendChild(p);
        break;
        case "game":
            button.innerHTML = "Play now!"
            button.addEventListener("click", () => { window.location.href = data.source })
            
            p = document.createElement("p");

            p.innerHTML = "Languages Used:";
            data.languages.forEach(language => 
            {
                p.innerHTML += ` ${language},`
            });

            p.innerHTML = p.innerHTML.substring(0, p.innerHTML.length - 1);
            p.style.color = jsonColours.buttonBorder;
            description.appendChild(p);
        break;
    }
    
    let br = document.createElement("br");
    description.appendChild(br);
}

formulateButton();