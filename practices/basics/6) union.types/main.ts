type Track = {
  title: string;
  releaseDate: string;
};

type Artist = {
  name: string;
  releaseDate: string;
};

type SearchResult = Track | Artist;

/* "This is the interface version of type SearchResult"

interface SearchResult{
    searchResult: Track | Artist
}
*/

let results: SearchResult[] = [
  { title: "Hello", releaseDate: "2024" },
  { name: "Adele", releaseDate: "2025" },
];

// Danger of using Union
function getName(result: Track | Artist) {
  return result.releaseDate;
  /* return result.title => ERROR
    If the incoming parameter is a type of Artist, this cannot return title 
    since Artist type does not contain value named "title". 
    Hence, we need type narrowing process to be done beforehand.*/
}

//=================================================================================================================
// 1. "typeof" (Type Narrowing)
type SearchType1 = number | string;

function searchByKeyword(keyword: SearchType1): string {
  // Type narrowing: if the input value has a type of number, we switch it to string type.
  if (typeof keyword === "number") return keyword.toString();
  return keyword;
}
// Downside of type narrowing via "typeof" is that it can only catch primitive types.

//=================================================================================================================
// 2. "instanceof" (Type Narrowing)
type Period = {
  start: string;
  end: string;
};

type SearchType2 = Period | Date;

function getDate(day: SearchType2): Date {
  if (day instanceof Date) return day;
  return new Date(day.start);
}
// "instanceof" only works with class-based objects/constructors but not with type or interface alias

//=================================================================================================================
// 3. "in" (Type Narrowing)
function getName3(result: Track | Artist) {
  if ("title" in result) return result.title;

  return result.name;
}

//=================================================================================================================
// 4. "is" (Type Narrowing)
// "If this function returns true, then I guarantee the argument is of this specific type."

function isTrack(result: Track | Artist): result is Track {
  return (result as Track).title !== undefined;
}

function isArtist(result: Track | Artist): result is Artist {
  return (result as Artist).name !== undefined;
}

//=================================================================================================================
// Discriminator

type Track1 = {
  title: string;
  releaseDate: string;
};

type Artist1 = {
  name: string;
  debutDate: string;
};

/* Downside of union type:
   The issue is that Track1 | Artist1 doesn’t prevent an object from containing all the properties at once — 
   because TypeScript sees it as “either or both.”*/
const res1: Track1 | Artist1 = {
  title: "Hey",
  name: "Aiden",
  releaseDate: "2025",
  debutDate: "2026",
};

/* By adding a field like type: "track" or type: "artist", 
   you’re using literal types as a unique tag to differentiate the two types: */
type Track2 = {
  type: "track";
  title: string;
  releaseDate: string;
};

type Artist2 = {
  type: "artist";
  name: string;
  debutDate: string;
};

// Now it can only take properties either one of the two types via the usage of literal types as a unique tag.
const res2: Track2 | Artist2 = {
  type: "artist",
  name: "Aiden",
  debutDate: "2026",
};

//===========================================================================================================================================================================================
//Q1: Write a function that accepts various data types and performs different processing depending on the input.
/* The input can be one of the following three forms:
   - A number array → return the sum of all numbers in the array.
   - A string array → return a single string that concatenates all elements.
   - An object of the form { message: string } → return the message property converted to uppercase. */

type Input = number[] | string[] | { message: string };
function processInput(input: Input) {
  if (Array.isArray(input)) {
    if (input.length === 0) {
      throw new Error("Empty array!");
    }
    if (input.every((element) => typeof element === "number")) {
      return input.reduce((sum, num) => sum + num, 0);
    }
    if (input.every((element) => typeof element === "string")) {
      return input.join("");
    }

    throw new Error("Invalid type of array!");
  }
  if ("message" in input) {
    return input.message.toUpperCase();
  }
}

// 테스트 코드
console.log(processInput([1, 2, 3])); // 6
console.log(processInput(["hello", "world"])); // "helloworld"
console.log(processInput({ message: "TypeScript" })); // "TYPESCRIPT"
//console.log(processInput(42)); // 에러 발생

//===========================================================================================================================================================================================
//Q2: Write code that satisfies the following conditions.
/* Define the following two classes:
   - Car class → has a property brand (brand name, string)
   - Bike class → has a property type (bike type, string)

   Write a function that takes a vehicle parameter, which can be an instance of either Car or Bike, and process it according to the following rules:
   - If it’s a Car, return the brand name in uppercase.
   - If it’s a Bike, return the bike type prefixed with "Bike: ". */

class Car {
  public brand: string;
  constructor(brand: string) {
    this.brand = brand;
  }
}

class Bike {
  public type: string;
  constructor(type: string) {
    this.type = type;
  }
}

function processVehicle(vehicle: Car | Bike): string {
  if (vehicle instanceof Car) {
    return vehicle.brand.toUpperCase();
  } else if (vehicle instanceof Bike) {
    return `Bike: ${vehicle.type}`;
  } else {
    throw new Error("Invalid Type!");
  }
}

// 테스트 코드
const myCar = new Car("Tesla");
const myBike = new Bike("Mountain");

console.log(processVehicle(myCar)); // "TESLA"
console.log(processVehicle(myBike)); // "Bike: Mountain"
//console.log(processVehicle("unknown")); // 에러 발생

//===========================================================================================================================================================================================
//Q3: Using the in operator for user management
/* The system has two types of users:
   - Admin user: { type: "admin"; permissions: string[] }
   - User user: { type: "user"; email: string }

   Write a function called processUser that takes either an Admin or a User object as input and processes it as follows:
   - If the input is an Admin, return a string that joins all permissions with commas.
   - If the input is a User, return the email address. */

type Admin = {
  type: "admin";
  permissions: string[];
};

type User = {
  type: "user";
  email: string;
};

function processUser(user: Admin | User): string {
  if ("permissions" in user) {
    return user.permissions.join();
  } else if ("email" in user) {
    return user.email;
  } else {
    throw new Error("Invalid type!");
  }
}

// 테스트 코드
console.log(processUser({ type: "admin", permissions: ["read", "write"] })); // "read,write"
console.log(processUser({ type: "user", email: "user@example.com" })); // "user@example.com"
//console.log(processUser({ type: "guest" })); // 에러 발생

//===========================================================================================================================================================================================
//Q4: Write a function that handles the following union types:
/* - Rectangle object: { width: number; height: number }
   - Circle object: { radius: number }

   The function should operate according to the following rules:
   - If the input is a Rectangle, return its area (width × height).
   - If the input is a Circle, return its area (π × radius²). */

type Rectangle = {
  width: number;
  height: number;
};

type Circle = {
  radius: number;
};

// 사용자 정의 타입 가드
function isRectangle(shape: unknown): shape is Rectangle {
  return (
    (shape as Rectangle).width !== undefined &&
    (shape as Rectangle).height !== undefined
  );
}

function calculateArea4(shape: Rectangle | Circle): number {
  if (isRectangle(shape)) {
    return shape.width * shape.height;
  } else {
    return Math.PI * shape.radius ** 2;
  }
}

// 테스트 코드
console.log(calculateArea4({ width: 10, height: 5 })); // 50
console.log(calculateArea4({ radius: 7 })); // 153.93804002589985 (대략 π * 7²)

//===========================================================================================================================================================================================
//Q5: Union Type Pitfalls and Solutions
/* There are two union types handled by a function:
   - Square: { type: "square"; side: number }
   - Circle: { type: "circle"; radius: number }

   A function called calculateArea is meant to calculate the area for both types.
   However, if the union types are not handled properly, there’s a possibility of runtime errors.

   Write a solution that resolves this issue.
   - Use a discriminated union (with a type property) to safely narrow the types.
   - Add an exhaustiveness check so that even if new types are added in the future, type safety is maintained. */

type Square5 = {
  type: "square";
  side: number;
};

type Circle5 = {
  type: "circle";
  radius: number;
};

type Shape = Square5 | Circle5;

function calculateArea5(shape: Shape): number {
  switch (shape.type) {
    case "square":
      return shape.side ** 2;
    case "circle":
      return Math.PI * shape.radius ** 2;
    default:
      const _exhaustive: never = shape;
      throw new Error(`Unhandled shape type: ${_exhaustive}`);
  }
}

// 테스트 코드
console.log(calculateArea5({ type: "square", side: 5 })); // 기대 출력: 25
console.log(calculateArea5({ type: "circle", radius: 7 })); // 기대 출력: 153.93804002589985