const staticWidth = 25;
const staticHeight = 100;
const doorToCornerDistance = 300;
const minDoorSpace = 50;
const maxSpace = 600;
const fullDegrees = 180;
const colorMax = 256;
const fullSecond = 80;
// Universal variables
var collectedArtifacts = 0;
const roomDirections = ["up", "left", "right", "down"];
var invincibility = 0;

var needToRedraw = true;
var currentRoom = 0;
var respawnPointX = 0;
var respawnPointY = 0;
var roomColorRed = 0;
var roomColorBlue = 0;
var roomColorGreen = 0;
var previousRoomWall;
var wallToBeReverted = 0;

var currentAudio, ambianceAudio;
var welcome = true;
var tutorial = true;
var lives = 3;
var gameOver = false;
var getBackUp = false;

var endCounter = 0;