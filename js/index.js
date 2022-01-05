let introduction = 
"I'm an artistically inclined John Abbott College computer science student with a keen eye for storytelling and finite attention to detail. " + 
"I always make sure everything I put out is my best work, and never hesitate to sink hundreds of hours into a project to achieve such. I seek " +
"to use my combination of art and computer skills in whatever I do, in the hopes of fabricating something truly amazing and bigger than myself " + 
"that I could be proud of for the rest of my life.\n\n" + 
"Born and raised in Montreal Quebec in a quiet town, I'm all for the suburban, quiet lifestyle, but because I'm an extrovert, I wouldn't mind a bit of chaos in my " + 
"life. My mind is always flowing with ideas, so I could probably be seen in a coffee shop (even though I don't drink coffee), a park, or just in front of my computer, " +
"trying to take all the insane ideas from my head and find some use for them.\n\n" + 
"I have always focused a lot on finite detail, and hope to use my combined set of artistic and computer skills to find a job where I can show people just what I can do."

function PreparePage()
{
    let who = document.getElementById("WhoAmI");
    if (who != null)
        who.innerHTML = introduction;
}

function ClickAway()
{
    document.getElementById("WhoAmI").style.animation = "fadeOutOpacity";
}

function LoadWork()
{

}

function PlaceWork()
{
    let works = document.getElementsByClassName("Piece");
    if (works != null)
    {
        const container = document.getElementById("ShadowImage");
        container.style.display = `grid`;
        container.style.gridTemplateRows = `repeat(${works.length}, 300px)`;
        container.style.gridTemplateColumns = `50% 50%`;
        
        for (let i = 0; i < works.length; i++)
        {
            works[i].setAttribute("style", `grid-row: ${i}`);
            console.log(works[i]);
        }

        works = document.getElementsByClassName("Title")
        for (let i = 0; i < works.length; i++)
        {
            works[i].setAttribute("style",
            `
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-align: center;
                border-radius: 20px;
            `);
        }

        works = document.getElementsByClassName("WorkImage")
        for (let i = 0; i < works.length; i++)
        {
            works[i].setAttribute("style", 
            `
                display: block;
                justify-content: center;
                margin-bottom: 2rem;
            `);
        }
    }
}

function NavToAbout()
{
    $('html, body').animate({ scrollTop: $("#AboutMeSection").offset().top }, 'fast');
}
function NavToWorks()
{
    console.log("HI")
    $('html, body').animate({ scrollTop: $("#PortfolioSection").offset().top }, 'fast');
}

function PlaceMobileWork()
{
    let works = document.getElementsByClassName("Work");
    if (works != null)
    {
        console.log("HI")
        const container = document.getElementById("ShadowImage");
        container.style.display = `grid`;
        container.style.gridTemplateRows = `repeat(${works.length}, auto)`;
        container.style.gridTemplateColumns = `100%`;
        for (let i = 0; i < works.length; i++)
        {
            works[i].setAttribute("style", `grid-row: ${i}`);
        }

        works = document.getElementsByClassName("WorkImage");
        for (let i = 0; i < works.length; i++)
        {
            works[i].setAttribute("style", 
            `
                margin: 0 auto;
                grid-column: 1;
                width: 50%;
                height: auto;
                margin-bottom: 5rem;
            `)
        }
    }
}

document.addEventListener("DOMContentLoaded", PreparePage)
document.addEventListener("DOMContentLoaded", PlaceWork)
var x = window.matchMedia("(max-width: 600px)");
x.addListener(PlaceMobileWork);