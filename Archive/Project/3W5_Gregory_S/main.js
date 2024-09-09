let canvas = document.getElementById("main");
let context = canvas.getContext('2d');
canvas.height = 700;
canvas.width = 700;

let room = chooseNewRoom();
let ambiancePlaying = false;
welcome = true;
let character = new Character(canvas.width / 2, canvas.height / 2);
let timer = new Timer(10, 0);

document.onkeydown = e => {
    switch (e.keyCode) {
        case 37:
            character.turn(0, -2);
            break;
        case 38:
            character.turn(1, -2);
            break;
        case 39:
            character.turn(0, 2);
            break;
        case 40:
            character.turn(1, 2);
            break;
        case 16:
            //character.run = 2;
            break;
    }
};
document.onkeyup = e => {
    switch (e.keyCode) {
        case 37:
            character.speedX = 0;
            break;
        case 38:
            character.speedY = 0;
            break;
        case 39:
            character.speedX = 0;
            break;
        case 40:
            character.speedY = 0;
            break;
        case 16:
            //character.run = 0;
            break;
    }
};

function chooseNewRoom()
{
    let newRoom = randomInt(1, 4);
    switch (newRoom)
    {
        case 1:
            return new Room("Ball");
        case 2:
            return new Room("Pressure");
        case 3:
            return new Room("Fly");
        // Purely in case
        case 4:
            return new Room("Fly");
    }
}

//Associated with the game over screen
let wait = 0, color = 102;
let tryAgain = false;
let alpha = 0, change = 0.02;
let gameOverStage = "fadeRed";
let winStage = "nothing", winMusic = true;
let beginningStage = "firstWait";
let endingMusic = true, endingStart = true, endingR = 0, endingG = 0, endingB = 0;

let animate = () =>
{
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (welcome)
    {
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        if (winMusic)
        {
            currentAudio = new Audio("Sound_effects/Beginning.mp3");
            currentAudio.play();
            winMusic = false;
        }
        switch(beginningStage)
        {
            case "firstWait":
                if (wait >= fullSecond * 3) { beginningStage = "secondWait"; wait = 0; }
                else wait++;
                break;
            case "secondWait":
                if (wait >= fullSecond * 6) { beginningStage = "thirdWait"; wait = 0}
                else
                {
                    wait++;
                    character.draw()
                }
                break;
            case "thirdWait":
                if (wait >= fullSecond * 9) { beginningStage = "fourthWait"; wait = 0}
                else
                {
                    wait++;
                    character.draw()
                    context.fillStyle = "Yellow";
                    let introText = "Cube";
                    context.font = '70px Courier New';
                    context.fillText(introText, canvas.width / 2 - 90, canvas.width / 2 - 50)
                }
                break;
            case "fourthWait":
                wait++;
                console.log(wait);
                if (wait <= fullSecond * 3)
                {
                    let instructions = "Arrow Keys to move"
                    context.font = '50px Courier New';
                    context.fillText(instructions, 100, canvas.width / 2 + 70)
                }
                else if (wait <= fullSecond * 6)
                {
                    instructions = "Collect artifacts to escape"
                    context.font = '30px Courier New';
                    context.fillText(instructions, 100, canvas.width / 2 + 70)
                }
                else if (wait <= fullSecond * 9)
                {
                    instructions = "Avoid the traps"
                    context.font = '40px Courier New';
                    context.fillText(instructions, 250, canvas.width / 2 + 70)
                }
                else if (wait <= fullSecond * 12)
                {
                    context.fillStyle = "Red";
                    instructions = "Watch out for"
                    context.font = '40px Courier New';
                    context.fillText(instructions, 100, canvas.width / 2 + 70)
                }
                break;
        }
        currentAudio.onended = () =>
        {
            wait = 0;
            welcome = false;
            beginningStage = "firstWait";
        }
    }
    else if (gameOver)
    {
        if (gameOverStage != "playAgain")
        {
            ambianceAudio.pause();
            timer.draw();
            room.draw();
            character.color = "Red";
            character.draw();
            document.getElementById("time").innerHTML = "";
            document.body.style.backgroundColor = 'rgba(' + color + ', ' + room.g + ', ' + room.b + ', ' + alpha + ')';
            room.g--;
            room.b--;
        }
        context.fillStyle = 'rgba(' + color + ', 0, 0, ' + alpha + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
        switch (gameOverStage)
        {
            case "fadeRed":
                if (alpha >= 1)
                    gameOverStage = "firstWait"
                else
                    alpha += change;
                break;
            case "firstWait":
                if (wait >= fullSecond * 1.5) gameOverStage = "fadeBlack"
                else wait++;
                break;
            case "fadeBlack":
                if (color <= 0) {
                    gameOverStage = "secondWait";
                    wait = 0;
                }
                else color--;
                break;
            case "secondWait":
                if (wait >= fullSecond * 2.5) gameOverStage = "yiruma"
                else wait++;
            case "yiruma":
                currentAudio = new Audio("Sound_effects/GameOver.mp3")
                currentAudio.play();
                gameOverStage = "playAgain";
            case "playAgain":
                context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
                context.fillStyle = "DarkRed";
                let deathText = "Unfortunate fate, you can never escape...";
                context.font = '30px Courier New';
                context.fillText(deathText, 10, canvas.width / 2)
                document.getElementById("tryAgain").style.visibility = "visible";
        }
    }
    else
    {
        if (!ambiancePlaying)
        {
            ambianceAudio = new Audio('Sound_effects/Ambiance.mp3');
            ambianceAudio.play();
            ambiancePlaying = true;
        }
        if (needToRedraw)
        {
            if (collectedArtifacts >= 21)
            {
                character.color = "rgba(0, 0, 0, 0)";
                document.getElementById("time").innerHTML = "";
                let timeTaken = (600 - (timer.minutes * 60 + timer.seconds))
                let totalTime = 0;
                while (timeTaken > 60)
                {
                    totalTime++;
                    timeTaken -= 60;
                }
                totalTime = totalTime + "m " + timeTaken + "s"
                document.getElementById("endTime").innerHTML = "Time taken: " + totalTime

                wait++;
                if (wait >= fullSecond * 12 && endingB <= colorMax)
                {
                    endingB += 3;
                    endingG += 3;
                    endingR += 3;
                }
                if (endingB >= colorMax)
                {
                    context.fillStyle = "Black";
                    let introText = "Cube";
                    context.font = '70px Courier New';
                    context.fillText(introText, canvas.width / 2 - 90, canvas.width / 2 - 50)
                    context.fillStyle = "Black";
                    let introText2 = "Beaten";
                    context.font = '90px Courier New';
                    context.fillText(introText2, 190, canvas.width / 2 + 50)
                }
                room = new Room("End");
                for (let i = 0; i < 4; i++)
                    room.walls[i].ImpassibleWall();
                winStage = "emptyRoom";
                document.body.style.backgroundColor = 'rgba(' + endingR + ', ' + endingG + ', ' + endingB + ', 1)';
                if (endingMusic)
                {
                    currentAudio = new Audio('Sound_effects/Ending.mp3');
                    currentAudio.play();
                    endingMusic = false;
                }
            }
            else
            {
                room = chooseNewRoom()
                needToRedraw = false;
                document.body.style.backgroundColor = 'rgba(' + room.r + ', ' + room.g + ', ' + room.b + ', 0.3)';
            }
            needToRedraw = false;
        }
        if (collectedArtifacts >= 21)
        {
            room.artifacts = [];
            ambianceAudio.pause();
        }
        else
            timer.draw();
        room.draw();
        character.update();
        document.getElementById("time").innerHTML = "Time left: " +  timer.minuteTen + ":" + timer.secondTen;
    }
}

function TryAgain()
{
    welcome = winMusic = endingMusic = needToRedraw = true;
    color = 102;
    tryAgain = gameOver = false;
    alpha = 0;
    document.getElementById("tryAgain").style.visibility = "hidden";
    currentAudio.pause();
    ambianceAudio.play();
    gameOverStage = "fadeRed";
    wait = 0;
    lives = 3;
    collectedArtifacts = 0;
    character.color = "Purple";
    timer = new Timer(10, 0);
    character = new Character(canvas.width / 2, canvas.height / 2);
}

animate();