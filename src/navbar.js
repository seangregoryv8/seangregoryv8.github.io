import { changeLanguage, getLanguage, interactiveClicking, jsonColours } from "./main.js";

async function resizeNav()
{
    let width = window.innerWidth

    //if (width >= 1160) console.log("DESKTOP")
    //else if (width >= 600) console.log("TABLET")
    //else console.log("MOBILE")

    document.getElementsByTagName("nav")[0].style.backgroundColor = jsonColours.navbar;

    let options = document.getElementsByClassName("dropdown")[0];
    options.innerHTML = "";
    if (width >= 1160)
    {
        makeTags(["Home", "Projects", "GitHub", "Contact"], options, false);
        makeLanguageToggle(options, false);
    }
    else
    {
        let imgTag = document.createElement("img");
        imgTag.classList.add("dropbtn");
        imgTag.src = "./icons/menu.png";
        imgTag.width = 50;
        imgTag.align = "left";
        options.appendChild(imgTag);

        imgTag.addEventListener("click", () => 
        {
            let nav = document.getElementsByTagName("nav")[0];
            if (options.children.length == 1)
            {
                let divtag = document.createElement("div");
                divtag.classList.add("dropdown-content");
        
                makeTags(["Home", "Projects", "GitHub", "Contact"], divtag, true);
                makeLanguageToggle(divtag, true);

                options.appendChild(divtag);
            }
            else
                options.removeChild(options.children[1]);
            nav.style.height = "auto";
        })
    }
}
/**
 * 
 * @param {string[]} tags 
 * @param {HTMLDivElement} divtag
 * @param {boolean} mobile
 */
function makeTags(tags, divtag, mobile)
{
    for (let i = 0; i < tags.length; i++)
    {
        let a = document.createElement("a");
        a.innerHTML = tags[i];
        a.style.textAlign = mobile ? "left" : "right";
        a.style.marginRight = "10px";
        interactiveClicking(a);
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
 * @param {boolean} mobile
 */
function makeLanguageToggle(tag, mobile)
{
    let div = document.createElement("div");
    div.classList.add("language-dropdown");
    div.style.margin = mobile ? "0" : "20px";

    //let label = document.createElement("label");
    //label.setAttribute('for', "language-select");
    //div.appendChild(label);

    let button = document.createElement("button");
    button.classList.add("languageButton");
    button.style.backgroundColor = "transparent";
    button.style.fontSize = mobile ? "24px" : "36px";
    button.style.color = "white";
    button.style.border = "none";
    button.style.textAlign = mobile ? "left" : "center";
    let setLanguage = getLanguage();
    button.innerHTML = setLanguage;
    button.addEventListener("click", () =>
    {
        button.innerHTML = button.innerHTML == "en" ? "fr" : "en";
        changeLanguage(button.innerHTML)
    });
    interactiveClicking(button);

    //let select = document.createElement("select");
    //select.id = "language-select";
    //select.style.backgroundColor = "transparent";
    //select.style.fontSize = mobile ? "20px" : "24px";
    //select.style.color = "white";
    //select.style.border = "none";
//
    //console.log(setLanguage);
    //let options = [];
    //options[0] = document.createElement("option");
    //options[0].setAttribute('value', "en");
    //if (setLanguage == "en")
    //    options[0].setAttribute('selected', "true");
    //options[0].innerHTML = "en";
//
    //options[1] = document.createElement("option");
    //options[1].setAttribute('value', "fr");
    //if (setLanguage == "fr")
    //    options[0].setAttribute('selected', "true");
    //options[1].innerHTML = "fr";
//
    //options.forEach(option => 
    //{
    //    option.style.color = "black";
    //    option.addEventListener("click", () => {changeLanguage(option.innerHTML)});
    //    select.appendChild(option);
    //})

    //div.appendChild(select);
    //tag.appendChild(div);
    tag.appendChild(button);
}

if (localStorage.getItem("language") == null)
{
    localStorage.setItem("language", "en")
    changeLanguage("en");
}

await resizeNav();

window.addEventListener('resize', resizeNav);