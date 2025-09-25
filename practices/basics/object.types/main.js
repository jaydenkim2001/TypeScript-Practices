var a = { name: "Jayden", age: 24 };
var b = { name: "Greg", age: 25 };
// ? indicates age property is optional. If it does exist, its type must be number. If it doesn’t exist, that’s still valid.
var c = { name: "Greg", age: 25 };
// properties inside cannot be modified, just read only.
//Arrays
var fruits = ["apple", "pear"];
var integers = [1, 2, 3, 4];
var students = [
    { name: "Jayden" },
    { name: "Greg", age: 25 },
];
//Tuples (fixed-length array where each element’s position has a specific type.)
var tuple;
tuple = ["Jayden", 47];
//===========================================================================================================================================================================================
//Q1: Look at the object below and write the type for user.
var user = {
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
var numbers = [1, 2, 3];
// Following lines below should give an error.
// numbers.push(4);
// numbers[0] = 42;
//===========================================================================================================================================================================================
//Q3: Solve problems 3.1 and 3.2.
// 3.1 Write a function that creates a new array containing only the product name and price.
// 3.2 Write a function that returns an array containing only the products that are in stock.
var products = [
    ["Laptop", 1000, true],
    ["Shoes", 50, false],
    ["Book", 20, true],
];
// 1. 상품 이름과 가격만 반환,리턴타입 정의필요
function getProductNamesAndPrices(products) {
    return products.map(function (_a) {
        var name = _a[0], price = _a[1];
        return [name, price];
    });
}
// 2. 재고가 있는 상품만 반환,리턴타입 정의필요
var availableProducts;
function getAvailableProducts(products) {
    return products.filter(function (product) { return product[2]; });
}
// 테스트 코드
console.log(getProductNamesAndPrices(products));
// 기대 출력: [["Laptop", 1000], ["Shoes", 50], ["Book", 20]]
console.log(getAvailableProducts(products));
// 기대 출력: [["Laptop", 1000, true], ["Book", 20, true]]
//===========================================================================================================================================================================================
//Q4: Write a function that updates user information. If the age is not provided, use the default value 18.
//매개변수, 리턴 타입 정의 필요
var users = [];
function updateUser(user) {
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
var productS = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Shoes", price: 50, category: "Fashion" },
    { name: "Book", price: 20 },
];
//매개변수, 리턴 타입 정의 필요
function getProductsByCategory(category) {
    return productS
        .filter(function (product) { return product.category === category; })
        .map(function (product) { return product.name; });
}
// 테스트 코드
console.log(getProductsByCategory("Electronics")); // ["Laptop"]
console.log(getProductsByCategory("Fashion")); // ["Shoes"]
console.log(getProductsByCategory("Books")); // []
