// Day 1 JS Bootcamp
// by Chris M

// Primitive Datatypes and Literal Values
5   //Number
'ur mom'   //String
true    //Bool

// Storing values into a variable (Primitive)
var urmomWeight = 4000;
console.log(urmomWeight);

// Collection Datatypes
// Arrays are ordered Lists
var groceries = ['milk', 'bread', 'eggs'];
console.log(groceries[1]);
//Objects can act like unordered lists (dictionaries)
var cart = {
  wheels: 4,
  push: () => {console.log("Going Forward");}
};
console.log(cart.wheels);
cart.push();

// Conditional statements will run the code in the curly braces
// if the expression provided in parenthesis resolves as true
if (cart.wheels > 4) {
  console.log("You have too many wheels");
} else if (cart.wheels = 4) {
  console.log("You have enough wheels");
} else {
  console.log("You do not have enough wheels");
}

// Single Line Conditionals
if (cart.wheels) console.log("You have Wheels");
else console.log("You do not have wheels");
