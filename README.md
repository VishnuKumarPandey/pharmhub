# 🧬 PharmaGuard: AI-Powered Precision Medicine
**Team Akatsuki | RIFT 2026 Hackathon**

PharmaGuard ek AI-powered pharmacogenomics engine hai jo raw genomic VCF files ko parse karta hai aur patient ke genetic variants ke basis par drug-response risks predict karta hai.

## 🚀 Key Features
- **VCF Parsing:** Raw VCF files se genetic variants (rsIDs) ko extract karna.
- **AI-Driven Insights:** Gemini 1.5 Flash API ka use karke real-time clinical explanations aur recommendations dena.
- **Schema Compliance:** Mandatory JSON output jo RIFT requirements ke mutabik format kiya gaya hai.
- **Precision Medicine:** Har patient ke unique genetic profile ke hisaab se personalized drug safety assessment.

## 🛠️ Deployment Instructions (Local Setup)
Judge ya user ke liye project ko chalane ka tarika:
1. Is repository ko clone karein ya ZIP file download karke extract karein.
2. `index.html` file ko kisi bhi modern web browser (Chrome, Edge, ya Safari) mein open karein.
3. `script.js` file kholiye aur `GEMINI_API_KEY` variable mein apni valid Gemini API key enter karein.
4. Browser mein "Browse File" par click karke repository mein di gayi `gtf.vcf` file ko upload karein.
5. Drug name select/type karein (jaise CODEINE ya WARFARIN) aur **Analyze Genomic Risk** button dabayein.

## 📂 Sample Data for Testing
Testing ke liye project ke root folder mein `gtf.vcf` file di gayi hai. Is file mein pharmacogenomics analysis ke liye zaroori specific genetic variants (jaise rs1061235) ko test data ke taur par rakha gaya hai.

## 📋 RIFT 2026 Mandatory Checklist
- [x] Public GitHub Repository link provided.
- [x] Comprehensive README with clear deployment guide.
- [x] `package.json` included for project metadata.
- [x] `.env.example` provided for configuration template.
- [x] Sample VCF files included for evaluation.

---
*Created by Team Akatsuki for RIFT 2026 Hackathon.*
