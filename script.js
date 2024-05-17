function gradeCalc(grade, unit) {
  if (grade === "A") {
    return 5 * unit;
  } else if (grade === "B") {
    return 4 * unit;
  } else if (grade === "C") {
    return 3 * unit;
  } else if (grade === "D") {
    return 2 * unit;
  } else if (grade === "E") {
    return 1 * unit;
  } else if (grade === "F") {
    return 0 * unit;
  }
}

let counter = 1;

function addCourse() {
  let addNew = document.createElement("form");
  addNew.classList.add("add_new", `key-${counter}`);
  const course_name = `
    <form class="add_new key-${counter}">
      <input type="text" placeholder="Course Code" class="courses key-${counter}" required>
          <input type="number" placeholder="Credit Unit" min="0" class="credit-units key-${counter}" required>
          <select class="grade key-${counter}" required>
        <option value="select">Select</option>
        <option value="5">A</option>
        <option value="4">B</option>
        <option value="3">C</option>
        <option value="2">D</option>
        <option value="1">E</option>
        <option value="0">F</option>
      </select>  
    </form>
    `;
  addNew.innerHTML = course_name;
  document.getElementById("course-wrapper").appendChild(addNew);
  counter++;
}

function removeCourse() {
  let mainForm = document.querySelector("form.add_new");
  mainForm.remove();
}

const reports = [];

function calcCgpa() {
  const CGPAPARAGRAPH = document.getElementById("cgpa-calc");
  const CURRENTCLASS = document.getElementById("curr-class");
  const GRADESSELECT = document.querySelectorAll("select.grade");
  const UNIT = document.querySelectorAll("input.credit-units");

  const courseReport = {};

  const listOfGrades = [];
  const listOfUnits = [];
  let totalUnits = 0;

  GRADESSELECT.forEach((e) => {
    let GRADES = e.options;
    const selectedIndex = e.selectedIndex;
    const selectedGrade = GRADES[selectedIndex];
    const gradeValue = selectedGrade.text.toUpperCase();
    listOfGrades.push(gradeValue);
  });
  console.log(listOfGrades);

  UNIT.forEach((e) => {
    const unitValue = parseInt(e.value);
    totalUnits += unitValue;
    listOfUnits.push(unitValue);
  });
  console.log(listOfUnits);

  let totalEarnedUnits = 0;

  for (let i = 0; i < listOfUnits.length; i++) {
    totalEarnedUnits += gradeCalc(listOfGrades[i], listOfUnits[i]);
  }
  const gpa = totalEarnedUnits / totalUnits;

  if (gpa >= 0) {
    CGPAPARAGRAPH.textContent = "Your CGPA is " + gpa.toFixed(2) + " / 5.00";
  } else {
    CGPAPARAGRAPH.textContent = "Please enter a valid grade and credit units";
  }

  if (gpa.toFixed(2) >= 4.5 && gpa.toFixed(2) <= 5.0) {
    CURRENTCLASS.textContent = "Current Class: First Class Honours";
  } else if (gpa.toFixed(2) >= 3.5 && gpa.toFixed(2) <= 4.49) {
    CURRENTCLASS.textContent = "Current Class: 2/1";
  } else if (gpa.toFixed(2) >= 2.4 && gpa.toFixed(2) <= 3.49) {
    CURRENTCLASS.textContent = "Current Class: 2/2";
  } else if (gpa.toFixed(2) >= 1.5 && gpa.toFixed(2) <= 2.39) {
    CURRENTCLASS.textContent = "Current Class: Third Class";
  } else if (gpa.toFixed(2) >= 1 && gpa.toFixed(2) <= 1.49) {
    CURRENTCLASS.textContent = "Current Class: Pass";
  } else {
    CURRENTCLASS.textContent = "Current Class: Fail";
  }
}
