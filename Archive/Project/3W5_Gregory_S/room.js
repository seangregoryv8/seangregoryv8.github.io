const randomArtifactAmount = parseInt(Math.random() * (4 - 2) + 2);
class Room
{
    constructor(trap)
    {
        this.borderColor = "Black";
        this.r = randomInt(1, colorMax);
        this.g = randomInt(1, colorMax);
        this.b = randomInt(1, colorMax);
        this.walls = [];
        this.artifacts = [];
        this.trap = trap;
        for (let i = 0; i < 4; i++)
            this.walls[i] = new Wall(roomDirections[i]);
        for (let i = 0; i < randomArtifactAmount; i++)
            this.artifacts[i] = new Artifact(randomInt(minDoorSpace, maxSpace), randomInt(50, 600))
        let oppositeDistance = canvas.width - 36;
        let allXs, allYs, allDirections, allMovements;
        switch (this.trap)
        {
            case "Fly":
                this.flyTraps = [];
                allXs = [doorToCornerDistance + staticHeight, staticWidth, staticWidth, oppositeDistance];
                allYs = [staticWidth, oppositeDistance, staticWidth, canvas.width - doorToCornerDistance];
                allDirections = ["down", "up", "left", "right"];
                for (let i = 0; i < 4; i++)
                    this.flyTraps[i] = new FlyTrap(allXs[i], allYs[i], allDirections[i]);
                break;
            case "Ball":
                this.ballTraps = new BallTrap(randomInt(minDoorSpace, maxSpace), randomInt(minDoorSpace, maxSpace), staticWidth);
                break;
            case "Pressure":
                this.pressureTraps = [];
                allXs = [doorToCornerDistance + staticHeight, doorToCornerDistance + staticHeight, staticWidth, staticWidth, staticWidth, oppositeDistance++, staticWidth, oppositeDistance++];
                allYs = [staticWidth, oppositeDistance + 3, staticWidth, oppositeDistance + 3, canvas.width - doorToCornerDistance, canvas.width - doorToCornerDistance, staticWidth, staticWidth];
                allDirections = ["right", "right", "left", "left", "down", "down", "up", "up"];
                allMovements = [1, -1, 1, -1, 1, -1, 1, -1];
                for (let i = 0; i < 8; i++)
                    this.pressureTraps[i] = new PressureTrap(allXs[i], allYs[i], allDirections[i], allMovements[i]);
        }
    }
    draw()
    {
        // Will make the previous wall you entered from passable
        for (let i = 0; i < this.walls.length; i++)
            if (this.walls[i].direction == previousRoomWall)
                this.walls[i].ImpassibleWall();
        context.fillStyle = 'rgba(0, 0, 0, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = this.borderColor;
        context.fillRect(0, 0, staticWidth, doorToCornerDistance);
        context.fillRect(0, 0, doorToCornerDistance, staticWidth);
        context.fillRect(0, canvas.height - doorToCornerDistance, staticWidth, doorToCornerDistance);
        context.fillRect(0, canvas.height - staticWidth, doorToCornerDistance, staticWidth);
        context.fillRect(canvas.height - staticWidth, 0, staticWidth, doorToCornerDistance);
        context.fillRect(canvas.height - doorToCornerDistance, 0, doorToCornerDistance, staticWidth);
        context.fillRect(canvas.height - staticWidth, canvas.height - doorToCornerDistance, staticWidth, doorToCornerDistance);
        context.fillRect(canvas.height - doorToCornerDistance, canvas.height - staticWidth, doorToCornerDistance, staticWidth);
        for (let i = 0; i < this.walls.length; i++)
            this.walls[i].draw();
        for (let i = 0; i < this.artifacts.length; i++)
            this.artifacts[i].draw();
        switch (this.trap)
        {
            case "Fly":
                for (let i = 0; i < this.flyTraps.length; i++)
                    this.flyTraps[i].update();
                break;
            case "Ball":
                this.ballTraps.update();
                break;
            case "Pressure":
                for (let i = 0; i < this.pressureTraps.length; i++)
                    this.pressureTraps[i].update()
                break;
        }
    }
    Hit = (point, trap) => (point + character.radius >= trap && point + character.radius <= trap + 55) ? true : false;
}