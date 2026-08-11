const browseBtn = document.getElementById("browseBtn");
const fileInput = document.getElementById("fileInput");


browseBtn.addEventListener("click", function () {
    fileInput.click();
});

fileInput.addEventListener("change", loadCSV);

function loadCSV(event){

    const file = event.target.files[0];

    if(!file) return;


    localStorage.setItem("heatmapFileName", file.name);
    localStorage.setItem("heatmapDataType", "user");


    Papa.parse(file,{

        complete:function(results){

            localStorage.setItem(
                "heatmapData",
                JSON.stringify(results.data)
            );

            updateDashboard(results.data);

        }

    });

}   

function updateDashboard(data){

    if(data.length===0) return;

    // Dataset Information
    document.getElementById("rowsCount").textContent = data.length-1;

    document.getElementById("columnsCount").textContent = data[0].length;

    document.getElementById("statusText").textContent = "Loaded ✓";

// =======================================
// Count Missing Values
// =======================================

let missing = 0;

for (let i = 1; i < data.length; i++) {

    // Ignore completely empty rows
    if (!data[i] || data[i].every(cell =>
        cell === undefined ||
        cell === null ||
        String(cell).trim() === ""
    )) {
        continue;
    }

    for (let j = 0; j < data[0].length; j++) {

        const cell = data[i][j];

        if (
            cell === undefined ||
            cell === null ||
            String(cell).trim() === ""
        ) {
            missing++;
        }

    }
}

document.getElementById("missingCount").textContent = missing;

console.log("FINAL MISSING COUNT:", missing);

    // Update Preview Table
    createPreview(data);

}

function createPreview(data){

    const head=document.getElementById("previewHead");

    const body=document.getElementById("previewBody");

    head.innerHTML="";
    body.innerHTML="";

    // Header
    let header="<tr>";

    data[0].forEach(col=>{

        header += `<th>${col}</th>`;

    });

    header += "</tr>";

    head.innerHTML = header;

    // First 5 rows
    for(let i = 1; i < data.length; i++){

        let row="<tr>";

        data[i].forEach(cell=>{

            row += `<td>${cell}</td>`;

        });

        row += "</tr>";

        body.innerHTML += row;

    }

}

function drawHeatmap(data) {

    const headers = data[0].slice(1);

    const genes = [];
    const values = [];

    for (let i = 1; i < data.length; i++) {

        // Skip completely empty rows
        if (
            !data[i] ||
            data[i].every(cell =>
                cell === undefined ||
                cell === null ||
                String(cell).trim() === ""
            )
        ) {
            continue;
        }

        genes.push(data[i][0]);

        values.push(
            data[i]
                .slice(1)
                .map(Number)
        );
    }

    const heatmapElement = document.getElementById("heatmapPlot");

    if (!heatmapElement) {
        console.error("heatmapPlot element not found");
        return;
    }

    // Calculate height according to number of rows
    const heatmapHeight = Math.max(
        500,
        genes.length * 30 + 150
    );

    const heatmapWidth = Math.max(
        800,
        headers.length * 80 + 200
    );

    Plotly.newPlot(
        heatmapElement,
        [{
            z: values,
            x: headers,
            y: genes,
            type: "heatmap",
            colorscale: "RdBu",
            reversescale: true
        }],
        {
            width: heatmapWidth,
            height: heatmapHeight,

            margin: {
                l: 120,
                r: 40,
                t: 40,
                b: 100
            },

            paper_bgcolor: "white",
            plot_bgcolor: "white",

            xaxis: {
                automargin: true
            },

            yaxis: {
                automargin: true
            }
        },
        {
            responsive: true
        }
    );
}

// =======================================
// OPEN HEATMAP BUILDER
// =======================================

function openBuilder() {

    const storedData =
        localStorage.getItem("heatmapData");

    const fileName =
        localStorage.getItem("heatmapFileName");

    const dataType =
        localStorage.getItem("heatmapDataType");

    console.log("========== OPEN BUILDER ==========");
    console.log("storedData:", storedData);
    console.log("fileName:", fileName);
    console.log("dataType:", dataType);


    if (!storedData || !fileName) {

        alert(
            "Please upload a dataset, paste your data, or click 'Try Demo Dataset'."
        );

        return;
    }


    try {

        const data = JSON.parse(storedData);

        if (!Array.isArray(data) || data.length < 2) {

            alert(
                "Please upload or paste a valid dataset."
            );

            return;
        }

        console.log("Dataset valid.");
        console.log("Rows:", data.length);
        console.log("Columns:", data[0].length);

        window.location.href =
            "heatmap-builder.html";

    } catch (error) {

        console.error("Dataset error:", error);

        alert(
            "The dataset is invalid. Please upload or paste it again."
        );
    }
}

window.openBuilder = openBuilder;

// =======================================
// LOAD PASTED DATA
// =======================================

const loadPasteBtn = document.getElementById("loadPasteBtn");
const pasteData = document.getElementById("pasteData");

if (loadPasteBtn && pasteData) {

    loadPasteBtn.addEventListener("click", function () {

        console.log("LOAD PASTED DATA CLICKED");

        const text = pasteData.value.trim();

        if (!text) {
            alert("Please paste your dataset first.");
            return;
        }

        // Convert pasted Excel data into rows
        const rows = text
            .split(/\r?\n/)
            .filter(row => row.trim() !== "")
            .map(row => row.split(/\t/));

        console.log("Pasted rows:", rows);

        if (rows.length < 2) {
            alert("Please paste a header and at least one data row.");
            return;
        }

        // Save pasted dataset
        localStorage.setItem(
            "heatmapData",
            JSON.stringify(rows)
        );

        localStorage.setItem(
            "heatmapFileName",
            "Pasted Dataset"
        );

        localStorage.setItem(
    "heatmapDataType",
    "user"
);

        // Update preview
        updateDashboard(rows);

    });

}

// =======================================
// DEMO DATASET
// =======================================

const demoData = [
    ["Gene", "Control_1", "Control_2", "Control_3", "Disease_1", "Disease_2", "Disease_3", "Treatment_1", "Treatment_2", "Treatment_3"],

    ["TP53",7.42,5.81,8.13,7.05,4.92,8.46,5.68,7.91,6.34],
    ["EGFR",4.86,7.35,6.12,5.74,7.92,6.48,8.35,5.91,7.08],
    ["BRCA1",6.93,8.17,5.24,6.81,4.57,7.95,6.32,8.41,5.87],
    ["PTEN",8.25,6.44,7.18,4.91,7.62,6.35,5.46,7.83,6.19],
    ["AKT1",5.37,7.84,6.51,7.26,5.18,8.43,7.68,4.95,6.87],
    ["MTOR",7.81,5.46,8.32,6.15,7.93,4.82,8.11,5.69,6.43],
    ["MYC",6.28,8.47,5.93,8.05,6.39,5.21,6.82,4.76,8.36],
    ["GAPDH",5.64,7.12,8.05,4.73,6.91,7.83,7.46,8.22,5.85],
    ["ACTB",8.61,6.35,7.47,7.93,5.16,8.24,4.91,7.18,6.72],
    ["VIM",6.17,8.34,5.72,6.43,4.68,7.51,5.93,7.27,8.48],
    ["CDH1",7.26,5.83,8.19,5.12,7.64,6.88,8.31,6.24,7.56],
    ["KRT8",4.95,7.73,6.28,7.11,5.62,8.02,5.84,7.49,6.71],
    ["KRT18",8.04,6.59,5.31,6.74,8.27,5.08,6.16,4.87,8.38],
    ["HSP90AA1",5.48,8.13,6.76,4.69,7.87,6.24,5.73,7.05,8.09],
    ["HSPA5",7.63,5.29,8.41,7.36,4.84,6.97,5.67,7.78,6.03],
    ["SOD1",6.51,7.94,5.86,6.09,7.43,4.72,7.16,5.38,8.44],
    ["CAT",8.18,6.27,7.52,8.37,5.11,6.83,4.96,8.06,6.45],
    ["MMP9",5.82,7.48,6.14,5.47,7.96,8.13,7.34,5.03,8.25],
    ["IL6",7.09,4.81,8.22,7.68,5.93,6.27,5.36,7.85,6.18]
];


// =======================================
// TRY DEMO DATASET
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    const demoDatasetBtn = document.querySelector(".demo-btn");

    console.log("demoDatasetBtn:", demoDatasetBtn);

    if (!demoDatasetBtn) {
        console.error("ERROR: .demo-btn was not found!");
        return;
    }

    console.log("demoDatasetBtn found ✓");

    demoDatasetBtn.addEventListener("click", function () {

        console.log("TRY DEMO DATASET CLICKED");

        localStorage.setItem(
            "heatmapData",
            JSON.stringify(demoData)
        );

        localStorage.setItem(
            "heatmapFileName",
            "OmicsStudio Demo Dataset"
        );

        localStorage.setItem(
            "heatmapDataType",
            "demo"
        );

        console.log("DEMO DATA SAVED ✓");

        // Open heatmap builder
        window.location.href = "heatmap-builder.html";

    });

});


// =======================================
// DOWNLOAD DEMO DATASET AS CSV
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    const downloadDemoBtn =
        document.getElementById("downloadDemoBtn");

    if (!downloadDemoBtn) {
        console.error("ERROR: #downloadDemoBtn was not found!");
        return;
    }

    downloadDemoBtn.addEventListener("click", function () {

        console.log("DOWNLOAD DEMO CSV CLICKED");

        const csv = demoData
            .map(row =>
                row.map(value => `"${value}"`).join(",")
            )
            .join("\n");

        const blob = new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download =
            "OmicsStudio_Demo_Heatmap_Dataset.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        console.log("DEMO CSV DOWNLOADED ✓");

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const backBtn = document.getElementById("heatmapBackBtn");

    if (backBtn) {
        backBtn.addEventListener("click", function () {
            window.history.back();
        });
    }

});