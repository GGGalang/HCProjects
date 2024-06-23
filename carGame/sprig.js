/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const car = "c"
const bcar = "b"
const road = "r"
const beef = "x"
var playerMoves = []
var carProb = 9
var diff = 1000
var wave = 0

setLegend(
  [ player, bitmap`
................
................
................
2222220022002727
2002220222022727
2002222222222727
2222222222222222
2200200220022777
2202200222022222
0222222222222222
222222....22..00
22..20....22..20
22..22....02..22
20..22....22..22
22..00....22..00
00........00....` ],
  [ car, bitmap`
................
................
................
................
................
................
................
.....9999999....
....79779779....
...7797797799...
..999999999999..
9999999999999999
9999999999999999
9990009990009999
...000...000....
...000...000....`],
  [ bcar, bitmap`
................
......66.6......
.....666666666..
.66..663666666..
.6666633636666..
..666333336666..
..666333336666..
...66633333666..
....663333366...
...7663333366...
..999663336699..
9999966333699999
9999996366999999
9990009666009999
...000...000....
...000...000....`],
  [ road, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
6666LL6666LL6666
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ beef, bitmap`
................
................
................
................
................
...3333333333...
...3333333333...
2..3333333333..2
2223333333333222
2..3333333333..2
2..3333333333...
...3333333333...
................
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
..........
..........
..........
..........
p.........`,
  map`
........
........
........
........
........
........
........
...pc...`,
  map`
.......
.......
.......
.......
.......
.......
...x...
...b...`
]

setMap(levels[level])
setBackground("r")

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

afterInput(() => {
  
})

function spawnCar(){
  addSprite(9, Math.floor(Math.random()*5), "c");
}

var frame = setInterval(function(){
  if(getAll("p").length == 0){
    clearText();
    setMap(levels[2])
    clearInterval(frame)
    addText("GAME OVER!", {
      x: 3,
      y: 3,
      color: color`2`
    });
    addText("Score: " + (wave*10), {
      x: 3,
      y: 4,
      color: color`2`
    });
    return;
  }

  if(wave == 100){
    clearText();
    setMap(levels[1])
    clearInterval(frame)
    addText("YOU WIN!", {
      x: 2,
      y: 3,
      color: color`2`
    })
    addText("Score: " + (wave*10), {
      x: 3,
      y: 4,
      color: color`2`
    });
    return;
  }
  
  getAll("b").forEach((cars) => {
    clearTile(cars.x, cars.y)
  })
  
  let carChance = Math.floor(Math.random()*10);
  console.log(carChance);
  console.log(carProb);
  if (carChance <= (carProb-(1*(diff/1000)))){
    wave += 1
    spawnCar();
  }

  getAll("c").forEach((cars) => {
    cars.x -= 1;
    if(cars.x == 0){
      let addX = cars.x
      let addY = cars.y
      clearTile(cars.x, cars.y)
      addSprite(addX, addY, "b");
    }
  })

  if (diff>200){
    diff -= 10
    addText("Spawn Spd: " + diff, {
      x: 0,
      y: 0,
      color: color`2`
    })
  }
  console.log(diff)
  addText("Score: " + (wave*10), {
    x: 0,
    y: 1,
    color: color`2`
  });

}, diff);/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const car = "c"
const bcar = "b"
const road = "r"
const beef = "x"
var playerMoves = []
var carProb = 9
var diff = 1000
var wave = 0

setLegend(
  [ player, bitmap`
................
................
................
2222220022002727
2002220222022727
2002222222222727
2222222222222222
2200200220022777
2202200222022222
0222222222222222
222222....22..00
22..20....22..20
22..22....02..22
20..22....22..22
22..00....22..00
00........00....` ],
  [ car, bitmap`
................
................
................
................
................
................
................
.....9999999....
....79779779....
...7797797799...
..999999999999..
9999999999999999
9999999999999999
9990009990009999
...000...000....
...000...000....`],
  [ bcar, bitmap`
................
......66.6......
.....666666666..
.66..663666666..
.6666633636666..
..666333336666..
..666333336666..
...66633333666..
....663333366...
...7663333366...
..999663336699..
9999966333699999
9999996366999999
9990009666009999
...000...000....
...000...000....`],
  [ road, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
6666LL6666LL6666
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ beef, bitmap`
................
................
................
................
................
...3333333333...
...3333333333...
2..3333333333..2
2223333333333222
2..3333333333..2
2..3333333333...
...3333333333...
................
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
..........
..........
..........
..........
p.........`,
  map`
........
........
........
........
........
........
........
...pc...`,
  map`
.......
.......
.......
.......
.......
.......
...x...
...b...`
]

setMap(levels[level])
setBackground("r")

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

afterInput(() => {
  
})

function spawnCar(){
  addSprite(9, Math.floor(Math.random()*5), "c");
}

var frame = setInterval(function(){
  if(getAll("p").length == 0){
    clearText();
    setMap(levels[2])
    clearInterval(frame)
    addText("GAME OVER!", {
      x: 3,
      y: 3,
      color: color`2`
    });
    addText("Score: " + (wave*10), {
      x: 3,
      y: 4,
      color: color`2`
    });
    return;
  }

  if(wave == 100){
    clearText();
    setMap(levels[1])
    clearInterval(frame)
    addText("YOU WIN!", {
      x: 2,
      y: 3,
      color: color`2`
    })
    addText("Score: " + (wave*10), {
      x: 3,
      y: 4,
      color: color`2`
    });
    return;
  }
  
  getAll("b").forEach((cars) => {
    clearTile(cars.x, cars.y)
  })
  
  let carChance = Math.floor(Math.random()*10);
  console.log(carChance);
  console.log(carProb);
  if (carChance <= (carProb-(1*(diff/1000)))){
    wave += 1
    spawnCar();
  }

  getAll("c").forEach((cars) => {
    cars.x -= 1;
    if(cars.x == 0){
      let addX = cars.x
      let addY = cars.y
      clearTile(cars.x, cars.y)
      addSprite(addX, addY, "b");
    }
  })

  if (diff>200){
    diff -= 10
    addText("Spawn Spd: " + diff, {
      x: 0,
      y: 0,
      color: color`2`
    })
  }
  console.log(diff)
  addText("Score: " + (wave*10), {
    x: 0,
    y: 1,
    color: color`2`
  });

}, diff);
