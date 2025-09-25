/* Normal Enum
   It generates extra JS code and may prevent tree-shaking from removing unused values, 
   because the object is materialized. */

enum Gender {
  FEMALE = "Female",
  MALE = "Male",
}

/* Const Enum
   TypeScript inlines the enum values at compile time. No enum object is created at runtime.
   It’s a compile-time only construct thus, reducing bundle size. */

const enum SearchType {
  Date = "Date",
  KEYWORD = "Keyword",
  ORDER = "order",
}

let gender: Gender = Gender.FEMALE;

//===================================================================================================

// any
/* Disables type checking completely.
   Once a value is any, you can do anything with it, and the compiler won’t complain.
   Effectively turns off TypeScript’s safety for that variable. */
let a: any = "Greg";
a = 3;
a = true;

// unknown
/* Safer alternative to any.
   Like any, it can hold any value.
   But you can’t use it directly — you must narrow it (check its type) before using it. */
let b: unknown = "Greg";
b = 3;
b = false;

// void (there is no return value)
function double(c: any, d: any) {
  console.log(c, d);
}

interface NewType {
  name: string;
  age: number;
  double: (a: number, b: number) => void;
}

// never (there CANNOT be any return value)
type ThisOrThat =
  | { This: number; That?: never }
  | { This?: never; That: number };
let choose: ThisOrThat = {
  This: 2,
};
