class Character
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.radius = staticWidth;
        this.diameter = minDoorSpace;
        this.circumference = parseInt(2 * Math.PI * this.radius);
        this.speedX = 0;
        this.speedY = 0;
        this.run = 0;
        this.color = "Purple";
        this.invin = false;
        this.invinTimer = new Timer(0, 0);
        //this.rotation = 0;
    }
    addInvin()
    {
        this.color = "DarkBlue";
        this.invin = true;
        this.invinTimer.setSeconds(2);
    }
    removeInvin()
    {
        this.color = "Purple";
        this.invin = false;
    }
    draw()
    {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / fullDegrees);
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }
    update()
    {
        if (this.x + this.diameter >= canvas.width || this.x - this.diameter <= 0 || this.y + this.diameter >= canvas.height || this.y - this.diameter <= 0)
            this.speedX = 0;
        else
        {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        this.invinTimer.draw();
        if (this.invinTimer.seconds <= 0)
            this.removeInvin();
        this.draw();
    }
    turn(direction, amount)
    {
        this.escapeBoundaries();
        let mix = amount + this.run;
        if (direction == 0)
            this.speedX = mix;
        else
            this.speedY = mix;
    }
    escapeBoundaries()
    {
        this.x += (this.x + this.diameter >= canvas.width) ? -2 : (this.x - this.diameter <= 0) ? 2 : 0;
        this.y += (this.y + this.diameter >= canvas.height) ? -2 : (this.y - this.diameter <= 0) ? 2 : 0;
        for (let i = 0; i < room.artifacts.length; i++)
            if (room.artifacts[i].Collect())
            {
                switch (randomInt(1, 4))
                {
                    case 1:
                        currentAudio = new Audio('Sound_effects/Artifact1.mp3');
                        break;
                    case 2:
                        currentAudio = new Audio('Sound_effects/Artifact2.mp3');
                        break;
                    case 3:
                        currentAudio = new Audio('Sound_effects/Artifact3.mp3');
                        break;
                }
                currentAudio.play();
                room.artifacts.splice(i, 1);
                collectedArtifacts++;
                let randomRoom;
                do { randomRoom = randomInt(0, room.walls.length) } while (room.walls[randomRoom].impassible)
                room.walls[randomRoom].changeColor();
            }
    }
    enterLeft() { this.x = canvas.height - minDoorSpace; }
    enterRight() { this.x = minDoorSpace; }
    enterDown() { this.y = minDoorSpace; }
    enterUp() { this.y = canvas.height - minDoorSpace; }
    GotHurt()
    {
        if (lives != 1)
            switch (randomInt(1, 4))
            {
                case 1:
                    currentAudio = new Audio('Sound_effects/Hurt1.mp3');
                    break;
                case 2:
                    currentAudio = new Audio('Sound_effects/Hurt2.mp3');
                    break;
                case 3:
                    currentAudio = new Audio('Sound_effects/Hurt3.mp3');
                    break;
            }
        else
        {
            switch (randomInt(1, 3))
            {
                case 1:
                    currentAudio = new Audio('Sound_effects/Death1.mp3');
                    break;
                case 2:
                    currentAudio = new Audio('Sound_effects/Death2.mp3');
                    break;
            }
            gameOver = true;
        }
        currentAudio.play();
        context.fillStyle = "Red";
        lives--;
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.addInvin();
        room.draw();
    }
}