import { changeItemDescription } from "./item.js";
import { getAboutMe } from "./main.js";
import { getPortfolioExplanations } from "./portfolio.js";

if (localStorage.getItem("language") == null)
    localStorage.setItem("language", "en")

var language = localStorage.getItem("language");

export function getLanguage() { return language; }

export function setLanguage()
{
    language = language == "en" ? "fr" : "en";
    localStorage.setItem("language", language)
}

export function changeLanguage(newLanguage)
{
    language = newLanguage;
    localStorage.setItem("language", language || "en")
    if (window.location.href.indexOf("portfolio.html") != -1)
    {
        getPortfolioExplanations();
    }
    else if (window.location.href.indexOf("item.html") != -1)
    {
        const jsonString = localStorage.getItem("portfolioItem") || "";
        const data = JSON.parse(jsonString);
        changeItemDescription(data);
    }
    else
    {
        getAboutMe();
    }
}