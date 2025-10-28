// "extends"
interface Track {
  title: string;
  releaseDate: string;
}

interface Artist {
  name: string;
  debutYear: number;
}

type SearchItem<T extends "track" | "artist"> = T extends "track"
  ? Track
  : Artist;

const result1: SearchItem<"track"> = {
  title: "Hello",
  releaseDate: "2018",
};

const result2: SearchItem<"artist"> = {
  name: "Adele",
  debutYear: 10,
};

//===========================================================================================================================================================================================
// "infer"

// example 1
type ReturnTypeOfFunction<T> = T extends (...args: any[]) => infer R
  ? R
  : never;

function getUserInfo() {
  return { name: "Alice", age: 25 };
}

type UserInfo = ReturnTypeOfFunction<typeof getUserInfo>;

// example 2
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Promise<string>;

type Result = UnwrapPromise<PromiseString>;

// example 3
type ElementType<T> = T extends (infer U)[] ? U : T;

type ArrayOfNumbers = number[];

type SingleNumber = ElementType<ArrayOfNumbers>;

//===========================================================================================================================================================================================
// "as"
let someValue: unknown = "Hello world!";

let newValue = someValue as string;
console.log(newValue.length);

//===========================================================================================================================================================================================
//Q1: Write a utility type that extracts only the return type of a function.
/* Requirements:
   - Type name: ExtractReturnType<F>
   - Input: a function type F
   - Output: the return type of the function

   Test:
   - Use different function types to verify that your utility type correctly extracts their return types. */

type ExtractReturnType<F> = F extends (...args: any[]) => infer F ? F : never;

// 테스트 코드
type Test1 = ExtractReturnType<() => string>; // 기대 결과: string
type Test2 = ExtractReturnType<(x: number) => boolean>; // 기대 결과: boolean
type Test3 = ExtractReturnType<(x: number, y: string) => { id: number }>; // 기대 결과: { id: number }

//===========================================================================================================================================================================================
//Q2: Write a function that extracts a value from an object using a dynamically provided key.
/* Requirements:
   - The function should take an object type and a key dynamically, and return the value corresponding to that key.
   - It operates under the assumption that the given key definitely exists in the object.
   - Since TypeScript does not guarantee type safety when using dynamic keys, you must use as for type assertion. */

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key] as T[K];
}

// 테스트 코드
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

console.log(getValue(user, "name")); // 기대 출력: "Alice"
console.log(getValue(user, "email")); // 기대 출력: "alice@example.com"

//===========================================================================================================================================================================================
/*Q3: In an API request, the processing logic changes depending on the type of incoming data.
      Determine the data type that can be handled according to the request type. 
/* Requirements:
   - Request types: "text", "json", "binary".
   - Data format for each request type:
        "text" → string
        json" → Record<string, any> (object)
        "binary" → Uint8Array (binary data)
   - Type name: RequestData<T>
        Returns the appropriate data type based on the request type T.
   - Function name: processRequest
        Input: request type (T) and data (RequestData<T>)
        Output: processed data result (simply return as "Processed: [data]" format) */

type RequestData<T> = T extends "text"
  ? string
  : T extends "json"
  ? Record<string, any>
  : T extends "binary"
  ? Uint8Array
  : never;

function processRequest<T extends "text" | "json" | "binary">(
  type: T,
  data: RequestData<T>
): string {
  if (type === "text") {
    return `Processed ${data}`;
  } else if (type === "json") {
    return `Processed ${JSON.stringify(data)}`;
  } else if (type === "binary") {
    return `Processed ${(data as Uint8Array).join(",")}`;
  }
  throw new Error("Unsupported type!");
}

// 테스트 코드
console.log(processRequest("text", "Hello")); // "Processed: Hello"
console.log(processRequest("json", { key: "value" })); // "Processed: [object Object]"
console.log(processRequest("binary", new Uint8Array([72, 101, 108, 108, 111]))); // "Processed: 72,101,108,108,111"
