class Artifact
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.side = 15;
    }
    draw()
    {
        context.beginPath();
        context.fillStyle = "gray";
        context.fillRect(this.x, this.y, this.side, this.side);
    }
    Collect = () =>
        (character.x + character.radius > this.x && character.x - character.radius < this.x + this.side) ? 
        (character.y + character.radius > this.y && character.y - character.radius < this.y + this.side) ? true : false : false;
}