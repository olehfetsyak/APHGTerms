/*

    Creaters:
        - OlehF
        - TinL

*/
function getQATerms() {
    return new Promise((resolve) => {
        fetch("qaSet.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((e) => {
                console.log("Error while fetching Terms: " + e);
            });
    });   
}

function checkAmountOfTerms(terms, unit) {
    // terms = promised object, unit = integer
    return Object.keys(terms["Unit" + unit]).length;
}

function switchTerm() {
    // Switch between Term and Definition
    let term = document.getElementById("term");
    let definition = document.getElementById("definition");
    let showTerm = !term.hidden;

    term.hidden = showTerm;
    definition.hidden = !showTerm;
}

function currentFlashCard(vocabSet, unit, termNum) {
    // Vocab # / All the Vocab 
    document.getElementById("termCount").innerHTML = `${termNum + 1} / ${Object.keys(vocabSet["Unit" + unit]).length}`;
}
function chooseNewUnit() {
    // Switch between Units of Vocab
    return new Promise((resolve) => {
        $("#chooseUnit").css("display", "none");
        $(".units").css("display", "flex");

        $(".units").one("click", function() {
            $("#chooseUnit").css("display", "flex");
            $(".units").css("display", "none");

            resolve($(this).text()[$(this).text().length - 1]);
        })
    })
}

function leftArrow(currentTerm) {
    // Go back a card
    return (currentTerm - 1 < 0) ? 0 : currentTerm - 1;
}

function rightArrow(currentTerm, vocabSet, unit) {
    // Go forward a card
    let n = Object.keys(vocabSet["Unit" + unit]).length - 1;
    return (currentTerm + 1 > n) ? n : currentTerm +1;
}

async function main() {
    let vocabSet = await getQATerms();
    let currentUnit = 1;
    let currentTerm = 0;
    let term = Object.keys(vocabSet["Unit" + currentUnit])[currentTerm];
    let definition = Object.values(vocabSet["Unit" + currentUnit])[currentTerm];

    function updateUI() {
        term = Object.keys(vocabSet["Unit" + currentUnit])[currentTerm];
        definition = Object.values(vocabSet["Unit" + currentUnit])[currentTerm];
        document.getElementById("term").innerHTML = term.slice(0,1).toUpperCase() + term.slice(1);//.charAt(0).toUpperCase() + term.slice(1);
        document.getElementById("definition").innerHTML = definition;

        currentFlashCard(vocabSet, currentUnit, currentTerm);
    }

    document.getElementById("leftArrow").addEventListener("click", () => {
        currentTerm = leftArrow(currentTerm);
        updateUI();
    })
    document.getElementById("rightArrow").addEventListener("click", () => {
        currentTerm = rightArrow(currentTerm, vocabSet, currentUnit);
        updateUI();
    })
    
    document.getElementById("chooseUnit").addEventListener("click", async () => {
        currentUnit = await chooseNewUnit(vocabSet);
        currentTerm = 0;
        updateUI();
    })

    updateUI();
    currentFlashCard(vocabSet, currentUnit, currentTerm);
}

main();

/*



 To-Do List : {
    Tin : [
        - Style the flashcard-container (lidally spin when you click it)
        - Style the flashcard
    ],

    Oleh : [
        - Style the overall webpage
    ]
 }
*/

