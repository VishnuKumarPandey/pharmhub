🧬 PharmaGuard: AI-Powered Precision Medicine
Team Akatsuki | RIFT 2026 Hackathon

PharmaGuard ek AI-powered pharmacogenomics engine hai jo raw genomic VCF files ko parse karta hai aur patient ke genetic variants ke basis par drug-response risks predict karta hai.

🔗 Project Links
Live Demo (Netlify): https://tourmaline-halva-33df26.netlify.app/

LinkedIn Video Demo: [Yahan apna LinkedIn video link paste karein]

🏗️ Architecture Overview
PharmaGuard ek simple lekin powerful workflow follow karta hai:

Data Input: User patient ki VCF file upload karta hai aur drug select karta hai.

Local Parsing: JavaScript browser mein hi VCF file ko scan karke specific rsIDs (variants) dhoondhti hai.

AI Reasoning: Detected variants aur drug name ko Gemini 1.5 Flash API par bheja jata hai.

Clinical Output: AI se prapt insights ko mandatory JSON format aur ek visual report mein dikhaya jata hai.

🛠️ Tech Stack
Frontend: HTML5, CSS3 (Glassmorphism UI), JavaScript (ES6+)

AI Engine: Google Gemini 1.5 Flash API

Deployment: Netlify

Version Control: GitHub

📖 API Documentation
Humne Google Gemini API ka use kiya hai clinical explanations generate karne ke liye.

Model: gemini-1.5-flash

Prompt Logic: AI ko ek pharmacogenomics expert ki tarah treat kiya gaya hai jo variant aur enzyme activity ke beech ka biological mechanism samjhata hai.

🛠️ Installation & Usage
Repository clone karein: git clone https://github.com/VishnuKumarPandey/pharmhub.git

index.html ko browser mein open karein.

script.js mein apni GEMINI_API_KEY daalein.

Usage: Root folder mein di gayi gtf.vcf file upload karein aur "CODEINE" select karke analyze karein.
