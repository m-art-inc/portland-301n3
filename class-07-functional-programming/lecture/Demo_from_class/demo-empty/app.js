var myContainer = "Hey everybody! Come see how good I look!";

function log(someVariable) {
	console.log(someVariable);
	return someVariable;
}

log(myContainer) //  "Hey everybody! Come see how good I look!";


var classyMessage = function() {
	return "Stay classy San Diego";
};

log(classyMessage); // '' [Function]

var doSomething = function(thing) {
	thing();
}
doSomething(classyMessage); // "Stay classy San Diego"


var el1 = document.getElementById('main-carousel');
var slider1 = new Carousel(el1, 3000);
slider1.init();

var el1 = document.getElementById('news-carousel');
var slider1 = new Carousel(el1, 5000);
slider1.init();

var el1 = document.getElementById('events-carousel');
var slider1 = new Carousel(el1, 7000);
slider1.init();


function initialiaseCarousel(id, speed) {
	var el = document.getElementById(id);
	var slider = new Carousel(el, speed);
	slider.init();
	return slider;
}

initialiaseCarousel('main-carousel', 3000);
initialiaseCarousel('news-carousel', 5000);
initialiaseCarousel('events-carousel', 7000);


var unicornEl = document.getElementById('unicorn');
unicornEl.className += ' magic';
spin(unicornEl);

var fairyEl = document.getElementById('fairy');
fairyEl.className += ' magic';
sparkle(fairyEl);

var kittenEl = document.getElementById('kitten');
kittenEl.className += ' magic';
rainbowTrail(kittenEl);


function addMagic(id, effect) {
	var element = document.getElementById(id);
	element.className += ' magic';
	effect(element);
	return element;
}

addMagic('unicorn', spin);
addMagic('fairy', sparkle);
addMagic('kitten', rainbowTrail);


function addColor(color) {
	var rainbowEl = document.getElementById('rainbow');
	var div = document.createElement('div');
	div.style.paddingTop = '10px';
	div.style.backgroundColor = color;
	rainbowEl.appendChild(div);
}


addColor('red');
addColor('orange');
addColor('yellow');
addColor('green');
addColor('blue');
addColor('purple');


var colours = [
    'red', 'orange', 'yellow',
    'green', 'blue', 'purple'
];

for(var i=0; i < colours.length; i++) {
	addColor(colours[i]);
}

function forEach(callback, array) {
	for(var i=0; i < array.length; i++) {
		callback(array[i]);
	}
}

forEach(addColor, colours); // Our function

colours.forEach(addColor); // Native JS functional forEach



var ids = ['unicorn', 'fairy', 'kitten'];

var element = [];

for (var i = 0; i < ids.length; i++) {
	element[i] = document.getElementById(ids[i]);
}// elements now contains all the values of ids.

var map = function(callback, array) {
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		newArray[i] = callback(array[i]);
	}
	return newArray;
};


var getElement = function(id) {
	return document.getElementById(id);
};

var elements = map(getElement, ids); // Our function

var elements = ids.map(getElement) ; // Native JS


// Given an array of numbers, calculate the sum;
var numbers = [1, 3, 5, 7, 9];
var total = 0;

for (var i = 0; i < numbers.length; i++) {
	total = total + numbers[i];
}
// total is 25

// Given an array of words, join them together with a space between each word.
var words = ['sparkle', 'fairies', 'are', 'amazing'];
var sentence = '';

for (var i = 0; i < words.length; i++) {
	sentence = sentence + ' ' + words[i];
}

// sparkle fairies are amazing


function add(a, b) {
	return a + b;
}

var numbers = [1, 3, 5, 7, 9];
var total = 0;

for (var i = 0; i < numbers.length; i++) {
	total = add(total, numbers[i]);
}

function joinWords(sentence, word) {
	return sentence + ' ' + word;
}

var words = ['sparkle', 'fairies', 'are', 'amazing'];
var sentence = '';

for (var i = 0; i < words.length; i++) {
	sentence = joinWords(sentence, words[i]);
}

var reduce = function(callback, initialValue, array) {
	var accumulator = initialValue;
	for(var i = 0; i < array.length; i++) {
		accumulator = callback(accumulator, array[i]);
	}
	return accumulator;
};

function add(a, b) {
	return a + b;
}

var numbers = [1, 3, 5, 7, 9];

var total = reduce(add, 0, numbers); // Our function

var total = numbers.reduce(add, 0); // Native JS functional


function joinWords(sentence, word) {
	return sentence + ' ' + word;
}

var words = ['sparkle', 'fairies', 'are', 'amazing'];

var sentence = reduce(joinWords, '', words);  // This is our function

var sentence = words.reduce(joinWords, '');  // Native JS functional




function isBigEnough(value) {
	return value >= 10;
}

var filtered = [12, 5, 8, 130, 44].filter(isBigEnough); // [12, 130, 44]

var a = [5, 4, 3, 2, 1];

var smallValues = a.filter(function(x) { return x < 3 }); // [2, 1]

var everyOtherValue = a.filter(function(x,i) { return i%2 == 0}) // [5, 3, 1]

var sidekicks = [
    { name: "Robin",     hero: "Batman"   },
    { name: "Supergirl", hero: "Superman" },
    { name: "Oracle",    hero: "Batman"   },
    { name: "Krypto",    hero: "Superman" }
];

var batkicks = sidekicks.filter(function(el) {
	return (el.hero === "Batman");
});

console.log(batkicks);
// Outputs: [
//    { name: "Robin",  hero: "Batman"   },
//    { name: "Oracle", hero: "Batman"   }
// ]

var superkicks = sidekicks.filter(function(el) {
	return (el.hero === "Superman");
});

console.log(superkicks);
// Outputs: [
//    { name: "Supergirl", hero: "Superman" },
//    { name: "Krypto",    hero: "Superman" }
// ]



var thing = 'bat';

var sing = function() {
	var line = 'Twinkle twinkle, little ' + thing;

	function log(someVariable) {
		console.log(someVariable);
	}

	log(line);

}

log(line) // undefined



sing(); // Twinkle twinkle, little bat

sing(thing) // Twinkle twinkle, little bat



var outer = function() {
    var outerVar = 'Hatter';
    var inner = function() {
         // We can 'see' outerVar here
         console.log(outerVar);
         // Hatter

         var innerVar = 'Dormouse';
         // innerVar is only visible here inside inner()
    }

    // innerVar is not visible here.
}


var x = 1;

(function Articles(module) {
	this.param = param;
	console.log(module); // x is undefined;
	}
)(window);






























































