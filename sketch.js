class State {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.transitions = [];
  }

  addTransition(toState, input) {
    this.transitions.push({ to: toState, input: input });
  }
}

let FSM1 = {
  q0: new State("q0", 150, 200),
  q1: new State("q1", 275, 125),
  q2: new State("q2", 400, 200),
  q3: new State("q3", 550, 125),
  q4: new State("q4", 550, 250),
  q5: new State("q5", 700, 125),
  q6: new State("q6", 700, 250),
  q7: new State("q7", 800, 200),
  q8: new State("q8", 900, 200),
};

FSM1.q0.addTransition(FSM1.q1, "a");
FSM1.q0.addTransition(FSM1.q2, "b");
FSM1.q1.addTransition(FSM1.q2, "a");
FSM1.q1.addTransition(FSM1.q2, "b");
FSM1.q2.addTransition(FSM1.q4, "b");
FSM1.q2.addTransition(FSM1.q3, "a");
FSM1.q3.addTransition(FSM1.q4, "b");
FSM1.q4.addTransition(FSM1.q3, "a");
FSM1.q3.addTransition(FSM1.q5, "a");
FSM1.q4.addTransition(FSM1.q6, "b");
FSM1.q5.addTransition(FSM1.q4, "b");
FSM1.q6.addTransition(FSM1.q3, "a");
FSM1.q5.addTransition(FSM1.q7, "a");
FSM1.q6.addTransition(FSM1.q7, "b");
FSM1.q7.addTransition(FSM1.q8, "a");
FSM1.q7.addTransition(FSM1.q8, "b");
FSM1.q8.addTransition(FSM1.q8, "a");
FSM1.q8.addTransition(FSM1.q8, "8");

let FSM2 = {
  q0: new State("q0", 150, 200),
  q1: new State("q1", 250, 125),
  q2: new State("q2", 250, 275),
  q3: new State("q3", 325, 200),
  q4: new State("q4", 525, 200),
  q5: new State("q5", 650, 125),
  q6: new State("q6", 650, 250),
  q7: new State("q7", 800, 200),
  q8: new State("q8", 900, 200),
};

FSM2.q0.addTransition(FSM2.q1, "1");
FSM2.q0.addTransition(FSM2.q2, "0");
FSM2.q1.addTransition(FSM2.q3, "0");
FSM2.q1.addTransition(FSM2.q4, "1");
FSM2.q2.addTransition(FSM2.q3, "0");
FSM2.q2.addTransition(FSM2.q4, "0");
FSM2.q3.addTransition(FSM2.q4, "0");
FSM2.q3.addTransition(FSM2.q4, "1");
FSM2.q4.addTransition(FSM2.q5, "1");
FSM2.q4.addTransition(FSM2.q6, "0");
FSM2.q5.addTransition(FSM2.q6, "0");
FSM2.q5.addTransition(FSM2.q7, "1");
FSM2.q6.addTransition(FSM2.q5, "1");
FSM2.q6.addTransition(FSM2.q7, "0");
FSM2.q7.addTransition(FSM2.q8, "0");
FSM2.q7.addTransition(FSM2.q8, "1");
FSM2.q8.addTransition(FSM2.q8, "1");
FSM2.q8.addTransition(FSM2.q8, "0");
let currentState = null;
let isDragging = false;
let selectedState = null;
let currentFSM = null;
let finalState = {
  FSM1: FSM1.q8,
  FSM2: FSM2.q8,
};

function setup() {
  let canvas = createCanvas(1000, 400);
  canvas.parent("myContainer");
  textAlign(CENTER, CENTER);
  textSize(20);
  showFSM2();
}

function draw() {
  background(220);

  if (currentFSM) {
    // Draw transitions as arrows
    for (let stateName in currentFSM) {
      let state = currentFSM[stateName];
      for (let t of state.transitions) {
        drawArrow(state, t.to, t.input);
      }
    }
    // Draw states as ellipses
    for (let stateName in currentFSM) {
      let state = currentFSM[stateName];
      fill(state === currentState ? color(0, 255, 0) : 200);
      ellipse(state.x, state.y, 50, 50);
      fill(0);
      text(state.name, state.x, state.y);
    }
  }
  if (currentFSM == FSM1) {
    text("a", 200, 150);
    text("b", 275, 185);
    text("a,b", 350, 150);
    text("a", 475, 150);
    text("a", 560, 155);
    text("a", 595, 150);
    text("b", 595, 230);
    text("b", 475, 215);
    text("b", 540, 220);
    text("b", 625, 240);
    text("a", 625, 115);
    text("a", 750, 150);
    text("b", 750, 240);
    text("a,b", 850, 190);
    text("a,b", 950, 165);
  } else if (currentFSM == FSM2) {
    text("1", 190, 155);
    text("0", 190, 245);
    text("1,0", 405, 190);
    text("1", 405, 155);
    text("0", 405, 245);
    text("0", 300, 160);
    text("1", 300, 240);
    text("0", 580, 235);
    text("1", 580, 155);
    text("0", 640, 220);
    text("1", 660, 160);
    text("1", 725, 150);
    text("0", 725, 240);
    text("1,0", 850, 190);
    text("1,0", 950, 165);
  }
}

function drawArrow(start, end, label) {
  let angle = atan2(end.y - start.y, end.x - start.x);
  let arrowSize = 10;
  let curveDistance = 50; // Distance of the curve from the state

  push();
  translate(start.x, start.y);
  rotate(angle);

  if (start === end) {
    // Loop back to the same state with a curve
    let x1 = 0;
    let y1 = -25;
    let x2 = 20;
    let y2 = -20;
    let cx1 = x1 + curveDistance;
    let cy1 = y1 - curveDistance;
    let cx2 = x2 + curveDistance;
    let cy2 = y2 - curveDistance;

    noFill();
    stroke(0);
    strokeWeight(1);
    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);

    // Draw the arrowhead
    fill(0);
    triangle(
      x2 - arrowSize,
      y2,
      x2,
      y2 - arrowSize / 2,
      x2,
      y2 + arrowSize / 2
    );
  } else {
    // Regular arrow
    let lineLength = dist(0, 0, end.x - start.x, end.y - start.y) - 25;

    // Line
    line(0, 0, lineLength, 0);

    // Arrowhead
    fill(0);
    triangle(
      lineLength - arrowSize,
      0,
      lineLength - arrowSize,
      arrowSize / 2,
      lineLength,
      0
    );
    triangle(
      lineLength - arrowSize,
      0,
      lineLength - arrowSize,
      -arrowSize / 2,
      lineLength,
      0
    );
  }

  fill(0);
  pop();
}

function showFSM1() {
  currentState = FSM1.q0;
  currentFSM = FSM1;
}

function showFSM2() {
  currentState = FSM2.q0;
  currentFSM = FSM2;
}
function validateInput(inputStr) {
  const pattern = /^[ab]*$/;
  return pattern.test(inputStr);
}
function validateInput2(inputStr) {
  const pattern = /^[10]*$/;
  return pattern.test(inputStr);
}
function simulate() {
  let input5 = document.getElementById("input5").value;
  document.getElementById("transition").innerHTML = "";
  if (currentFSM === FSM1) {
    if (!validateInput(input5)) {
      document.getElementById("transition").innerHTML =
        "Please only input a or b characters";
    } else {
      currentState = currentFSM.q0;
      simulateInput(input5);
      document.getElementById("transition").innerHTML = "";
    }
  } else {
    if (!validateInput2(input5)) {
      document.getElementById("transition").innerHTML =
        "Please only input 1 or 0 characters";
    } else {
      currentState = currentFSM.q0;
      simulateInput(input5);
      document.getElementById("transition").innerHTML = "";
    }
  }
}

function simulateInput(input) {
  let i = 0;
  let isValid = true;

  let finalStates = finalState[currentFSM === FSM1 ? "FSM1" : "FSM2"];

  let interval = setInterval(() => {
    if (i >= input.length || !isValid) {
      clearInterval(interval);

      if (isValid && currentState === finalStates) {
        document.getElementById("valid").innerHTML = "Input is valid!";
        console.log("Input is valid!");
      } else {
        document.getElementById("valid").innerHTML = "Input is not valid!";
        console.log("Input is not valid!");
      }

      return;
    }

    let key = input.charAt(i);
    let validTransition = false;
    for (let t of currentState.transitions) {
      if (t.input === key) {
        currentState = t.to;
        validTransition = true;
        document.getElementById("transition").innerHTML +=
          " " + currentState.name + " " + t.input + " ---> ";
        break;
      }
    }

    if (!validTransition) {
      console.log(
        `No valid transition for input '${key}' from state '${currentState.name}'.`
      );
      isValid = false;
      clearInterval(interval);
      return;
    }

    console.log(`Input: ${key}, Current State: ${currentState.name}`);
    i++;
  }, 1000); // Adjust the delay (in milliseconds) between transitions here
}
