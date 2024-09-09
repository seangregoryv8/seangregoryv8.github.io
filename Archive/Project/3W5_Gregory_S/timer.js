class Timer
{
    constructor(minutes, seconds)
    {
        this.minutes = minutes;
        this.seconds = seconds;
        this.stopwatch = 0;
        this.minuteTen;
        this.secondTen;
    }
    draw()
    {
        if (this.seconds == -1)
        {
            this.minutes--;
            this.seconds = 59;
        }
        this.stopwatch++;
        if (this.stopwatch % fullSecond == 0)
            this.seconds--;
        this.minuteTen = (this.minutes < 10) ? "0" + this.minutes : this.minutes;
        this.secondTen = (this.seconds < 10) ? "0" + this.seconds : this.seconds;
    }
    setSeconds(seconds) { this.seconds = seconds }
}