var start = {
    header: "Simple Quiz"
}
var Q1 = {
    header: "Question One",
    Q1: "Q1",
    Q2: "Q2",
    Ans: 1,
}
var Q2 = {
    header: "Question Two",
    Q1: "Q3",
    Q2: "Q4",
    Ans: 2,
}
var enter = {
    header: "Enter your name"
}
var highscores = {
    header: "Highscores"
}

var objList = [start, Q1, Q2, enter, highscores]


// variable initialization
var main__container = $('.main__container');
var main__header = $(".main__header");
var main__content = $(".main__content");

var currentScore = 0;

if (localStorage.getItem("list")){
    var highscoresList  = JSON.parse(localStorage.getItem("list"));
} else {
    var highscoresList = [];
}

var f = 0;
var values = null;


function init() {

    clear()

    values = Object.values(objList[f]);

    main__header.text(objList[f].header) // set header based on page we are on (objList[i])
    
    createEl()

    if (f < objList.length-1) f++
    else f = 0;
}
function clear(){
    if (f !== 0) {main__content.html("")}
    else if (f === 0){
        main__content.html("")
        var startBtn = $('<button>')
        startBtn.text("start")
        startBtn.on('click', init)

        main__content.append(startBtn)
    }
}

function hsSetup() {

    var val = $('.scoreName').val()

    clear()

    var user = {
        name: val,
        score: currentScore
    }

    // console.log(highscoresList)

    highscoresList.push(user);
    localStorage.setItem("list",JSON.stringify(highscoresList))

    var userString = JSON.stringify(user)

    localStorage.setItem("user", userString)
    highscoreInit()
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
        user.addClass('highScoreAll')
        user.data("number", counter)
        counter++;

        var name = $('<div>')
        name.text(list[i].name)

        var score = $('<div>')
        score.text(list[i].score)

        var btn = $('<button>')
        btn.text("delete")
        btn.on('click', deleteHS)

        user.append(name)
        user.append(score)
        user.append(btn)
        main__content.append(user)
    }

    var submitBtn = $('<button>')
    submitBtn.text("restart")
    submitBtn.on('click', init)
    main__content.append(submitBtn)

    f= 0;
}
function deleteHS(){
    
}

function createEl() {
    for(i = 1; i < values.length - 1; i++){

        var option = $('<button>')
        option.addClass("option")
        option.on('click', init)

        option.text(values[i])

        main__content.append(option)
    }

    if (f === 3){
        var form = $('<input>')
        form.addClass("scoreName")
        form.placeholder = "enter your initials here"

        var submitBtn = $('<button>')
        submitBtn.text("Submit")
        submitBtn.on('click', hsSetup)

        main__content.append(form)
        main__content.append(submitBtn)
    }
}

init()
