// ========= Tagline Questions =========
var askOne = {
	question: `What was the name of Mallory Archer's beloved pet dog?`,
	choice1: "Lady Belladonna",
	choice2: "Queenie",
	choice3: "Princess Penny",
	choice4: "Duchess",
	answer: "Duchess",
	info: "<img src='assets/images/duchess.jpg'>"	
};

var askTwo = {
	question: `How many times has Lana shot Archer?`,
	choice1: "Twice",
	choice2: "Once",
	choice3: "Dozens of times",
	choice4: "Four",
	answer: "Twice",
	info: "<img src='assets/images/shot.png'>"
}

var askThree = {
	question: `What is Archer's least favorite animal?`,
	choice1: "Shark",
	choice2: "Snake",
	choice3: "Alligator",
	choice4: "Bear",
	answer: "Alligator",
	info: "<img src='assets/images/alligator.png'>"

};

var askFour = {
	question: `Who kidnaps Mallory Archer, in order to get help to find his own mother?`,
	choice1: "Barry",
	choice2: "Krieger",
	choice3: "Cyril Figgis",
	choice4: "Brett",
	answer: "Barry",
	info: "<img src='assets/images/barry.png'>"
};

var askFive = {
	question: `Who steals Archer's brand new Dodge Challenger?`,
	choice1: "Krieger",
	choice2: "Mallory",
	choice3: "Lana",
	choice4: "Kabocha",
	answer: "Mallory",
	info: "<img src='assets/images/challenger.jpg'>"
};

var askSix = {
	question: `How many times does Brett get fatally shot?`,
	choice1: "One",
	choice2: "Seven",
	choice3: "Three",
	choice4: "Nine",
	answer: "Seven",
	info: "<img src='assets/images/brett.jpg'>"
};

var askSeven = {
	question: `What kind of wild cat is Babou?`,
	choice1: "Bobcat",
	choice2: "Ocelot",
	choice3: "Lynx",
	choice4: "Snow Leopard",
	answer: "Ocelot",
	info: "<img src='assets/images/babou.png'>"
};

var askEight = {
	question: `What kind of cows were raised on Poovey Farms?`,
	choice1: "Jersey",
	choice2: "Holstein",
	choice3: "Friesians",
	choice4: "Angus",
	answer: "Holstein",
	info: "<img src='assets/images/poovey.png'>"
};



// Creating arrays that holds the questions
var askQuestions = [askOne, askTwo, askThree, askFour, askFive, askSix, askSeven, askEight];

// The empty array that will be populated when the user selects a category.
var questions = [];

// Setting initial variable values. 
var num = 0;
var time = 30;
var numbercorrect = 0;
var numberwrong = 0;
var numtimeout = 0;



// ========= Functions ==========

// Sets the time back to 30s, sets an interval for the timer, displays the next question.
function nextquestion() {
	time = 30;
	counter = setInterval(increment, 1000);
	$(".timer").html("<h2>Time Remaining: " + time + "</h2>");
	$(".question").html(questions[num].question);
	$(".ans1").html(questions[num].choice1);
	$(".ans2").html(questions[num].choice2);
	$(".ans3").html(questions[num].choice3);
	$(".ans4").html(questions[num].choice4);
	$(".info").empty();
};

// Counts down & displays the remaining time. Stops if time = 0 and starts an animation when time remaining < 10sec.
function increment() {
	time--
	$(".timer").html("<h2>Time Remaining: " + time + "</h2>")
	if (time == 0) {
		timeout();
		stop();
		$(".choice").empty();
	} else if (time < 10) {
		$(".timer").addClass("red");
		setTimeout(function(){$(".timer").removeClass("red")}, 500)
	};
};

// Stops the timer. If there are more questions go on to the next, if not end the game. 
function stop() {
	clearInterval(counter);
	num++;
	if (num == questions.length) {
		setTimeout(endgame, 5000);
	} else {
		setTimeout(nextquestion, 5000);
	};
};

// Lets the user know they got the question right and displays an image.
function correctanswer() {
	$(".question").html("<p>Correct!</p>");
	$(".info").html("<p>"+questions[num].info+"</p>");
}

// Counts a wrong answer, tells the user they are wrong, and displays an image. 
function wronganswer() {
	numberwrong++;
	$(".question").html("<p>Wrong! <br> The correct answer was: "+questions[num].answer+"</p>");
	$(".info").html("<p>"+questions[num].info+"</p>");
};

// Counts a failure to answer the question, tells the user they are out of time, and displays an image. 
function timeout() {
	numtimeout++;
	$(".question").html("<p>Time's up! <br> The correct answer was: "+questions[num].answer+"</p>");
	$(".info").html("<p>"+questions[num].info+"</p>");
}

// Tells the user how many questions they got right/wrong/unanswered. Resets variables and shows buttons so the user can play again. 
function endgame() {
	$(".question").html("<h2>You got " + numbercorrect + " answers correct!</h2>"
		+ "<h2>You got " + numberwrong + " wrong!</h2>");
	$(".choice").empty();
	$(".timer").empty();
	$(".info").empty();
	num = 0;
	numbercorrect = 0;
	numberwrong = 0;
	numtimeout=0;
	$("button").show();
};


// Category select buttons.
$(".startButton").click(function() {
	questions = askQuestions;
	nextquestion();
	$("button").hide();
	$(".intro").hide();
});

// Clicking on a choice.
$(".choice").click(function() {

	if ($(this).text() == questions[num].answer) {
		numbercorrect++;
		correctanswer();
		stop();
	} else {
		wronganswer();
		stop();
	};

	$(".choice").empty();
});
