// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAaijVKo8JYU0WISK6mkkrNqsp95Wict68",
//   authDomain: "quiz-app-831d6.firebaseapp.com",
//   projectId: "quiz-app-831d6",
//   storageBucket: "quiz-app-831d6.appspot.com",
//   messagingSenderId: "865458301863",
//   appId: "1:865458301863:web:d28d2a9b52d9ede5aa6482",
//   measurementId: "G-B29ED3B26X"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


function start() {
    var a = document.getElementById("min")
    var b = document.getElementById("sec")
    var data = firebase.database().ref("Quiz/Timer/min").once("value", function (data) {
        a.innerHTML = data.val()
    })
    var data2 = firebase.database().ref("Quiz/Timer/sec").once("value", function (data2) {
        b.innerHTML = data2.val()
    })    

    document.getElementById("start").style.display = "none"
    document.getElementById("form").style.display = "block"
}


// This is Form

function formm() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var user = {
        name: name.value,
        email: email.value
    }
    var nameerror = document.getElementById("nameerror")
    var emailerror = document.getElementById("emailerror")
    var na = document.getElementById("na")
    var em = document.getElementById("em")
    na.innerHTML = name.value
    em.innerHTML = email.value
    if (name.value != "" && email.value != "") {
        firebase.database().ref('Students').push(user)
        name.value = ""
        email.value = ""
        nameerror.innerHTML = ""
        emailerror.innerHTML = ""
        document.getElementById("quizz").style.display = "block"
        document.getElementById("form").style.display = "none"
        time = setInterval(timer, 1000)
    } else if (name.value == "" && email.value == "") {
        nameerror.innerHTML = "Enter your name"
        emailerror.innerHTML = "Enter your email"
    } else if (name.value == '') {
        nameerror.innerHTML = "Enter your name"
    } else if (email.value == '') {
        emailerror.innerHTML = "Enter your email"
    }
    if (name.value != "") {
        nameerror.innerHTML = ""
    }
    if (email.value != "") {
        emailerror.innerHTML = ""
    }
}


// This is Quiz

var questions = [{
    question: "What does HTML stand for?",
    option: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
    correctanswer: "Hyper Text Markup Language"
},
{
    question: "Choose the correct HTML element for the largest heading:",
    option: ["<heading>", "<head>", "<h6>", "<h1>"],
    correctanswer: "<h1>"
},
{
    question: "What is the correct HTML element for inserting a line break?",
    option: ["<br>", "<break>", "<lb>", "<brk>"],
    correctanswer: "<br>"
},
{
    question: "Which character is used to indicate an end tag?",
    option: ["/", "*", "<", "^"],
    correctanswer: "/"
},
{
    question: "How can you make a numbered list?",
    option: ["<dl>", "<list>", "<ol>", "<ul>"],
    correctanswer: "<ol>"
}
]

var indexnum = 0
var marks = 0
var each = 3

function counter(e) {
    var done = document.getElementById("done")
    var total = document.getElementById("total")
    done.innerHTML = e + 1
    total.innerHTML = questions.length
}

function check(e) {
    var userans = e.firstChild.nodeValue
    var ans = questions[indexnum].correctanswer
    if (ans === userans) {
        marks++
    }
    document.getElementById("opt").style.display = "none"
}

function display() {
    var que = document.getElementById("question")

    // firebase.database().ref("Quiz/All/" + )

    que.innerHTML = questions[indexnum].question
    var main = document.getElementById("options")
    for (var i = 0; i < questions[indexnum].option.length; i++) {
        var div = document.createElement("div")
        div.setAttribute("class", "col-6 div mb-5")
        var option = document.createElement("button")
        option.setAttribute("class", "button col-ms-6 bg-light text-success fs-5 p-2")
        option.setAttribute("onclick", "check(this)")
        var btntext = document.createTextNode(questions[indexnum].option[i])
        option.appendChild(btntext)
        div.appendChild(option)
        main.appendChild(div)
    }
    counter(indexnum)
}
display()

function next() {
    document.getElementById("opt").style.display = "block"
    document.getElementById("options").innerHTML = ''
    indexnum++
    display()
    var a = document.getElementById("done").innerHTML
    if (a == questions.length) {
        document.getElementById("next").style.display = "none"
        document.getElementById("submit").style.display = "block"
    } else { }
}

function timer() {
    var a = document.getElementById("min")
    var b = document.getElementById("sec")
    b.innerHTML--
    if (b.innerHTML == -1) {
        a.innerHTML--
        b.innerHTML = 59
    } else { }
    if (a.innerHTML == 0 && b.innerHTML == 0) {
        submit()
    }
}

function submit() {
    document.getElementById("quizz").style.display = "none"
    document.getElementById("result").style.display = "block"

    var na = document.getElementById("na")
    var em = document.getElementById("em")

    var tq = document.getElementById("tq")
    tq.innerHTML = total.innerHTML

    var ca = document.getElementById("ca")
    ca.innerHTML = marks

    var wa = document.getElementById("wa")
    wa.innerHTML = total.innerHTML - ca.innerHTML

    var om = document.getElementById("om")
    om.innerHTML = marks * each

    var tm = document.getElementById("tm")
    tm.innerHTML = total.innerHTML * each

    var pe = document.getElementById("pe")
    pe.innerHTML = om.innerHTML / tm.innerHTML * 100

    var user = {
        Name: na.innerHTML,
        Email: em.innerHTML,
        TotalQuestions: total.innerHTML,
        CorrectAnswers: ca.innerHTML,
        WrongAnswers: wa.innerHTML,
        MarksObtained: om.innerHTML,
        TotalMarks: tm.innerHTML,
        Percentage: pe.innerHTML,
    }
    firebase.database().ref('Students').push(user)
}