const width = 125
const height = 125

setDocDimensions(width, height)

const rr = bt.randInRange
const ri = bt.randIntInRange
const t = new bt.Turtle()

const shaftLength = rr(0.1, 0.2) * Math.sqrt(width * width + height * height)
//how many more branches per branch?
const branches = 2 //ri(1,5)
var branchingNums = branches

function generateBranch(brs) {
  t.right(90)
  t.forward(((shaftLength) / 2) * (brs / 10))
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.right(90)
  t.forward(((shaftLength) / 3) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 4) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 3) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 3) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 4) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 3) * (brs / 10))

  if (brs != 0) {
    t.right(90)
  }
  if (brs == 0) {
    t.right(90)
    t.forward(shaftLength * (1 / 5))
  }
}

//generate shaft of each branch of snowflake
t.forward(shaftLength * (4 / 5))
generateBranch(branchingNums);
t.left(90)
t.forward(Math.sqrt(shaftLength) / 2)
t.left(90)
t.forward(shaftLength * (4 / 5))
generateBranch(branchingNums)
t.left(90)
t.forward(Math.sqrt(shaftLength) / 2)

const shaft = t.lines()

//create flake arms
const armNums = ri(3, 5)
bt.rotate(shaft, 90)


console.log(shaft)
var shafts = []
for (let i = 0; i < armNums; i++) {
  console.log("shafting")
  shafts = shafts.concat(shaft)
  bt.rotate(shaft, parseInt(360 / armNums));
  drawLines(shaft)
  console.log(parseInt(360 / armNums))
}

console.log(shafts)
drawLines(shafts)