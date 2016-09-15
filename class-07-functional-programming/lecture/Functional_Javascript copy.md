## Variables 
 
Let’s start with some of the basic features of JavaScript that make ‘functional’ programming possible, before we move on to why it’s a good idea. In JavaScript we have two key building blocks: variables and functions. Variables are sort-of like containers that we can put things in. You can create one like so:

	var myContainer = "Hey everybody! Come see how good I look!";

That creates a container called myContainer and sticks a string in it.

 
## Functions 

Now, a function, on the other hand, is a way to bundle up some instructions so you can use them again, or just keep things organised so you’re not trying to think about everything all at once. One can create a function like so:

	function log(someVariable) {
    	console.log(someVariable);
    	return someVariable;
	}
	
And you can call a function like this:

	log(myContainer); 
	// Hey everybody! Come see how good I look!
	
But, the thing is, if you’ve seen much JavaScript before, then you’ll know that we could also write and call our function like this:

	var log = function(someVariable) {
    	console.log(someVariable);
    	return someVariable;
	};
	
	log(myContainer); // Hey everybody! Come see how good I look!
	
Let’s look at this carefully. When we write the function definition this way, it looks like we’ve created a variable called log and stuck a function in it. And that’s exactly what we have done. Our log() function is a variable; which means that we can do the same things with it that we can do with other variables.

Let’s try it out. Could we, maybe, pass a function as a parameter to another function?

	var classyMessage = function() {
    	return "Stay classy San Diego!";
	}

	log(classyMessage); 
	// [Function]

Hmmmm. Not super useful. Let’s try it a different way.

	var doSomething = function(thing) {
    	thing();
	}

	var sayBigDeal = function() {
    	var message = "I’m kind of a big deal";
    	log(message);
	}

	doSomething(sayBigDeal); 
	// I’m kind of a big deal
	
Now, this might not be terribly exciting to you, but it gets computer scientists quite fired up. This ability to put functions into variables is sometimes described by saying “functions are first class objects in JavaScript.” What that means is just that functions (mostly) aren’t treated differently to other data types like objects or strings. And this one little feature is surprisingly powerful. To understand why though, we need to talk about DRY code.	

## DON'T REPEAT YOURSELF

The idea is that if you need to do the same set of tasks many times, bundle them up into some sort of re-usable package (like a function). This way, if you ever need to tweak that set of tasks, you can do it in just one spot.

Let’s look at an example. Say we wanted to put three carousels on a page using a carousel library (an imaginary library for the sake of example):

	var el1 = document.getElementById('main-carousel');
	var slider1 = new Carousel(el1, 3000);
	slider1.init();

	var el2 = document.getElementById('news-carousel');
	var slider2 = new Carousel(el2, 5000);
	slider2.init();

	var el3 = document.getElementById('events-carousel');
	var slider3 = new Carousel(el3, 7000);
	slider3.init();
	
This code is somewhat repetitive. We want to initialise a carousel for the elements on the page, each one with a specific ID. So, let’s describe how to initialise a carousel in a function, and then call that function for each ID.

	function initialiseCarousel(id, frequency) {
    	var el = document.getElementById(id);
	    var slider = new Carousel(el, frequency);
    	slider.init();
	    return slider;
	}

	initialiseCarousel('main-carousel', 3000);
	initialiseCarousel('news-carousel', 5000);
	initialiseCarousel('events-carousel', 7000);

This code is clearer and easier to maintain. And we have a pattern to follow: when we have the same set of actions we want to take on different sets of data, we can wrap those actions up in a function. But what about if we have a pattern where the action changes?

	var unicornEl = document.getElementById('unicorn');
	unicornEl.className += ' magic';
	spin(unicornEl);

	var fairyEl = document.getElementById('fairy');
	fairyEl.className += ' magic';
	sparkle(fairyEl);

	var kittenEl = document.getElementById('kitten');
	kittenEl.className += ' magic';
	rainbowTrail(kittenEl);
	
This code is a little bit trickier to refactor. There is definitely a repeated pattern, but we’re calling a different function for each element. We could get part of the way there by wrapping the document.getElementById() call and adding the className up into a function. That would save us a little bit of repetition:

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
	
But we can make this even more DRY, if we remember that JavaScript lets us pass functions as parameters to other functions:

	function addMagic(id, effect) {
    	var element = document.getElementById(id);
	    element.className += ' magic';
    	effect(element);
	}

	addMagic('unicorn', spin);
	addMagic('fairy', sparkle);
	addMagic('kitten', rainbow);
	
This is much more concise. And easier to maintain. The ability to pass functions around as variables opens up a lot of possibilities. In the next part we’ll look at using this ability to make working with arrays more pleasant.

## Working with arrays and lists
We saw that functions are useful for bundling up sets of actions that might be repeated. But what if we’re repeating the same function lots of times? For example:

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
	
That addColour function is called rather a lot. We are repeating ourselves—something we wish to avoid. One way to refactor it is to move the list of colours into an array, and call addColour in a for-loop:

	var colours = [
    	'red', 'orange', 'yellow',
	    'green', 'blue', 'purple'
	];

	for (var i = 0; i < colours.length; i = i + 1) {
    	addColour(colours[i]);
	}
	
This code is perfectly fine. It gets the job done, and it is less repetitive than the previous version. But it’s not particularly expressive. We have to give the computer very specific instructions about creating an index variable and incrementing it, and checking to see if it’s time to stop. What if we could wrap all that for-loop stuff into a function?

### For-Each


Since JavaScript lets us pass a function as a parameter to another function, writing a forEach function is relatively straightforward:

	function forEach(callback, array) {
    	for (var i = 0; i < array.length; i = i + 1) {
        	callback(array[i], i);
	    }
	}
	
This function takes another function, callback, as a parameter and calls it on every item in the array.

Now, with our example, we want to run the addColour function on each item in the array. Using our new forEach function we can express that intent in just one line:

	forEach(addColour, colours);
	
Calling a function on every item in an array is such a useful tool that modern implementations of JavaScript include it as a built in method on arrays. So instead of using our own forEach function, we could use the built in one like so:

	var colours = [
    	'red', 'orange', 'yellow',
	    'green', 'blue', 'purple'
	];
	
	colours.forEach(addColour);
	
	
### Map
Now, our forEach function is handy, but somewhat limited. If the callback function we pass in returns a value, forEach just ignores it. With a small adjustment, we can change our forEach function so that it gives us back whatever value the callback function returns. We would then have a new array with a corresponding value for each value in our original array.

Let’s look at an example. Say we have an array of IDs, and would like to get the corresponding DOM element for each of them. To find the solution in a ‘procedural’ way, we use a for-loop:

	var ids = ['unicorn', 'fairy', 'kitten'];
	var elements = [];
	for (var i = 0; i < ids.length; i = i + 1) {
    	elements[i] = document.getElementById(ids[i]);
	}
	// elements now contains the elements we are after
	
Again, we have to spell out to the computer how to create an index variable and increment it—details we shouldn’t really need to think about. Let’s factor out the for-loop like we did with forEach and put it into a function called map:

	var map = function(callback, array) {
    	var newArray = [];
	    for (var i = 0; i < array.length; i = i + 1) {
    	    newArray[i] = callback(array[i], i);
	    }
    	return newArray;
	}
	
Now we have our shiny new map function, we can use it like so:

	var getElement = function(id) {
	  return document.getElementById(id);
	};

	var elements = map(getElement, ids);
	
The map function takes small, trivial functions and and turns them into super-hero functions—it multiplies the function’s effectiveness by applying it to an entire array with just one call.


Like forEach, map is so handy that modern implementations have it as a built-in method for array objects. You can call the built-in method like this:

	var ids = ['unicorn', 'fairy', 'kitten'];
	var getElement = function(id) {
	  return document.getElementById(id);
	};
	
	var elements = ids.map(getElement);
	
### Reduce

Now, map is very handy, but we can make an even more powerful function if we take an entire array and return just one value. That may seem a little counter-intuitive at first—how can a function that returns one value instead of many be more powerful? To find out why, we have to first look at how this function works.

To illustrate, let’s consider two similar problems:

* Given an array of numbers, calculate the sum; and
* Given an array of words, join them together with a space between each word.[1]

Now, these might seem like silly, trivial examples—and they are. But, bear with me, once we see how this reduce function works, we’ll apply it in more interesting ways.

So, the ‘procedural’ way to solve these problems is, again, with for-loops:

	// Given an array of numbers, calculate the sum
	var numbers = [1, 3, 5, 7, 9];
	var total = 0;
	for (i = 0; i < numbers.length; i = i + 1) {
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
	
These two solutions have a lot in common. They each use a for-loop to iterate over the array; they each have a working variable (total and sentence); and they both set their working value to an initial value.

Let’s refactor the inner part of each loop, and turn it into a function:

	var add = function(a, b) {
    	return a + b;
	}

	// Given an array of numbers, calculate the sum
	var numbers = [1, 3, 5, 7, 9];
	var total = 0;
	for (i = 0; i < numbers.length; i = i + 1) {
    	total = add(total, numbers[i]);
	}
	// total is 25

	function joinWord(sentence, word) {
    	return sentence + ' ' + word;
	}

	// Given an array of words, join them together with a space between each word.
	var words = ['sparkle', 'fairies', 'are', 'amazing'];
	var sentence = '';
	for (i = 0; i < words.length; i++) {
    	sentence = joinWord(sentence, words[i]);
	}
	// 'sparkle fairies are amazing'
	
Now, this is hardly more concise but the pattern becomes clearer. Both inner functions take the working variable as their first parameter, and the current array element as the second. Now that we can see the pattern more clearly, we can move those untidy for-loops into a function:

	var reduce = function(callback, initialValue, array) {
    	var working = initialValue;
	    for (var i = 0; i < array.length; i = i + 1) {
    	    working = callback(working, array[i]);
	    }
	    return working;
	};
	
Now we have a shiny new reduce function, let’s take it for a spin:

	var total = reduce(add, 0, numbers);
	var sentence = reduce(joinWord, '', words);
	
Like forEach and map, reduce is also built in to the standard JavaScript array object. One would use it like so:

	var total = numbers.reduce(add, 0);
	var sentence = words.reduce(joinWord, '');	
	
	
### Filter
The filter() method creates a new array with all elements that pass the test implemented by the provided function.

filter() calls a provided callback function once for each element in an array, and constructs a new array of all the values for which callback returns a value that coerces to true. callback is invoked only for indexes of the array which have assigned values; it is not invoked for indexes which have been deleted or which have never been assigned values. Array elements which do not pass the callback test are simply skipped, and are not included in the new array.

Filtering out all small values

The following example uses filter() to create a filtered array that has all elements with values less than 10 removed.

	function isBigEnough(value) {
		return value >= 10;
	}
	
	var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
	// filtered is [12, 130, 44]

Another example:

	var a = [5, 4, 3, 2, 1];
	smallvalues = a.filter(function(x) { return x < 3 });   // [2, 1]
	everyother = a.filter(function(x,i) { return i%2==0 }); // [5, 3, 1]
	
Another example:

Fortunately, in JavaScript, arrays have the handy filter method which we can use to do the filtering for us instead of manually looping through the array ourselves.

	var sidekicks = [
    	{ name: "Robin",     hero: "Batman"   },
	    { name: "Supergirl", hero: "Superman" },
    	{ name: "Oracle",    hero: "Batman"   },
	    { name: "Krypto",    hero: "Superman" }
	];

	var batKicks = sidekicks.filter(function (el) {
    	return (el.hero === "Batman");
	});

	// Outputs: [
	//    { name: "Robin",  hero: "Batman"   },
	//    { name: "Oracle", hero: "Batman"   }
	// ]
	console.log(batKicks);

	var superKicks = sidekicks.filter(function (el) {
    	return (el.hero === "Superman");
	});

	// Outputs: [
	//    { name: "Supergirl", hero: "Superman" },
	//    { name: "Krypto",    hero: "Superman" }
	// ]
	console.log(superKicks);
	
The filter method accepts a callback function. In that callback function we examine each element of the array indidually, and return true if we want the element to pass the filter.
	
## Putting it all together

Now, as we mentioned before, these are trivial examples—the add and joinWord functions ave fairly simple—and that’s kind of the point really. Smaller, simpler functions are easier to think about and easier to test. Even when we take two small, simple functions and combine them (like add and reduce, for example), the result is still easier to reason about than a single giant, complicated function. But, with that said, we can do more interesting things than add numbers together.

Let’s try doing something a little more complicated. We’ll start off with some inconveniently formatted data, and use our map and reduce functions to transform it into an HTML list. Here is our data:

	var ponies = [
    	[
        	['name', 'Fluttershy'],
	        ['image', 'http://tinyurl.com/gpbnlf6'],
    	    ['description', 'Fluttershy is a female Pegasus pony and one of the main 								characters of My Little Pony Friendship is Magic.']
	    ],
    	[
        	['name', 'Applejack'],
	        ['image', 'http://tinyurl.com/gkur8a6'],
    	    ['description', 'Applejack is a female Earth pony and one of the main 								characters of My Little Pony Friendship is Magic.']
	    ],
    	[
        	['name', 'Twilight Sparkle'],
	        ['image', 'http://tinyurl.com/hj877vs'],
    	    ['description', 'Twilight Sparkle is the primary main character of My Little 								Pony Friendship is Magic.']
	    ]
	];
	
The data is not terribly tidy. It would be much cleaner if those inner arrays were nicely formatted objects. Now, previously, we used the reduce function to calculate simple values like strings and numbers, but nobody said that the value returned by reduce has to be simple. We can use it with objects, arrays, or even DOM elements. Let’s create a function that takes one of those inner arrays (like ['name', 'Fluttershy']) and adds that key/value pair to an object.

	var addToObject = function(obj, arr) {
    	obj[arr[0]] = arr[1];
	    return obj;
	};
	
With this addToObject function, then we can convert each ‘pony’ array into an object:

	var ponyArrayToObject = function(ponyArray) {
		return reduce(addToObject, {}, ponyArray);
	};
	
If we then use our map function we can convert the whole array into something more tidy:

	var tidyPonies = map(ponyArrayToObject, ponies);
	
We now have an array of pony objects. With a little help from Thomas Fuchs’ tweet-sized templating engine, we can use reduce again to convert this into an HTML snippet. The template function takes a template string and an object, and anywhere it finds mustache-wrapped words (like, {name} or {image}), it replaces them with the correponding value from the object. For example:

	var data = { name: "Fluttershy" };
	t("Hello {name}!", data);
	// "Hello Fluttershy!"

	data = { who: "Fluttershy", time: Date.now() };
	t("Hello {name}! It's {time} ms since epoch.", data);
	// "Hello Fluttershy! It's 1454135887369 ms since epoch."
	
So, if we want to convert a pony object to a list item, we can do something like this:

	var ponyToListItem = function(pony) {
    	var template = '<li><img src="{image}" alt="{name}"/>' +
        	           '<div><h3>{name}</h3><p>{description}</p>' +
            	       '</div></li>';
	    return t(template, pony);
	};
	
That gives us a way to convert an individual item into HTML, but to convert the whole array, we’ll need our reduce and joinWord functions:

	var ponyList = map(ponyToListItem, tidyPonies);
	var html = '<ul>' + reduce(joinWord, '', ponyList) + '</ul>';
	
	
You can see the whole thing put together at http://jsbin.com/wuzini/edit?html,js,output
Once you understand the patterns that map and reduce are suited to, you may find yourself never needing to write an old-style for-loop again. In fact, it’s a useful challenge to see if you can completely avoid writing for-loops on your next project. Once you’ve used map and reduce a few times, you’ll start to notice even more patterns that can be abstracted. Some common ones include filtering, and plucking values from an array. Since these patterns come up quite often, people have put together functional programming libraries so that you can re-use code to address common patterns. Some of the more popular libraries include:

* Ramda,
* Lodash, and
* Underscore.

Now that you’ve seen how handy passing functions around as variables can be, especially when dealing with lists, you should have a whole suite of new techniques in your metaphorical tool-belt. And if that’s where you choose to leave it, that’s OK. You can quit reading here and nobody will think any less of you. You can go on to be a productive, successful programmer and never trouble your dreams with the complexities of partial application, currying or composition. These things are not for everyone.	

### Built-in language features of JavaScript
#### Closures and Scope
One of the more difficult things to wrap one’s head around in JavaScript which variables a function can ‘see’. In JavaScript, if you define a variable inside a function, it can’t be seen outside the function. For example:
	
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
	
However, if we define a function inside a function, the inner function can see variables in the outer function:

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
	
This takes a bit of getting used to. The rules are fairly straight-forward, but once we start passing variables around as arguments, it becomes harder to keep track of which functions can see which variables. If it’s confusing at first, be patient: Look at the point where you defined the function, and work out which variables are ‘visible’ at that point. They may not be what you expect if you are just looking at the point where you’re calling the function.

#### Purity

If you read about functional programming, you will eventually come across the concept of pure and impure functions. Pure functions are functions that fulfil two criteria:

* Calling the function with the same inputs always returns the same output.
* Calling the function produces no side-effects: No network calls; no files read or written; no database queries; no DOM elements modified; no global variables modified; and no console output. Nothing.

Impure functions make functional programmers uncomfortable. So uncomfortable that they avoid them as much as they possibly can. Now, the trouble with this is that the whole point of writing computer programs is the side effects. Making a network call and rendering DOM elements is at the core of what a web application does; it’s what JavaScript was invented for.

with functional programming, we generally try and work out the logic of what we’re trying to achieve first, before we do anything that has potential side effects.

Another way to think about it is, it’s like the difference between using a machine gun and a sniper rifle. With a machine gun you spray as many bullets as possible, counting on the fact that if you keep on spraying, eventually you’ll hit something. But you may also hit things you didn’t mean to. A sniper rifle is different though. You pick the best vantage point, line up the shot, take into account the wind speed and distance to the target. You patiently, methodically, carefully set things up and at the right moment, pull the trigger. A lot less bullets, and a much more precise effect.

So how do we make our functions pure? Let’s look at an example:

	var myGlobalMessage = '{{verb}} me';

	var impureInstuction = function(verb) {
    	return myGlobalMessage.replace('{{verb}}', verb);
	}

	var eatMe = impureInstruction('Eat');
	//=> 'Eat me'
	var drinkMe = impureInstruction('Drink');
	//=> 'Drink me'
	
This function is impure because it depends on the global variable myGlobalMessage. If that variable ever changes, it becomes difficult to tell what impureInstruction will do. So, one way to make it pure is to move the variable inside:

	var pureInstruction = function (verb) {
		var message =  '{{verb}} me';
		return message.replace('{{verb}}', verb);
	}
	
This function will now always return the same result given the same set of inputs. But sometimes we can’t use that technique. For example:

	var getHTMLImpure = function(id) {
    	var el = document.getElementById(id);
	    return el.innerHTML;
	}
	
This function is impure because it is relying on the document object to access the DOM. If the DOM changes it might produce different results. Now, we can’t define document inside our function because it’s an API to the browser, but we can pass it in as a parameter:


	var getHTML = function(doc, id) {
		var el = doc.getElementById(id);
		return el.innerHTML;
	}

This may seem kind of trivial and pointless, but it’s a handy technique.


#### Immutability

Immutability is a core principle in functional programming, and has lots to offer to object-oriented programs as well. In this article, I will show what exactly immutability is all about, how to use this concept in JavaScript, and why it’s useful.

##### What is Immutability?
The text-book definition of mutability is liable or subject to change or alteration. In programming, we use the word to mean objects whose state is allowed to change over time. An immutable value is the exact opposite – after it has been created, it can never change.

If this seems strange, allow me to remind you that many of the values we use all the time are in fact immutable.

	var statement = "I am an immutable value";
	var otherStr = statement.slice(8, 17);
	
I think no one will be surprised to learn that the second line in no way changes the string in statement. In fact, no string methods change the string they operate on, they all return new strings. The reason is that strings are immutable – they cannot change, we can only ever make new strings.

Strings are not the only immutable values built into JavaScript. Numbers are immutable too. Can you even imagine an environment where evaluating the expression 2 + 3 changes the meaning of the number 2? It sounds absurd, yet we do this with our objects and arrays all the time.

##### In JavaScript, Mutability Abounds
In JavaScript, strings and numbers are immutable by design. However, consider the following example using arrays:

	var arr = [];
	var v2 = arr.push(2);
	
What is the value of v2? If arrays behaved consistently with strings and numbers, v2 would contain a new array with one element – the number 2 – in it. However, this is not the case. Instead, the arr reference has been updated to contain the number, and v2 contains the new length of arr.

Imagine an ImmutableArray type. Inspired by strings and numbers behavior, it would have the following behavior:

	var arr = new ImmutableArray([1, 2, 3, 4]);
	var v2 = arr.push(5);

	arr.toArray(); // [1, 2, 3, 4]
	v2.toArray();  // [1, 2, 3, 4, 5]
	
	
	