// <T> is a generic type where it can be defined when it is being used.
type ArrayType<T> = T[];

const numberArray: ArrayType<number> = [1, 2, 3];
const stringArray: ArrayType<string> = ["a", "b", "c"];

// Restriction can be set on the types that the generic type <T> can accept via "extends"
interface Length {
  length: number;
}

function getValue<T extends Length>(data: T) {
  console.log(data.length);
}

console.log(getValue([1, 2, 3])); // array has length
console.log(getValue("hello")); // string has length
// console.log(getValue(1))         // number doesn't have a length, thus it gives an error

//=================================================================================================================
// 1. Conditional type
type IsString<T> = T extends string ? "yes" : "no";

type result1 = IsString<number>; //result1 is "no"
type result2 = IsString<string>; //result1 is "yes"

//=================================================================================================================
// 2. Mapped type
type Movie = {
  title: string;
  genre: string;
  rate: number;
};

// This subset takes in Movie and change its properties to be optional using "?"
type Subset<T> = {
  [K in keyof T]?: T[K];
};

const movie1: Subset<Movie> = { title: "parasite", genre: "thriller" };
const movie2: Subset<Movie> = { rate: 4.6 };

//=================================================================================================================
// 3. Multiple generic type
interface Pair<T, U> {
  first: T;
  second: U;
  display(): void;
}

const pair: Pair<string, number> = {
  first: "Jay",
  second: 24,
  display() {
    console.log(this.first + " is " + this.second + " years old.");
  },
};

pair.display();

//===========================================================================================================================================================================================
//Q1: Write a function that returns the first element of an array.
/* The function should work regardless of the array’s element type.
   - Function name: getFirstElement
   - Input: a generic array
   - Output: the first element of the array */

function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

// 테스트 코드
console.log(getFirstElement([1, 2, 3])); // 1
console.log(getFirstElement(["a", "b", "c"])); // "a"
console.log(getFirstElement([])); // undefined

//===========================================================================================================================================================================================
//Q2: Write a function that checks whether an array is a number array or not.
/* The function should work regardless of the array’s element type.
   1. Function name: isNumberArray
   2. Input: a generic array
   3. Output: 
        - Return true if the array is a number array.
        - Return false otherwise. */

function isNumberArray<T>(array: T[]): boolean {
  return array.every((element) => typeof element === "number");
}

// 테스트 코드
console.log(isNumberArray([1, 2, 3])); // true
console.log(isNumberArray(["a", "b", "c"])); // false
console.log(isNumberArray([])); // true (빈 배열은 숫자 배열로 간주)

//===========================================================================================================================================================================================
//Q3: Write a conditional type that satisfies the following conditions.
/* Conditional Type Definition:
   - Type name: IsArray<T>
   - If the input type T is an array type, return true.
   - Otherwise, return false. */

type IsArray<T> = T extends Array<any> ? true : false;

//===========================================================================================================================================================================================
//Q4: Write a type that adds a default value to all properties of an object.
/* 1. Utility Type Definition:
        - Type name: WithDefault<T>
        - Input: an object type T
        - Output: a new type where each property’s value type is transformed into a tuple of [originalType, defaultType].
   2. Test: 
        - Use WithDefault<T> to transform an object type, and then create an object of the transformed type. */

type WithDefault<T> = {
  [K in keyof T]: [T[K], T[K]];
};

// 테스트 코드
type Original = { id: number; name: string; isActive: boolean };
type WithDefaults = WithDefault<Original>;

// 기대 결과:
// type WithDefaults = {
//   id: [number, number];
//   name: [string, string];
//   isActive: [boolean, boolean];
// }

//===========================================================================================================================================================================================
//Q5: Write a function that creates an object from a key and a value.
/* 1. Function name: createObject
   2. Input: 
        - key: key (generic type K)
        - value: value (generic type V)
        - output: an object in the form { key: value } */

function createObject<K extends PropertyKey, V>(key: K, value: V): { [P in K]: V } {
  return { key: value } as { [P in K]: V };
}

// 테스트 코드
console.log(createObject("id", 123)); // { id: 123 }
console.log(createObject("name", "Alice")); // { name: "Alice" }

//===========================================================================================================================================================================================
//Q6: Write a function that extracts a specific property from an array of user information objects.
/* 1. Function name: pluck
   2. Input: 
        - An array of objects (generic type array)
        - A property name (generic type)
        - Output: An array of the values for that property */

function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
  return array.map((item) => item[key]);
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

console.log(pluck(users, "id")); // [1, 2]
console.log(pluck(users, "name")); // ["Alice", "Bob"]
