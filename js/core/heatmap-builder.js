// =======================================
// HEATMAP BUILDER GLOBAL VARIABLES
// =======================================
let currentHeatmapType = "standard";
let groupLabelRotation = 0;
let heatmapZoom = 1;
let currentPalette = "RdBu";
const colorPalettes = {

    RdBu: [
        [0, "#FF0000"],
        [0.25, "#FF6666"],
        [0.5, "#FFFFFF"],
        [0.75, "#6666FF"],
        [1, "#0000FF"]
    ],

    BrBG: [
        [0, "#8C2D04"],
        [0.25, "#D95F0E"],
        [0.5, "#FFFFFF"],
        [0.75, "#66C2A4"],
        [1, "#006D2C"]
    ],

    PiYG: [
        [0, "#D01C8B"],
        [0.25, "#F4A6D7"],
        [0.5, "#FFFFFF"],
        [0.75, "#A6DB8C"],
        [1, "#4D9221"]
    ],

    PRGn: [
        [0, "#762A83"],
        [0.25, "#C2A5CF"],
        [0.5, "#FFFFFF"],
        [0.75, "#A6DBA0"],
        [1, "#1B7837"]
    ],

    PuOr: [
        [0, "#7B2CBF"],
        [0.25, "#C994E6"],
        [0.5, "#FFFFFF"],
        [0.75, "#FDB366"],
        [1, "#E66101"]
    ],

    Spectral: [
        [0, "#5E4FA2"],
        [0.25, "#3288BD"],
        [0.5, "#FFFFBF"],
        [0.75, "#F46D43"],
        [1, "#9E0142"]
    ],

    RdYlBu: [
        [0, "#FF0000"],
        [0.25, "#FF9933"],
        [0.5, "#FFFF00"],
        [0.75, "#66CCFF"],
        [1, "#0000FF"]
    ],

    BlueYellowRed: [
        [0, "#0000FF"],
        [0.25, "#6666FF"],
        [0.5, "#FFFF00"],
        [0.75, "#FF6666"],
        [1, "#FF0000"]
    ],

    PurpleYellowGreen: [
        [0, "#8000FF"],
        [0.25, "#B366FF"],
        [0.5, "#FFFF00"],
        [0.75, "#66CC66"],
        [1, "#00A000"]
    ],

    BlueOrange: [
        [0, "#0000FF"],
        [0.25, "#6666FF"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF9933"],
        [1, "#FF6600"]
    ],

    PinkGreen: [
        [0, "#FF1493"],
        [0.25, "#FF66B2"],
        [0.5, "#FFFFFF"],
        [0.75, "#66CC66"],
        [1, "#00A000"]
    ],

    RedCyan: [
        [0, "#FF0000"],
        [0.25, "#FF6666"],
        [0.5, "#FFFFFF"],
        [0.75, "#66CCCC"],
        [1, "#00CCCC"]
    ],

    MagentaGreen: [
        [0, "#FF00FF"],
        [0.25, "#FF66FF"],
        [0.5, "#FFFFFF"],
        [0.75, "#66CC66"],
        [1, "#00CC66"]
    ],

    TealOrange: [
        [0, "#008C95"],
        [0.25, "#66B8B8"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF9966"],
        [1, "#FF6600"]
    ],

    VioletOrange: [
        [0, "#6600CC"],
        [0.25, "#9966FF"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF9966"],
        [1, "#FF6600"]
    ],

    RBu: [
        [0, "#FF0000"],
        [0.25, "#FF6666"],
        [0.5, "#FFFFFF"],
        [0.75, "#6666FF"],
        [1, "#0000FF"]
    ],

    BlueWhiteRed: [
        [0, "#0000FF"],
        [0.25, "#6666FF"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF6666"],
        [1, "#FF0000"]
    ],

    GreenWhiteRed: [
        [0, "#00A000"],
        [0.25, "#66CC66"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF6666"],
        [1, "#FF0000"]
    ],

    PurpleWhiteOrange: [
        [0, "#6600CC"],
        [0.25, "#9966FF"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF9966"],
        [1, "#FF6600"]
    ],

    CyanWhiteRed: [
        [0, "#00CCCC"],
        [0.25, "#66CCCC"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF6666"],
        [1, "#FF0000"]
    ],

    NavyWhiteRed: [
        [0, "#000080"],
        [0.25, "#6666CC"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF6666"],
        [1, "#FF0000"]
    ],

    TealWhiteRed: [
        [0, "#008080"],
        [0.25, "#66B2B2"],
        [0.5, "#FFFFFF"],
        [0.75, "#FF6666"],
        [1, "#FF0000"]
    ],

    GreenWhitePurple: [
        [0, "#00A000"],
        [0.25, "#66CC66"],
        [0.5, "#FFFFFF"],
        [0.75, "#9966FF"],
        [1, "#6600CC"]
    ],

    OrangeWhiteBlue: [
        [0, "#FF6600"],
        [0.25, "#FF9966"],
        [0.5, "#FFFFFF"],
        [0.75, "#6666FF"],
        [1, "#0000FF"]
    ],

    YellowWhitePurple: [
        [0, "#FFFF00"],
        [0.25, "#FFFF99"],
        [0.5, "#FFFFFF"],
        [0.75, "#B366FF"],
        [1, "#6600CC"]
    ],

    PinkWhiteBlue: [
        [0, "#FF1493"],
        [0.25, "#FF66B2"],
        [0.5, "#FFFFFF"],
        [0.75, "#6666FF"],
        [1, "#0000FF"]
    ],

    // ==========================================
    // STRONG / VIBRANT PALETTES
    // ==========================================

    Fire: [
        [0, "#000000"],
        [0.25, "#800000"],
        [0.5, "#FF0000"],
        [0.75, "#FF6600"],
        [1, "#FFFF00"]
    ],

    Ice: [
        [0, "#000080"],
        [0.25, "#0000FF"],
        [0.5, "#00AFFF"],
        [0.75, "#66FFFF"],
        [1, "#FFFFFF"]
    ],

    Ocean: [
        [0, "#000033"],
        [0.25, "#000080"],
        [0.5, "#0066CC"],
        [0.75, "#00AACC"],
        [1, "#00FFFF"]
    ],

    Sunset: [
        [0, "#4B0082"],
        [0.25, "#8000FF"],
        [0.5, "#FF0066"],
        [0.75, "#FF6600"],
        [1, "#FFFF00"]
    ],

    Rainbow: [
        [0, "#0000FF"],
        [0.25, "#00CCFF"],
        [0.5, "#00CC00"],
        [0.75, "#FFFF00"],
        [1, "#FF0000"]
    ],

    Neon: [
        [0, "#0000FF"],
        [0.25, "#00FFFF"],
        [0.5, "#00FF00"],
        [0.75, "#FF00FF"],
        [1, "#FF0000"]
    ],

    // ==========================================
    // SEQUENTIAL PALETTES
    // ==========================================

    
    Blues: [
        [0, "#E6F0FF"],
        [0.25, "#99BBFF"],
        [0.5, "#4D88FF"],
        [0.75, "#0055CC"],
        [1, "#000080"]
    ],

    Greens: [
        [0, "#E6FFE6"],
        [0.25, "#99FF99"],
        [0.5, "#33CC66"],
        [0.75, "#009933"],
        [1, "#006600"]
    ],

    Reds: [
        [0, "#FFE6E6"],
        [0.25, "#FF9999"],
        [0.5, "#FF4D4D"],
        [0.75, "#CC0000"],
        [1, "#800000"]
    ],

    Purples: [
        [0, "#F3E5FF"],
        [0.25, "#D19AFF"],
        [0.5, "#AA66FF"],
        [0.75, "#7733CC"],
        [1, "#400080"]
    ],

    Oranges: [
        [0, "#FFF0E0"],
        [0.25, "#FFCC99"],
        [0.5, "#FF9933"],
        [0.75, "#FF6600"],
        [1, "#CC3300"]
    ],

    Teals: [
        [0, "#E0FFFF"],
        [0.25, "#80CCCC"],
        [0.5, "#00AAAA"],
        [0.75, "#008080"],
        [1, "#004D4D"]
    ],

    Magentas: [
        [0, "#FFE6FF"],
        [0.25, "#FF99FF"],
        [0.5, "#FF33CC"],
        [0.75, "#CC0099"],
        [1, "#800066"]
    ],

    Cyan: [
        [0, "#E6FFFF"],
        [0.25, "#99FFFF"],
        [0.5, "#33CCCC"],
        [0.75, "#009999"],
        [1, "#006666"]
    ],

    YlOrRd: [
        [0, "#FFFFCC"],
        [0.25, "#FFCC33"],
        [0.5, "#FF9933"],
        [0.75, "#FF3333"],
        [1, "#CC0000"]
    ],

    YlGnBu: [
        [0, "#FFFFCC"],
        [0.25, "#99FF99"],
        [0.5, "#33CCCC"],
        [0.75, "#0088CC"],
        [1, "#000080"]
    ],

    GnBu: [
        [0, "#E6FFF2"],
        [0.25, "#66CC99"],
        [0.5, "#00AACC"],
        [0.75, "#0066CC"],
        [1, "#003399"]
    ],

    BuGn: [
        [0, "#E6FFFF"],
        [0.25, "#66FFCC"],
        [0.5, "#00CC99"],
        [0.75, "#009966"],
        [1, "#006633"]
    ],

    PuBu: [
        [0, "#F3E6FF"],
        [0.25, "#CC99FF"],
        [0.5, "#6699FF"],
        [0.75, "#3366CC"],
        [1, "#003399"]
    ],

    PuRd: [
        [0, "#F5E6FF"],
        [0.25, "#CC99FF"],
        [0.5, "#FF66CC"],
        [0.75, "#CC0066"],
        [1, "#800033"]
    ],

    OrRd: [
        [0, "#FFF0E0"],
        [0.25, "#FFCC66"],
        [0.5, "#FF9933"],
        [0.75, "#FF3333"],
        [1, "#990000"]
    ],

    BuPu: [
        [0, "#E6FFFF"],
        [0.25, "#66CCFF"],
        [0.5, "#6699FF"],
        [0.75, "#9933CC"],
        [1, "#660066"]
    ]


};
let originalData = null;
let currentScale = "row";
let currentCluster = "none";

let FontSize = 12;


// =======================================
// LOAD HEATMAP DATA
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Heatmap Builder Loaded");

    const file =
        localStorage.getItem("heatmapFileName");

    const datasetName =
        document.getElementById("datasetName");

    if (file && datasetName) {
        datasetName.textContent =
            "Dataset: " + file;
    }


    const storedData =
        localStorage.getItem("heatmapData");

    if (!storedData) {

        console.error(
            "No heatmapData found in localStorage."
        );

        return;
    }


    try {

        originalData =
            JSON.parse(storedData);

        console.log(
            "Heatmap data loaded:",
            originalData
        );

        console.log(
            "Rows:",
            originalData.length
        );

        console.log(
            "Columns:",
            originalData[0]?.length
        );


        // Load saved controls
        loadHeatmapSize();
        loadGeneFontSize();


        // Draw heatmap
        updateHeatmap();


    } catch (error) {

        console.error(
            "Could not read heatmap data:",
            error
        );

    }

});


/* =======================================
   SCALING
======================================= */

function applyScaling(data, type) {

    if (!data) {
        return data;
    }


    if (type === "none") {

        return data;

    }


    const matrix = data
        .slice(1)
        .map(row =>
            row
                .slice(1)
                .map(value => {

                    const number =
                        parseFloat(
                            String(value).trim()
                        );

                    return Number.isFinite(number)
                        ? number
                        : 0;

                })
        );


    /* ---------- ROW Z-SCORE ---------- */

    if (type === "row") {

        for (let i = 0; i < matrix.length; i++) {

            const row = matrix[i];

            const mean =
                row.reduce(
                    (sum, value) => sum + value,
                    0
                ) / row.length;


            const variance =
                row.reduce(
                    (sum, value) =>
                        sum + Math.pow(value - mean, 2),
                    0
                ) / row.length;


            const sd = Math.sqrt(variance);


            for (let j = 0; j < row.length; j++) {

                matrix[i][j] =
                    sd === 0
                        ? 0
                        : (row[j] - mean) / sd;

            }

        }

    }


    /* ---------- COLUMN Z-SCORE ---------- */

if (type === "column") {

    const rowCount = matrix.length;

    if (rowCount === 0) {
        return data;
    }

    const columnCount = matrix[0].length;

    for (let j = 0; j < columnCount; j++) {

        // Calculate mean
        let sum = 0;

        for (let i = 0; i < rowCount; i++) {
            sum += matrix[i][j];
        }

        const mean = sum / rowCount;

        // Calculate SD
        let squaredSum = 0;

        for (let i = 0; i < rowCount; i++) {

            squaredSum +=
                Math.pow(
                    matrix[i][j] - mean,
                    2
                );

        }

        const sd =
            Math.sqrt(
                squaredSum / rowCount
            );

        // Apply Z-score
        for (let i = 0; i < rowCount; i++) {

            if (sd === 0 || !Number.isFinite(sd)) {

                matrix[i][j] = 0;

            } else {

                matrix[i][j] =
                    (matrix[i][j] - mean) / sd;

            }

        }
    }
}


    /* Rebuild dataset */

    return [

        data[0],

        ...data.slice(1).map(
            (row, index) => [

                row[0],

                ...matrix[index]

            ]
        )

    ];

}


// =======================================
// HIERARCHICAL CLUSTERING
// =======================================

function calculateDistance(a, b, method) {

    if (method === "euclidean") {

        let sum = 0;

        for (let i = 0; i < a.length; i++) {
            sum += Math.pow(a[i] - b[i], 2);
        }

        return Math.sqrt(sum);
    }


    if (method === "manhattan") {

        let sum = 0;

        for (let i = 0; i < a.length; i++) {
            sum += Math.abs(a[i] - b[i]);
        }

        return sum;
    }


    // Pearson correlation distance
    if (method === "correlation") {

        const meanA =
            a.reduce((s, v) => s + v, 0) / a.length;

        const meanB =
            b.reduce((s, v) => s + v, 0) / b.length;

        let numerator = 0;
        let denominatorA = 0;
        let denominatorB = 0;

        for (let i = 0; i < a.length; i++) {

            const da = a[i] - meanA;
            const db = b[i] - meanB;

            numerator += da * db;
            denominatorA += da * da;
            denominatorB += db * db;
        }

        const denominator =
            Math.sqrt(denominatorA * denominatorB);

        if (denominator === 0) {
            return 1;
        }

        const correlation =
            numerator / denominator;

        return 1 - correlation;
    }

    return 0;
}


// =======================================
// HIERARCHICAL CLUSTERING + DENDROGRAM DATA
// =======================================

function hierarchicalCluster(
    matrix,
    distanceMethod,
    linkageMethod
) {

    if (!matrix || matrix.length === 0) {
        return {
            order: [],
            merges: [],
            height: 0
        };
    }

    if (matrix.length === 1) {
        return {
            order: [0],
            merges: [],
            height: 0
        };
    }


    let clusters = matrix.map(
        (_, index) => ({
            indices: [index],
            id: index
        })
    );


    const merges = [];

    let nextClusterId =
        matrix.length;


    function clusterDistance(
        clusterA,
        clusterB
    ) {

        const distances = [];


        for (
            const i of clusterA.indices
        ) {

            for (
                const j of clusterB.indices
            ) {

                distances.push(
                    calculateDistance(
                        matrix[i],
                        matrix[j],
                        distanceMethod
                    )
                );

            }
        }


        if (
            linkageMethod === "single"
        ) {

            return Math.min(
                ...distances
            );

        }


        if (
            linkageMethod === "complete"
        ) {

            return Math.max(
                ...distances
            );

        }


        // Average linkage
        return (
            distances.reduce(
                (sum, value) =>
                    sum + value,
                0
            ) / distances.length
        );
    }


    while (
        clusters.length > 1
    ) {

        let bestA = 0;
        let bestB = 1;

        let bestDistance =
            Infinity;


        for (
            let i = 0;
            i < clusters.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < clusters.length;
                j++
            ) {

                const distance =
                    clusterDistance(
                        clusters[i],
                        clusters[j]
                    );


                if (
                    distance <
                    bestDistance
                ) {

                    bestDistance =
                        distance;

                    bestA = i;
                    bestB = j;

                }

            }

        }


        const clusterA =
            clusters[bestA];

        const clusterB =
            clusters[bestB];


        const merged = {

            indices: [
                ...clusterA.indices,
                ...clusterB.indices
            ],

            id: nextClusterId++

        };


        merges.push({

            left:
                clusterA.id,

            right:
                clusterB.id,

            distance:
                bestDistance,

            size:
                merged.indices.length

        });


        clusters.splice(
            bestB,
            1
        );

        clusters.splice(
            bestA,
            1
        );


        clusters.push(
            merged
        );
    }


    const finalCluster =
        clusters[0];


    return {

        order:
            finalCluster.indices,

        merges:

            merges,

        height:

            merges.length
                ? Math.max(
                    ...merges.map(
                        m =>
                            m.distance
                    )
                )
                : 0

    };
}
// =======================================
// CLUSTER ROWS
// =======================================

function clusterRows(
    data,
    distanceMethod = "euclidean",
    linkageMethod = "average"
) {

    const header = data[0];
    const rows = data.slice(1);

    const matrix = rows.map(row =>
        row
            .slice(1)
            .map(value => {

                const number =
                    parseFloat(
                        String(value).trim()
                    );

                return Number.isFinite(number)
                    ? number
                    : 0;
            })
    );

    const result =
        hierarchicalCluster(
            matrix,
            distanceMethod,
            linkageMethod
        );

    const reorderedRows =
        result.order.map(
            index => rows[index]
        );

    return {
        data: [
            header,
            ...reorderedRows
        ],

        dendrogram: result
    };
}

// =======================================
// CLUSTER COLUMNS
// =======================================

function clusterColumns(
    data,
    distanceMethod = "euclidean",
    linkageMethod = "average"
) {

    const header = data[0];
    const rows = data.slice(1);

    const columnCount =
        header.length - 1;

    const matrix = [];

    // Convert columns into vectors
    for (
        let column = 0;
        column < columnCount;
        column++
    ) {

        const vector = [];

        for (
            let row = 0;
            row < rows.length;
            row++
        ) {

            const number =
                parseFloat(
                    String(
                        rows[row][column + 1]
                    ).trim()
                );

            vector.push(
                Number.isFinite(number)
                    ? number
                    : 0
            );
        }

        matrix.push(vector);
    }

    const result =
        hierarchicalCluster(
            matrix,
            distanceMethod,
            linkageMethod
        );

    const order = result.order;

    const newHeader = [
        header[0],

        ...order.map(
            index => header[index + 1]
        )
    ];

    const newRows =
        rows.map(row => [

            row[0],

            ...order.map(
                index => row[index + 1]
            )

        ]);

    return {

        data: [
            newHeader,
            ...newRows
        ],

        dendrogram: result
    };
}

// =======================================
// UPDATE HEATMAP
// =======================================

function updateHeatmap() {

    if (!originalData) {
        return;
    }

    // -------------------------------
    // APPLY SCALING
    // -------------------------------

    let processedData =
        applyScaling(
            originalData,
            currentScale
        );

        console.log(
    "Scaling:",
    currentScale
);

console.log(
    "Processed data:",
    processedData
);

console.log(
    "First numeric row:",
    processedData[1]
);


    // -------------------------------
    // GET OPTIONS
    // -------------------------------

    const clusterOption =
        document.getElementById("clusterOption");

    const distanceOption =
        document.getElementById("distanceOption");

    const linkageOption =
        document.getElementById("linkageOption");


    const cluster =
        clusterOption
            ? clusterOption.value
            : "none";

    const distance =
        distanceOption
            ? distanceOption.value
            : "euclidean";

    const linkage =
        linkageOption
            ? linkageOption.value
            : "average";


    let rowDendrogram = null;
    let columnDendrogram = null;


    // -------------------------------
// ROW CLUSTERING
// -------------------------------

if (
    cluster === "row" ||
    cluster === "both"
) {

    const result =
        clusterRows(
            processedData,
            distance,
            linkage
        );

    processedData =
        result.data;

    rowDendrogram =
        result.dendrogram;
}


// -------------------------------
// COLUMN CLUSTERING
// -------------------------------

if (
    cluster === "column" ||
    cluster === "both"
) {

    const result =
        clusterColumns(
            processedData,
            distance,
            linkage
        );

    processedData =
        result.data;

    columnDendrogram =
        result.dendrogram;
}





    // -------------------------------
    // DRAW
    // -------------------------------

    drawHeatmap(
        processedData,
        currentPalette,
        rowDendrogram,
        columnDendrogram
    );

}

   // =======================================
// DRAW HEATMAP + DENDROGRAMS
// =======================================

function drawHeatmap(
    data,
    palette,
    rowDendrogram = null,
    columnDendrogram = null
) {

    if (!data || data.length < 2) {
        console.log("No data");
        return;
    }


    const headers =
        data[0].slice(1);

    const genes = [];

    const values = [];


    for (
        let i = 1;
        i < data.length;
        i++
    ) {

        genes.push(data[i][0]);

        const rowValues =
            data[i]
                .slice(1)
                .map(value => {

                    const number =
                        parseFloat(
                            String(value).trim()
                        );

                    return Number.isFinite(number)
                        ? number
                        : 0;

                });

        values.push(rowValues);
    }


    const element =
        document.getElementById(
            "heatmapPlot"
        );


    if (!element) {
        console.error(
            "heatmapPlot NOT FOUND"
        );
        return;
    }


    // ===================================
    // HEATMAP
    // ===================================

    
    // =======================================
// COLOR SCALE RANGE
// =======================================

let maxAbsValue = 0;

values.forEach(row => {

    row.forEach(value => {

        const absValue = Math.abs(value);

        if (absValue > maxAbsValue) {
            maxAbsValue = absValue;
        }

    });

});

if (maxAbsValue === 0) {
    maxAbsValue = 1;
}
    

// ===================================
// HEATMAP TYPE
// ===================================

let heatmapTrace;

// -----------------------------------
// STANDARD HEATMAP
// -----------------------------------

if (currentHeatmapType === "standard") {

    heatmapTrace = {
        z: values,
        x: headers,
        y: genes,
        type: "heatmap",

        colorscale: colorPalettes[palette] || colorPalettes.RdBu,
        reversescale: true,

        zmid: 0,
        zmin: -maxAbsValue,
        zmax: maxAbsValue,

        xaxis: "x2",
        yaxis: "y2",

        hoverongaps: false,
        coloraxis: "coloraxis"
    };

}


// -----------------------------------
// CIRCLE HEATMAP
// -----------------------------------

else if (currentHeatmapType === "circle") {

    const circleX = [];
    const circleY = [];
    const circleZ = [];

    for (let i = 0; i < values.length; i++) {

        for (let j = 0; j < values[i].length; j++) {

            circleX.push(headers[j]);
            circleY.push(genes[i]);
            circleZ.push(values[i][j]);

        }

    }

    heatmapTrace = {

        x: circleX,
        y: circleY,
        z: circleZ,

        type: "scatter",
        mode: "markers",

        marker: {

            symbol: "circle",

            size: 18,

            color: circleZ,

            colorscale: colorPalettes[palette] || colorPalettes.RdBu,

            reversescale: true,

            cmin: -maxAbsValue,
            cmax: maxAbsValue,
            cmid: 0,

            coloraxis: "coloraxis",

            line: {
                width: 0
            }

        },

        xaxis: "x2",
        yaxis: "y2",

        hovertemplate:
            "%{y}<br>" +
            "%{x}<br>" +
            "Value: %{z}<extra></extra>"

    };

}


// -----------------------------------
// BUBBLE HEATMAP
// -----------------------------------

else if (currentHeatmapType === "bubble") {

    const bubbleX = [];
    const bubbleY = [];
    const bubbleZ = [];

    for (let i = 0; i < values.length; i++) {

        for (let j = 0; j < values[i].length; j++) {

            bubbleX.push(headers[j]);
            bubbleY.push(genes[i]);
            bubbleZ.push(values[i][j]);

        }

    }

    const maxBubbleSize = 28;

    const bubbleSizes = bubbleZ.map(value => {

        return Math.max(
            4,
            (Math.abs(value) / maxAbsValue) *
            maxBubbleSize
        );

    });

    heatmapTrace = {

        x: bubbleX,
        y: bubbleY,
        z: bubbleZ,

        type: "scatter",
        mode: "markers",

        marker: {

            symbol: "circle",

            size: bubbleSizes,

            color: bubbleZ,

            colorscale: colorPalettes[palette] || colorPalettes.RdBu,

            reversescale: true,

            cmin: -maxAbsValue,
            cmax: maxAbsValue,
            cmid: 0,

            coloraxis: "coloraxis",

            line: {
                width: 0
            }

        },

        xaxis: "x2",
        yaxis: "y2",

        hovertemplate:
            "%{y}<br>" +
            "%{x}<br>" +
            "Value: %{z}<extra></extra>"

    };

}


// -----------------------------------
// TRIANGULAR HEATMAP
// -----------------------------------

else if (currentHeatmapType === "triangular") {

    const triangularZ = values.map(
        (row, i) =>
            row.map(
                (value, j) => {

                    if (j > i) {
                        return null;
                    }

                    return value;
                }
            )
    );

    heatmapTrace = {

        z: triangularZ,

        x: headers,
        y: genes,

        type: "heatmap",

        colorscale: colorPalettes[palette] || colorPalettes.RdBu,

        reversescale: true,

        zmid: 0,

        zmin: -maxAbsValue,
        zmax: maxAbsValue,

        xaxis: "x2",
        yaxis: "y2",

        hoverongaps: false,

        coloraxis: "coloraxis"
    };
}


// =======================================
// DENDROGRAM TRACES
// =======================================

const traces = [
    heatmapTrace
];

if (rowDendrogram) {

    traces.push(
        ...createRowDendrogram(
            rowDendrogram,
            genes
        )
    );
}

if (columnDendrogram) {

    traces.push(
        ...createColumnDendrogram(
            columnDendrogram,
            headers
        )
    );
}



    // =======================================
// CREATE ROW DENDROGRAM
// =======================================

function createRowDendrogram(
    dendrogram,
    genes
) {

    const traces = [];

    if (
        !dendrogram ||
        !dendrogram.merges ||
        dendrogram.merges.length === 0
    ) {
        return traces;
    }

    // Position of every cluster
    const centers = {};

    // Leaf positions
    dendrogram.order.forEach(
        (originalIndex, position) => {

            centers[originalIndex] = position;

        }
    );

    let nextID = genes.length;

    dendrogram.merges.forEach(
        merge => {

            const left =
                centers[merge.left];

            const right =
                centers[merge.right];

            if (
                left === undefined ||
                right === undefined
            ) {
                return;
            }

            const center =
                (left + right) / 2;

            // Horizontal dendrogram
            traces.push({

                x: [
    0,
    merge.distance,
    merge.distance,
    0
],

                y: [
                    left,
                    left,
                    right,
                    right
                ],

                type: "scatter",

                mode: "lines",

                // IMPORTANT
                xaxis: "x3",
                yaxis: "y3",

                line: {
                    width: 2
                },

                hoverinfo: "none",

                showlegend: false

            });

            centers[nextID] = center;

            nextID++;

        }
    );

    return traces;
}

    // =======================================
// CREATE COLUMN DENDROGRAM
// =======================================

function createColumnDendrogram(
    dendrogram,
    headers
) {

    const traces = [];

    if (
        !dendrogram ||
        !dendrogram.merges ||
        dendrogram.merges.length === 0
    ) {
        return traces;
    }

    // Position of every cluster
    const centers = {};

    // Leaf positions
    dendrogram.order.forEach(
        (originalIndex, position) => {

            centers[originalIndex] = position;

        }
    );

    let nextID = headers.length;

    dendrogram.merges.forEach(
        merge => {

            const left =
                centers[merge.left];

            const right =
                centers[merge.right];

            if (
                left === undefined ||
                right === undefined
            ) {
                return;
            }

            const center =
                (left + right) / 2;

            // Vertical dendrogram
            traces.push({

                x: [
                    left,
                    left,
                    right,
                    right
                ],

                y: [
                    0,
                    merge.distance,
                    merge.distance,
                    0
                ],

                type: "scatter",

                mode: "lines",

                // IMPORTANT
                xaxis: "x",
                yaxis: "y",

                line: {
                    width: 2
                },

                hoverinfo: "none",

                showlegend: false

            });

            centers[nextID] = center;

            nextID++;

        }
    );

    return traces;
}


    // ===================================
    // DOMAINS
    // ===================================

    const hasRow =
        rowDendrogram &&
        rowDendrogram.merges &&
        rowDendrogram.merges.length > 0;

    const hasColumn =
        columnDendrogram &&
        columnDendrogram.merges &&
        columnDendrogram.merges.length > 0;


   // ===================================
// DOMAINS
// ===================================

// Space reserved for row dendrogram
// Increased so dendrogram never touches gene names
const leftDomain =
    hasRow
        ? 0.28
        : 0;

// Space reserved for top dendrogram
// Smaller value = shorter dendrogram area
const topDomain =
    hasColumn
        ? 0.86
        : 1;


    // ===================================
    // LAYOUT
    // ===================================


    // =======================================
// SAVED HEATMAP SIZE
// =======================================

// =======================================
// SAVED HEATMAP SIZE
// =======================================

const savedWidth =
    parseInt(
        localStorage.getItem("heatmapWidth"),
        10
    ) || 900;

const savedHeight =
    parseInt(
        localStorage.getItem("heatmapHeight"),
        10
    ) || 650;


const layout = {


    margin: {
    l: hasRow ? 45 : 180,
    r: 20,
    t: hasColumn ? 55 : 40,
    b: 10
},

        // -------------------------------
        // COLUMN DENDROGRAM AXIS
        // -------------------------------

        xaxis: {

            domain: [
                leftDomain,
                1
            ],

            range: [
                -0.5,
                headers.length - 0.5
            ],

            showticklabels: false,

            showgrid: false,

            zeroline: false,

            fixedrange: true

        },


        // -------------------------------
        // COLUMN DENDROGRAM HEIGHT
        // -------------------------------

        yaxis: {

    domain: [
        topDomain,
        1
    ],

    showticklabels: false,

    showgrid: false,

    zeroline: false,

    fixedrange: true

},


        // -------------------------------
        // HEATMAP X
        // -------------------------------

        xaxis2: {

    domain: [
        leftDomain,
        1
    ],

    anchor: "y2",

    type: "category",

    tickmode: "array",

    tickvals: headers,

    ticktext: headers,

    side: "bottom",

    ticklabelstandoff: -5,

    showticklabels: true,

  tickfont: {
    size: FontSize,
    family: "Arial"
}, 

    tickangle: groupLabelRotation,

    showgrid: false,

    zeroline: false,

    fixedrange: false,

    automargin: true,

ticklabelposition: "outside",

ticklen: 0

},


        // -------------------------------
        // HEATMAP Y
        // -------------------------------

        yaxis2: {

    domain: [
        0,
        topDomain
    ],

    anchor: "x2",

    type: "category",

    tickmode: "array",

    tickvals: genes,

    ticktext: genes,

    autorange: "reversed",

    showticklabels: true,

    tickfont: {
        size: Number(FontSize) || 12,
        family: "Arial"
    },

    showgrid: false,

    zeroline: false,

    fixedrange: true,

    automargin: true
},


        // -------------------------------
        // ROW DENDROGRAM X
        // -------------------------------

        xaxis3: {

    domain: [
        0,
        leftDomain
    ],

    range: [
        rowDendrogram
            ? Math.max(
                rowDendrogram.height * 1.05,
                1
            )
            : 1,
        0
    ],

    showticklabels: false,

    showgrid: false,

    zeroline: false,

    fixedrange: true

},

        // -------------------------------
        // ROW DENDROGRAM Y
        // -------------------------------

        yaxis3: {

            domain: [
                0,
                topDomain
            ],

            range: [
                genes.length - 0.5,
                -0.5
            ],

            showticklabels: false,

            showgrid: false,

            zeroline: false,

            fixedrange: true

        },


        paper_bgcolor: "white",

plot_bgcolor: "white",

// ===================================
// HORIZONTAL COLOR SCALE
// ===================================

coloraxis: {

    colorscale: colorPalettes[palette] || colorPalettes.RdBu,

    reversescale: true,

    cmin: -maxAbsValue,
cmax: maxAbsValue,
cmid: 0,

    colorbar: {

        orientation: "h",

        // Center over heatmap area
        x: (leftDomain + 1) / 2,

        xanchor: "center",

        // Automatically above the heatmap
        y: hasColumn ? 1.0 : 1.03,

        yanchor: "bottom",

        // Same width as heatmap
        len: 1 - leftDomain,

        thickness: 15,

        outlinewidth: 0,

        tickfont: {
            size: 11,
            family: "Arial"
        },

        ticks: "outside"

    }

}

};


    // ===================================
    // DRAW
    // ===================================

    Plotly.newPlot(
    element,
    traces,
    layout,
    {
        responsive: false,
        displaylogo: false,
        scrollZoom: true,
    
    })

}

/* =======================================
   COLOR PALETTE
======================================= */

const colorPalette =
    document.getElementById(
        "colorPalette"
    );


if (colorPalette) {

    colorPalette.addEventListener(
        "change",
        function () {

            currentPalette =
                this.value;

            updateHeatmap();

        }
    );

}


/* =======================================
   SCALING
======================================= */

const scalingOption =
    document.getElementById(
        "scalingOption"
    );

    if (scalingOption) {
    scalingOption.value = "row";
    currentScale = "row";


    scalingOption.addEventListener(
        "change",
        function () {

            currentScale =
                this.value;

            console.log(
                "Scaling:",
                currentScale
            );

            updateHeatmap();

        }
    );

}


/* =======================================
   CLUSTERING
======================================= */

const clusterOption =
    document.getElementById(
        "clusterOption"
    );


if (clusterOption) {

    clusterOption.addEventListener(
        "change",
        function () {

            currentCluster =
                this.value;

            console.log(
                "Cluster:",
                currentCluster
            );

            updateHeatmap();

        }
    );

}

const backButton = document.getElementById("backButton");

if (backButton) {

    backButton.addEventListener("click", function () {

        localStorage.removeItem("heatmapFileName");
        localStorage.removeItem("heatmapData");

        history.back();

    });

}

// =======================================
// DISTANCE METHOD
// =======================================

const distanceOption =
    document.getElementById(
        "distanceOption"
    );

if (distanceOption) {

    distanceOption.addEventListener(
        "change",
        function () {

            console.log(
                "Distance:",
                this.value
            );

            updateHeatmap();

        }
    );
}


// =======================================
// LINKAGE METHOD
// =======================================

const linkageOption =
    document.getElementById(
        "linkageOption"
    );

if (linkageOption) {

    linkageOption.addEventListener(
        "change",
        function () {

            console.log(
                "Linkage:",
                this.value
            );

            updateHeatmap();

        }
    );
}

// =======================================
// GROUP LABEL ROTATION
// =======================================

// =======================================
// GROUP LABEL ROTATION
// =======================================

const groupLabelRotationInput =
    document.getElementById("groupLabelRotation");

if (groupLabelRotationInput) {

    groupLabelRotationInput.addEventListener(
        "change",
        function () {

            groupLabelRotation =
                parseInt(this.value, 10) || 0;

            updateHeatmap();

        }
    );

}

// =======================================
// HEATMAP TYPE SELECTION
// =======================================

// =======================================
// HEATMAP TYPE SELECTION
// =======================================

const heatmapTypeSelect =
    document.getElementById("heatmapType");

if (heatmapTypeSelect) {

    heatmapTypeSelect.value =
        currentHeatmapType;

    heatmapTypeSelect.addEventListener(
        "change",
        function () {

            currentHeatmapType =
                this.value;

            console.log(
                "Heatmap type:",
                currentHeatmapType
            );

            updateHeatmap();
        }
    );
}

// =======================================
// Heatmap Download
// =======================================

function downloadHeatmap(format) {

    const plot = document.getElementById("heatmapPlot");

    if (!plot || !plot.data) {
        alert("Heatmap is not available.");
        return;
    }

    // =======================================
    // HIGH-RESOLUTION EXPORT SIZE
    // =======================================

    const exportWidth = 4000;
    const exportHeight = 3000;

    console.log(
        "Download:",
        format,
        exportWidth,
        exportHeight
    );


    // =======================================
    // PNG
    // =======================================

    if (format === "png") {

        Plotly.downloadImage(plot, {

            format: "png",

            filename: "OmicsStudio_Heatmap",

            width: exportWidth,

            height: exportHeight,

            scale: 3

        });

        return;
    }


    // =======================================
    // SVG
    // =======================================

    if (format === "svg") {

        Plotly.downloadImage(plot, {

            format: "svg",

            filename: "OmicsStudio_Heatmap",

            width: exportWidth,

            height: exportHeight

        });

        return;
    }


    // =======================================
    // PDF
    // =======================================

    if (format === "pdf") {

        Plotly.toImage(plot, {

            format: "png",

            width: exportWidth,

            height: exportHeight,

            scale: 3

        }).then(function(imageData) {

            const jsPDF =
                window.jspdf.jsPDF;

            const pdf =
                new jsPDF({

                    orientation:
                        exportWidth > exportHeight
                            ? "landscape"
                            : "portrait",

                    unit: "px",

                    format: [
                        exportWidth,
                        exportHeight
                    ]

                });

            pdf.addImage(
                imageData,
                "PNG",
                0,
                0,
                exportWidth,
                exportHeight
            );

            pdf.save(
                "OmicsStudio_Heatmap.pdf"
            );

        });

        return;
    }

}





// =======================================
// APPLY HEATMAP SIZE
// =======================================

function applyHeatmapSize() {

    const plot =
        document.getElementById("heatmapPlot");

    const widthInput =
        document.getElementById("heatmapWidth");

    const heightInput =
        document.getElementById("heatmapHeight");

    if (!plot || !widthInput || !heightInput) {

        console.error(
            "Heatmap size controls not found"
        );

        return;
    }

    const width =
        parseInt(
            widthInput.value,
            10
        );

    const height =
        parseInt(
            heightInput.value,
            10
        );

    if (
        !Number.isFinite(width) ||
        !Number.isFinite(height) ||
        width < 300 ||
        height < 300
    ) {

        alert(
            "Width and height must be at least 300 px."
        );

        return;
    }


    // ===================================
    // SAVE BASE SIZE
    // ===================================

    localStorage.setItem(
        "heatmapWidth",
        width
    );

    localStorage.setItem(
        "heatmapHeight",
        height
    );

    localStorage.setItem(
        "heatmapBaseWidth",
        width
    );

    localStorage.setItem(
        "heatmapBaseHeight",
        height
    );


    // Reset zoom
    heatmapZoom = 1;


    // ===================================
    // APPLY SIZE
    // ===================================

    plot.style.width =
        width + "px";

    plot.style.height =
        height + "px";


    if (plot.data) {

        Plotly.relayout(
            plot,
            {
                width: width,
                height: height
            }
        );

    }


    console.log(
        "HEATMAP SIZE:",
        width,
        "x",
        height
    );
}

// =======================================
// HEATMAP ZOOM CONTROLS
// =======================================

function zoomIn() {

    heatmapZoom += 0.2;

    if (heatmapZoom > 3) {
        heatmapZoom = 3;
    }

    applyHeatmapZoom();
}


function zoomOut() {

    heatmapZoom -= 0.2;

    if (heatmapZoom < 0.4) {
        heatmapZoom = 0.4;
    }

    applyHeatmapZoom();
}


function resetZoom() {

    heatmapZoom = 1;

    applyHeatmapZoom();
}


// =======================================
// APPLY HEATMAP ZOOM
// =======================================

function applyHeatmapZoom() {

    const plot =
        document.getElementById("heatmapPlot");

    if (!plot || !plot.data) {

        console.log("Heatmap plot not ready");

        return;
    }


    const baseWidth =
        parseInt(
            localStorage.getItem("heatmapBaseWidth"),
            10
        ) || 900;


    const baseHeight =
        parseInt(
            localStorage.getItem("heatmapBaseHeight"),
            10
        ) || 650;


    const newWidth =
        Math.round(
            baseWidth * heatmapZoom
        );


    const newHeight =
        Math.round(
            baseHeight * heatmapZoom
        );


    console.log(
        "ZOOM:",
        heatmapZoom,
        "SIZE:",
        newWidth,
        "x",
        newHeight
    );


    plot.style.width =
        newWidth + "px";

    plot.style.height =
        newHeight + "px";


    Plotly.relayout(
        plot,
        {
            width: newWidth,
            height: newHeight
        }
    );

}

// =======================================
// LOAD SAVED HEATMAP SIZE
// =======================================

function loadHeatmapSize() {

    const widthInput =
        document.getElementById("heatmapWidth");

    const heightInput =
        document.getElementById("heatmapHeight");

    const savedWidth =
        parseInt(
            localStorage.getItem("heatmapWidth"),
            10
        );

    const savedHeight =
        parseInt(
            localStorage.getItem("heatmapHeight"),
            10
        );

    const width =
        Number.isFinite(savedWidth)
            ? savedWidth
            : 900;

    const height =
        Number.isFinite(savedHeight)
            ? savedHeight
            : 650;

    if (widthInput) {
        widthInput.value = width;
    }

    if (heightInput) {
        heightInput.value = height;
    }

    localStorage.setItem(
        "heatmapWidth",
        width
    );

    localStorage.setItem(
        "heatmapHeight",
        height
    );

    localStorage.setItem(
        "heatmapBaseWidth",
        width
    );

    localStorage.setItem(
        "heatmapBaseHeight",
        height
    );

    console.log(
        "Loaded heatmap size:",
        width,
        "x",
        height
    );
}

function applyGeneFontSize() {

    const input =
        document.getElementById("FontSize");

    if (!input) {
        console.error("FontSize input not found");
        return;
    }

    const size =
        parseInt(input.value, 10);

    if (
        !Number.isFinite(size) ||
        size < 6 ||
        size > 50
    ) {
        alert("Gene font size must be between 6 and 50.");
        return;
    }

    FontSize = size;

    localStorage.setItem(
        "FontSize",
        String(FontSize)
    );

    const plot =
        document.getElementById("heatmapPlot");

    if (!plot || !plot.data) {
        console.log(
            "Font size saved. Heatmap will use it when drawn."
        );
        return;
    }

    Plotly.relayout(
        plot,
        {
            "yaxis2.tickfont": {
                size: FontSize,
                family: "Arial"
            }
        }
    ).then(function () {

        console.log(
            "Gene font size applied:",
            FontSize
        );

    });

}


// =======================================
// LOAD FONT
// =======================================

function loadGeneFontSize() {

    const input =
        document.getElementById("FontSize");

    if (!input) {
        return;
    }

    const saved =
        parseInt(
            localStorage.getItem("FontSize"),
            10
        );

    if (
        Number.isFinite(saved) &&
        saved >= 6 &&
        saved <= 50
    ) {

        FontSize = saved;

    }

    input.value = FontSize;
}


// =======================================
// SIZE BUTTON
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    const widthInput =
        document.getElementById("heatmapWidth");

    const heightInput =
        document.getElementById("heatmapHeight");

    const fontInput =
        document.getElementById("FontSize");


    // Load saved values
    loadHeatmapSize();

    loadGeneFontSize();


    // ===================================
    // WIDTH INPUT
    // ===================================

    if (widthInput) {

        widthInput.addEventListener(
            "change",
            applyHeatmapSize
        );

        widthInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    applyHeatmapSize();

                }

            }
        );

    }


    // ===================================
    // HEIGHT INPUT
    // ===================================

    if (heightInput) {

        heightInput.addEventListener(
            "change",
            applyHeatmapSize
        );

        heightInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    applyHeatmapSize();

                }

            }
        );

    }


    // ===================================
    // FONT SIZE
    // ===================================

    if (fontInput) {

        fontInput.addEventListener(
            "change",
            applyGeneFontSize
        );

        fontInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    applyGeneFontSize();

                }

            }
        );

    }

});

// =======================================
// MAKE HTML FUNCTIONS GLOBAL
// =======================================

window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.resetZoom = resetZoom;

window.applyHeatmapSize = applyHeatmapSize;
window.resizeHeatmap = applyHeatmapSize;

window.applyGeneFontSize = applyGeneFontSize;

window.loadHeatmapSize = loadHeatmapSize;
window.loadGeneFontSize = loadGeneFontSize;

window.downloadHeatmap = downloadHeatmap;

console.log(
    "Heatmap functions registered globally."
);

// =======================================
// APPLY HEATMAP SIZE
// =======================================

function applyHeatmapSize() {

    const plot =
        document.getElementById("heatmapPlot");

    const widthInput =
        document.getElementById("heatmapWidth");

    const heightInput =
        document.getElementById("heatmapHeight");


    if (!widthInput || !heightInput) {
        console.error("Heatmap size inputs not found.");
        return;
    }


    const width =
        parseInt(widthInput.value, 10);

    const height =
        parseInt(heightInput.value, 10);


    if (
        !Number.isFinite(width) ||
        !Number.isFinite(height) ||
        width < 300 ||
        height < 300
    ) {

        alert(
            "Width and height must be at least 300 px."
        );

        return;
    }


    localStorage.setItem(
        "heatmapWidth",
        width
    );

    localStorage.setItem(
        "heatmapHeight",
        height
    );

    localStorage.setItem(
        "heatmapBaseWidth",
        width
    );

    localStorage.setItem(
        "heatmapBaseHeight",
        height
    );


    heatmapZoom = 1;


    if (plot) {

        plot.style.width =
            width + "px";

        plot.style.height =
            height + "px";


        if (plot.data) {

            Plotly.relayout(
                plot,
                {
                    width: width,
                    height: height
                }
            );

        }

    }


    console.log(
        "Heatmap size:",
        width,
        "x",
        height
    );
}
// =======================================
// ZOOM IN
// =======================================

function zoomIn() {

    heatmapZoom += 0.2;

    if (heatmapZoom > 3) {
        heatmapZoom = 3;
    }

    applyHeatmapZoom();
}


// =======================================
// ZOOM OUT
// =======================================

function zoomOut() {

    heatmapZoom -= 0.2;

    if (heatmapZoom < 0.4) {
        heatmapZoom = 0.4;
    }

    applyHeatmapZoom();
}


// =======================================
// RESET ZOOM
// =======================================

function resetZoom() {

    heatmapZoom = 1;

    applyHeatmapZoom();
}


// =======================================
// APPLY ZOOM
// =======================================

function applyHeatmapZoom() {

    const plot =
        document.getElementById("heatmapPlot");

    if (!plot || !plot.data) {

        console.log(
            "Heatmap plot not ready."
        );

        return;
    }


    const baseWidth =
        parseInt(
            localStorage.getItem(
                "heatmapBaseWidth"
            ),
            10
        ) || 900;


    const baseHeight =
        parseInt(
            localStorage.getItem(
                "heatmapBaseHeight"
            ),
            10
        ) || 650;


    const newWidth =
        Math.round(
            baseWidth * heatmapZoom
        );


    const newHeight =
        Math.round(
            baseHeight * heatmapZoom
        );


    plot.style.width =
        newWidth + "px";

    plot.style.height =
        newHeight + "px";


    Plotly.relayout(
        plot,
        {
            width: newWidth,
            height: newHeight
        }
    );


    console.log(
        "Zoom:",
        heatmapZoom
    );
}
// =======================================
// LOAD SAVED HEATMAP SIZE
// =======================================

function loadHeatmapSize() {

    const widthInput =
        document.getElementById(
            "heatmapWidth"
        );

    const heightInput =
        document.getElementById(
            "heatmapHeight"
        );


    const savedWidth =
        parseInt(
            localStorage.getItem(
                "heatmapWidth"
            ),
            10
        );


    const savedHeight =
        parseInt(
            localStorage.getItem(
                "heatmapHeight"
            ),
            10
        );


    const width =
        Number.isFinite(savedWidth)
            ? savedWidth
            : 900;


    const height =
        Number.isFinite(savedHeight)
            ? savedHeight
            : 650;


    if (widthInput) {
        widthInput.value = width;
    }


    if (heightInput) {
        heightInput.value = height;
    }


    localStorage.setItem(
        "heatmapWidth",
        width
    );

    localStorage.setItem(
        "heatmapHeight",
        height
    );

    localStorage.setItem(
        "heatmapBaseWidth",
        width
    );

    localStorage.setItem(
        "heatmapBaseHeight",
        height
    );


    console.log(
        "Loaded heatmap size:",
        width,
        "x",
        height
    );
}
// =======================================
// APPLY GENE FONT SIZE
// =======================================

function applyGeneFontSize() {

    const input =
        document.getElementById("FontSize");

    const plot =
        document.getElementById("heatmapPlot");

    if (!input || !plot) {
        return;
    }

    const size =
        parseInt(input.value, 10);

    if (
        !Number.isFinite(size) ||
        size < 6 ||
        size > 50
    ) {
        alert(
            "Font size must be between 6 and 50."
        );
        return;
    }

    FontSize = size;

    localStorage.setItem(
        "FontSize",
        FontSize
    );

    if (plot.data) {

        Plotly.relayout(
            plot,
            {
                // Gene names
                "yaxis2.tickfont.size":
                    FontSize,

                "yaxis2.tickfont.family":
                    "Arial",

                // Group/sample names
                "xaxis2.tickfont.size":
                    FontSize,

                "xaxis2.tickfont.family":
                    "Arial"
            }
        );

    }

    console.log(
        "Font size:",
        FontSize
    );
}


// =======================================
// LOAD GENE FONT SIZE
// =======================================

function loadGeneFontSize() {

    const input =
        document.getElementById("FontSize");


    if (!input) {
        return;
    }


    const saved =
        parseInt(
            localStorage.getItem(
                "FontSize"
            ),
            10
        );


    if (
        Number.isFinite(saved) &&
        saved >= 6 &&
        saved <= 50
    ) {

        FontSize = saved;

    }


    input.value = FontSize;
}

// =======================================
// REGISTER HTML FUNCTIONS
// =======================================

window.zoomIn =
    zoomIn;

window.zoomOut =
    zoomOut;

window.resetZoom =
    resetZoom;

window.applyHeatmapSize =
    applyHeatmapSize;

window.resizeHeatmap =
    applyHeatmapSize;

window.applyGeneFontSize =
    applyGeneFontSize;

window.loadHeatmapSize =
    loadHeatmapSize;

window.loadGeneFontSize =
    loadGeneFontSize;


console.log(
    "Heatmap functions registered globally."
)

document.addEventListener("DOMContentLoaded", function () {

    const fontInput =
        document.getElementById("FontSize");

    if (!fontInput) {
        console.error("FontSize input not found");
        return;
    }

    loadGeneFontSize();

    fontInput.addEventListener(
        "change",
        function () {
            applyGeneFontSize();
        }
    );

    fontInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                applyGeneFontSize();

            }

        }
    );

})