let a: { name: string; age: number } = { name: "Jayden", age: 24 };

let b: { name: string; age?: number } = { name: "Greg", age: 25 };
// ? indicates age property is optional. If it does exist, its type must be number. If it doesn’t exist, that’s still valid.

let c: { readonly name: string; age?: number } = { name: "Greg", age: 25 };
// properties inside cannot be modified, just read only.

//Arrays
let fruits: string[] = ["apple", "pear"];
let integers: number[] = [1, 2, 3, 4];
let students: { name: string; age?: number }[] = [
  { name: "Jayden" },
  { name: "Greg", age: 25 },
];

//Tuples (fixed-length array where each element’s position has a specific type.)
let tuple: [string, number];
tuple = ["Jayden", 47];

//===========================================================================================================================================================================================
//Q1: Look at the object below and write the type for user.
let user: { name: string; age?: number; isAdmin: boolean } = {
  name: "Alice",
  isAdmin: true,
};

user = {
  name: "Bob",
  age: 40,
  isAdmin: false,
};

//===========================================================================================================================================================================================
//Q2: Create a readonly array, and make sure an error occurs if you try to directly add or change values in the array.

let numbers: readonly number[] = [1, 2, 3];
// Following lines below should give an error.
// numbers.push(4);
// numbers[0] = 42;

//===========================================================================================================================================================================================
//Q3: Solve problems 3.1 and 3.2.
// 3.1 Write a function that creates a new array containing only the product name and price.
// 3.2 Write a function that returns an array containing only the products that are in stock.

const products: [string, number, boolean][] = [
  ["Laptop", 1000, true],
  ["Shoes", 50, false],
  ["Book", 20, true],
];

// 1. 상품 이름과 가격만 반환,리턴타입 정의필요
function getProductNamesAndPrices(
  products: [string, number, boolean][]
): [string, number][] {
  return products.map(([name, price]) => [name, price]);
}

// 2. 재고가 있는 상품만 반환,리턴타입 정의필요
let availableProducts: [string, number, boolean][];
function getAvailableProducts(
  products: [string, number, boolean][]
): [string, number, boolean][] {
  return products.filter((product) => product[2]);
}

// 테스트 코드
console.log(getProductNamesAndPrices(products));
// 기대 출력: [["Laptop", 1000], ["Shoes", 50], ["Book", 20]]

console.log(getAvailableProducts(products));
// 기대 출력: [["Laptop", 1000, true], ["Book", 20, true]]

//===========================================================================================================================================================================================
//Q4: Write a function that updates user information. If the age is not provided, use the default value 18.
//매개변수, 리턴 타입 정의 필요
let users: { name: string; age?: number }[] = [];

function updateUser(user: {
  name: string;
  age?: number;
}): { name: string; age?: number }[] {
  if (user.age == null) {
    user.age = 18;
  }
  users.push(user);

  return users;
}

// 테스트 코드
console.log(updateUser({ name: "Charlie" })); // { name: "Charlie", age: 18 }
console.log(updateUser({ name: "Dana", age: 25 })); // { name: "Dana", age: 25 }

//===========================================================================================================================================================================================
//Q5.: Using the data structure below, write a function that prints the names of products belonging to a specific category.
// proudcts 타입정의  필요
const productS = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Shoes", price: 50, category: "Fashion" },
  { name: "Book", price: 20 },
];

//매개변수, 리턴 타입 정의 필요
function getProductsByCategory(category: string): string[] {
  return productS
    .filter((product) => product.category === category)
    .map((product) => product.name);
}

// 테스트 코드
console.log(getProductsByCategory("Electronics")); // ["Laptop"]
console.log(getProductsByCategory("Fashion")); // ["Shoes"]
console.log(getProductsByCategory("Books")); // []
