/*

    Creators:
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

function shrinkText() {
    if ($(".answer").width() < 500) {
        $('.answer').css("font-size", "12px");
    } else {
        $('.answer').css("font-size", "1.5em");
    }
    if ($(".testQ").width() < 600) {
        $('.testQ').css("font-size", "4vw");
    } else {
        $('.testQ').css("font-size", "2vw");
    }
}

function error(testMessage, testColor) {
    // Heres how u use JQuery to create a new div (Which is what u want to do)
    /*
        $("<div></div>").html("This contains text").addClass("This is the class name").appendTo(answerContainer);
    */
   // before i leave everything to u to figure out, advice, do what I did and create a div 
   // add class alert to  it and then just use css to style the class 
    // from there jsut add the message to the divs text
    // good luck


    $("<div></div>").html("testMessage").addClass("alert").css("color","blue").appendTo("body");
    
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

function switchTab(currentTab) {
    $("container[class$='-container']").attr("hidden", true);
    $("." + currentTab).removeAttr("hidden");
}

function numberInputOverflow(highestNum, elem) {
    if ($(elem).val() > highestNum) {
        $(elem).val(highestNum);
    }
    if ($(elem).val() < 0) {
        $(elem).val(0);
    }
}

function randomint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateTestResult(correct, incorrect, missing, total) {
    $("#correctNum").text(correct);
    $("#incorrectNum").text(incorrect);
    $("#missingNum").text(missing);
    $("#totalNum").text(total);

    correct = Math.floor((correct / total) * 100);
    incorrect = Math.floor((incorrect / total) * 100);
    missing = Math.floor((missing / total) * 100);
    //alert(`${correct} \n ${incorrect} \n ${missing}`)

    (correct + missing + incorrect != 100) ? correct++ : correct;

    $(".correct").css({
        left : 0,
        width : correct + "%"
    });
    $(".incorrect").css({
        left : correct + "%",
        width : incorrect + "%"
    });
    $(".empty").css({
        left : correct + incorrect + "%",
        width : missing + "%"
    });

}

function checkTestValid() {
    if ($("#numberOfQuestions") <= 0) {
        return "Input a proper amount of questions";
    }
    if ($("input[name='ceSwitch']:checked").length == 0) {
        return "Missing Cumulative or Essential choice";
    }
    if ($("input[name='typeOfTest']:checked").length == 0) {
        return "Missing Type of Test";
    }
    if ($("input[type=checkbox][name='termvsdef']:checked").length == 0) {
        return "Missing Selection for Term or Definition";
    }
    if ($("input[type=checkbox][name='unitSelection']:checked").length == 0) {
        return "Missing Selected Units";
    }

    return true;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[r]] = [arr[r], arr[i]];
    }

    return arr;
}

function loadTest(testOnUnits, vocabSet, totalQuestions, typeOfTest, termOrDef) {
    $(".gradeTest-container").children().not(".sticky-container").remove();
    termOrDef = (termOrDef.length == 1) ? termOrDef.toString() : termOrDef;

    let questions = [];

    for (let unit of testOnUnits) {
        unit = parseInt(unit);
        questions.push(...Object.keys(vocabSet["Unit" + unit]));
    }

    questions = shuffle(questions).slice(0, totalQuestions);
    let includedQ = new Set();

    for (let term = 0; term < questions.length; term++) {//let term of questions) {
        for (let unit in vocabSet) {
            if (vocabSet[unit][questions[term]] != undefined && !includedQ.has(term)) {
                includedQ.add(term);

                let question;
                let answer;

                if (typeof(termOrDef) == "object") {
                    if (term < questions.length / 2) {
                        question = questions[term];
                        answer = vocabSet[unit][questions[term]];
                    } else {
                        question = vocabSet[unit][questions[term]];
                        answer = questions[term];
                    }
                } else {
                    question = (termOrDef === "term") ? questions[term] : vocabSet[unit][questions[term]];
                    answer = (termOrDef === "term") ? vocabSet[unit][questions[term]] : questions[term];
                }
                let testQContainer = $("<div></div>")
                    .addClass("testQ-container")
                    .appendTo($(".gradeTest-container"));
                $("<div></div>").text(question).addClass("testQ").appendTo(testQContainer);
                $("<div></div>").text((term + 1) + " / " + questions.length).addClass("testQNum").appendTo(testQContainer);
                $("<div></div>").addClass("question-number").appendTo(testQContainer);
                

                let answerContainer = $("<div></div>").addClass("answer-container").appendTo(testQContainer);
                //$("<div></div>").text(vocabSet[unit][questions[term]]).addClass("answer").appendTo(answerContainer);
                let answerKey = Math.floor(Math.random() * 4);
                for (let i = 0; i < 4; i++) {
                    if (i === answerKey) {
                        $("<div></div>").html(answer).addClass("answer").on("click", function() {
                            answerContainer.children('.answer').removeClass("selected");
                            $(this).addClass("selected");
                        }).appendTo(answerContainer);
                    } else {
                        let n = Object.keys(vocabSet[unit]).length - 1;
                        let randomAnsw = (termOrDef === "term") ? vocabSet[unit][Object.keys(vocabSet[unit])[Math.floor(Math.random() * n)]] : Object.keys(vocabSet[unit])[Math.floor(Math.random() * n)];
                        //let randomAnsw = ;//vocabSet[randomUnit][vocabSet[randomUnit][Math.floor(Math.random() * n)]];
                        $("<div></div>").html(randomAnsw).addClass("answer").on("click", function() {
                            answerContainer.children('.answer').removeClass("selected");
                            $(this).addClass("selected");
                        }).appendTo(answerContainer);
                    }
                }
            }
        }
    }
}

async function main() {
    let vocabSet = await getQATerms();
    let currentUnit = 1;
    let currentTerm = 0;
    let term = Object.keys(vocabSet["Unit" + currentUnit])[currentTerm];
    let definition = Object.values(vocabSet["Unit" + currentUnit])[currentTerm];
    let testOnUnits = [];
    let totalQuestions = $("#numberOfQuestions").val();

    function updateUI() {
        term = Object.keys(vocabSet["Unit" + currentUnit])[currentTerm];
        definition = Object.values(vocabSet["Unit" + currentUnit])[currentTerm];
        document.getElementById("term").innerHTML = term.slice(0,1).toUpperCase() + term.slice(1);//.charAt(0).toUpperCase() + term.slice(1);
        document.getElementById("definition").innerHTML = definition;

        currentFlashCard(vocabSet, currentUnit, currentTerm);
    }

    document.getElementById("leftArrow").addEventListener("click", () => {
        currentTerm = leftArrow(currentTerm);
        document.getElementById("term").hidden = false;
        document.getElementById("definition").hidden = true;
        updateUI();
    })
    document.getElementById("rightArrow").addEventListener("click", () => {
        currentTerm = rightArrow(currentTerm, vocabSet, currentUnit);
        document.getElementById("term").hidden = false;
        document.getElementById("definition").hidden = true;
        updateUI();
    })
    
    document.getElementById("chooseUnit").addEventListener("click", async () => {
        currentUnit = await chooseNewUnit(vocabSet);
        currentTerm = 0;
        updateUI();
    })

    $(".flashcard-container").on("click", function() {
        switchTerm();
    })

    $(".returnToMain").on("click", function() {
        switchTab("content-container");
    })

    document.getElementById("numberOfQuestions").addEventListener("input", () => {
        let maxQuestionLength = 0;

        $("input[type=checkbox][name=unitSelection]").each(function() {
            if ($(this).is(':checked')) {
                maxQuestionLength += Object.keys(vocabSet["Unit" + $(this).val()]).length;
            }
        });

        numberInputOverflow(maxQuestionLength, "#numberOfQuestions")
    })

    $("input[type=checkbox][name=unitSelection]").on("input", function() {
        let maxQuestionLength = 0;
        testOnUnits = [];

        $("input[type=checkbox][name=unitSelection]").each(function() {
            if ($(this).is(':checked')) {
                maxQuestionLength += Object.keys(vocabSet["Unit" + $(this).val()]).length;
                testOnUnits += $(this).val();
            }
        })

        $("#numberOfQuestions").val(maxQuestionLength);
    })
    
    document.getElementById("startTest").addEventListener("click", () => {
        switchTab("formTest-container");
        $("#numberOfQuestions").val(0);
    })

    document.getElementById("beginTest").addEventListener("click", () => {
        if (checkTestValid() === true) {
            totalQuestions = $("#numberOfQuestions").val();

            loadTest(testOnUnits, 
                vocabSet, 
                totalQuestions, 
                $("input[name='typeOfTest']:checked").val(), 
                $("input[name='termvsdef']:checked").map(function() { return $(this).val() }).get()
            );
            if ($("body")[0].scrollWidth < 500) {shrinkText();}
            switchTab("gradeTest-container");
        } else {
            alert("Error: " + checkTestValid());
        }
    })

    document.getElementById("submitTest").addEventListener("click", () => {
        let correctTermNum = 0;
        let incorrectTermNum = 0;
        
        $('.selected').each(function() {
            let testTerm = $(this).parent().parent().children(".testQ").text();
            let testDef = $(this).html();

            for (unitKey in vocabSet) {
                if (vocabSet[unitKey][testTerm] != undefined) {
                    if (vocabSet[unitKey][testTerm] === testDef) {
                        correctTermNum++;
                        break;
                    }
                    incorrectTermNum++;
                    break;
                } else if (vocabSet[unitKey][testDef] != undefined) {
                    if (vocabSet[unitKey][testDef] === testTerm) {
                        correctTermNum++;
                        break;
                    }
                    incorrectTermNum++;
                    break;
                }
            }
        });

        switchTab("testResult-container");
        updateTestResult(correctTermNum, incorrectTermNum, $(".answer-container").length - correctTermNum - incorrectTermNum, $(".answer-container").length);

    })

    window.addEventListener('resize', () => {
        shrinkText();
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

