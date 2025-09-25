//TypeScript는 사용자를 위한 JavaScript 확장팩 같은 느낌.
//TypeScript를 실행하면, 최종적인 결과물은 JavaScript 파일이다.
//브라우저는 JavaScript만 이해할 수 있고, TypeScript를 이해하지 못한다.
/*
Types in TypeScript:
string
number
boolean
null (A variable that has the value “nothing” or “empty object reference.”, usually means “intentional absence of any object value.”)
undefined (A variable that has been declared but not assigned a value, usually means “not initialized” or “not provided.”)
-----------
symbol
bigint
*/
//===========================================================================================================================================================================================
//Q1: Specify the types of the following variables.
var userName;
var userAge;
var isAdmin;
userName = "Alice";
userAge = 25;
isAdmin = true;
//===========================================================================================================================================================================================
//Q2: ssign appropriate types and initial values to the variables below.
var productName = "Laptop";
var productPrice = 1800;
var isAvailable = true;
console.log("\uC0C1\uD488\uBA85: ".concat(productName, ", \uAC00\uACA9: $").concat(productPrice, ", \uC7AC\uACE0 \uC5EC\uBD80: ").concat(isAvailable));
//===========================================================================================================================================================================================
//Q3: Write a function that adds two numbers, and specify types for its parameters and return value.
function addNumbers(a, b) {
    return a + b;
}
console.log(addNumbers(5, 3));
//===========================================================================================================================================================================================
//Q4: Write a function that takes a given value and converts it to a string. If the value is null or undefined, return 'No value available'.
function stringifyValue(value) {
    if (value === null || value === undefined) {
        return "No value.";
    }
    return String(value);
}
// 함수 호출
console.log(stringifyValue("Hello")); // "Hello"
console.log(stringifyValue(null)); // "값이 없습니다"
console.log(stringifyValue(undefined)); // "값이 없습니다"
//===========================================================================================================================================================================================
//Q5: The following function compares two values and returns the result. Understand the difference between loose equality (==) and strict equality (===), and predict the function’s output.
function compareValues(a, b) {
    if (a === b) {
        return "Strict Equality";
    }
    else if (a == b) {
        return "Loose Equality";
    }
    else {
        return "Not Equal";
    }
}
console.log(compareValues(5, "5"));
console.log(compareValues(null, undefined));
console.log(compareValues(false, 0));
console.log(compareValues(NaN, NaN));
console.log(compareValues(42, 42));
//===========================================================================================================================================================================================
//Q6: Write a function that checks whether a given value is a primitive type or not.
function isPrimitive(value) {
    return (value === null || (typeof value !== "object" && typeof value !== "function"));
}
// 함수 호출 예시
console.log(isPrimitive("Hello")); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(false)); // true
console.log(isPrimitive(null)); // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false
