async function extractTextFromPDF(file) {
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    content.items.forEach(item => text += item.str + " ");
  }

  return text;
}

// Skill Database
const skillsDB = [
  "html","css","javascript","react","node","python",
  "java","sql","mongodb","git","aws","c++","machine learning"
];

function extractSkills(text) {
  return skillsDB.filter(skill => text.toLowerCase().includes(skill));
}

function calculateATS(text) {
  let score = 0;

  if (text.toLowerCase().includes("experience")) score += 20;
  if (text.toLowerCase().includes("education")) score += 20;
  if (text.toLowerCase().includes("skills")) score += 20;
  if (text.match(/\d+/)) score += 20;
  if (text.length > 400) score += 20;

  return score;
}

function keywordMatch(resume, job) {
  const words = job.toLowerCase().split(/\W+/);
  let match = 0;

  words.forEach(word => {
    if (resume.toLowerCase().includes(word)) match++;
  });

  return Math.min(100, Math.floor((match / words.length) * 100));
}

function getMissingSkills(jobDesc, resumeSkills) {
  return skillsDB.filter(skill =>
    jobDesc.toLowerCase().includes(skill) && !resumeSkills.includes(skill)
  );
}

function generateSuggestions(score, ats, match, missingSkills) {
  let suggestions = [];

  if (score < 70) suggestions.push("Improve overall resume quality");
  if (ats < 70) suggestions.push("Use proper sections (Skills, Education, Experience)");
  if (match < 60) suggestions.push("Customize resume for job role");
  if (missingSkills.length > 0) suggestions.push("Add missing skills: " + missingSkills.join(", "));
  
  return suggestions;
}

async function analyzeResume() {
  const file = document.getElementById("resumeInput").files[0];
  const jobDesc = document.getElementById("jobDesc").value;

  if (!file) return alert("Upload resume!");

  const text = await extractTextFromPDF(file);

  const skills = extractSkills(text);
  const ats = calculateATS(text);
  const match = keywordMatch(text, jobDesc);
  const missingSkills = getMissingSkills(jobDesc, skills);

  const score = Math.floor((skills.length * 10 + ats + match) / 3);

  const suggestions = generateSuggestions(score, ats, match, missingSkills);

  const data = { score, ats, match, skills, missingSkills, suggestions };
  localStorage.setItem("analysis", JSON.stringify(data));

  window.location.href = "result.html";
}