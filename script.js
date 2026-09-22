let students = [];

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");

const totalStudents = document.getElementById("totalStudents");
const presentStudents = document.getElementById("presentStudents");
const absentStudents = document.getElementById("absentStudents");


// Load saved students
function loadStudents() {

    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
        students = JSON.parse(savedStudents);
    }

    displayStudents(students);
}


// Save students
function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// Add student
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const department = document.getElementById("department").value;
    const semester = document.getElementById("semester").value;

    // Check duplicate ID
    const alreadyExists = students.some(function(student) {

        return student.id === id;

    });

    if (alreadyExists) {

        alert("Student ID already exists!");

        return;
    }


    const student = {

        id: id,
        name: name,
        department: department,
        semester: semester,
        attendance: "Absent"

    };


    students.push(student);

    saveStudents();

    displayStudents(students);

    studentForm.reset();

});


// Display students
function displayStudents(studentList) {

    studentTable.innerHTML = "";

    studentList.forEach(function(student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.semester}</td>

            <td>
                <button
                    class="${student.attendance === "Present"
                    ? "present"
                    : "absent"}"
                    onclick="changeAttendance(${index})"
                >
                    ${student.attendance}
                </button>
            </td>

            <td>
                <button
                    class="delete"
                    onclick="deleteStudent(${index})"
                >
                    Delete
                </button>
            </td>

        `;

        studentTable.appendChild(row);

    });

    updateSummary(studentList);
}


// Change attendance
function changeAttendance(index) {

    if (students[index].attendance === "Present") {

        students[index].attendance = "Absent";

    } else {

        students[index].attendance = "Present";

    }

    saveStudents();

    displayStudents(students);
}


// Delete student
function deleteStudent(index) {

    const confirmation = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmation) {

        students.splice(index, 1);

        saveStudents();

        displayStudents(students);
    }
}


// Search student
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(function(student) {

        return (
            student.id.toLowerCase().includes(searchText) ||
            student.name.toLowerCase().includes(searchText)
        );

    });

    displayStudents(filteredStudents);

});


// Update summary
function updateSummary(studentList) {

    let present = 0;
    let absent = 0;

    studentList.forEach(function(student) {

        if (student.attendance === "Present") {

            present++;

        } else {

            absent++;

        }

    });

    totalStudents.textContent = studentList.length;
    presentStudents.textContent = present;
    absentStudents.textContent = absent;
}


// Start application
loadStudents();