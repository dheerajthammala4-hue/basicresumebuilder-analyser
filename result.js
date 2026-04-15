// =============================
// 📥 GET DATA
// =============================
let rawText = localStorage.getItem("resumeText") || "";
const role = localStorage.getItem("role");

// =============================
// 🧠 CLEAN TEXT
// =============================
let text = rawText.toLowerCase();
text = text.replace(/\s+/g, " ");
text = text.replace(/[^a-z0-9 ]/g, "");

console.log("TEXT:", text);

// =============================
// 🔥 DATABASE
// =============================
const skillsDB = {
    frontend: ["html", "css", "javascript", "react", "bootstrap", "java", "python", "sql"],
    backend: ["node", "express", "mongodb", "api", "sql", "java"],
    data: ["python", "sql", "excel", "machine learning", "pandas"]
};

const keywords = ["project", "internship", "experience", "team", "leadership"];

const skills = skillsDB[role] || [];

// =============================
// ✅ SKILL DETECTION (FIXED)
// =============================
let foundSkills = [];
let missingSkills = [];

skills.forEach(skill => {
    if (text.includes(skill) || rawText.toLowerCase().includes(skill)) {
        foundSkills.push(skill);
    } else {
        missingSkills.push(skill);
    }
});

// 🔥 FALLBACK (VERY IMPORTANT)
const fallbackSkills = ["java", "python", "sql", "html", "css", "javascript"];

fallbackSkills.forEach(skill => {
    if (!foundSkills.includes(skill) && rawText.toLowerCase().includes(skill)) {
        foundSkills.push(skill);
    }
});

let skillScore = foundSkills.length * 5;
if (skillScore > 40) skillScore = 40;

// =============================
// 🔍 KEYWORDS
// =============================
let keywordCount = 0;
keywords.forEach(k => {
    if (text.includes(k)) keywordCount++;
});

let keywordScore = keywordCount * 4;

// =============================
// 📄 LENGTH
// =============================
let lengthScore = text.length > 1000 ? 20 : 10;

// =============================
// 📚 SECTIONS
// =============================
let missingSections = [];

if (!text.includes("education")) missingSections.push("Education");
if (!text.includes("experience")) missingSections.push("Experience");
if (!text.includes("skills")) missingSections.push("Skills");

let sectionScore = missingSections.length === 0 ? 10 : 5;

// =============================
// 🎯 FINAL SCORE
// =============================
let totalScore = Math.min(100,
    skillScore + keywordScore + lengthScore + sectionScore
);

// =============================
// 💪 STRENGTH
// =============================
let strength = "Weak ⚠️";
let color = "red";

if (totalScore > 80) {
    strength = "Strong 💪";
    color = "green";
} else if (totalScore > 60) {
    strength = "Average 👍";
    color = "orange";
}

// =============================
// 📊 ATS BREAKDOWN
// =============================
let atsSkill = skillScore;
let atsKeyword = keywordScore * 2;
let atsExperience = text.includes("experience") ? 80 : 40;
let atsFormat = missingSections.length === 0 ? 90 : 50;

// =============================
// 🖥️ UI UPDATE
// =============================
document.getElementById("score").innerText = totalScore;

document.getElementById("skillBar").style.width = atsSkill + "%";
document.getElementById("keywordBar").style.width = atsKeyword + "%";
document.getElementById("lengthBar").style.width = lengthScore * 2 + "%";

document.getElementById("found").innerText = foundSkills.join(", ") || "None";
document.getElementById("missing").innerText = missingSkills.join(", ");
document.getElementById("sections").innerText = missingSections.join(", ") || "None";

document.getElementById("suggestions").innerHTML = `
    <li>Add more projects</li>
    <li>Improve formatting</li>
    <li>Use strong action words</li>
`;

document.getElementById("strengthMeter").innerHTML = `
    <h3 style="color:${color}; text-align:center;">
        Resume Strength: ${strength}
    </h3>
`;

document.getElementById("atsSkill").style.width = atsSkill + "%";
document.getElementById("atsKeyword").style.width = atsKeyword + "%";
document.getElementById("atsExperience").style.width = atsExperience + "%";
document.getElementById("atsFormat").style.width = atsFormat + "%";

// =============================
// 📊 PIE CHART
// =============================
new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
        labels: ["Skills", "Keywords", "Experience", "Formatting"],
        datasets: [{
            data: [atsSkill, atsKeyword, atsExperience, atsFormat],
            backgroundColor: ["#4facfe", "#00c9a7", "#f9a825", "#e53935"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});