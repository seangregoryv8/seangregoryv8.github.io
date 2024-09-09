class Wall {
    constructor(direction)
    {
        this.direction = direction;
        this.color = "Red";
        this.enter = false;
        this.animation = false;
        this.impassible = false;
        this.animationMovement = doorToCornerDistance;
    }
    draw()
    {
        context.fillStyle = this.color;
        if (room.trap != "End")
        {
            switch (this.direction)
            {
                case "up":
                    this.AnimateDistance(character.y, minDoorSpace, 0, character.x)
                    context.fillRect(this.animationMovement, 0, staticHeight, staticWidth);
                    break;
                case "left":
                    this.AnimateDistance(character.x, minDoorSpace, 1, character.y)
                    context.fillRect(0, this.animationMovement, staticWidth, staticHeight);
                    break;
                case "right":
                    this.AnimateDistance(character.x, canvas.height - minDoorSpace, 2, character.y)
                    context.fillRect(canvas.width - staticWidth, this.animationMovement, staticWidth, staticHeight);
                    break;
                case "down":
                    this.AnimateDistance(character.y, canvas.height - minDoorSpace, 3, character.x)
                    context.fillRect(this.animationMovement, canvas.height - staticWidth, staticHeight, staticWidth);
                    break;
            }
            if (this.animationMovement == doorToCornerDistance - 100)
            {
                wallToBeReverted = previousRoomWall;
                switch (this.direction)
                {
                    case "left":
                        character.enterLeft();
                        previousRoomWall = "right";
                        break;
                    case "right":
                        character.enterRight();
                        previousRoomWall = "left";
                        break;
                    case "down":
                        character.enterDown();
                        previousRoomWall = "up";
                        break;
                    case "up":
                        character.enterUp();
                        previousRoomWall = "down";
                        break;
                }
                this.animation = false;
                // Sets the new respawn point
                respawnPointX = character.x;
                respawnPointY = character.y;
                this.animationMovement = doorToCornerDistance;
                //Sets the new room to complete
                needToRedraw = true;
            }
        }
        else
        {
            context.fillRect(this.animationMovement, 0, staticHeight, staticWidth);
            context.fillRect(0, this.animationMovement, staticWidth, staticHeight);
            context.fillRect(canvas.width - staticWidth, this.animationMovement, staticWidth, staticHeight);
            context.fillRect(this.animationMovement, canvas.height - staticWidth, staticHeight, staticWidth);
            this.animation = false;
            respawnPointX = character.x;
            respawnPointY = character.y;
            this.animationMovement = doorToCornerDistance;
            needToRedraw = true;
        }
    }
    AnimateDistance = (playerEdge, doorEdge, wallIndex, oppositePlayerEdge) =>
    {
        let topBottomMin = doorToCornerDistance + character.radius, topBottomMax = doorToCornerDistance + character.radius * 3;
        if (playerEdge == doorEdge && room.walls[wallIndex].enter && this.animationMovement > doorToCornerDistance - 100 && BetweenAnd(oppositePlayerEdge, topBottomMin, topBottomMax))
        {
            this.animationMovement--;
            if (!this.animation)
            {
                currentAudio = new Audio('Sound_effects/DoorOpen.mp3');
                currentAudio.play();
                this.animation = true;
            }
        }
    }
    changeColor()
    {
        this.color = "Green";
        this.enter = true;
    }
    ImpassibleWall()
    {
        this.color = "Black";
        this.impassible = true;
    }
    RevertWall()
    {
        this.color = "Red";
        this.impassible = false;
    }
}