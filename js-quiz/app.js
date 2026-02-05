let fruits = ["apple", "banana", "cherry"];
console.log(fruits[1]);
fruits[1] = "blueberry";

fruits.push("orange");
fruits.pop();
fruits.unshift("grapes");
fruits.shift();

let numbers = [3, 6, 9, 12];
console.log(numbers[0] + numbers[3]);
console.log(numbers.length);
numbers.push(15, 18);

numbers[1] = null;
let colors = ["red", "blue", "green"];
colors[2] = "black";

let favourites = ["pizza", "sushi", "green"];
favourites.push("burgers");
console.log(
  "I like" + favourites[0] + " and " + favourites[favourites.length - 1],
);
