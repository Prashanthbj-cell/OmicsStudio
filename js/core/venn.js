// =======================================
// OMICSSTUDIO
// VENN GRAPH BUILDER
// =======================================


// =======================================
// GLOBAL ELEMENTS
// =======================================

const setCount = document.getElementById("setCount");
const generateBtn = document.getElementById("generateBtn");
const setsContainer = document.getElementById("setsContainer");


// =======================================
// DEFAULT COLORS
// =======================================

const defaultColors = [
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#a855f7",
    "#ec4899"
];


// =======================================
// GET DEFAULT COLOR
// =======================================

function getDefaultColor(index) {

    return defaultColors[
        (index - 1) % defaultColors.length
    ];

}


// =======================================
// CREATE COMPARISON BOXES
// =======================================

function createSetBoxes() {

    if (!setCount || !setsContainer) {

        console.error(
            "Venn controls not found."
        );

        return;
    }


    const count =
        Number(setCount.value);


    // Clear old boxes

    setsContainer.innerHTML = "";


    // Create boxes

    for (let i = 1; i <= count; i++) {

        createSingleSetBox(i);

    }

}


// =======================================
// CREATE ONE SET BOX
// =======================================

function createSingleSetBox(index) {

    const box =
        document.createElement("div");


    box.className =
        "set-box";


    const defaultColor =
        getDefaultColor(index);


    box.innerHTML = `

        <div class="set-header">

            <span class="set-title">
                Comparison ${index}
            </span>

            <button
                type="button"
                class="clear-btn">

                Clear

            </button>

        </div>


        <!-- =========================
             SECTION LABEL
        ========================== -->

        <label>
            Section label
        </label>

        <input
            type="text"
            class="set-label"
            value="Set ${index}"
            placeholder="Enter label"
        >


        <!-- =========================
             CIRCLE COLOR
        ========================== -->

        <label>
            Circle color
        </label>

        <div class="color-row">

            <input
                type="color"
                class="set-color"
                value="${defaultColor}"
            >

            <span class="color-value">
                ${defaultColor}
            </span>

        </div>


        <!-- =========================
             LABEL FONT SIZE
        ========================== -->

        <label>

            Label font size:

            <span class="label-font-value">
                16 px
            </span>

        </label>

        <input
            type="range"
            class="label-font-size"
            min="10"
            max="40"
            value="16"
        >


        <!-- =========================
             NUMBER FONT SIZE
        ========================== -->

        <label>

            Number font size:

            <span class="number-font-value">
                18 px
            </span>

        </label>

        <input
            type="range"
            class="number-font-size"
            min="10"
            max="40"
            value="18"
        >


        <!-- =========================
             DATASET
        ========================== -->

        <label>
            Dataset
        </label>

        <textarea
            class="set-data"
            placeholder="Paste your list here...

Example:
TP53
BRCA1
EGFR
MYC
PTEN"
        ></textarea>

    `;


    // ===================================
    // ELEMENT REFERENCES
    // ===================================

    const clearButton =
        box.querySelector(".clear-btn");

    const textarea =
        box.querySelector(".set-data");

    const colorInput =
        box.querySelector(".set-color");

    const colorValue =
        box.querySelector(".color-value");

    const labelSlider =
        box.querySelector(".label-font-size");

    const labelValue =
        box.querySelector(".label-font-value");

    const numberSlider =
        box.querySelector(".number-font-size");

    const numberValue =
        box.querySelector(".number-font-value");


    // ===================================
    // CLEAR DATA
    // ===================================

    clearButton.addEventListener(
        "click",
        function () {

            textarea.value = "";

            textarea.focus();

        }
    );


    // ===================================
    // COLOR CHANGE
    // ===================================

    colorInput.addEventListener(
        "input",
        function () {

            colorValue.textContent =
                this.value;

        }
    );


    // ===================================
    // LABEL FONT SIZE
    // ===================================

    labelSlider.addEventListener(
        "input",
        function () {

            labelValue.textContent =
                this.value + " px";

        }
    );


    // ===================================
    // NUMBER FONT SIZE
    // ===================================

    numberSlider.addEventListener(
        "input",
        function () {

            numberValue.textContent =
                this.value + " px";

        }
    );


    // ===================================
    // ADD BOX
    // ===================================

    setsContainer.appendChild(box);

}


// =======================================
// READ DATA FROM TEXTAREA
// =======================================

function readSetData(text) {

    if (!text) {

        return [];

    }


    /*
        Supports:

        TP53
        BRCA1
        EGFR

        OR

        TP53, BRCA1, EGFR

        OR

        TP53;BRCA1;EGFR
    */

    const items =
        text
            .split(/[\n,\t;]+/)
            .map(item => item.trim())
            .filter(item => item !== "");


    // Remove duplicate values

    return [
        ...new Set(items)
    ];

}


// =======================================
// COLLECT ALL SETS
// =======================================

function collectSets() {

    const boxes =
        document.querySelectorAll(".set-box");


    const sets = [];


    boxes.forEach(
        function (box, index) {

            const label =
                box.querySelector(".set-label").value.trim()
                || `Set ${index + 1}`;


            const color =
                box.querySelector(".set-color").value;


            const labelFontSize =
                Number(
                    box.querySelector(".label-font-size").value
                );


            const numberFontSize =
                Number(
                    box.querySelector(".number-font-size").value
                );


            const text =
                box.querySelector(".set-data").value;


            const data =
                readSetData(text);


            sets.push({

                name: label,

                color: color,

                labelFontSize: labelFontSize,

                numberFontSize: numberFontSize,

                data: data

            });

        }
    );


    return sets;

}


// =======================================
// CHECK DATA
// =======================================

function validateSets(sets) {

    for (
        let i = 0;
        i < sets.length;
        i++
    ) {

        if (sets[i].data.length === 0) {

            alert(
                `Please paste data into ${sets[i].name}.`
            );

            return false;

        }

    }


    return true;

}


// =======================================
// GENERATE VENN DIAGRAM
// =======================================

function generateVenn() {

    console.log("generateVenn() started ✓");

    const graph = document.getElementById("vennGraph");

    if (!graph) {

        console.error("vennGraph container not found!");

        return;
    }

    // Clear previous diagram
    graph.innerHTML = "";

    // Get all textareas inside the set boxes
    const textareas =
        document.querySelectorAll("#setsContainer textarea");

    console.log(
        "Number of datasets found:",
        textareas.length
    );

    if (textareas.length < 2) {

        graph.innerHTML = `
            <p style="
                text-align:center;
                color:#777;
                padding:80px;
            ">
                Please enter at least two datasets.
            </p>
        `;

        return;
    }

    // ===================================
    // READ DATASETS
    // ===================================

    const sets = [];

    textareas.forEach(function (textarea, index) {

        const values = textarea.value
            .split(/\r?\n/)
            .map(function (item) {
                return item.trim();
            })
            .filter(function (item) {
                return item.length > 0;
            });

        sets.push({
            name: "Set " + (index + 1),
            values: [...new Set(values)]
        });

    });

    console.log("Datasets:", sets);

    // ===================================
    // SVG SIZE
    // ===================================

    const width = 700;
    const height = 500;

    // ===================================
    // CREATE SVG
    // ===================================

    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    svg.setAttribute(
        "viewBox",
        `0 0 ${width} ${height}`
    );

    svg.style.width = "100%";
    svg.style.maxWidth = "700px";
    svg.style.height = "auto";
    svg.style.display = "block";
    svg.style.margin = "0 auto";

    // ===================================
    // COLORS
    // ===================================

    const colors = [
        "#ef4444",
        "#3b82f6",
        "#22c55e",
        "#f59e0b",
        "#a855f7",
        "#ec4899"
    ];

    // ===================================
    // CIRCLE POSITIONS
    // ===================================

    const positions = {

        2: [
            [280, 250],
            [420, 250]
        ],

        3: [
            [350, 190],
            [275, 310],
            [425, 310]
        ],

        4: [
            [285, 210],
            [415, 210],
            [285, 330],
            [415, 330]
        ],

        5: [
            [350, 170],
            [250, 250],
            [300, 360],
            [400, 360],
            [450, 250]
        ],

        6: [
            [300, 170],
            [400, 170],
            [250, 250],
            [450, 250],
            [300, 340],
            [400, 340]
        ]

    };

    const currentPositions =
        positions[sets.length] ||
        positions[2];

    // ===================================
    // DRAW CIRCLES
    // ===================================

    sets.forEach(function (set, index) {

        const pos =
            currentPositions[index];

        const circle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        circle.setAttribute("cx", pos[0]);
        circle.setAttribute("cy", pos[1]);
        circle.setAttribute("r", 135);

        circle.setAttribute(
            "fill",
            colors[index]
        );

        circle.setAttribute(
            "fill-opacity",
            "0.35"
        );

        circle.setAttribute(
            "stroke",
            colors[index]
        );

        circle.setAttribute(
            "stroke-width",
            "3"
        );

        svg.appendChild(circle);

    });

    // ===================================
    // ADD SET LABELS
    // ===================================

    sets.forEach(function (set, index) {

        const pos =
            currentPositions[index];

        const text =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );

        text.setAttribute(
            "x",
            pos[0]
        );

        text.setAttribute(
            "y",
            pos[1] - 145
        );

        text.setAttribute(
            "text-anchor",
            "middle"
        );

        text.setAttribute(
            "font-size",
            "18"
        );

        text.setAttribute(
            "font-weight",
            "600"
        );

        text.setAttribute(
            "fill",
            colors[index]
        );

        text.textContent =
            set.name;

        svg.appendChild(text);

    });

    // ===================================
    // ADD ELEMENT COUNTS
    // ===================================

    sets.forEach(function (set, index) {

        const pos =
            currentPositions[index];

        const text =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );

        text.setAttribute(
            "x",
            pos[0]
        );

        text.setAttribute(
            "y",
            pos[1]
        );

        text.setAttribute(
            "text-anchor",
            "middle"
        );

        text.setAttribute(
            "font-size",
            "16"
        );

        text.setAttribute(
            "font-weight",
            "600"
        );

        text.setAttribute(
            "fill",
            "#222"
        );

        text.textContent =
            set.values.length +
            " elements";

        svg.appendChild(text);

    });

    // ===================================
    // INSERT SVG
    // ===================================

    graph.appendChild(svg);

    console.log(
        "Venn diagram rendered successfully ✓"
    );

}

// =======================================
// SIMPLE PREVIEW PLACEHOLDER
// =======================================

// =======================================
// RENDER VENN DIAGRAM
// =======================================

function renderVennPreview(sets) {

    const output =
        document.getElementById("vennGraph");

    if (!output) {
        console.warn("vennGraph element not found.");
        return;
    }

    output.innerHTML = "";

    // ===================================
    // CREATE SVG
    // ===================================

    const width = 1000;
    const height = 650;

    const svgNS =
        "http://www.w3.org/2000/svg";

    const svg =
        document.createElementNS(
            svgNS,
            "svg"
        );

    svg.setAttribute(
        "viewBox",
        `0 0 ${width} ${height}`
    );

    svg.setAttribute(
        "width",
        "100%"
    );

    svg.setAttribute(
        "height",
        "650"
    );

    svg.style.display = "block";

    svg.style.margin = "0 auto";


    // ===================================
    // TITLE
    // ===================================

    const title =
        document.createElementNS(
            svgNS,
            "text"
        );

    title.setAttribute(
        "x",
        width / 2
    );

    title.setAttribute(
        "y",
        40
    );

    title.setAttribute(
        "text-anchor",
        "middle"
    );

    title.setAttribute(
        "font-size",
        "24"
    );

    title.setAttribute(
        "font-family",
        "Arial"
    );

    title.setAttribute(
        "font-weight",
        "600"
    );

    title.textContent =
        "Venn Diagram";

    svg.appendChild(title);


    // ===================================
    // CIRCLE POSITIONS
    // ===================================

    const layouts = {

        2: [
            [390, 320],
            [610, 320]
        ],

        3: [
            [500, 220],
            [370, 410],
            [630, 410]
        ],

        4: [
            [390, 240],
            [610, 240],
            [390, 430],
            [610, 430]
        ],

        5: [
            [500, 190],
            [350, 300],
            [410, 480],
            [590, 480],
            [650, 300]
        ],

        6: [
            [500, 180],
            [350, 250],
            [350, 420],
            [500, 500],
            [650, 420],
            [650, 250]
        ]

    };


    const positions =
        layouts[sets.length];


    if (!positions) {

        alert(
            "Venn diagrams support 2–6 comparisons."
        );

        return;

    }


    // ===================================
    // CIRCLE SIZE
    // ===================================

    let radius = 170;

    if (sets.length >= 5) {
        radius = 145;
    }

    if (sets.length === 6) {
        radius = 135;
    }


    // ===================================
    // DRAW CIRCLES
    // ===================================

    sets.forEach(
        function (set, index) {

            const circle =
                document.createElementNS(
                    svgNS,
                    "circle"
                );


            circle.setAttribute(
                "cx",
                positions[index][0]
            );

            circle.setAttribute(
                "cy",
                positions[index][1]
            );

            circle.setAttribute(
                "r",
                radius
            );


            circle.setAttribute(
                "fill",
                set.color
            );


            circle.setAttribute(
                "fill-opacity",
                "0.35"
            );


            circle.setAttribute(
                "stroke",
                set.color
            );


            circle.setAttribute(
                "stroke-width",
                "3"
            );


            svg.appendChild(circle);

        }
    );


    // ===================================
    // SET LABELS
    // ===================================

    sets.forEach(
        function (set, index) {

            const label =
                document.createElementNS(
                    svgNS,
                    "text"
                );


            let x =
                positions[index][0];

            let y =
                positions[index][1] - radius + 25;


            label.setAttribute(
                "x",
                x
            );


            label.setAttribute(
                "y",
                y
            );


            label.setAttribute(
                "text-anchor",
                "middle"
            );


            label.setAttribute(
                "font-size",
                set.labelFontSize
            );


            label.setAttribute(
                "font-family",
                "Arial"
            );


            label.setAttribute(
                "font-weight",
                "600"
            );


            label.setAttribute(
                "fill",
                set.color
            );


            label.textContent =
                set.name;


            svg.appendChild(label);

        }
    );


    // ===================================
    // CALCULATE ALL OVERLAPS
    // ===================================

    const overlapData =
        calculateOverlaps(sets);


    console.log(
        "OVERLAP DATA:",
        overlapData
    );


    // ===================================
    // DRAW OVERLAP COUNTS
    // ===================================

    drawOverlapNumbers(
        svg,
        overlapData,
        sets,
        positions,
        radius
    );


    // ===================================
    // ADD SVG TO PAGE
    // ===================================

    output.appendChild(svg);

}

// =======================================
// CALCULATE OVERLAPS
// =======================================

function calculateOverlaps(sets) {

    const result = [];


    const count =
        sets.length;


    // Convert every dataset to Set

    const setObjects =
        sets.map(
            set => new Set(set.data)
        );


    /*
        Generate every possible combination.

        For 3 sets:

        A
        B
        C

        A+B
        A+C
        B+C

        A+B+C
    */


    for (
        let mask = 1;
        mask < (1 << count);
        mask++
    ) {

        const selectedIndexes = [];


        for (
            let i = 0;
            i < count;
            i++
        ) {

            if (
                mask & (1 << i)
            ) {

                selectedIndexes.push(i);

            }

        }


        // Start with first selected set

        let intersection =
            new Set(
                setObjects[
                    selectedIndexes[0]
                ]
            );


        // Intersect with remaining sets

        for (
            let j = 1;
            j < selectedIndexes.length;
            j++
        ) {

            const current =
                setObjects[
                    selectedIndexes[j]
                ];


            intersection =
                new Set(
                    [...intersection]
                        .filter(
                            item =>
                                current.has(item)
                        )
                );

        }


        result.push({

            indexes:
                selectedIndexes,

            count:
                intersection.size,

            items:
                [...intersection]

        });

    }


    return result;

}


// =======================================
// DRAW OVERLAP NUMBERS
// =======================================

function drawOverlapNumbers(
    svg,
    overlapData,
    sets,
    positions,
    radius
) {

    const count = sets.length;

    // ===================================
    // 2 SETS
    // ===================================

    if (count === 2) {

        const positionMap = {
            "0": [335, 320],
            "1": [665, 320],
            "0,1": [500, 320]
        };

        overlapData.forEach(item => {

            const key = item.indexes.join(",");

            const position = positionMap[key];

            if (!position) return;

            addNumber(
                svg,
                item.count,
                position[0],
                position[1],
                sets,
                item.indexes,
                "http://www.w3.org/2000/svg"
            );

        });

        return;
    }


    // ===================================
    // 3 SETS
    // ===================================

    if (count === 3) {

        const positionMap = {

            "0": [500, 185],

            "1": [365, 425],

            "2": [635, 425],

            "0,1": [435, 335],

            "0,2": [565, 335],

            "1,2": [500, 425],

            "0,1,2": [500, 365]

        };


        overlapData.forEach(item => {

            const key =
                item.indexes.join(",");

            const position =
                positionMap[key];

            if (!position) return;

            addNumber(
                svg,
                item.count,
                position[0],
                position[1],
                sets,
                item.indexes,
                "http://www.w3.org/2000/svg"
            );

        });

        return;
    }


    // ===================================
    // 4 SETS
    // ===================================

    if (count === 4) {

        const positionMap = {

            "0": [350, 190],

            "1": [650, 190],

            "2": [350, 490],

            "3": [650, 490],

            "0,1": [500, 210],

            "0,2": [390, 350],

            "0,3": [470, 350],

            "1,2": [530, 350],

            "1,3": [610, 350],

            "2,3": [500, 490],

            "0,1,2": [445, 300],

            "0,1,3": [555, 300],

            "0,2,3": [445, 405],

            "1,2,3": [555, 405],

            "0,1,2,3": [500, 350]

        };


        overlapData.forEach(item => {

            const key =
                item.indexes.join(",");

            const position =
                positionMap[key];

            if (!position) return;

            addNumber(
                svg,
                item.count,
                position[0],
                position[1],
                sets,
                item.indexes,
                "http://www.w3.org/2000/svg"
            );

        });

        return;
    }


    // ===================================
    // 5 SETS
    // ===================================

    if (count === 5) {

        const positionMap = {

            "0": [500, 120],

            "1": [300, 270],

            "2": [380, 485],

            "3": [620, 485],

            "4": [700, 270],

            "0,1": [395, 210],

            "0,4": [605, 210],

            "1,2": [340, 370],

            "2,3": [500, 500],

            "3,4": [660, 370],

            "0,2": [420, 300],

            "0,3": [580, 300],

            "1,4": [500, 285],

            "2,4": [560, 400],

            "1,3": [440, 400],

            "0,1,4": [500, 240],

            "0,2,3": [500, 400],

            "1,2,3": [430, 430],

            "2,3,4": [570, 430],

            "0,1,2": [400, 300],

            "0,3,4": [600, 300],

            "0,1,3": [455, 330],

            "0,2,4": [545, 330],

            "1,2,4": [450, 390],

            "1,3,4": [550, 390],

            "0,1,2,3": [475, 370],

            "0,1,3,4": [525, 370],

            "0,1,2,4": [490, 340],

            "0,2,3,4": [510, 400],

            "1,2,3,4": [500, 430],

            "0,1,2,3,4": [500, 370]

        };


        drawUsingPositionMap(
            svg,
            overlapData,
            sets,
            positionMap
        );

        return;
    }


    // ===================================
    // 6 SETS
    // ===================================

    if (count === 6) {

        const positionMap = {

            "0": [500, 100],

            "1": [300, 180],

            "2": [300, 350],

            "3": [500, 500],

            "4": [700, 350],

            "5": [700, 180],

            "0,1": [390, 145],

            "0,5": [610, 145],

            "1,2": [285, 265],

            "2,3": [390, 425],

            "3,4": [610, 425],

            "4,5": [715, 265],

            "0,2": [390, 230],

            "0,4": [610, 230],

            "1,3": [390, 350],

            "3,5": [610, 350],

            "2,4": [500, 390],

            "1,5": [500, 220],

            "0,1,5": [500, 175],

            "1,2,3": [390, 330],

            "3,4,5": [610, 330],

            "0,2,4": [500, 285],

            "0,3,5": [500, 365],

            "1,2,4": [430, 320],

            "2,3,5": [430, 390],

            "1,3,4": [570, 390],

            "2,4,5": [570, 320],

            "0,1,2,5": [450, 250],

            "0,1,4,5": [550, 250],

            "1,2,3,4": [500, 365],

            "1,2,3,5": [450, 365],

            "2,3,4,5": [550, 365],

            "0,1,2,3": [450, 330],

            "0,2,3,4": [500, 390],

            "0,1,3,5": [500, 330],

            "0,3,4,5": [550, 330],

            "0,1,2,3,4": [475, 350],

            "0,1,2,3,5": [475, 370],

            "0,1,3,4,5": [525, 350],

            "0,2,3,4,5": [525, 370],

            "1,2,3,4,5": [500, 400],

            "0,1,2,3,4,5": [500, 350]

        };


        drawUsingPositionMap(
            svg,
            overlapData,
            sets,
            positionMap
        );

    }

}

// =======================================
// DRAW USING POSITION MAP
// =======================================

function drawUsingPositionMap(
    svg,
    overlapData,
    sets,
    positionMap
) {

    const svgNS =
        "http://www.w3.org/2000/svg";


    overlapData.forEach(item => {

        const key =
            item.indexes.join(",");


        const position =
            positionMap[key];


        if (!position) {

            console.warn(
                "No position for:",
                key
            );

            return;

        }


        addNumber(
            svg,
            item.count,
            position[0],
            position[1],
            sets,
            item.indexes,
            svgNS
        );

    });

}


// =======================================
// ADD NUMBER TO SVG
// =======================================

function addNumber(
    svg,
    number,
    x,
    y,
    sets,
    indexes,
    svgNS
) {

    // Do not display zero values
    if (number === 0) {
        return;
    }

    const text =
        document.createElementNS(
            svgNS,
            "text"
        );

    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");

    let fontSize = 18;

    if (indexes.length > 0) {

        const sizes =
            indexes.map(
                index =>
                    sets[index].numberFontSize
            );

        fontSize =
            sizes.reduce(
                (a, b) => a + b,
                0
            ) / sizes.length;
    }

    text.setAttribute(
        "font-size",
        fontSize
    );

    text.setAttribute(
        "font-family",
        "Arial"
    );

    text.setAttribute(
        "font-weight",
        "600"
    );

    text.setAttribute(
        "fill",
        "#111827"
    );

    text.textContent = number;

    svg.appendChild(text);
}
// =======================================
// INITIALIZE VENN BUILDER
// =======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Venn Builder Loaded ✓"
        );


        // =======================================
// INITIALIZE VENN BUILDER
// =======================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Venn Builder Loaded ✓");


    // ===================================
    // GET ELEMENTS
    // ===================================

    const setCount =
        document.getElementById("setCount");

    const setsContainer =
        document.getElementById("setsContainer");

    const generateBtn =
        document.getElementById("generateBtn");

    const generateVennBtn =
        document.getElementById("generateVennBtn");

    const vennGraph =
        document.getElementById("vennGraph");


    console.log("setCount:", setCount);
    console.log("setsContainer:", setsContainer);
    console.log("generateBtn:", generateBtn);
    console.log("generateVennBtn:", generateVennBtn);
    console.log("vennGraph:", vennGraph);


    // ===================================
    // INITIAL CREATE SET BOXES
    // ===================================

    createSetBoxes();


    // ===================================
    // CREATE SETS BUTTON
    // ===================================

    if (generateVennBtn) {

        generateVennBtn.addEventListener(
            "click",
            function () {

                console.log(
                    "CREATE SETS CLICKED ✓"
                );

                createSetBoxes();

            }
        );

    }
    else {

        console.error(
            "CREATE SETS BUTTON NOT FOUND"
        );

    }


    // ===================================
    // GENERATE VENN DIAGRAM BUTTON
    // ===================================

    if (generateBtn) {

        console.log(
            "GENERATE VENN BUTTON FOUND ✓"
        );


        generateBtn.addEventListener(
            "click",
            function () {

                console.log(
                    "GENERATE BUTTON CLICKED ✓"
                );


                // -------------------------------
                // FIND GRAPH
                // -------------------------------

                const graph =
                    document.getElementById(
                        "vennGraph"
                    );


                if (!graph) {

                    console.error(
                        "vennGraph NOT FOUND"
                    );

                    return;

                }


                console.log(
                    "vennGraph FOUND ✓"
                );


                // -------------------------------
                // CLEAR OLD GRAPH
                // -------------------------------

                graph.innerHTML = "";


                // -------------------------------
                // CREATE SVG
                // -------------------------------

                const svg =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                    );


                svg.setAttribute(
                    "viewBox",
                    "0 0 700 500"
                );

                svg.setAttribute(
                    "width",
                    "700"
                );

                svg.setAttribute(
                    "height",
                    "500"
                );


                svg.style.width = "100%";
                svg.style.maxWidth = "700px";
                svg.style.height = "500px";
                svg.style.display = "block";
                svg.style.margin = "0 auto";


                // -------------------------------
                // CIRCLE 1
                // -------------------------------

                const circle1 =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "circle"
                    );


                circle1.setAttribute(
                    "cx",
                    "280"
                );

                circle1.setAttribute(
                    "cy",
                    "250"
                );

                circle1.setAttribute(
                    "r",
                    "150"
                );

                circle1.setAttribute(
                    "fill",
                    "#ef4444"
                );

                circle1.setAttribute(
                    "fill-opacity",
                    "0.45"
                );

                circle1.setAttribute(
                    "stroke",
                    "#ef4444"
                );

                circle1.setAttribute(
                    "stroke-width",
                    "3"
                );


                svg.appendChild(circle1);


                // -------------------------------
                // CIRCLE 2
                // -------------------------------

                const circle2 =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "circle"
                    );


                circle2.setAttribute(
                    "cx",
                    "420"
                );

                circle2.setAttribute(
                    "cy",
                    "250"
                );

                circle2.setAttribute(
                    "r",
                    "150"
                );

                circle2.setAttribute(
                    "fill",
                    "#3b82f6"
                );

                circle2.setAttribute(
                    "fill-opacity",
                    "0.45"
                );

                circle2.setAttribute(
                    "stroke",
                    "#3b82f6"
                );

                circle2.setAttribute(
                    "stroke-width",
                    "3"
                );


                svg.appendChild(circle2);


                // -------------------------------
                // LABEL 1
                // -------------------------------

                const label1 =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "text"
                    );


                label1.setAttribute(
                    "x",
                    "210"
                );

                label1.setAttribute(
                    "y",
                    "100"
                );

                label1.setAttribute(
                    "font-size",
                    "22"
                );

                label1.setAttribute(
                    "font-family",
                    "Arial"
                );

                label1.setAttribute(
                    "font-weight",
                    "600"
                );

                label1.setAttribute(
                    "fill",
                    "#ef4444"
                );

                label1.textContent =
                    "Set 1";


                svg.appendChild(label1);


                // -------------------------------
                // LABEL 2
                // -------------------------------

                const label2 =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "text"
                    );


                label2.setAttribute(
                    "x",
                    "470"
                );

                label2.setAttribute(
                    "y",
                    "100"
                );

                label2.setAttribute(
                    "font-size",
                    "22"
                );

                label2.setAttribute(
                    "font-family",
                    "Arial"
                );

                label2.setAttribute(
                    "font-weight",
                    "600"
                );

                label2.setAttribute(
                    "fill",
                    "#3b82f6"
                );

                label2.textContent =
                    "Set 2";


                svg.appendChild(label2);


                // -------------------------------
                // ADD SVG TO PAGE
                // -------------------------------

                graph.appendChild(svg);


                console.log(
                    "TEST VENN SVG RENDERED ✓"
                );

            }
        );

    }
    else {

        console.error(
            "GENERATE VENN BUTTON NOT FOUND"
        );

    }

})})