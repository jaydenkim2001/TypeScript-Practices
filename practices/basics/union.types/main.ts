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
