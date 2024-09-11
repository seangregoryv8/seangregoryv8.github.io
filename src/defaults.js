import { fetchColourJsonFiles, fetchInfoJsonFiles } from "./readJson.js";

export function isContact()
{
    return window.location.href.indexOf("contact.html") != -1
}

export function isPortfolio()
{
    return window.location.href.indexOf("portfolio.html") != -1
}

export function isItem()
{
    return window.location.href.indexOf("item.html") != -1
}

export function isHome()
{
    return window.location.href.indexOf("contact.html") == -1 && 
    window.location.href.indexOf("item.html") == -1 && 
    window.location.href.indexOf("portfolio.html") == -1
}

export var jsonInfo = [];
export var jsonColours = [];

export async function getColours()
{
    jsonColours = await fetchColourJsonFiles() || [];
    document.getElementsByTagName("html")[0].style.backgroundColor = jsonColours.background
}
export async function getInfo()
{
    jsonInfo = await fetchInfoJsonFiles() || [];
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}