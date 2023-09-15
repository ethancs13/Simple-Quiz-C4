var start = {
    header: "Simple Quiz"
}
var Q1 = {
    header: "What does CSS stand for?",
    Q1: "Cascading Style Sheets",
    Q2: "Computer Style Sheets",
    Q3: "Coloful Style Sheets",
    Q4: "Creative Style Sheets",
    Ans: 1,
}
var Q2 = {
    header: "What is the correct HTML for referring to an external style sheet?",
    Q1: "<stylesheet>mystyle.css</stylesheet>",
    Q2: '<link rel="stylesheet" type="text/css" href="mystyle.css">',
    Q3: '<style src="mystyle.css">',
    Ans: 2,
}
var Q3 = {
    header: "Where in an HTML document is the correct place to refer to an external style sheet?",
    Q1: "In the <body> section",
    Q2: "In the <head> section",
    Q3: "At the end of the document",
    Ans: 1,
}
var enter = {
    header: "Enter your name"
}
var highscores = {
    header: "Highscores"
}

var objList = [start, Q1, Q2, Q3, enter, highscores]


// variable initialization
var root = $(':root')
var main__container = $('.main__container');
var main__header = $(".main__header");
var main__content = $(".main__content");

var clock_container = $(".clock_container");
var clock_value = $(".clock_value");
clock_value.text("clock")
var startClock;

var alertBox = $('.alertBox')


//timer variables
var clockValue = "clock";

var currentScore = 0;

if (localStorage.getItem("list"))
{var highscoresList  = JSON.parse(localStorage.getItem("list"));}
else
{var highscoresList = [];}

var f = 0;
var values = null;

function timer() {
    if(clockValue === -1){
        f = 4;
        clock_value.text("60")
        clockValue = "clock"
        clearInterval(startClock)
        init()
    } else {
        currentScore = clockValue;
        clock_value.text(clockValue)
        clockValue--;
    }
}

function init() {
    if (f === 5){
        f = 0;
    }

    if (f === 4) {
        clearInterval(startClock)
    } else if (f === 1){
        clockValue = 60;
        startClock = setInterval(timer, 1000)
    }

    clear()

    values = Object.values(objList[f]);

    main__header.text(objList[f].header) // set header based on page we are on (objList[i])
    
    createEl()

    if (f < objList.length-1) f++
    else f = 0;
}

function checkAns(event) {

    if (f == 1){
        console.log("beginning")
    } else if (f == 2){
        if (event.target.id == "option__1"){
            correctAns()
        } else {
            incorrectAns()
        }
    } else if (f == 3){
        if (event.target.id == "option__2"){
            correctAns()
        } else {
            incorrectAns()
        }
    } else if (f == 4){
        if (event.target.id == "option__3"){
            correctAns()
        } else {
            incorrectAns()
        }
    }


    init()
}
function correctAns() {
    //create element to display correct or incorrect
    var result = $('<span>')
    result.attr('id', 'result')
    result.text("Correct!")

    main__container.append(result) // add to document (body)

    // use a setTimeout function to have it dissapear after '1 second'
    setTimeout(function() {
        result.addClass('opacityZero')

        setTimeout(() => result.hide(), 1000)
        
    }, 400);
}
function incorrectAns() {
    //create element to display correct or incorrect
    var result = $('<span>')
    result.attr('id', 'result')
    result.text("Incorrect!")

    main__container.append(result) // add to document (body)

    // use a setTimeout function to have it dissapear after '1 second'
    setTimeout(function() {
        result.addClass('opacityZero')

        setTimeout(() => result.hide(), 1000)
        
    }, 400);
}

function clear(){
    if (f !== 0) {main__content.html("")}
    else if (f === 0){
        main__content.html("")
        var startBtn = $('<button>')
        startBtn.addClass("start-btn")
        startBtn.text("start")
        startBtn.on('click', init)

        main__content.append(startBtn)
    }
}

var currentName;

function hsSetup() {

    removeEventListener("keydown", eventListener)

    var val = currentName

    var user = {name: val,
        score: currentScore}

    // console.log(highscoresList)

    highscoresList.push(user);
    localStorage.setItem("list",JSON.stringify(highscoresList))
    localStorage.setItem("user", JSON.stringify(user))

    clear()
}

function highscoreInit() {

    if (f !== 0) {main__content.html("")}

    values = Object.values(objList[f]);

    main__header.text(objList[f].header) // set header based on page we are on (objList[i])
    
    createEl()

    var list = JSON.parse(localStorage.getItem("list"));

    let counter = 0;
    for (i=0; i< list.length; i++){

        localStorage.removeItem("user")

        var user = $('<span>')
        user.addClass('highscore_container')
        user.data("number", counter)
        counter++;

        var name = $('<div>')
        name.text(list[i].name)

        var score = $('<div>')
        score.text(list[i].score)

        var btn = $('<button>')
        btn.text("delete")
        btn.on('click', remove_highscore)

        user.append(name)
        user.append(score)
        user.append(btn)
        main__content.append(user)
    }

    var submitBtn = $('<button>')
    submitBtn.addClass("restart-btn")
    submitBtn.text("restart")
    submitBtn.on('click', init)
    main__content.append(submitBtn)
}


function remove_highscore(e){
    // get list from storage
    var list = JSON.parse(localStorage.getItem("list"))

    // get index
    var index = $(e.target).parent().index()
    

    if (list.length < 2) {
        list = []
        localStorage.clear()
        highscoresList = list
    } else {
        // remove item at that index
        list.splice(index, 1)
        // update local storage
        localStorage.setItem("list", JSON.stringify(list))
        highscoresList = list
    }
    

    $(e.target).parent().remove() // remove parent element of delete btn (highscore_container)from DOM
}


var eventListener;
function createEl() {
    for (i = 1; i < values.length - 1; i++){

        var option = $('<button>')
        option.addClass("option")
        option.on('click', checkAns)
        option.attr("id", "option__" + i)

        option.text(values[i])

        main__content.append(option)
    }

    var z = 0;

    if (f === 4){

        var score = $('<h2>')
        score.addClass("finalScore")
        score.text("Final Score: " + currentScore)

        var input = $('<div>')
        input.addClass("scoreName")

        var array = []
        console.log("listening")



        eventListener = root.on('keydown', (e) => {

            if (e.keyCode === 8){ // backspace
                array.pop()
                input.text("")
                input.text(array.join(""))

                if(z < 1){
                    z = 0;
                } else {
                    z--;
                }

                
            } else {
                console.log(z)

                if (z < 4){ // < 3 (0, 1, 2)
                    
                    if (z === 2){
                        var alert = $('<span>')
                        alert.addClass("alert")
                        alert.text("press any key to submit")
                        console.log(alert)
                        alertBox.append(alert)
    
                        setTimeout(function() {
                            alert.addClass('opacityZero')
                    
                            setTimeout(() => alert.hide(), 4000)
                            
                        }, 2000);
                    } else if (z === 3) { // 3
                    
                        currentName = input.text()
                        hsSetup();
                        highscoreInit()
                        z=0;
                        return;
                    }

                    array.push(e.key.toUpperCase())
                    input.append(array[z])
                    z++
                    console.log("push")


                    
                }
            }

            this.event.preventDefault();

        })
        

        main__content.append(score)
        main__content.append(input)
    }
}

// timer bug (at end)

init()
