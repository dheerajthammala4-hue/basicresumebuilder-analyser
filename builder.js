window.onload = function () {
    const savedTemplate = localStorage.getItem("selectedTemplate");

    if (savedTemplate) {
        document.getElementById("template").value = savedTemplate;
    }

    livePreview();
};

let educationList = [];
let editIndex = -1;
let photoURL = "";
let darkMode = false;

// DARK MODE
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark");
}

// TEMPLATE SELECT
function selectTemplate(name) {
    document.getElementById("template").value = name;

    // save
    localStorage.setItem("selectedTemplate", name);

    // update preview
    livePreview();
}

// PHOTO
function previewPhoto() {
    const file = document.getElementById("photo").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        photoURL = reader.result;
        livePreview();
    };
    reader.readAsDataURL(file);
}

// ADD EDUCATION
function addEducation() {
    const courses = document.getElementById("course").value.split(",");
    const colleges = document.getElementById("college").value.split(",");
    const years = document.getElementById("year").value.split(",");
    const percentages = document.getElementById("percentage").value.split(",");

    const maxLength = Math.max(
        courses.length,
        colleges.length,
        years.length,
        percentages.length
    );

    for (let i = 0; i < maxLength; i++) {
        educationList.push({
            course: (courses[i] || "").trim(),
            college: (colleges[i] || "").trim(),
            year: (years[i] || "").trim(),
            percentage: (percentages[i] || "").trim()
        });
    }

    alert("Education Added!");

    document.getElementById("course").value = "";
    document.getElementById("college").value = "";
    document.getElementById("year").value = "";
    document.getElementById("percentage").value = "";
}

// TABLE
function renderEducationTable() {
    const html = `
        <table>
            <tr>
                <th>Course</th>
                <th>College</th>
                <th>Year</th>
                <th>Percentage</th>
                <th>Action</th>
            </tr>

            ${educationList.map((e, i) => `
                <tr>
                    <td>${e.course}</td>
                    <td>${e.college}</td>
                    <td>${e.year}</td>
                    <td>${e.percentage}</td>
                    <td>
                        <button onclick="editRow(${i})">✏</button>
                        <button onclick="deleteRow(${i})">❌</button>
                    </td>
                </tr>
            `).join("")}
        </table>
    `;

    document.getElementById("eduPreview").innerHTML = html;
}

// EDIT
function editRow(i) {
    const e = educationList[i];

    document.getElementById("course").value = e.course;
    document.getElementById("college").value = e.college;
    document.getElementById("year").value = e.year;
    document.getElementById("percentage").value = e.percentage;

    editIndex = i;
}

// DELETE
function deleteRow(i) {
    educationList.splice(i, 1);
    renderEducationTable();
    livePreview();
}

// CLEAR
function clearFields() {
    document.getElementById("course").value = "";
    document.getElementById("college").value = "";
    document.getElementById("year").value = "";
    document.getElementById("percentage").value = "";
}

// LIVE PREVIEW
function livePreview() {

    const template = document.getElementById("template").value;

    let templateClass = "";
    if (template === "modern") templateClass = "modern";
    if (template === "minimal") templateClass = "minimal";
    if (template === "colorful") templateClass = "colorful";

    const fullName =
        document.getElementById("firstName").value + " " +
        document.getElementById("lastName").value;

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const linkedin = document.getElementById("linkedin").value;
    const github = document.getElementById("github").value;

    const summary = document.getElementById("summary").value;

    const skills = document.getElementById("skills").value.split(",");
    const experience = document.getElementById("experience").value.split(",");
    const projects = document.getElementById("projects").value.split(",");

    const list = (arr) => arr.map(i => `<li>${i.trim()}</li>`).join("");

    const html = `
        <div class="resume ${templateClass}">

            <div class="header">
                ${photoURL ? `<img src="${photoURL}" class="profile-img">` : ""}
                <div>
                    <h1>${fullName || "Your Name"}</h1>
                    <p>${email || ""} | ${phone || ""}</p>
                </div>
            </div>

            <hr>

            <h3>Personal Details</h3>
            <p><b>DOB:</b> ${dob || "-"}</p>
            <p><b>Address:</b> ${address || "-"}</p>
            <p><b>LinkedIn:</b> ${linkedin || "-"}</p>
            <p><b>GitHub:</b> ${github || "-"}</p>

            <h3>Summary</h3>
            <p>${summary}</p>

            <h3>Skills</h3>
            <ul>${list(skills)}</ul>

            <h3>Education</h3>
            <table>
                <tr>
                    <th>Course</th>
                    <th>College</th>
                    <th>Year</th>
                    <th>Percentage</th>
                </tr>

                ${educationList.map(e => `
                    <tr>
                        <td>${e.course}</td>
                        <td>${e.college}</td>
                        <td>${e.year}</td>
                        <td>${e.percentage}</td>
                    </tr>
                `).join("")}
            </table>

            <h3>Experience</h3>
            <ul>${list(experience)}</ul>

            <h3>Projects</h3>
            <ul>${list(projects)}</ul>

        </div>
    `;

    document.getElementById("output").innerHTML = html;
}

// DOWNLOAD
function downloadPDF() {
    const element = document.getElementById("output");

    if (!element.innerHTML.trim()) {
        alert("Nothing to download. Please fill the resume first.");
        return;
    }

    const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}