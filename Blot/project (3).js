const width = 120
const height = 120

setDocDimensions(width, height)

/*ToDos:
- (Mid) Better edges
- (Low) Use arrays for rendering
- (Mid) Scaling, random placement? Make it snow
- (High) Research more shapes and how to get them (more rrs)
*/

const rr = bt.randInRange
const ri = bt.randIntInRange
const t = new bt.Turtle()

const shaftLength = rr(0.2, 0.4) * Math.sqrt(width * width + height * height)
//how many more branches per branch?
const branches = ri(2, 6)
const third = ri(0,1)


function generateBranch(brs) {
  t.right(90)
  t.forward(((shaftLength) / 2) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 3) * (brs / 10))
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.left(90)
  t.forward(((shaftLength) / 4) * (brs / 10))
  t.left(90)
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.forward(((shaftLength) / 3) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.left(90)
  t.forward(((shaftLength) / 5) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 3) * (brs / 10))
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.left(90)
  t.forward(((shaftLength) / 4) * (brs / 10))
  t.left(90)
  if (brs > 1) {
    generateBranch(brs - 1);
  }
  t.forward(((shaftLength) / 3) * (brs / 10))
  t.right(90)
  t.forward(((shaftLength) / 2) * (brs / 10))

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
generateBranch(branches);
t.left(90)
t.forward(Math.sqrt(shaftLength) / 4)
if(third == 1) generateBranch(branches);
t.forward(Math.sqrt(shaftLength) / 4)
t.left(90)
generateBranch(branches);
t.forward(shaftLength * (4 / 5))
generateBranch(branches)
t.left(90)
t.forward(Math.sqrt(shaftLength) / 4)
if(third == 1) generateBranch(branches);
t.forward(Math.sqrt(shaftLength) / 4)
t.left(90)
generateBranch(branches);

const shaft = t.lines()

//create flake arms
const armNums = ri(3, 5)
bt.rotate(shaft, 90)

var shafts = []
var finals = []
for (let i = 0; i < armNums; i++) {
  bt.rotate(shaft, parseInt(360 / armNums));
  bt.originate(shaft)
  bt.translate(shaft, [60, 60])
  bt.merge(shaft)
  bt.simplify(shaft)
  drawLines(shaft, {width: 0.5})
  //finals = finals.concat(shaft)
}

console.log(finals)
//drawLines(finals)
console.log(third)