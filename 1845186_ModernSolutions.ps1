Function KillThatProcess([string] $ProcessName)
{
    $LeProxo = Get-Process -Name $ProcessName
    [int] $processCount = $LeProxo.Count

    # Ask the user for some input.
    $answer = Read-Host "There are $($processCount) processes with the name $($LeProxo), proceed? Y/N"
    $answer = $answer.ToLower()

    # Did he type a lowercase y
    if($answer -ceq "y") # If not equals: blocks have to be swapped
    {
        # If it's a y
        $LeProxo | kill
    }
    else
    {
        Write-Host -ForegroundColor Red -BackgroundColor White "You did not confirm - no processes stopped."
    }
}
Function Bamboozle([string] $path = ".")
{
    [char] $alphabet = Get-Random -Minimum 65 -Maximum 91
    Write-Host -ForegroundColor Red "Sorry, hackermen, you just got roger roger'd. Now I'm gonna delete"
    Write-Host -ForegroundColor Red "every file that starts with a(n) {$($alphabet)} to totally roger roger you!"
    Get-Childitem -File -Path $path *$alphabet* | Remove-Item -WhatIf
}