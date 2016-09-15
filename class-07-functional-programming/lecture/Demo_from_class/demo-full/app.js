/*
 * Variables
 */
// Let’s start with some of the basic features of JavaScript
// that make ‘functional’ programming possible, before we
// move on to why it’s a good idea. In JavaScript we have
// two key building blocks: variables and functions.
//
// Variables are sort-of like containers that we can put
// things in. You can create one like so:

var myContainer = "Hey everybody! Come see how good I look!";

// That creates a container called myContainer and sticks
// a string in it.

/*
 * Functions
 */
 // Now, a function, on the other hand, is a way to bundle
 // up some instructions so you can use them again, or just
 // keep things organised so you’re not trying to think about
 // everything all at once. One can create a function like so:

function log(someVariable) {
    console.log(someVariable);
    return someVariable;
}

// And you can call a function like this:

log(myContainer); // Hey everybody! Come see how good I look!

// But, the thing is, if you’ve seen much JavaScript before,
// then you’ll know that we could also write and call our
// function like this:

var log = function(someVariable) {
    console.log(someVariable);
    return someVariable;
};

log(myContainer); // Hey everybody! Come see how good I look!

// Let’s look at this carefully. When we write the function
// definition this way, it looks like we’ve created a variable
// called log and stuck a function in it. And that’s exactly
// what we have done. Our log() function is a variable; which
// means that we can do the same things with it that we can do
// with other variables.

// Let’s try it out. Could we, maybe, pass a function as a
// parameter to another function?

var classyMessage = function() {
    return "Stay classy San Diego!";
}

log(classyMessage); // [Function]

// Hmmmm. Not super useful. Let’s try it a different way.

var doSomething = function(thing) {
    thing();
}

var sayBigDeal = function() {
    var message = "I’m kind of a big deal";
    log(message);
}

doSomething(sayBigDeal); // I’m kind of a big deal

// Now, this might not be terribly exciting to you, but it
// gets computer scientists quite fired up. This ability to
// put functions into variables is sometimes described by
// saying “functions are first class objects in JavaScript.”
// What that means is just that functions (mostly) aren’t
// treated differently to other data types like objects or
// strings. And this one little feature is surprisingly
// powerful. To understand why though, we need to talk about
// DRY code.

// Example #3
var el1 = document.getElementById('main-carousel');
var slider1 = new Carousel(el1, 3000);
slider1.init();

var el2 = document.getElementById('news-carousel');
var slider2 = new Carousel(el2, 5000);
slider2.init();

var el3 = document.getElementById('events-carousel');
var slider3 = new Carousel(el3, 7000);
slider3.init();

// This is easier to maintain and we have a pattern to follow.
function initialiaseCarousel(id, speed) {
	var el = document.getElementById(id);
	var slider = new Carousel(el, speed);
	slider.init();
	return slider;
}

initialiaseCarousel('main-carousel', 3000);
initialiseCarousel('news-carousel', 5000);
initialiseCarousel('events-carousel', 7000);


// Example #4
// But what about if we have a pattern where the action changes?

var unicornEl = document.getElementById('unicorn');
unicornEl.className += ' magic';
spin(unicornEl);

var fairyEl = document.getElementById('fairy');
fairyEl.className += ' magic';
sparkle(fairyEl);

var kittenEl = document.getElementById('kitten');
kittenEl.className += ' magic';
rainbowTrail(kittenEl);

// A little trickier to refactor
// There is definitely a repeated pattern,
// but we’re calling a different function for each element

function addMagicClass(id) {
    var element = document.getElementById(id);
    element.className += ' magic';
    return element;
}

var unicornEl = addMagicClass('unicorn');
spin(unicornEl);

var fairyEl = addMagicClass('fairy');
sparkle(fairyEl);

var kittenEl = addMagicClass('kitten');
rainbow(kittenEl);

// But we can make this even more DRY,
// if we remember that JavaScript lets
// us pass functions as parameters to
// other functions:

function addMagic(id, effect) {
    var element = document.getElementById(id);
    element.className += ' magic';
    effect(element);
}

addMagic('unicorn', spin);
addMagic('fairy', sparkle);
addMagic('kitten', rainbow);

// Example #5
// Working with arrays and lists
// We saw that functions are useful for bundling up sets of actions
// that might be repeated. But what if we’re repeating the same function
// lots of times? For example:

function addColour(colour) {
    var rainbowEl = document.getElementById('rainbow');
    var div = document.createElement('div');
    div.style.paddingTop = '10px';
    div.style.backgroundColour = colour;
    rainbowEl.appendChild(div);
}

addColour('red');
addColour('orange');
addColour('yellow');
addColour('green');
addColour('blue');
addColour('purple');

// That addColour function is called rather a lot. We are repeating
// ourselves—something we wish to avoid. One way to refactor it is to
// move the list of colours into an array, and call addColour in a for-loop:

var colours = [
    'red', 'orange', 'yellow',
    'green', 'blue', 'purple'
];

for (var i = 0; i < colours.length; i = i + 1) {
    addColour(colours[i]);
}

// We have to give the computer very specific instructions about creating an
// index variable and incrementing it, and checking to see if it’s time to stop.
// What if we could wrap all that for-loop stuff into a function?

/**
 * forEach
 */

function forEach(callback, array) {
    for (var i = 0; i < array.length; i = i + 1) {
        callback(array[i]);
    }
}

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
forEach(addColour, colors); // Our function

colors.forEach(addColour); // JS native forEach

/**
 * map
 */

// Now, our forEach function is handy, but somewhat limited.
// If the callback function we pass in returns a value, forEach just ignores it.

// With a small adjustment, we can change our forEach function so that it gives
// us back whatever value the callback function returns. We would then have a new
// array with a corresponding value for each value in our original array.

var ids = ['unicorn', 'fairy', 'kitten'];

var elements = [];
for (var i = 0; i < ids.length; i++) {
    elements[i] = document.getElementById(ids[i]); // elements now contains the elements we are after
}

var map = function(callback, array) {
	var newArray = [];
	for (var i=0; i < array.length; i++) {
		newArray[i] = callback(array[i], i);
	}
	return newArray;
};

var getElement = function(id) {
	return document.getElementById(id);
}
var ids = ['unicorn', 'fairy', 'kitten'];

var elements = map(getElement, ids); // our functions

ids.map(getElement); // Native JS function

/**
 * reduce
 */

 // Now, map is very handy, but we can make an even more powerful function
 // if we take an entire array and return just one value.

// To illustrate, let’s consider two similar problems:

// 1. Given an array of numbers, calculate the sum; and
// 2. Given an array of words, join them together with a space between each word.[1]

// Now, these might seem like silly, trivial examples—and they are.
// But, bear with me, once we see how this reduce function works, we’ll apply it in more interesting ways.

// Given an array of numbers, calculate the sum
var numbers = [1, 3, 5, 7, 9];
var total = 0;
for (i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
}
// total is 25

// Given an array of words, join them together with a space between each word.
var words = ['sparkle', 'fairies', 'are', 'amazing'];
var sentence = '';
for (i = 0; i < words.length; i++) {
    sentence = sentence + ' ' + words[i];
}
// ' sparkle fairies are amazing'

// These two solutions have a lot in common. They each use a for-loop to iterate over the
// array; they each have a working variable (total and sentence); and they both set their
// working value to an initial value.

// Refactor of inner functions

var add = function(a, b) {
	return a + b;
};

var numbers = [1, 3, 5, 7, 9];
var total = 0;
for (i = 0; i < numbers.length; i++) {
    add(total, numbers[i]);
}

function joinWord(sentence, word) {
	return sentence + ' ' + word;
}

// Given an array of words, join them together with a space between each word.
var words = ['sparkle', 'fairies', 'are', 'amazing'];
var sentence = '';
for (i = 0; i < words.length; i++) {
    sentence = joinWord(sentence, word[i]);
}

// Now, this is hardly more concise but the pattern becomes clearer. Both inner
// functions take the working variable as their first parameter, and the current
// array element as the second. Now that we can see the pattern more clearly, we
// can move those untidy for-loops into a function:

var reduce = function(callback, initialValue, array) {
    var working = initialValue;
    for (var i = 0; i < array.length; i = i + 1) {
        working = callback(working, array[i]);
    }
    return working;
};

// Now we have a shiny new reduce function, let’s take it for a spin:
var numbers = [1, 3, 5, 7, 9];
var total = reduce(add, 0, numbers); // Our function
var total = numbers.reduce(add, 0); // Native JS


var words = ['sparkle', 'fairies', 'are', 'amazing'];
var sentence = reduce(joinWord, '', words); // Our function
var sentence = words.reduce(joinWord, ''); // Native JS

/**
 * filter
 */

 // The filter() method creates a new array with all elements that pass the test implemented by the provided function.

// filter() calls a provided callback function once for each element in an array, and constructs a new array of all the
// values for which callback returns a value that coerces to true.


// The following example uses filter() to create a filtered array
// that has all elements with values less than 10 removed.

function isBigEnough(value) {
	return value >= 10;
}

var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]

// Another example:

var a = [5, 4, 3, 2, 1];
smallvalues = a.filter(function(x) { return x < 3 });   // [2, 1]
everyother = a.filter(function(x,i) { return i%2==0 }); // [5, 3, 1]


// A useful time

var sidekicks = [
    { name: "Robin",     hero: "Batman"   },
    { name: "Supergirl", hero: "Superman" },
    { name: "Oracle",    hero: "Batman"   },
    { name: "Krypto",    hero: "Superman" }
];

var batKicks = sidekicks.filter(function (el) {
    return (el.hero === "Batman");
});

console.log(batKicks);
// Outputs: [
//    { name: "Robin",  hero: "Batman"   },
//    { name: "Oracle", hero: "Batman"   }
// ]

var superKicks = sidekicks.filter(function (el) {
    return (el.hero === "Superman");
});

console.log(superKicks);
// Outputs: [
//    { name: "Supergirl", hero: "Superman" },
//    { name: "Krypto",    hero: "Superman" }
// ]


// Recap --> The filter method accepts a callback function. In that callback function we examine each element of the array indidually, and return true if we want the element to pass the filter.


/**
 * Closures and Scope
 */

var thing = 'bat';

var sing = function() {
    // This function can 'see' thing
    var line = 'Twinkle, twinkle, little ' + thing;
    function log(someVariable) {
        console.log(someVariable);
        return someVariable;
    }
    log(line);
};

sing();
// Twinkle, twinkle, little bat

// Outside the function we can't see message though
log(line);
// undefined

// However, if we define a function inside a function, the inner
// function can see variables in the outer function:

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

/**
 * Purity
 */

var myGlobalMessage = '{{verb}} me';

var impureInstuction = function(verb) {
    return myGlobalMessage.replace('{{verb}}', verb);
};

var eatMe = impureInstruction('Eat');
//=> 'Eat me'
var drinkMe = impureInstruction('Drink');
//=> 'Drink me'

// This function is impure because it depends on the global variable
// myGlobalMessage. If that variable ever changes, it becomes difficult
// to tell what impureInstruction will do.

// one way to make it pure is to move the variable inside:
var pureInstruction = function (verb) {
    var message =  '{{verb}} me';
    return message.replace('{{verb}}', verb);
};

// This function will now always return the same result given the same
// set of inputs. But sometimes we can’t use that technique. For example:
var getHTMLImpure = function(id) {
    var el = document.getElementById(id);
    return el.innerHTML;
};

// This function is impure because it is relying on the document object to
// access the DOM. If the DOM changes it might produce different results.
// Now, we can’t define document inside our function because it’s an API to
// the browser, but we can pass it in as a parameter:

var getHTML = function(doc, id) {
    var el = doc.getElementById(id);
    return el.innerHTML;
};

// This may seem kind of trivial and pointless, but it’s a handy technique.
