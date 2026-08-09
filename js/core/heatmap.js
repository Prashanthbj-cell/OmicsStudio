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

    const file = localStorage.getItem("heatmapFileName");

    if (!file) {
        alert("Please upload dataset first");
        return;
    }

    window.location.href = "../pages/heatmap-builder.html";
}

// Make function available to HTML onclick
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

        // Update preview
        updateDashboard(rows);

    });

}