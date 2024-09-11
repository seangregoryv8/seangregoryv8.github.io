// Notes:
// FOCUS ON OPTIMIZATION NOW!!!

import { getInfo, getColours, isHome, jsonColours, jsonInfo, isContact } from "./defaults.js";
import { getLanguage } from "./language.js";

await getInfo();
await getColours();

function resizeSmallTitle()
{
    let width = window.innerWidth
    let sec = document.getElementsByClassName("title")[0];

    let height = (width / 4 < 600) ? 300 : width / 4
    
    sec.style.height = `${height}px`
    let titl = document.getElementsByTagName("h1")[0];
    titl.style.paddingBottom = `${height / 4}px`
}

export function resizeTitle()
{
    let width = window.innerWidth
    let sec = document.getElementsByClassName("title")[0];

    let height = (width / 2.5 < 600) ? 600 : width / 2.5
    
    sec.style.height = `${height}px`
    let titl = document.getElementsByTagName("h1")[0];
    titl.style.paddingBottom = `${height / 2}px`
}

export function getAboutMe()
{
    if (isHome())
    {
        let info = (getLanguage() == "en") ? jsonInfo.en : jsonInfo.fr;
        document.getElementsByClassName("aboutMeTitle")[0].innerHTML = info.aboutMeTitle
        let desc =  document.getElementsByClassName("aboutMeDescription")[0]
        desc.innerHTML = ""
        info.aboutMeDescription.forEach(line =>
        {
            let lin = document.createElement("p");
            lin.innerHTML = line;
            desc.appendChild(lin);
    
            desc.appendChild(document.createElement("br"));
        });
        
        let currentButton = document.getElementsByClassName("aboutMeProjectComputer")[0]
        currentButton.innerHTML = info.projectsComputer
        currentButton.addEventListener("click", () => window.location.href = "./portfolio.html#computer")
        
        currentButton = document.getElementsByClassName("aboutMeProjectFilm")[0]
        currentButton.innerHTML = info.projectsFilm
        currentButton.addEventListener("click", () => window.location.href = "./portfolio.html#art")
        
        currentButton = document.getElementsByClassName("aboutMeWorkWith")[0]
        currentButton.innerHTML = info.work
        currentButton.addEventListener("click", () => window.location.href = "./contact.html")
    
        let languages = info.languages
        document.getElementsByClassName("aboutLanguagesTitle")[0].innerHTML = languages.title;
        document.getElementsByClassName("aboutLangaugesDescription")[0].innerHTML = languages.info;
    
        document.getElementsByClassName("allLanguages")[0].innerHTML = ""
        languages.expert.forEach(language => languageMaker(language, "Expert"))
        languages.intermediate.forEach(language => languageMaker(language, getLanguage() == "en" ? "Intermediate" : "Intermédiaire"))
        languages.beginner.forEach(language => languageMaker(language, getLanguage() == "en" ? "Beginner" : "Débutant"))
    }
}

function languageMaker(desc, exp)
{
    let p = document.createElement("p");
    p.innerHTML = "(" + exp + ") " + desc;
    p.style.backgroundColor = jsonColours.topics;
    document.getElementsByClassName("allLanguages")[0].appendChild(p);
}


/**
 * 
 * @param {string} title 
 */
export function formatTitle(title)
{
    let newTitle = "";
    let i = 0;
    let character = '';
    while (i <= title.length)
    {
        character = title.charAt(i);
        if (i == 0) newTitle += character.toUpperCase();
        else
        {
            if (character == character.toUpperCase()) newTitle += " " + character
            if (character == character.toLowerCase()) newTitle += character
        }
        i++;
    }
    return newTitle
}

function colourButtons()
{
    let buttons = document.getElementsByTagName("button");
    Array.from(buttons).forEach(button => 
    {
        button.style.borderColor = jsonColours.buttonBorder;
        button.style.color = jsonColours.button;
        button.style.fontFamily = "Broadmoor";
        interactiveClicking(button);
    })
}

export function interactiveClicking(tag)
{
    tag.addEventListener("mouseover", () => 
    {
        tag.style.backgroundColor = "rgb(120, 120, 120)";
    })
    tag.addEventListener("mouseout", () => 
    {
        tag.style.backgroundColor = "transparent";
    })
    tag.onmousedown = () => 
    {
        console.log("HIS")
        tag.style.backgroundColor = "rgb(220, 220, 220)";
    };
    tag.onmouseup = () => 
    {
        tag.style.backgroundColor = "transparent";
    };
}

/**
 * 
 * @param {string} desc 
 * @param {string} link 
 */
function linkMaker(desc, link)
{
    let div = document.createElement("div");
    div.classList.add("linkContainer");
    div.addEventListener("click", () => { window.location.href = link });

    let p = document.createElement("p");
    p.innerHTML = desc;
    p.style.textAlign = "center";
    let a = document.createElement("a");
    a.href = link;
    a.innerHTML = link.replace("mailto: ", "");
    a.style.color = "white";
    p.style.backgroundColor = jsonColours.topics;
    p.appendChild(a)
    div.appendChild(p);
    document.getElementsByClassName("allLinks")[0].appendChild(div);
}

function showLinks()
{
    linkMaker("Email: ", "mailto: seangregoryv8@gmail.com")
    linkMaker("LinkedIn: ", "https://www.linkedin.com/in/sean-gregory-v8/")
    linkMaker("Phone Number: (438) 499-8801", "");
}


if (isContact())
{
    resizeSmallTitle();
    showLinks();
}
else if (isHome())
{
    resizeTitle();
    getAboutMe();
}

colourButtons();