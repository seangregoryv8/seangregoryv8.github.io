let introduction = 
"I'm an artistically inclined John Abbott College computer science student with a keen eye for storytelling and finite attention to detail. " + 
"I always make sure everything I put out is my best work, and never hesitate to sink hundreds of hours into a project to achieve such. I seek " +
"to use my combination of art and computer skills in whatever I do, in the hopes of fabricating something truly amazing and bigger than myself " + 
"that I could be proud of for the rest of my life.\n\n" + 
"Born and raised in Montreal Quebec in a quiet town, I'm all for the suburban, quiet lifestyle, but because I'm an extrovert, I wouldn't mind a bit of chaos in my " + 
"life. My mind is always flowing with ideas, so I could probably be seen in a coffee shop (even though I don't drink coffee), a park, or just in front of my computer, " +
"trying to take all the insane ideas from my head and find some use for them.\n\n" + 
"I have always focused a lot on finite detail, and hope to use my combined set of artistic and computer skills to find a job where I can show people just what I can do."

//console.log(document.getElementById("WhoAmI"))
document.addEventListener("DOMContentLoaded", PreparePage)

function PreparePage()
{
    document.getElementById("WhoAmI").innerHTML = introduction;
}