function resizeSmallTitle()
{
    let width = window.innerWidth
    let sec = document.getElementsByClassName("title")[0];

    let height = (width / 4 < 600) ? 300 : width / 4
    
    sec.style.height = `${height}px`
    let titl = document.getElementsByTagName("h1")[0];
    titl.style.paddingBottom = `${height / 4}px`
}