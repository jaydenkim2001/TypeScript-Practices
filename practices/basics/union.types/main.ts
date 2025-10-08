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
  if(Array.isArray(input)){
    if(typeof input[0] === "number"){
      const sum = input.reduce((a, b) => a + b, 0)
      console.log()
    }
    else{
      console.log(input.join(" "));
    }
  }
  else if (typeof input === "object" && "message" in input){
      const res = input as {message: string}
      console.log(res.message.toUpperCase()) ;
  }
  else{
    throw new Error("Invalid Input") 
  }
}

// 테스트 코드
console.log(processInput([1, 2, 3])); // 6
console.log(processInput(["hello", "world"])); // "helloworld"
console.log(processInput({ message: "TypeScript" })); // "TYPESCRIPT"
//console.log(processInput(42)); // 에러 발생
