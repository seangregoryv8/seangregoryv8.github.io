import { getInfo, getRandomNumber, isItem, isPortfolio, jsonInfo } from "./defaults.js";
import { getLanguage } from "./language.js";
import { formatTitle, resizeTitle } from "./main.js";
import { fetchJsonFiles } from "./readJson.js";

var jsonPortfolio = [];

async function getPortfolio()
{
    jsonPortfolio = await fetchJsonFiles() || [];
}

await getInfo();
await getPortfolio();

export function getPortfolioExplanations()
{
    if (isPortfolio())
    {
        let obj = (getLanguage() == "en") ? jsonInfo.en : jsonInfo.fr;
        document.getElementsByClassName("explanationTitle")[0].innerHTML = obj.portfolioDesc
        document.getElementsByClassName("computerTitle")[0].innerHTML = obj.portfolioTitle
        document.getElementsByClassName("compButton")[0].innerHTML = obj.portfolioButtons[0]
        document.getElementsByClassName("artButton")[0].innerHTML = obj.portfolioButtons[1]
    }
}

/**
 * 
 * @param {string} type 
 */
function showData(type)
{
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
                    localStorage.setItem("portfolioItem", jsonString);
                    const imageURL = `./images/${arr[i].images}/main.png`;
                    localStorage.setItem("backgroundImageUrl", imageURL)
                    window.location.href = `./item.html?${keys[i]}`;
                }

                let title = document.createElement("h2");
                title.id = "itemTitle";
                title.classList.add("shine");
                title.innerHTML = key;
                item.appendChild(title);

                let source = document.createElement("img")
                source.classList.add("itemImage");
                source.src = `./images/${arr[i].images}/thumb.png`;
                item.appendChild(source);

                home.appendChild(item);
            }
        }
    })
}

getPortfolioExplanations();
if (!isItem()) resizeTitle();

let buttonClick = window.location.href.split("#")[1];
if (buttonClick != undefined)
{
    document.getElementsByClassName("list")[0].textContent = "";
    switch (buttonClick)
    {
        case "computer":
            showData("Computer Science");
            break;
        case "art":
            showData("Filmmaking");
            break;
    }
}

function begin()
{
    if (isPortfolio())
    {
        let navBarOptions = document.getElementsByClassName("navBarOptions")[0];
        let items = navBarOptions.getElementsByTagName("div");
        for (let i = 0; i < items.length; i++)
        {
            items[i].children[0].addEventListener("click", () => 
            {
                console.log("HI")
                let topic = items[i].children[0].innerHTML;
                if (topic == "Informatique") topic = "Computer Science";
                if (topic == "Réalisation de films") topic = "Filmmaking";
                //items[i].children[0].style.backgroundColor = "#00AA00"
                document.getElementsByClassName("list")[0].textContent = "";
                
                showData(topic);
            });
        }
    }
}

begin();