import { fetchColourJsonFiles, fetchInfoJsonFiles, fetchJsonFiles } from "./readJson.js";

var language = "en";
var jsonPortfolio = [];
var jsonInfo = [];
export var jsonColours = [];

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getLanguage() { return language; }

async function getData()
{
    jsonPortfolio = await fetchJsonFiles() || [];
    jsonInfo = await fetchInfoJsonFiles() || [];
    jsonColours = await fetchColourJsonFiles() || [];

    document.getElementsByTagName("html")[0].style.backgroundColor = jsonColours.background
}

export function changeLanguage(newLanguage)
{
    language = newLanguage;
    getAboutMe();
}

function resizeTitle()
{
    let width = window.innerWidth
    let sec = document.getElementsByClassName("title")[0];

    let height = (width / 2.5 < 600) ? 600 : width / 2.5
    
    sec.style.height = `${height}px`
    let titl = document.getElementsByTagName("h1")[0];
    titl.style.paddingBottom = `${height / 2}px`
}

function getPortfolioExplanations()
{
    let obj = (language == "en") ? jsonInfo.en : jsonInfo.fr;
    document.getElementsByClassName("explanationTitle")[0].innerHTML = obj.portfolioDesc
}

function getAboutMe()
{
    let obj = (language == "en") ? jsonInfo.en : jsonInfo.fr;
    document.getElementsByClassName("aboutMeTitle")[0].innerHTML = obj.aboutMeTitle
    let desc =  document.getElementsByClassName("aboutMeDescription")[0]
    desc.innerHTML = ""
    obj.aboutMeDescription.forEach(line =>
    {
        let lin = document.createElement("p");
        lin.innerHTML = line;
        desc.appendChild(lin);

        desc.appendChild(document.createElement("br"));
    });
    
    document.getElementsByClassName("aboutMeProjectComputer")[0].innerHTML = obj.projectsComputer
    document.getElementsByClassName("aboutMeProjectComputer")[0].addEventListener("click", () => window.location.href = "./portfolio.html#computer")
    document.getElementsByClassName("aboutMeProjectFilm")[0].innerHTML = obj.projectsFilm
    document.getElementsByClassName("aboutMeProjectFilm")[0].addEventListener("click", () => window.location.href = "./portfolio.html#art")
    document.getElementsByClassName("aboutMeWorkWith")[0].innerHTML = obj.work
    document.getElementsByClassName("aboutMeWorkWith")[0].addEventListener("click", () => window.location.href = "./contact.html")

    let languages = obj.languages
    document.getElementsByClassName("aboutLanguagesTitle")[0].innerHTML = languages.title;
    document.getElementsByClassName("aboutLangaugesDescription")[0].innerHTML = languages.info;

    document.getElementsByClassName("allLanguages")[0].innerHTML = ""
    languages.expert.forEach(language => languageMaker(language, "Expert"))
    languages.intermediate.forEach(language => languageMaker(language, getLanguage() == "en" ? "Intermediate" : "Intermédiaire"))
    languages.beginner.forEach(language => languageMaker(language, getLanguage() == "en" ? "Beginner" : "Débutant"))
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
 * @param {string} type 
 */
function showData(type)
{
    console.log(type);
    jsonPortfolio.forEach(port => {
        if (type.toLowerCase().includes(port.title))
        {
            let arr = Object.values(port.data)
            let keys = Object.keys(port.data)
            let home = document.getElementsByClassName("list")[0];
            for (let i = 0; i < arr.length; i++)
            {
                let key = formatTitle(keys[i]).trim();
                let item = document.createElement("section");
                item.style.backgroundImage = `url('../../images/borders/border-${getRandomNumber(1, 4)}.svg')`
                item.classList.add("item");

                item.onclick = () => 
                {
                    const newThing = arr[i];
                    newThing.title = key;
                    const jsonString = JSON.stringify(newThing);
                    localStorage.setItem("portfolioItem", jsonString)
                    const imageURL = `./images/${arr[i].images}/main.png`;
                    localStorage.setItem("backgroundImageUrl", imageURL)
                    window.location.href = `./item.html?${keys[i]}`;
                }

                let title = document.createElement("h2");
                title.id = "itemTitle";
                title.classList.add("shine");
                title.innerHTML = key;
                item.appendChild(title);

                let source = document.createElement("img");
                source.classList.add("itemImage");
                source.src = `./images/${arr[i].images}/thumb.png`;
                item.appendChild(source);

                home.appendChild(item);
            }
        }
    })

}

/**
 * 
 * @param {string} title 
 */
function formatTitle(title)
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
    console.log(jsonColours)
    let buttons = document.getElementsByTagName("button");
    Array.from(buttons).forEach(button => 
    {
        button.style.borderColor = jsonColours.buttonBorder;
        button.style.color = jsonColours.button;
        button.style.fontFamily = "Broadmoor";
        button.style.backgroundColor = "#000000"
    })
}

if (window.location.href.indexOf("item.html") == -1)
{
    document.addEventListener('DOMContentLoaded', () => 
    {
        let navBarOptions = document.getElementsByClassName("navBarOptions")[0];
        let items = navBarOptions.getElementsByTagName("div");
        for (let i = 0; i < items.length; i++)
        {
            //items[i].children[0].style.backgroundColor = "#8b0000"
            items[i].children[0].addEventListener("click", () => 
            {
                console.log(items[i])
                //items[i].children[0].style.backgroundColor = "#00AA00"
                document.getElementsByClassName("list")[0].textContent = "";
                showData(items[i].children[0].innerHTML);
            });
        }
    })
}

await getData();
if (window.location.href.indexOf("seangregoryv8.github.io/") == -1)
{
    resizeTitle();
    getAboutMe();
}
else if (window.location.href.indexOf("portfolio.html") != -1)
{
    getPortfolioExplanations();
    resizeTitle();
    let buttonClick = window.location.href.split("#")[1];
    console.log(buttonClick);

    if (buttonClick != undefined)
    {
        document.getElementsByClassName("list")[0].textContent = "";
        switch (buttonClick)
        {
            case "computer": showData("Computer Science");
            case "art": showData("Filmmaking")
        }
    }
}

colourButtons();