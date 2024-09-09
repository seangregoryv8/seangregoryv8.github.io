let lifeCanvas = document.getElementById("lives");
let lifeContext = lifeCanvas.getContext('2d');
lifeCanvas.height = 100;
lifeCanvas.width = 200;
let artifactCanvas = document.getElementById("artifacts");
let artifactContext = artifactCanvas.getContext('2d');
artifactCanvas.height = 100;
artifactCanvas.width = 200;

let numberOfLives = [];
for (let i = 0; i < lives; i++)
    numberOfLives[i] = new Character(0, 10);
let lifeDraw = () =>
{
    if (gameOver)
        lifeContext.clearRect(0, 0, lifeCanvas.width, lifeCanvas.height);
    else
    {
        let distanceBetweenLives = character.diameter;
        lifeContext.fillStyle = "Purple";
        let lifeText = "Lives";
        lifeContext.font = '24px Arial';
        lifeContext.fillText(lifeText, 70, character.radius)
        for (let i = 0; i < lives; i++)
        {
            lifeContext.beginPath();
            lifeContext.arc(distanceBetweenLives, character.diameter + 10, character.radius, 0, 2 * Math.PI);
            lifeContext.fill();
            distanceBetweenLives += character.diameter;
        }
    }
}
let artifactDraw = () =>
{
    if (gameOver)
        lifeContext.clearRect(0, 0, lifeCanvas.width, lifeCanvas.height);
    else
    {
        let distanceX = character.radius, distanceY = character.radius + 10;
        artifactContext.fillStyle = "Gray";
        let artifactText = "Artifacts"
        artifactContext.font = '24px Arial';
        artifactContext.fillText(artifactText, character.diameter + 3, character.radius)
        for (let i = 0; i < collectedArtifacts; i++)
        {
            if (i % 7 == 0 && i != 0)
            {
                distanceX = character.radius
                distanceY += character.radius - 2;
            }
            artifactContext.beginPath();
            artifactContext.fillRect(distanceX, distanceY, 15, 15);
            distanceX += character.radius - 3
        }
    }
}
let lifeAnimate = () =>
{
    requestAnimationFrame(lifeAnimate);
    lifeContext.clearRect(0, 0, lifeCanvas.width, lifeCanvas.height);
    artifactContext.clearRect(0, 0, artifactCanvas.width, artifactCanvas.height);
    lifeDraw();
    artifactDraw();
}
lifeAnimate();