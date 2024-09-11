import { getLanguage } from "./language.js";
import { getRandomNumber, isItem, jsonColours } from "./defaults.js";

let chosenBorder = `url('../../images/borders/border-${getRandomNumber(1, 4)}.svg')`;

function begin()
{
    if (isItem())
    {
        const jsonString = localStorage.getItem("portfolioItem") || "";
        const data = JSON.parse(jsonString);
        
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

        removeBorder();
        window.addEventListener('resize', removeBorder);
        changeItemDescription(data);
    }
}

export function changeItemDescription(data)
{
    var description = document.getElementsByClassName("contentDesc")[0];
    description.innerHTML = "";

    let language = getLanguage();
    let langDesc = language == "en" ? data.description.en : data.description.fr
    let linkNum = 0;
    langDesc.forEach(desc => 
    {
        console.log(desc);
        let p = document.createElement("p");
        p.innerHTML = desc;
        let links = data.descriptionLinks || [];
        console.log(links.length);
        for (let i = 0; i <= links.length; i++)
        {
            if (p.innerHTML.indexOf("LINK") != -1)
            {
                let occurance = p.innerHTML.indexOf("LINK");
                console.log(occurance);
                let first = p.innerHTML.substring(0, occurance);
                let second = p.innerHTML.substring(occurance + 4, p.length);
                let splitter = [first, second];
                console.log(splitter);
                // <a class='unstyledLink'>VikramSinghMTL</a>
                let a = document.createElement("a");
                a.classList.add("unstyledLink");
                let link = data.descriptionLinks[linkNum];
                a.href = link;
                let linkSplitter = link.split("/");
                a.innerHTML = linkSplitter[linkSplitter.length - 1];
                a.style.color = jsonColours.button;
                a.style.fontWeight = "1000";
                p.innerHTML = splitter[0];
                p.appendChild(a);
                p.innerHTML += splitter[1];
                linkNum++;
            }
        }
        description.appendChild(p);
    
        let br = document.createElement("br");
        description.appendChild(br);
    });
    
    formulateButton(description, data);
}


function removeBorder()
{
    if (window.innerWidth < 600)
        document.getElementsByClassName("contentBox")[0].style.backgroundImage = "none";
    else
        document.getElementsByClassName("contentBox")[0].style.backgroundImage = chosenBorder;
}

function formulateButton(description, data)
{
    let button = document.getElementsByClassName("contentLink")[0];
    let p;
    switch(data.type)
    {
        case "film":
            button.innerHTML = getLanguage() == "en" ? "Watch now!" : "Regarder maintenant !"
            button.addEventListener("click", () => { window.location.href = data.source })
            let time = data.length;
            let minutes = Math.floor(time / 60);
            let seconds = (time % 60 < 10) ? "0" + time % 60 : time % 60;

            p = document.createElement("p");
            p.innerHTML = `${getLanguage() == "en" ? "Length" : "Longueur"}: ${minutes}:${seconds}`
            p.style.color = jsonColours.buttonBorder;
            description.appendChild(p);
        break;
        case "game":
            button.innerHTML = getLanguage() == "en" ? "Play now!" : "Jouer maintenant !"
            button.addEventListener("click", () => { window.location.href = data.source })
            
            p = document.createElement("p");

            p.innerHTML = getLanguage() == "en" ? "Languages Used:" : "Langues utilisées:";
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

begin();