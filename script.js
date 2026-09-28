const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const fileInfo = document.getElementById("fileInfo");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const analyzeBtn = document.getElementById("analyzeBtn");

let selectedFile = null;


/* =========================
   FILE SELECTION
========================= */

fileInput.addEventListener("change", function () {

    if (this.files.length > 0) {

        handleFile(this.files[0]);

    }

});


function handleFile(file) {

    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {

        alert("Please upload PDF, JPG or PNG file.");

        return;

    }

    selectedFile = file;

    fileName.textContent = file.name;

    fileSize.textContent =
        formatFileSize(file.size);

    fileInfo.style.display = "flex";

    analyzeBtn.disabled = false;

    document.getElementById("uploadTitle").textContent =
        "Document Selected";

    document.getElementById("uploadText").textContent =
        "Your document is ready for analysis.";

}


/* =========================
   FILE SIZE
========================= */

function formatFileSize(bytes) {

    if (bytes < 1024) {

        return bytes + " Bytes";

    }

    if (bytes < 1024 * 1024) {

        return (bytes / 1024).toFixed(1) + " KB";

    }

    return (bytes / (1024 * 1024)).toFixed(1) + " MB";

}


/* =========================
   DRAG & DROP
========================= */

dropZone.addEventListener("dragover", function(e) {

    e.preventDefault();

    dropZone.classList.add("dragover");

});


dropZone.addEventListener("dragleave", function() {

    dropZone.classList.remove("dragover");

});


dropZone.addEventListener("drop", function(e) {

    e.preventDefault();

    dropZone.classList.remove("dragover");

    if (e.dataTransfer.files.length > 0) {

        handleFile(e.dataTransfer.files[0]);

    }

});


/* =========================
   REMOVE FILE
========================= */

function removeFile() {

    selectedFile = null;

    fileInput.value = "";

    fileInfo.style.display = "none";

    analyzeBtn.disabled = true;

    document.getElementById("uploadTitle").textContent =
        "Upload Financial Document";

    document.getElementById("uploadText").textContent =
        "Drag & drop your file here or browse";

}


/* =========================
   ANALYZE DOCUMENT
========================= */

function analyzeDocument() {

    if (!selectedFile) {

        alert("Please select a document first.");

        return;

    }


    // Hide upload
    document.querySelector(".upload-section")
        .style.display = "none";


    // Show processing
    const processing =
        document.getElementById("processing");

    processing.style.display = "block";

    processing.scrollIntoView({
        behavior: "smooth"
    });


    const steps = [
        "step1",
        "step2",
        "step3",
        "step4",
        "step5"
    ];


    // Reset steps

    steps.forEach((id, index) => {

        const element = document.getElementById(id);

        if (index === 0) {

            element.innerHTML =
                "<span>✓</span> Document uploaded";

        } else {

            element.innerHTML =
                "<span>○</span> " +
                element.textContent.trim().substring(1);

        }

    });


    // Simulate processing

    steps.forEach((id, index) => {

        setTimeout(() => {

            const element =
                document.getElementById(id);

            if (index > 0) {

                element.innerHTML =
                    "<span>✓</span> " +
                    getStepText(index);

            }

        }, (index + 1) * 900);

    });


    // Show result

    setTimeout(() => {

        processing.style.display = "none";

        showResult();

    }, 5500);

}


function getStepText(index) {

    const text = [
        "Document uploaded",
        "OCR processing",
        "Document analysis",
        "Anomaly detection",
        "AI verification"
    ];

    return text[index];

}


/* =========================
   SHOW RESULT
========================= */

function showResult() {

    const result =
        document.getElementById("result");

    result.style.display = "block";

    document.getElementById("resultFileName")
        .textContent = selectedFile.name;

    result.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   GENERATE REPORT
========================= */

function generateReport() {

    const report = `
FIN-GUARD AI
FINANCIAL DOCUMENT VERIFICATION REPORT

--------------------------------------------

Document:
${selectedFile ? selectedFile.name : "Sample Document"}

Document Type:
Bank Statement

OCR Status:
Completed

AI Analysis:
Completed

Anomaly Detection:
Issues Found

Risk Score:
78 / 100

Status:
Needs Review

--------------------------------------------

DETECTED ISSUES

1. Balance calculation mismatch

2. Formatting inconsistency

3. Unusual transaction pattern

--------------------------------------------

AI SUMMARY

The document contains indicators that require
further verification. These indicators do not
by themselves prove fraud and should be reviewed
by an authorized person.

--------------------------------------------

NOTE:
This is a hackathon demonstration using
synthetic/sample financial data.

Generated by FinGuard AI
`;


    const blob =
        new Blob([report], {
            type: "text/plain"
        });


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "FinGuard_Verification_Report.txt";

    link.click();

    URL.revokeObjectURL(url);

}


/* =========================
   RESET
========================= */

function resetApplication() {

    location.reload();

}


/* =========================
   HERO BUTTON
========================= */

function scrollToUpload() {

    document
        .getElementById("upload")
        .scrollIntoView({
            behavior: "smooth"
        });

}