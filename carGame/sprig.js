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
const milk = "m"
const bmilk = "n"
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
................`],
  [ milk, bitmap`
................
....00220202....
....02202202....
....22222222....
..772777777722..
..772777777720..
..772777777720..
..772777777722..
..222200222222..
6220220020022223
6220222220220223
2222222022220022
0222220022222222
0200022222200022
22000......00022
..000......000..`],
  [ bmilk, bitmap`
.......6........
....00666202....
.66.026362666...
.666663336666...
..6633333333626.
..6633333333666.
..6663333333666.
..766633333666..
..266663333666..
6220666333666223
6220666633660223
2222266636660022
0222226666622222
0200022666200022
22000......00022
..000......000..`]
)

setSolids([])

let level = 0
const levels = [
  map`
.............
.............
.............
.............
.............
.............
.............
......p......`,
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
p..b...`
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
  var posY = Math.floor(Math.random()*5)
  var speed = Math.floor(Math.random()*2) + 1

  if (Math.floor(Math.random()*20) == 3){
    addSprite(9, posY, "m");
  } else {
    addSprite(9, posY, "c");
  }
  Object.defineProperty(getTile(9, posY)[0], "speed", {value: speed});
  console.log(speed)
}

function start(){
 var frame = setInterval(function(){
  
  if(getAll("p").length == 0){
    clearText();
    setMap(levels[3])
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
    setMap(levels[2])
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

  getAll("n").forEach((xMilks) => {
    xMilks.remove()
  })
  
  let carChance = Math.floor(Math.random()*10);
  if (carChance <= (carProb-(1*(diff/1000)))){
    wave += 1
    spawnCar();
  }

  

  getAll("c").concat(getAll("m")).forEach((cars) => {
    //ensure cars dont clip out
    if(cars.x - cars.speed < 0){
      cars.x = 0;
    } else {
      cars.x -= cars.speed
    }

    //car collision logic
    if(cars.x == 0){
      let addX = cars.x
      let addY = cars.y
      if(cars.type == "m"){
        getTile(cars.x, cars.y).forEach((entity) => {
          if(entity.type == "p"){
            getAll("c").forEach((remove) => {
              addSprite(remove.x, remove.y, "b")
              remove.remove();
            });
          }
        })
        cars.remove()
        addSprite(addX, addY, "n");
      } else {
        clearTile(cars.x, cars.y)
        addSprite(addX, addY, "b");
      }
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
}

if(level == 0){
  addText("Welcome to", {
    x:3,
    y:3,
    color:color`2`
  })
  addText("Cow Crossing", {
    x:3,
    y:4,
    color:color`2`
  })
  addText("Don't get hit!", {
    x:3,
    y:5,
    color:color`2`
  })
  addText("Exc. Milk trucks!", {
    x:3,
    y:6,
    color:color`2`
  })
  addText("They give boost.", {
    x:3,
    y:7,
    color:color`2`
  })
  addText("Move up to start!", {
    x:3,
    y:8,
    color:color`2`
  })
  var check = setInterval( function(){
    if(getFirst(player).y != 7){
      clearInterval(check)
      clearText()
      level += 1
      setMap(levels[level])
      start();
    }
  }, 200)
}
