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

    ["TP53",6.2,6.5,6.1,6.4,8.5,8.8,8.3,8.6,7.1,7.4,7.0,7.3],
    ["EGFR",5.1,5.4,5.0,5.3,7.8,8.1,7.6,7.9,6.2,6.5,6.1,6.4],
    ["BRCA1",4.8,5.0,4.7,4.9,7.2,7.5,7.0,7.3,5.8,6.1,5.7,6.0],
    ["PTEN",6.8,7.1,6.7,7.0,8.4,8.7,8.2,8.5,7.5,7.8,7.4,7.7],
    ["AKT1",5.6,5.9,5.5,5.8,7.9,8.2,7.7,8.0,6.6,6.9,6.5,6.8],
    ["MTOR",8.2,8.5,8.1,8.4,5.2,5.5,5.1,5.4,7.0,7.3,6.9,7.2],
    ["MYC",7.9,8.2,7.8,8.1,5.0,5.3,4.9,5.2,6.8,7.1,6.7,7.0],
    ["GAPDH",9.1,9.4,9.0,9.3,6.2,6.5,6.1,6.4,8.0,8.3,7.9,8.2],
    ["ACTB",8.4,8.7,8.3,8.6,5.5,5.8,5.4,5.7,7.2,7.5,7.1,7.4],
    ["VIM",6.4,6.7,6.3,6.6,8.0,8.3,7.9,8.2,7.1,7.4,7.0,7.3],
    ["CDH1",5.2,5.5,5.1,5.4,7.6,7.9,7.5,7.8,6.3,6.6,6.2,6.5],
    ["KRT8",4.6,4.9,4.5,4.8,7.3,7.6,7.2,7.5,5.9,6.2,5.8,6.1],
    ["KRT18",7.0,7.3,6.9,7.2,5.1,5.4,5.0,5.3,6.2,6.5,6.1,6.4],
    ["HSP90AA1",6.1,6.4,6.0,6.3,8.1,8.4,8.0,8.3,7.0,7.3,6.9,7.2],
    ["HSPA5",5.4,5.7,5.3,5.6,7.5,7.8,7.4,7.7,6.4,6.7,6.3,6.6],
    ["SOD1",7.6,7.9,7.5,7.8,4.9,5.2,4.8,5.1,6.5,6.8,6.4,6.7],
    ["CAT",6.7,7.0,6.6,6.9,8.3,8.6,8.1,8.4,7.4,7.7,7.3,7.6],
    ["MMP9",8.0,8.3,7.9,8.2,5.8,6.1,5.7,6.0,7.0,7.3,6.9,7.2],
    ["IL6",4.9,5.2,4.8,5.1,7.0,7.3,6.9,7.2,5.7,6.0,5.6,5.9]
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