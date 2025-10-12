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

//===========================================================================================================================================================================================
//Q1: Write an enum that represents the status of a task, and then write a function that returns different messages depending on the status.
/* The task statuses are:
  - Pending: waiting
  - InProgress: in progress
  - Completed: completed

   The function should return the following messages based on the status:
  - Pending → "The task is pending."
  - InProgress → "The task is in progress."
  - Completed → "The task is completed." */

// Enum
enum Q1TaskStatus {
  Pending,
  InProgress,
  Completed,
}
function getStatusMessage(status: Q1TaskStatus): string {
  switch (status) {
    case Q1TaskStatus.Pending:
      return "작업이 대기 중입니다.";
    case Q1TaskStatus.InProgress:
      return "작업이 진행 중입니다.";
    case Q1TaskStatus.Completed:
      return "작업이 완료되었습니다.";
  }
}

console.log(getStatusMessage(Q1TaskStatus.Pending)); // "작업이 대기 중입니다."
console.log(getStatusMessage(Q1TaskStatus.InProgress)); // "작업이 진행 중입니다."
console.log(getStatusMessage(Q1TaskStatus.Completed)); // "작업이 완료되었습니다."

//===========================================================================================================================================================================================
//Q2: Write a function according to the following conditions.
/* Task status enum:
  - Pending: task pending
  - InProgress: task in progress
  - Completed: task completed
  - Failed: task failed

   Function requirements:
  - The function takes two parameters: the task status (TaskStatus) and an input value (unknown).
  - The input must be a string.
  - Process the string according to the task status:
    1. Pending → convert the string to all uppercase
    2. InProgress → convert the string to all lowercase
    3. Completed → prepend "Completed: " to the string
    4. Failed → throw an error
  - If the task status is Failed, the function must throw an error.
  - Finally, return the processed string inside an array.
  
  💡 Hint: you can use typeof to check the type. */

// Enum
enum Q2TaskStatus {
  Pending,
  InProgress,
  Completed,
  Failed,
}

function processTask(status: Q2TaskStatus, input: unknown): string {
  if (typeof input === "string") {
    switch (status) {
      case Q2TaskStatus.Pending:
        return input.toUpperCase();
      case Q2TaskStatus.InProgress:
        return input.toLowerCase();
      case Q2TaskStatus.Completed:
        return `완료: ${input}`;
      case Q2TaskStatus.Failed:
        throw new Error("에러: 작업이 실패했습니다.");
    }
  } else {
    throw new Error("에러: 입력값은 문자열이어야 합니다.");
  }
}

// 테스트 코드
console.log(processTask(Q2TaskStatus.Pending, "task1"));
// 기대 출력: "TASK1"

console.log(processTask(Q2TaskStatus.InProgress, "TaskA"));
// 기대 출력: "taska"

console.log(processTask(Q2TaskStatus.Completed, "Report1"));
// 기대 출력: "완료: Report1"

console.log(processTask(Q2TaskStatus.Failed, "TaskX"));
// 에러: 작업이 실패했습니다.

console.log(processTask(Q2TaskStatus.Pending, 42));
// 에러: 입력값은 문자열이어야 합니다.

//===========================================================================================================================================================================================
//Q3: Write code according to the following conditions.
/* Create an enum that represents log levels:
  - Info
  - Error
  - Debug

  Define a log function type with the following characteristics:
  - message: the log message (string)
  - level: the log level (enum value)
  - The function returns nothing (void type). 

  Implement the function using the defined type and enum:
  - The function should output different messages depending on the log level.
  - Info → prepend [INFO] to the message
  - Error → prepend [ERROR] to the message
  - Debug → prepend [DEBUG] to the message */

// Enum
enum LogLevel {
  Info,
  Error,
  Debug,
}

// Log Type
type LogFunction = (message: string, level: LogLevel) => void;

// 로그 함수 구현
const logMessage: LogFunction = (message, level) => {
  switch (level) {
    case LogLevel.Info:
      console.log(`[INFO] + ${message}`);
      break;
    case LogLevel.Error:
      console.log(`[ERROR] + ${message}`);
      break;
    case LogLevel.Debug:
      console.log(`[DEBUG] + ${message}`);
      break;
  }
};

// 테스트 코드
logMessage("시스템이 시작되었습니다.", LogLevel.Info);
logMessage("네트워크 연결 실패!", LogLevel.Error);
logMessage("디버깅 모드 활성화", LogLevel.Debug);

//===========================================================================================================================================================================================
//Q4: Write a function that satisfies the following conditions.
/* Write two functions: processAny and processUnknown.
    1. processAny: takes a parameter of type any. Regardless of the input type, convert the value to a string and return it.
    2. processUnknown: takes a parameter of type unknown.
        - If the input is a string → convert it to uppercase and return.
        - If the input is a number → multiply it by 10 and return.
        - For any other type → throw an error.

  💡 Finally, write test code to check the differences between the two functions. */

function processAny(input: any): string {
  return String(input);
}

function processUnknown(input: unknown): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input * 10;
  } else {
    throw new Error("에러 발생");
  }
}

// 테스트 코드
console.log(processAny("hello")); // 기대 출력: "hello"
console.log(processAny(42)); // 기대 출력: "42"
console.log(processAny(true)); // 기대 출력: "true"

console.log(processUnknown("hello")); // 기대 출력: "HELLO"
console.log(processUnknown(42)); // 기대 출력: 420
console.log(processUnknown(true)); // 에러 발생
