var correct = 0
var incorrect = 0
var unanswered = 0

function timeOut() {
    clearInterval(timerVar)
    $(".timer-div").removeClass("d-inline-block").addClass("d-none")
    $(".results-div").removeClass("d-none").addClass("d-inline-block")
}

function startTimer() {
    second = 160
    timerVar = setInterval(showTime, 1000)

    function showTime() {
        second--
        $("#second").text(second)
        if (second === 0) timeOut()
    }
}

function showResult() {
    clearInterval(timerVar)
    $(".timer-div").removeClass("d-inline-block").addClass("d-none")
    $(".results-div").removeClass("d-none").addClass("d-inline-block")

    $("#corrects").text(correct)
    $("#incorrects").text(incorrect)
    $("#unanswereds").text(unanswered)
}

function connectAjax() {
    $.ajax({
        url: "https://opentdb.com/api.php?amount=8&difficulty=easy&type=multiple"
    }).done(function (resp) {
        $(".full-form").removeClass("d-none").addClass("d-inline-block")
        for (var i = 0; i < 8; i++) {
            question = resp.results[i].question
            correct_answer = resp.results[i].correct_answer
            answers = resp.results[i].incorrect_answers
            let random = Math.floor(Math.random() * 4)
            answers.splice(random, 0, correct_answer)
            
            var qId = "#h-" + i
            $(qId).html(question)
            var fId = "#f-" + i
            var path = "customRadio" + i

            $(fId).attr("data-answ",correct_answer)
            for (let j = 0; j<4; j++) {
                var id = "#" + path + j
                var klas = "." + path + j
                $(id).val(answers[j])
                $(klas).html(answers[j])
            }
        }
    })
}

$(".start-btn").on("click", function () {
    $(this).addClass("d-none")
    $(".timer-div").removeClass("d-none").addClass("d-inline-block")
    startTimer()
    connectAjax()
})

$(".done").on("click", function () {
    for (let i=0; i<8; i++){
        var choise = $("input[name=f-" + i + "]:checked").val()
        var answ = $("#f-"+i).data("answ")
        
        if (choise == answ) {
            correct++
        } else if (choise == undefined) {
            unanswered++
        } else {
            incorrect++
        }
    }
    $(".full-form").removeClass("d-inline-block").addClass("d-none")
    showResult()
})