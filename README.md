# basicresumebuilder-analyser
A modern web app to build, analyze, and improve resumes with real-time preview and ATS-based scoring.
# 🚀 ResumeAI – Smart Resume Builder & Analyzer

🔗 **Live Demo:**https://basicresumeanalyser.netlify.app/

ResumeAI is a modern web application that helps users **build, analyze, and optimize resumes** using intelligent insights. It provides real-time resume preview, ATS-based scoring, and skill suggestions to improve job readiness.

---

## ✨ Features

### 🧾 Resume Builder

* Create professional resumes easily
* Multiple templates (Classic, Modern, Minimal, Creative) 
* Live preview while editing
* Add personal details, skills, education, projects, and experience
* Upload profile photo
* Dark mode support

---

### 📊 Resume Analyzer

* Upload PDF or paste resume text 
* Extracts text using PDF.js
* Detects skills based on job role
* Calculates resume score (out of 100) 
* Shows:

  * ✅ Found skills
  * ❌ Missing skills
  * ⚠️ Missing sections
  * 💡 Suggestions

---

### 📈 ATS Score & Insights

* Skill match analysis
* Keyword matching
* Resume length evaluation
* Section completeness check
* Visual dashboard with progress bars & charts 

---

### 📄 PDF Download

* Download resume as PDF using `html2pdf.js` 

---

### 🎯 Smart Features

* Job role-based skill suggestions
* LocalStorage-based data handling
* Interactive UI with animations
* Responsive design

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Libraries Used:**

  * PDF.js (Resume parsing)
  * Chart.js (Data visualization)
  * html2pdf.js (PDF generation)
* **Storage:** LocalStorage

---

## 📂 Project Structure

```
📁 ResumeAI
│
├── index.html        # Homepage
├── builder.html      # Resume Builder
├── analyzer.html     # Resume Analyzer
├── result.html       # Analysis Dashboard
│
├── style.css         # Styling & UI
├── script.js         # General scripts
├── builder.js        # Builder logic
├── analyzer.js       # Resume parsing logic
├── result.js         # Scoring & analytics
│
└── assets/           # Images (optional)
```

---

## ⚙️ How to Run Locally

1. Clone the repository

```bash
git clone https://github.com/your-username/resume-ai.git
```

2. Open folder

```bash
cd resume-ai
```

3. Run project

* Open `index.html` in browser
  OR
* Use Live Server (recommended)

---

## 🧠 How It Works

1. User builds or uploads resume
2. Text is extracted and processed
3. Skills & keywords are matched
4. ATS score is calculated
5. Results displayed with suggestions

---

## 🚀 Future Improvements

* AI-based resume suggestions (GPT integration)
* Login & user profiles
* Cloud storage for resumes
* More advanced ATS scoring
* Drag & drop resume sections

---

## 👨‍💻 Developer

**Dheeraj**
Built using HTML, CSS & JavaScript

---

## ⭐ Why This Project Stands Out

* Combines **Builder + Analyzer in one app**
* Real-time preview (interactive UX)
* ATS-style scoring system
* Clean UI with animations
* Practical and useful for real users

---

## 📌 Conclusion

ResumeAI is a **complete resume toolkit** that helps users not only create resumes but also improve them with smart insights, making it a strong portfolio project.

---

