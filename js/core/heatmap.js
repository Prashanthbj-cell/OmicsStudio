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
    ["Gene", "Control_1", "Control_2", "Control_3", "Disease_1", "Disease_2", "Disease_3"],

    ["Me1",19.63781576,19.24106877,18.6370812,21.75441426,21.45036964,21.56188781],
["Sar1b",21.49888942,12.44966832,21.45551687,23.40219033,22.40340922,23.33654594],
["Prmt1",17.91747677,14.04641673,15.47785627,19.08437719,18.32321024,18.81744524],
["Ndufa4",18.96509151,18.46470331,18.69364009,20.47978078,20.50079461,20.78577194],
["Prdx3",19.46633536,18.73314343,18.42776296,20.805672,20.61024392,20.91626189],
["Prkcd",21.15194093,12.44966832,21.59758886,22.16954771,22.87975043,22.66202545],
["Cyp11a1",24.43057827,24.50251249,24.63492402,26.09990117,26.14832106,26.40237047],
["Ighv",21.00112526,20.92890568,20.27497639,22.67196531,22.18474786,22.37598699],
["Col6a3",23.00218866,22.57644342,22.87244193,24.53623344,24.33257962,24.50794401],
["Epdr1",26.89735459,26.57794351,26.61649949,28.37312534,28.13824961,28.25626354],
["Cpox",20.72401454,20.86988614,19.8359702,22.00143966,22.0211856,22.08172445],
["Dad1",21.08950613,21.63876822,21.72770944,23.2220194,22.97850761,22.71596373],
["Calm1",20.88938586,21.92854496,22.01623156,23.22035563,23.33825667,22.91333897],
["Pc",23.29366769,23.79731496,24.45337941,25.23364487,25.68237609,25.18016935],
["Gpx1",21.67683676,21.49887383,21.98348354,22.87344296,23.27351666,23.30394765],
["Npm1",21.05057749,20.51930058,20.01064283,22.03477052,21.9575151,21.83199156],
["Sod2",24.47268543,25.616157,24.5076432,26.28425997,26.24040138,26.35878846],
["Rps3a",23.04946483,23.01591875,23.17882166,24.60530811,24.40871003,23.96553414],
["Itih5",22.18683348,21.84607586,22.20345435,23.40856662,23.31368587,23.29031586],
["Slc25a5",22.73271743,23.10236788,22.46130458,24.14483025,24.01750467,23.9155699],
["Cope",21.47901012,21.32194907,22.09790482,23.02475069,22.72610361,22.96675939],
["Tpm2",26.3003044,25.69713342,25.7959776,25.14497872,24.30331593,23.38357407],
["Hnrnph1",24.15334212,23.91166619,24.32277263,22.91025164,22.4568246,22.19572504],
["Ckb",20.98116917,20.64019359,20.89456912,19.32437552,19.10382075,19.24737542],
["Anxa2",22.78835463,23.05919341,23.52215861,22.08215038,21.15822056,21.02958232],
["Raly",22.02938438,22.13621,22.53196441,21.18436372,21.17565305,12.38351088],
["Eif3m",21.48920595,21.50641985,20.96237076,19.78232864,19.41413386,19.82349587],
["Capg",20.50842169,20.39440047,21.12553581,18.64761827,19.21942647,19.17935909],
["Cavin1",24.2259057,23.43127753,23.75662147,22.36555926,22.08849513,22.01361325],
["Pgrmc1",21.08984712,20.98102852,21.24959612,18.85494128,19.22916927,19.68824118],
["Otc",22.63572948,22.28838709,22.82500068,21.40394345,21.22772988,12.38351088],
["Rpl13a",23.43123849,23.1637602,23.39282208,21.80340919,19.95135842,21.29261472],
["Macroh2a1",22.47126011,22.50798435,23.03079138,20.77287877,19.31857414,20.59739829],
["Cul1",14.93255321,15.07884828,15.23387054,12.76761136,12.39568413,12.38351088],
["C1qbp",22.82010417,22.82562759,22.85403476,20.05181025,20.01664637,20.36912884],
["Gnb1",22.08793523,21.9399129,21.74220087,19.67211329,18.90978719,18.75738772],
["Rpl10a",23.17506269,22.87596927,22.35520859,19.40533149,20.22825768,20.30083853],
["Igk;Igkc",26.46405187,26.40519514,26.5934749,23.74144715,23.89343736,23.32069473],
["Rps4x",24.26981699,24.31771261,24.59709778,21.77724794,20.39972159,20.71591335],
["Arg1",22.22382159,22.18085899,22.23197055,18.71815762,19.62792224,12.38351088],
["Rpl13",24.32389457,24.44900303,24.13021201,12.37851111,18.38538729,18.57800493],


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