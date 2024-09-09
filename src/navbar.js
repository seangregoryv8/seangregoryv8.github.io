import { changeLanguage, jsonColours } from "./main.js";

function resizeNav()
{
    let width = window.innerWidth

    if (width >= 1160) console.log("DESKTOP")
    else if (width >= 600) console.log("TABLET")
    else console.log("MOBILE")

    document.getElementsByTagName("nav")[0].style.backgroundColor = jsonColours.navbar;


    let options = document.getElementsByClassName("dropdown")[0];
    options.innerHTML = "";
    if (width >= 1160)
    {
        makeTags(["Home", "Projects", "GitHub", "Contact"], options);
        makeLanguageToggle(options);
    }
    else
    {
        let imgTag = document.createElement("img");
        imgTag.classList.add("dropbtn");
        imgTag.src = "./icons/menu.png";
        imgTag.width = 50;
        imgTag.align = "right";
        options.appendChild(imgTag);

        imgTag.addEventListener("click", () => 
        {
            let nav = document.getElementsByTagName("nav")[0];
            if (options.children.length == 1)
            {
                let divtag = document.createElement("div");
                divtag.classList.add("dropdown-content");
        
                makeTags(["Home", "Projects", "GitHub", "Contact"], divtag);

                options.appendChild(divtag);

                nav.style.height = "auto";
            }
            else
            {
                nav.style.height = "96px";
                
                options.removeChild(options.children[1]);
            }
        })
    }
}
/**
 * 
 * @param {string[]} tags 
 * @param {HTMLDivElement} divtag
 */
function makeTags(tags, divtag)
{
    for (let i = 0; i < tags.length; i++)
    {
        let a = document.createElement("a");
        a.innerHTML = tags[i];
        a.style.textAlign = "right";
        a.style.marginRight = "10px";
        if (a.innerHTML == "GitHub") a.addEventListener("click", () => window.open("https://github.com/seangregoryv8").focus())
        if (a.innerHTML == "Projects") a.href = "./portfolio.html"
        if (a.innerHTML == "Contact") a.href = "./contact.html"
        if (a.innerHTML == "Home") a.href = "./index.html"
        divtag.appendChild(a);
    }
}
/**
 * 
 * @param {Element} tag 
 */
function makeLanguageToggle(tag)
{
    let div = document.createElement("div");
    div.classList.add("language-dropdown");
    div.style.margin = "20px";

    let label = document.createElement("label");
    label.setAttribute('for', "language-select");
    div.appendChild(label);

    let select = document.createElement("select");
    select.id = "language-select";
    select.style.backgroundColor = "transparent";
    select.style.fontSize = "24px";
    select.style.color = "white";
    select.style.border = "none";

    let options = [];
    options[0] = document.createElement("option");
    options[0].setAttribute('value', "en");
    options[0].setAttribute('selected', "true");
    options[0].innerHTML = "en";

    options[1] = document.createElement("option");
    options[1].setAttribute('value', "fr");
    options[1].innerHTML = "fr";

    options.forEach(option => 
    {
        option.style.color = "black";
        option.addEventListener("click", () => {changeLanguage(option.innerHTML)});
        select.appendChild(option);
    })

    div.appendChild(select);
    tag.appendChild(div);
}

resizeNav();

window.addEventListener('resize', resizeNav);