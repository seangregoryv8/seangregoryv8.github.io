let randomInt = (min, max) => parseInt(Math.random() * (max - min) + min);

let BetweenAnd = (condition, minimum, maximum) => (condition >= minimum && condition <= maximum) ? true : false;

let BetweenOr = (condition, minimum, maximum) => (condition >= minimum || condition <= maximum) ? true : false;

