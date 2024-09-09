let cMini = document.getElementById("mini");
let cxMini = cMini.getContext('2d');
cMini.height = 300;
cMini.width = 300;

let animateMini = () => {
    cxMini.fillStyle = "red";
    cxMini.fillRect(0, 0, cMini.width, cMini.height);
}
animateMini();