/**
 * PHARMAGUARD: AI-POWERED PRECISION MEDICINE
 * Team: Akatsuki | RIFT 2026 Hackathon
 */

const GEMINI_API_KEY = "AIzaSyA21ESlEwTLHo14pfp5RK352b4Hi3VLH5U"; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const PHARMA_DB = {
    "CODEINE": { gene: "CYP2D6", variants: ["rs16947", "rs1135840", "rs1065852", "rs3892097"] },
    "WARFARIN": { gene: "CYP2C9", variants: ["rs1799853", "rs1057910"] },
    "CLOPIDOGREL": { gene: "CYP2C19", variants: ["rs4244285", "rs28399504", "rs12769205"] },
    "SIMVASTATIN": { gene: "SLCO1B1", variants: ["rs4149056", "rs2306283"] },
    "AZATHIOPRINE": { gene: "TPMT", variants: ["rs1800462", "rs1142345"] },
    "FLUOROURACIL": { gene: "DPYD", variants: ["rs3918290", "rs1801265", "rs67376798"] }
};

const vcfInput = document.getElementById('vcf-upload');
const dropZone = document.getElementById('drop-zone');
const analyzeBtn = document.getElementById('analyze-btn');

vcfInput.addEventListener('change', () => {
    if (vcfInput.files.length > 0) {
        dropZone.querySelector('p').innerHTML = `✅ <b>File Ready:</b> ${vcfInput.files[0].name}`;
        dropZone.style.borderColor = "#fb7185"; 
    }
});

async function fetchAIExplanation(gene, drug, risk, variant) {
    const prompt = `Pharmacogenomics: Explain in 2 sentences why ${gene} variant ${variant} has a "${risk}" risk for ${drug}. Mention enzyme activity.`;
    try {
        const response = await fetch(GEMINI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (e) {
        return "Variant affects drug metabolism. Consult CPIC guidelines for dosage adjustment.";
    }
}

analyzeBtn.addEventListener('click', async () => {
    const vcfFile = vcfInput.files[0];
    const drugName = document.getElementById('drug-input').value.toUpperCase().trim();

    if (!vcfFile || !PHARMA_DB[drugName]) {
        alert("Bhai, VCF file select karein aur valid drug (jaise CODEINE) daalein!");
        return;
    }

    analyzeBtn.innerText = "🤖 AI Analysis in Progress...";
    analyzeBtn.disabled = true;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const content = e.target.result;
        const config = PHARMA_DB[drugName];
        let detected = [];
        let patientId = "UNKNOWN_PATIENT";
        const lines = content.split('\n');

        lines.forEach(line => {
            if (line.startsWith('#CHROM')) {
                const h = line.split(/\s+/);
                if (h.length >= 10) patientId = h[9].trim();
                return;
            }
            if (line.startsWith('#') || !line.trim()) return;
            
            const cols = line.split(/\s+/);
            if (cols.length < 10) return;

            const rsid = cols[2]; // Professional format: RSID is index 2
            const genotypeField = cols[9]; // Genotype is index 9
            const genotype = genotypeField.split(':')[0];

            if (config.variants.includes(rsid) && genotype.includes('1')) {
                detected.push({ rsid: rsid, genotype: genotype, gene: config.gene });
            }
        });

        const isRisk = detected.length > 0;
        const riskLabel = isRisk ? "Adjust Dosage" : "Safe";
        const aiSummary = await fetchAIExplanation(config.gene, drugName, riskLabel, detected[0]?.rsid || "None");

        const finalOutput = {
            "patient_metadata": { "id": patientId, "vcf_reference": "GRCh38.p13" },
            "analysis_results": { "drug": drugName, "prediction": riskLabel, "detected_variants": detected },
            "clinical_insight": { "recommendation": isRisk ? `Reduce dose by 25%.` : "Standard dose.", "ai_summary": aiSummary }
        };

        renderOutput(finalOutput);
        analyzeBtn.innerText = "Analyze Genomic Risk";
        analyzeBtn.disabled = false;
    };
    reader.readAsText(vcfFile);
});

function renderOutput(data) {
    const resultsArea = document.getElementById('results');
    resultsArea.classList.remove('hidden');
    
    document.getElementById('json-output').textContent = JSON.stringify(data, null, 4);
    
    const risk = data.analysis_results.prediction;
    const color = risk === "Safe" ? "#10b981" : "#f59e0b";

    document.getElementById('visual-result').innerHTML = `
        <div style="border-left: 6px solid ${color}; padding: 20px; background: #1e293b; border-radius: 12px; border: 1px solid #334155;">
            <h3 style="color: ${color};">Patient: ${data.patient_metadata.id}</h3>
            <p><b>Result:</b> ${risk}</p>
            <p><b>Advice:</b> ${data.clinical_insight.recommendation}</p>
            <p style="font-size: 0.9em; color: #94a3b8; margin-top: 10px;"><b>AI Logic:</b> ${data.clinical_insight.ai_summary}</p>
        </div>
    `;
    resultsArea.scrollIntoView({ behavior: 'smooth' });
}

function resetUI() { location.reload(); }
function copyJSON() {
    const jsonText = document.getElementById('json-output').textContent;
    navigator.clipboard.writeText(jsonText);
    alert("JSON copied!");
}